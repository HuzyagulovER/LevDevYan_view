<template>
  <div class="sphere"></div>
</template>

<style lang="scss" scoped>
.sphere {
  position: absolute;
  width: 52.88rem;
  height: 52.88rem;
  transform: translate(-50%, -50%);
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(closest-side, var(--shadow-c-p), transparent);
  transition: all 0.3s ease;
}
</style>