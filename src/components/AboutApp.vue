<template>
  <section class="about">
    <div class="about__container container">
      <div class="about__wrapper">
        <p class="about__title title">
          о приложении <span class="colored">{{ page }}</span>
        </p>
        <slot></slot>
      </div>

      <div class="about__wrapper">
        <img
          class="about__image"
          :src="'./images/' + page?.toLowerCase() + '/ImageAboutApp.png'"
          height="613"
        />
      </div>
    </div>
    <Sphere style="top: 5%; left: -5%" v-if="page === 'PSY'" />
    <Sphere style="top: 95%; left: 105%" v-if="page === 'PSY'" />
  </section>
</template>

<script>
import { mapState } from "vuex";
import Sphere from "../components/Sphere.vue";

export default {
  name: "AboutApp",
  components: {
    Sphere,
  },
  computed: {
    ...mapState(["page"]),
  },
};
</script>

<style lang="scss">
.about {
  .container {
    display: flex;
    align-items: flex-start;
  }

  &__text,
  .list {
    margin-bottom: 1.7rem;
  }

  &__text {
    font-size: 1.75rem;
  }

  .list {
    &__item {
      font-size: 1.75rem;
      list-style-type: none;
      position: relative;
      margin-bottom: 1.5rem;
    }
  }

  &__wrapper:last-child {
    position: relative;
  }

  &__image {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}

.avocado {
  .about {
    color: var(--c-black);

    &__wrapper:first-child {
      flex: 3;
    }
    &__wrapper:last-child {
      flex: 2;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__image {
      width: 20.91rem;
      height: 38.31rem;
      transform: translate(-40%, -50%) scale(1.2);
    }
  }
}
.psy {
  .about {
    color: var(--c-white);

    &__wrapper:first-child {
      flex: 11;
    }
    &__wrapper:last-child {
      flex: 7;
      height: 100%;
    }

    &__image {
      width: 35.22rem;
      height: 38.31rem;
      transform: translate(-50%, -52%) scale(1.3);
    }
  }
}

@media screen and (max-width: 600px) {
  .avocado,
  .psy {
    .about {
      .container {
        display: grid;
        grid-template: 1fr / 1fr;
      }

      &__text,
      .list {
        margin-bottom: 1.7rem;
      }

      &__text {
        font-size: 2rem;
      }

      .list {
        &__item {
          font-size: 2rem;
        }
      }

      &__wrapper:last-child {
        position: relative;
      }

      &__image {
        position: relative;
        top: unset;
        left: unset;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        transform: scale(1.1);
      }
    }
  }

  .psy {
    .about {
      $marginSize: 35rem;
      &__wrapper:first-child {
        margin-bottom: $marginSize;
      }
      &__image {
        transform: translateY(calc($marginSize / -2 - 1rem)) scale(2);
      }
    }
  }
}
</style>