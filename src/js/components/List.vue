<template>
  <div>
  
    <div class="spinner-holder">
      <Spinner :show="loading" :immediate="false"></Spinner>
    </div>

    <ul>
      <li v-for="(val, key) in list" :key="key">{{ val.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    loading: Boolean,
  },

  data() {
    return {
    }
  },




};
</script>

<style lang="scss" scoped>
.spinner-holder {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
