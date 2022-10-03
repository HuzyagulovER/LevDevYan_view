<template>
  <section class="subscribtion-info">
    <div class="subscribtion-info__container container">
      <div class="subscribtion-info__title title">
        Что ты получаешь<br />
        <span class="colored">при покупке подписки {{ page }}</span>
      </div>
      <slot></slot>
    </div>
    <Sphere style="top: 32%; left: 0%" v-if="page === 'PSY'" />
    <Sphere style="top: 77%; left: 103%" v-if="page === 'PSY'" />
  </section>
</template>

<script>
import Sphere from "../components/Sphere.vue";
import { mapState } from "vuex";
export default {
  name: "SubscribtionInfo",
  components: {
    Sphere,
  },
  computed: {
    ...mapState(["page"]),
  },
};
</script>

<style lang="scss">
.avocado {
}
.psy {
}
</style>