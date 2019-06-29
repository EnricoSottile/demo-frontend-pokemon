<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      observer: null
    };
  },

  mounted() {
    this.startObserver();
  },

  destroyed() {
    this.observer.disconnect();
  },

  methods: {
    startObserver() {
      const options = {
        root: document.querySelector(".app-content"),
        rootMargin: "100px",
        threshold: 0
      };

      this.observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          this.$emit("intersect");
        }
      }, options);

      this.observer.observe(this.$el);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
