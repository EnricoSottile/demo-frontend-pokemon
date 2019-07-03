<template>
  <div>
    <div v-if="!pokemonIsEmpty" class="pokemon-holder">
      <h3 class="pokemon-name">{{ pokemon.forms[0].name }}</h3>
      
      <div class="row">
        <div class="col-xs">
          <p>Altezza: {{ getPokemonHeight }} - Peso: {{ getPokemonWeight }}</p>
        </div>
        <div class="col-xs">
          <p>
            <span
              @click="handleLabelWasClicked(val, key, $event)"
              v-for="(val, key) in pokemon.abilities"
              :key="val.ability.name"
              class="label"
            >{{ val.ability.name }}</span>
          </p>
        </div>
      </div>
      <!--/row-->

      <h4>Demo form:</h4>
      <form @submit.prevent="handleSubmitForm">
        
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <div class="form-group">
              <label for="demo_text">Demo text</label>
              <input v-model="form.demo_text" class="form-control" type="text" name="demo_text">
            </div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="form-group">
              <label for="demo_email">Demo email</label>
              <input v-model="form.demo_email" class="form-control" type="email" name="demo_email">
            </div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="form-group">
              <label for="demo_textarea">Demo textarea</label>
              <textarea v-model="form.demo_textarea" class="form-control" rows="5" name="demo_textarea"></textarea>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <div class="form-group checkbox-holder">
              <label for="demo_checkbox">Demo checkbox</label>
              <input v-model="form.demo_checkbox" type="checkbox" name="demo_checkbox" value="demo_checkbox_1">
              <input v-model="form.demo_checkbox" type="checkbox" name="demo_checkbox" value="demo_checkbox_2">
            </div>
          </div>
          <div class="col-xs-12">
            <div class="form-group">
              <button :class="{'disabled': !checkFormIsValid}" type="submit">Salva</button>
            </div>
          </div>
        </div>
        <!--/row-->

      </form>
    </div>

    <div class="spinner-holder">
      <Spinner :show="loading" :immediate="false"/>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  props: {
    pokemon: Object,
    loading: Boolean
  },

  data() {
    return {

      form: {
        demo_text: '',
        demo_email: '',
        demo_textarea: '',
        demo_checkbox: [],
      },
      errors: [],

    };
  },

  watch: {
    pokemon() {
      this.notifyReadyState();
    }
  },

  methods: {
    notifyReadyState() {
      if (!this.pokemonIsEmpty) {
        this.$emit("content-ready", this.pokemon);
      }
    },
    handleLabelWasClicked(val, key, event) {
      // TODO popup/tooltip
      console.log("Demo -> inserire popover")
    },
    handleSubmitForm(){
      if (this.checkFormIsValid === false) {
        this.$notify({
          group: "global",
          title: "Form non valido!",
          text: 'Perfavore, completa tutti i campi',
          type: "warn",
          duration: 5000
        });
        return;
      };

      const data = {
        pokemon: this.pokemon,
        data: this.form
      }
      
      this.$emit("form-submit", data);      
    },
  },

  computed: {
    pokemonIsEmpty() {
      const obj = this.pokemon;
      return Object.entries(obj).length === 0 && obj.constructor === Object;
    },
    getPokemonHeight() {
      return this.pokemon.height * 10 + " cm.";
    },
    getPokemonWeight() {
      return this.pokemon.weight / 10 + " kg.";
    },
    checkFormIsValid(){
      this.errors = [];

      const fields = [
        'demo_text',
        'demo_email',
        'demo_textarea',
        'demo_checkbox'
      ];

      fields.forEach(val => {
        // TODO per form complessi si può visualizzare l'errore
        // o usare un package apposito più completo
        let model = this.form[val];
        if (!model || !model.length) {
          this.errors.push({
            name: val,
            message: `Il campo ${val} è obbligatorio`
          })
        }
      })


      if (this.errors.length) return false;
      return true;
    },

  }
};
</script>

<style lang="scss" scoped>
.spinner-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 70px;
}

.pokemon-holder {
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 2.5rem 0 0;
  }

  .pokemon-name {
    margin: 0;
    text-transform: capitalize;
  }

  .label {
    margin: 0;
    padding: 4px 12px;
    background-color: #eee;
    border-radius: 10px;
    color: #555;
    box-shadow: 0px 1px 0.5px 1px rgba(0, 0, 0, 0.15);

    &:hover {
      cursor: pointer;
    }

    &:active {
      box-shadow: 0px 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
    }

    & + .label {
      margin-left: 5px;
    }
  }

  code {
    display: block;
    padding: 4px 12px;
    background-color: #eee;
    border-radius: 10px;
    color: #555;
    max-height: 600px;
    overflow-y: scroll;
  }
}
</style>
