<template>
  <DeveloperInfo />
  <AboutApp>
    <p class="about__text medium">
      <span class="colored">Avocado</span> поможет тебе вести здоровый образ
      жизни и научиться такой полезной привычке как интервальное голодание!
    </p>
    <p class="about__text">
      Если ты хочешь улучшить общее самочувствие, повысить свой энергетический
      тонус и улучшить работу мозга, Avocado - твой выбор. Здесь можно:
    </p>
    <ul class="about__list list">
      <li class="list__item">
        🍀 Устанавливать таймер для системы интервального голодания
      </li>
      <li class="list__item">
        ✌️ Создавать и вырабатывать полезные привычки и избавляться от вредных
      </li>
      <li class="list__item">😌 Следить за своим самочувствием</li>
      <li class="list__item">💧 Фиксировать количество выпитой воды</li>
      <li class="list__item">📝 Делать ежедневные заметки</li>
      <li class="list__item">📊 Просматривать статистику за любой день</li>
    </ul>
    <p class="about__text bold">
      Выбирая <span class="colored">Avocado</span> - выбираешь лёгкость!
    </p>
  </AboutApp>
  <SubscriptionInfo>
    <p class="subscribtion-info__text">
      Оформление подписки даёт тебе следующие бонусы:
    </p>
    <div class="subscribtion-info__bonuses bonuses">
      <div class="bonuses__text-container">
        <div class="bonuses__list">
          <div
            class="bonuses__item"
            v-for="(bonus, i) in avocadoBonuses"
            :key="i"
          >
            <p class="bonuses__counter">{{ i + 1 }}</p>
            <p v-html="bonus"></p>
          </div>
        </div>
      </div>
      <div class="bonuses__images">
        <img
          :src="'./images/avocado/ImageSubcribeInfoAddition_1.png'"
          alt="App screen"
          width="317"
          height="345"
        />
        <img
          :src="'./images/avocado/ImageSubcribeInfoAddition_2.png'"
          alt="App screen"
          width="317"
          height="345"
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
  name: "Avocado",
  components: {
    DeveloperInfo,
    AboutApp,
    SubscriptionInfo,
    Subscription,
  },
  computed: {
    ...mapState(["avocadoBonuses", "premium", "preloaderActive", "authorized"]),
  },
};
</script>

<style lang="scss">
.avocado {
  .subscribtion-info {
    &__text {
      font-size: 1.75rem;
      margin-bottom: 2rem;
    }

    .bonuses {
      display: grid;
      grid-template: auto / 1fr 1fr;
      &__list {
        display: grid;
        grid-template: 1fr / 1fr;
        grid-auto-rows: 1fr;
        row-gap: 0.5rem;
      }

      &__counter {
        margin-right: 1.2rem;
        margin-bottom: -0.15rem;
        color: var(--c-a-green);
        font-size: 4.81rem;
        font-weight: 700;
      }

      &__item {
        display: flex;
        align-items: center;
        font-size: 1.75rem;
      }

      &__images {
        position: relative;
        img {
          position: absolute;
          top: 53%;
          width: auto;
          height: 100%;

          &:first-child {
            left: 25%;
            transform: translate(-45%, -50%);
          }
          &:last-child {
            right: 25%;
            transform: translate(45%, -50%);
          }
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .avocado {
    .subscribtion-info {
      &__text {
        font-size: 1.75rem;
        margin-bottom: 2rem;
      }

      .bonuses {
        display: grid;
        grid-template: 1fr / 1fr;
        position: relative;

        &__list {
          counter-reset: item;
        }

        &__text-container {
          z-index: 2;
        }

        &__item {
          font-size: 2rem;
          margin-bottom: 2rem;
          margin-left: 3.5rem;
        }

        &__images {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.2;
          z-index: 1;

          img {
            position: absolute;
            top: 50%;
            width: auto;
            height: 100%;
            transform-origin: center bottom;

            &:first-child {
              right: 0;
              left: unset;
              transform: translate(-40%, -40%) scale(1.12);
            }
            &:last-child {
              right: 0;
              transform: translate(0%, -40%) scale(1.02);
            }
          }
        }
      }
    }
  }
}
</style>