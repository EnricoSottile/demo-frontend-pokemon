<template>
  <div>


        <div v-if="!itemIsEmpty">
            <h3>{{item.forms}}</h3>
            <pre>{{ item }}</pre>
        </div>
    

        <div class="spinner-holder">
            <Spinner :show="loading" :immediate="false" />
        </div>
    
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    loading: Boolean
  },

  data() {
    return {

    };
  },

  computed: {
      itemIsEmpty(){
          const obj = this.item;
          return Object.entries(obj).length === 0 && obj.constructor === Object;
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
</style>
