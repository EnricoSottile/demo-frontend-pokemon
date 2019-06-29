<template>
  <div>
    <Navbar></Navbar>

    <div class="container-fluid app-content">
      <div class="row">
        <div class="col-xs-12 col-md-6" id="list-column">
          
          <div class="card">
            <div class="card-header">
              ....
              <button class="slide-card-button" @click="showDetailCardMobile = !showDetailCardMobile">show</button>
            </div>
            <div class="card-body">
              <List></List>
            </div>
            <div class="card-footer">
              ...
            </div>
          </div><!--/card-->


        </div>
        <div class="col-xs-12 col-md-6" id="detail-column" :class="{'slide-in': showDetailCardMobile}">

          <div class="card">
            <div class="card-header">
              ....
              <button class="slide-card-button" @click="showDetailCardMobile = !showDetailCardMobile">hide</button>
            </div>
            <div class="card-body">
              ...
            </div>
            <div class="card-footer">
              ...
            </div>
          </div>
        </div><!--/card-->

      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/js/components/Navbar";
import List from "@/js/components/List";

import PokeApi from "@/js/Api/PokeApi/Api";
import { clearInterval } from 'timers';

export default {
  components: {
    Navbar,
    List
  },

  data() {
    return {
      showDetailCardMobile: false,
      
      pokeApi: new PokeApi(),
    };
  },

  methods: {
    getAll(){
      let res = this.pokeApi.getAll();
      res.then(r => console.log(r))
      .catch(err => console.log(err));
    }
  },

  mounted(){
    const t = this;
    let limit = 0;

    let a = setInterval(() => {
      if (limit > 3) {
        window.clearInterval(a);
      }
      limit++;
      t.getAll();
    }, 1500);

  }


};
</script>

<style lang="scss" scoped>

  .card {
    height: calc(100vh - 100px); // 100px => 60 nav + 40 margin
  }

      .slide-card-button {
        display: none;
      }


  // css to handle sliding card
  @media only screen and (max-width: 64em) {
      .row {
        position:relative;
      }

      .slide-card-button {
        display: block;
      }

      #detail-column {
        position: absolute;
        top: 0;
        left: auto;
        right:auto;
        bottom: auto;
        width: 100%;

        transition: all .3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        transform: translateX(150%);
        
        &.slide-in {
          transform: translateX(0);
        }

      }
  }
</style>