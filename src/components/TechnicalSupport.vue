<template>
  <section id="technical-support" class="technical-support">
    <p class="technical-support__title center">
      Извините, на сайте проводятся технические работы.
    </p>
    <p class="technical-support__text center">
      По всем вопросам пишите на почту:
      <a href="mailto:infolevdev@gmail.com">infolevdev@gmail.com</a>
    </p>
  </section>
</template>

<script>
export default {
  name: "TechnicalSupport",
};
</script>

<style lang="scss" scoped>
.technical-support {
  flex-direction: column;
  &__title {
    font-size: 3.5rem;
  }
  &__text {
    font-size: 2rem;
  }
}
</style>