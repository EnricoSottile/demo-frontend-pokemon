<template>
  <div>
    <ul>
      <li @click="itemClicked(val)" v-for="(val, key) in list" :key="key">{{ val.name }}</li>
    </ul>

    <Intersection @intersect="handleIntersected" />

    <div class="spinner-holder">
      <Spinner :show="loading" :immediate="false" />
    </div>

  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    loading: Boolean
  },

  data() {
    return {

    };
  },

  methods: {
      handleIntersected(){
          if ( !this.loading ) {
              this.$emit('end-of-list');
          }
          
      },
      itemClicked(value){
        this.$emit('item-clicked', value);
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

li {
    padding: 15px 10px;
    background-color: lightgrey;
    margin:10px auto;
}

</style>
