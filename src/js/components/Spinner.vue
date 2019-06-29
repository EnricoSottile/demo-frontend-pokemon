<template>
  <div v-if="canShow">
    <div class="loader">Loading...</div>
  </div>
</template>

<script>
import { clearTimeout } from 'timers';
export default {
  props: {
    show: Boolean,
    immediate: Boolean,
  },

  data() {
    return {
      canShow: false,
      delay: null,
    }
  },

  watch: {
    show(newVal, oldVal) {
      this.handleSpinnerVisibility(newVal, oldVal)
    },
  },

  methods: {

      /**
       * Delaying the visibility allows for a non breaking Spinner
       * For those cases when the loading status gets updated real quick
       * and would only show a quick glimpse of animation
       */
      handleSpinnerVisibility(newVal, oldVal){
        if ( this.immediate ) this.canShow = this.show;

        const delayTime = 200;
        const shouldShow = newVal === true && oldVal === false;
        const shouldHide = newVal === false && oldVal === true;

        if (shouldShow) {
          this.delay = setTimeout(() => this.canShow = true, delayTime)
        } else if (shouldHide) {
          window.clearTimeout(this.delay);
          this.canShow = false;
        }
      },

  }

};
</script>


<style lang="scss" scoped>
.loader,
.loader:after {
  border-radius: 50%;
  width: 8em;
  height: 8em;
}
.loader {
  font-size: 5px;
  position: relative;
  text-indent: -9999em;
  border-top: 0.8em solid rgba(0, 0, 0, 0.04);
  border-right: 0.8em solid rgba(0, 0, 0, 0.04);
  border-bottom: 0.8em solid rgba(0, 0, 0, 0.04);
  border-left: 0.8em solid #2ce4ec;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
