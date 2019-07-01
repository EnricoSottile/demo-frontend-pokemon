<template>
  <div>


        <div v-if="!pokemonIsEmpty" class="pokemon-holder">
            <h3 class="pokemon-name">{{ pokemon.forms[0].name }}</h3>
            <p>Altezza: {{ getPokemonHeight }} - Peso: {{ getPokemonWeight }}</p>

            <h5>Abilità:</h5>
            <p>
              <span v-for="(val, key) in pokemon.abilities" :key="key" class="label">{{ val.ability.name }}</span>
            </p>

            <h5>Dati aggiuntivi:</h5>
            <form>
              ... form qui e salvi in cache
            </form>

           
        </div>
    

        <div class="spinner-holder">
            <Spinner :show="loading" :immediate="false" />
        </div>
    
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  props: {
    pokemon: Object,
    loading: Boolean
  },

  data() {
    return {
    };
  },
  

  watch: {
    pokemon() {
      this.notifyReadyState();
    }
  },

  methods: {
    notifyReadyState(){
      if ( ! this.pokemonIsEmpty ) {
        this.$emit('content-ready', this.pokemon);
      }
    }
  },

  computed: {
      pokemonIsEmpty(){
          const obj = this.pokemon;
          return Object.entries(obj).length === 0 && obj.constructor === Object;
      },
      getPokemonHeight(){
        return this.pokemon.height * 10 + ' cm.';
      },
      getPokemonWeight(){
        return this.pokemon.weight / 10 + ' kg.';
      }
  }

};
</script>

<style lang="scss" scoped>
.spinner-holder {
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 100%;
  margin-top:20px;
  margin-bottom:20px;
  height:70px;

}

.pokemon-holder {

  h1, h2, h3, h4, h5 {
    margin: 2rem 0 0;
  }



  .pokemon-name {
    margin: 0;
    text-transform: capitalize;
  }

  .label {
    margin:0;
    padding: 4px 12px;
    background-color:#eee;
    border-radius:10px;
    color: #555;
    box-shadow: 0px 1px 0.5px 1px rgba(0, 0, 0, 0.15);
    

    &:hover {
      cursor: pointer;
    }

    &:active {
      box-shadow: 0px 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
    }

    & + .label {
      margin-left:5px;
    }
  }

  code {
    display: block;
    padding: 4px 12px;
    background-color:#eee;
    border-radius:10px;
    color: #555;
    max-height:600px;
    overflow-y: scroll;
  }
}
</style>
