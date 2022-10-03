<template>
  <section class="info">
    <div class="info__container container">
      <p class="info__title title">
        Информация о разработчике<br /><span class="colored">Lev Dev Yan</span>
      </p>
      <p class="info__text">
        В основе человеческой жизни,<br />стоит желание быть полезным.
      </p>
      <p class="info__text">
        Привет. Я Lev Dev Yan. <br />Разработчик приложений PSY, Avocado, TODO,
        Focus Time и других, делающих твою жизнь более насыщенной<br />положительными
        эмоциями, осознанностью и<br />спокойствием в критических ситуациях.
        Приложений, которые помогают тебе стать лучше, чем ты был вчера.
      </p>
      <div class="info__download download shadowed">
        <div class="download__container">
          <div class="download__name">{{ page }}</div>
          <img
            :src="'./images/' + page?.toLowerCase() + '/ImageLogo.jpg'"
            alt=""
            class="download__image shadowed"
          />
        </div>
        <a :href="downloadLinks[page]" class="download__button">
          <img
            :src="'./images/ImageLinkGooglePlay.png'"
            width="269"
            height="80"
          />
        </a>
      </div>
      <img
        class="info__image"
        :src="'./images/' + page?.toLowerCase() + '/ImageDeveloperInfo.png'"
        height="613"
      />
    </div>
    <Sphere style="top: 50%; left: 105%" v-if="page === 'PSY'" />
  </section>
</template>

<script>
import { mapState } from "vuex";
import Sphere from "../components/Sphere.vue";

export default {
  name: "DeveloperInfo",
  components: {
    Sphere,
  },
  computed: {
    ...mapState(["page", "downloadLinks"]),
  },
};
</script>

<style lang="scss">
.info {
  z-index: 1;

  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }

  &__text {
    font-size: 1.75rem;
    line-height: 2.1rem;
    width: 62%;
    margin-bottom: 1.7rem;
  }

  .download {
    display: flex;
    border-width: var(--b-w);
    border-style: solid;
    padding: 2.3rem;
    border-bottom-left-radius: 2.94rem;
    border-bottom-right-radius: 2.94rem;
    border-top-right-radius: 2.94rem;

    &__container {
      display: flex;
      flex-direction: column;
      margin-right: 2.5rem;
    }

    &__name {
      font-weight: 700;
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 0.5rem;
    }

    &__image {
      width: 6.06rem;
      height: 6.06rem;
      border-radius: 16.5%;
    }

    &__button {
      height: 6rem;
      align-self: flex-end;
      padding: 0.5rem;
      transition: all 0.3s ease;
      img {
        height: 100%;
        width: unset;
        object-fit: contain;
        transition: inherit;
        border-radius: 0.6rem;
      }

      &:hover {
        transform: scale(1.02);
      }
    }
  }

  &__image {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -1;
    height: 90%;
    transform: scaleX(-1);
  }
}

.avocado {
  .info {
    &__text {
      color: var(--c-black);
    }

    .download {
      border-color: var(--c-a-green);

      &__name {
        color: var(--c-black);
      }

      &__button {
        &:hover {
          img {
            box-shadow: 0 0 1.5rem 0 var(--shadow-c-a);
          }
        }
      }
    }
  }
}
.psy {
  .info {
    &__text {
      color: var(--c-white);
    }

    .download {
      border-color: var(--c-p-yellow);

      &__name {
        color: var(--c-white);
      }

      &__button {
        &:hover {
          img {
            box-shadow: 0 0 1.5rem 0 var(--shadow-c-p);
          }
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .info {
    &__text {
      font-size: 2rem;
      line-height: 2.3rem;
      width: 72%;
    }

    .download {
      display: flex;
      align-items: center;

      &__container {
        width: 25%;
        margin-right: 3rem;
      }

      &__name {
        font-size: 2.5rem;
      }

      &__image {
        width: 100%;
        height: 100%;
      }

      &__button {
        flex-grow: 2;
        width: 60%;
        height: auto;
        display: flex;
        transform: translateY(-5%);
        img {
          height: 100%;
          width: 100%;
          border-radius: 1.1rem;
        }
      }
    }

    &__image {
      opacity: 0.25;
    }
  }

  .psy {
    .info {
      &__image {
        left: -20%;
        right: unset;
      }
    }
  }
}
</style>