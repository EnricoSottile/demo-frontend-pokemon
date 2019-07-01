<template>
  <div>
    <ul>
      <li v-for="(val, key) in list" :key="key">

        <h5 class="list-title">{{ val.name }}</h5>
        
        <p class="list-info">


          <template v-if="wasVisited(val.name)">
            <small>Last visit: {{ formatDate( visits[val.name] ) }}</small>
          </template>
          <template v-else>
            <small>&nbsp;</small>
          </template>

        </p>


        <a class="item-click" href="#" @click="itemClicked(val)">
          <i>&rang;</i>
        </a>
        
      </li>
    </ul>

    <Intersection @intersect="handleIntersected"/>

    <div class="spinner-holder">
      <Spinner :show="loading" :immediate="false"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    visits: Object,
    loading: Boolean
  },

  data() {
    return {};
  },



  methods: {
    formatDate(date){
      return window.UiHelpers.formatDate(date);
    },
    wasVisited(name){   
      const keys = Object.keys(this.visits);
      return keys.length && keys.includes(name);
    },
    handleIntersected() {
      if (!this.loading) {
        this.$emit("end-of-list");
      }
    },
    itemClicked(value) {
      this.$emit("item-clicked", value);
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
  margin-top: 20px;
  margin-bottom: 20px;
  height: 70px;
}

li {
  position: relative;
  padding: 20px;
  background-color: #ffffff;
  margin: 15px auto;
  box-shadow: 0px 4px 6px 2px rgba(0, 0, 0, 0.1);
  transition: all .2s cubic-bezier(0.215, 0.610, 0.355, 1);


  &:hover {
    box-shadow: 0px 4px 6px 2px rgba(0, 0, 0, 0.15);
  }

  .list-title {
    margin: 0;
    text-transform: capitalize;
    font-weight: lighter;
  }

  .list-info {
    margin: 5px 0;
  }

  .item-click {
    position: absolute;
    height: 100%;
    width:10%;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 64em) {
        width:20%;
    }

    i {
      font-style: normal;
      font-size:30px;
      line-height: 30px;
      font-weight: bolder;
      color: cadetblue;
      font-family: courier, monospace !important;

      transform: translateX(0);
      transition: all .2s cubic-bezier(0.215, 0.610, 0.355, 1);

    }

    &:hover i {
      transform: translateX(5px);
    }

  }
}
</style>
