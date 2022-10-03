<template>
  <DeveloperInfo />
  <AboutApp>
    <p class="about__text">
      Каждому иногда требуется помощь.<br />Проблемные ситуации на работе. Страх
      что-то не успеть в этом быстро меняющемся мире. Проблемы в семье.
    </p>
    <p class="about__text">
      И это ещё не весь список, да?<br />Общий стресс накапливается и уже готов
      выплеснуться наружу бурной истерикой или неконтролируемым гневом? Выход
      есть. PSY.
    </p>
    <p class="about__text bold">
      <span class="colored">PSY</span> это специальное приложение
      психологической помощи.
    </p>
    <p class="about__text">
      Оно создано, чтобы помочь тебе справиться в сложные времена, повысить свою
      самооценку и обрести гармонию в жизни. Приложение разработано
      профессиональным психологом, на основе трансакционного анализа. Чтобы даже
      в отрыве от специалиста, ты смог самостоятельно пройти сложный период и
      стать лучше.
    </p>
  </AboutApp>
  <SubscriptionInfo>
    <p class="subscribtion-info__text">
      Оформив подписку, ты расширишь функционал приложения. Тебе станут доступны
      многие другие полезные функции для развития себя и помощи в сложное время.
      <span class="bold">Например:</span>
    </p>

    <div
      class="subscribtion-info__ego ego border-colored shadowed"
      v-for="(ego, j) in psyEgos"
      :key="j"
    >
      <div class="ego__text-container">
        <p class="ego__title bold">
          Для эго состояния <span class="colored">"{{ ego.name }}"</span>:
        </p>
        <ul class="ego__list">
          <li class="ego__item" v-for="(point, i) in ego.points" :key="i">
            <p class="ego__point">
              {{ point.name }}
              <br />
              <span class="ego__description">
                {{ point.text }}
              </span>
            </p>
          </li>
        </ul>
      </div>
      <div class="ego__image-container">
        <img
          :src="
            './images/psy/ImageSubcribeInfo' +
            j.slice(0, 1).toUpperCase() +
            j.slice(1) +
            '.png'
          "
          alt="App screen"
          width="464"
          height="504"
        />
      </div>
    </div>

    <div class="subscribtion-info__addition addition">
      <div class="addition__container">
        <p>Плюс ко всему ты получишь:</p>
        <p>
          <span class="bold">Виджеты на рабочий стол<br /></span>
          <span class="grey">Для позитивных утверждений и аффирмаций</span>
        </p>
        <p>
          <span class="bold">Пароль для входа в приложение<br /></span>
          <span class="grey">Скрой свои записи от посторонних глаз.</span>
        </p>

        <div class="addition__images">
          <img
            :src="'./images/psy/ImageSubcribeInfoAddition_1.png'"
            alt="App screen"
            width="317"
            height="345"
          />
          <img
            :src="'./images/psy/ImageSubcribeInfoAddition_2.png'"
            alt="App screen"
            width="317"
            height="345"
          />
        </div>
      </div>
      <div class="addition__girl">
        <img
          :src="'./images/psy/ImageSubcribeInfoAddition_3.png'"
          alt="Girl with baloons :D"
        />
      </div>
    </div>
  </SubscriptionInfo>
  <Subscription v-if="authorized && !premium?.typePremium" />
</template>

<script>
import { mapState } from "vuex";
import DeveloperInfo from "../components/DeveloperInfo.vue";
import AboutApp from "../components/AboutApp.vue";
import SubscriptionInfo from "../components/SubscriptionInfo.vue";
import Subscription from "../components/Subscription.vue";
export default {
  name: "PSY",
  components: {
    DeveloperInfo,
    AboutApp,
    SubscriptionInfo,
    Subscription,
  },
  computed: {
    ...mapState(["psyEgos", "premium", "preloaderActive", "authorized"]),
  },
};
</script>

<style lang="scss">
.psy {
  .subscribtion-info {
    &__text {
      width: 65%;
      margin-bottom: 1.5rem;
    }

    p {
      font-size: 1.75rem;
    }

    .ego {
      padding: 1rem 0 1rem 3rem;
      border-bottom-right-radius: 3rem;
      border-bottom-left-radius: 3rem;
      border-top-right-radius: 3rem;
      border-style: solid;
      margin-bottom: 2rem;
      display: grid;
      grid-template: 1fr / 10fr 7fr;

      &__text-container {
        padding: 1rem 0;
      }

      &__title {
        font-size: 1.88rem;
        margin-bottom: 1.7rem;
      }

      &__list {
      }

      &__item {
        font-size: 1.75rem;
        list-style-type: none;
        position: relative;
        margin-bottom: 1.5rem;
        //   text-indent: 1.5rem;
        //   &::before {
        //     content: "-";
        //     font-size: 3rem;
        //     line-height: 0;
        //     position: absolute;
        //     top: 0.9rem;
        //     left: -1.6rem;
        //     color: var(--c-white);
        //   }
      }

      &__point {
      }

      &__description {
        color: var(--c-grey);
      }

      &__image-container {
        img {
          transform: translateY(-2%) scale(1.15);
          transform-origin: left center;

          width: 100%;
          height: 100%;
        }
      }
    }

    .addition {
      padding: 1rem 3rem;
      display: grid;
      grid-template: 40rem / 1fr 1fr;

      &__container {
        display: flex;
        flex-direction: column;

        p {
          margin-bottom: 1.5rem;
        }
      }
      &__images {
        display: flex;
        justify-content: space-around;
        position: relative;
        flex: 1;
        img {
          position: absolute;
          top: 50%;
          width: 19.81rem;
          height: 21.56rem;

          &:first-child {
            left: 25%;
            transform-origin: left top;
            transform: translate(-80%, -60%) scale(1.4);
          }
          &:last-child {
            right: 25%;
            transform-origin: right top;
            transform: translate(60%, -60%) scale(1.4);
          }
        }
      }
      &__girl {
        display: flex;
        justify-content: center;
        img {
          width: 80%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .psy {
    .subscribtion-info {
      .ego {
        &__image-container {
          img {
            transform: translateY(-2%) scale(1.8);
            transform-origin: center center;
            object-fit: contain;
          }
        }
      }

      .addition {
        display: block;

        &__container {
          p {
          }
        }

        &__images {
          display: flex;
          justify-content: space-around;
          position: relative;
          flex: 1;
          margin-top: 55%;
          img {
            position: relative;
            top: unset;
            width: 50%;
            height: auto;
            left: unset !important;
            right: unset !important;
            transform-origin: center bottom !important;
            transform: scale(2.1) !important;
          }
        }
        &__girl {
          display: none;
        }
      }
    }
  }
}
</style>