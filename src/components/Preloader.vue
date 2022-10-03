<template>
  <div class="preloader">
    <div class="preloader__overlay"></div>
    <div class="preloader__spinner">
      <Sphere />
    </div>
  </div>
</template>

<script>
import Sphere from "../components/additionComponents/PreloaderAnimation.vue";

export default {
  components: {
    Sphere,
  },
  name: "Preloader",
};
</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  &__overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
  }

  &__spinner {
    z-index: 1;
    width: 10rem;
    height: 10rem;
  }
}
</style>