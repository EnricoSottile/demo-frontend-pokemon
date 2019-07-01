<template>
  <div>
    <Navbar/>

    <div class="container-fluid app-content">
      <notifications group="global"/>

      <div class="row">
        <div class="col-xs-12 col-md-6" id="list-column">
          <div class="card">
            <div class="card-header">
              <h1 class="card-title">Lista con infinite scroll</h1>
            </div>
            <div class="card-body">
              <List
                :list="pokeList"
                :loading="isLoadingList"
                @end-of-list="getListData"
                @item-clicked="handleListItemClicked"
              />
            </div>
            <div class="card-footer">...</div>
          </div>
          <!--/card-->
        </div>
        <div class="col-xs-12 col-md-6" id="detail-column" :class="{'slide-in': slideCard}">
          <div class="card">
            <div class="card-header">
              <h1 class="card-title">Sezione dettaglio</h1>
              <button class="slide-card-button" @click="handleUnslideCardWasClicked">hide</button>
            </div>
            <div class="card-body">
              <Detail v-if="canRenderDetail" :item="pokemon" :loading="isLoadingDetail"/>
            </div>
            <div class="card-footer">...</div>
          </div>
        </div>
        <!--/card-->
      </div>
    </div>
  </div>
</template>

<script>

import Navbar from "@/js/components/Navbar";
import List from "@/js/components/List";
import Detail from "@/js/components/Detail";

import PokeApi from "@/js/Interfaces/PokeApi/Api";
import { clearInterval, setTimeout } from "timers";

export default {
  components: {
    Navbar,
    List,
    Detail
  },

  data() {
    return {
      slideCard: false,
      canRenderDetail: false,

      isLoadingList: false,
      isLoadingDetail: false,

      pokeApi: new PokeApi(),
      pokeList: [],
      pokemon: {},

      notifications: []
    };
  },

  computed: {},

  methods: {

    // ========================================
    // UI
    isMobile() {
      const remToPx = 16;
      return window.innerWidth < 64 * remToPx;
    },

    /**
     * Immediately calls ajax request function
     *
     * If window is in mobile range
     * delays render for a smoother sliding
     *
     */
    handleListItemClicked(value) {
      this.slideCard = true;
      this.getItemDetails(value);

      if ( this.isMobile() === true) {
        setTimeout(() => this.canRenderDetail = true, 350);
      } else {
        this.canRenderDetail = true
      }
    },

    handleUnslideCardWasClicked(){
      this.slideCard = false;
      setTimeout(() => this.canRenderDetail = false, 300);
    },


    // ========================================
    // AJAX


    /**
     *
     */
    async getListData() {
      this.isLoadingList = true;

      try {
        const response = await this.pokeApi.getAll();
        this.pokeList = this.pokeList.concat(response.data.results);
      } catch (error) {
        this.$notify({
          group: "global",
          title: "Ops. An error occured!",
          text: error,
          type: "error",
          duration: 5000
        });
      } finally {
        this.isLoadingList = false;
      }
    },

    /**
     *
     */
    async getItemDetails(value) {
      this.isLoadingDetail = true;
      this.pokemon = {};

      try {
        const response = await this.pokeApi.getPokemon(value.url);
        this.pokemon = response.data;
      } catch (error) {
        this.$notify({
          group: "global",
          title: "Ops. An error occured!",
          text: error,
          type: "error",
          duration: 5000
        });
      } finally {
        this.isLoadingDetail = false;
      }
    }
  },

  mounted() {}
};
</script>

<style lang="scss" scoped>
.card {
  height: calc(100vh - 100px); // 100px => 60 nav + 40 margin

  .card-body {
    overflow-y: scroll;
  }
}

.slide-card-button {
  display: none;
}

// css to handle sliding card
// 64 rem is 1024px
@media only screen and (max-width: 64em) {
  .row {
    position: relative;
  }

  .slide-card-button {
    display: block;
  }

  #detail-column {
    position: absolute;
    top: 0;
    left: auto;
    right: auto;
    bottom: auto;
    width: 100%;

    transition: all 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    transform: translateX(150%);

    &.slide-in {
      transform: translateX(0);
    }
  }
}
</style>