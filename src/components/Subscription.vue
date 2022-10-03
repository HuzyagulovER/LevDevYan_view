<template>
  <section class="subscription" id="subscription">
    <div class="subscription__container container">
      <p class="subscription__text colored bold center">
        Подписка влючается автоматически после оплаты.
      </p>
      <p class="subscription__text center grey">
        Оплата подписки - единоразовая. Без автопродления
      </p>
      <div class="subscription__premiums premiums">
        <div
          class="premiums__premium premium"
          v-for="price_item in price"
          :key="price_item.name"
        >
          <div class="premium__container">
            <p class="premium__title bold">{{ price_item.name }}</p>
            <p class="premium__text bold">
              {{ price_item.text_1 ? price_item.text_1 : "" }}
            </p>
            <p class="premium__text_grey">
              {{ price_item.text_2 ? price_item.text_2 : "" }}
            </p>
          </div>
          <div class="premium__container">
            <div class="premium__price-container">
              <p class="premium__price bold">
                {{ price_item.price }} <span>₽</span>
              </p>
              <p
                class="premium__per-month"
                v-if="price_item.price_per_month != 0"
              >
                {{ price_item.price_per_month }} <span>₽</span>/мес
              </p>
            </div>
            <div
              class="premium__button bold"
              @click="buySubscription(price_item.id)"
            >
              <p>Оплатить</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Subcription",
  computed: {
    ...mapState(["prices", "page"]),
    price() {
      return this.prices[`${this.page.toLowerCase()}`];
    },
  },
  methods: {
    buySubscription(id) {
      this.$store.commit("CHANGE_PRELOADER_ACTIVE", true);
      this.$store.dispatch("buySubscription", {
        id: id,
        page: this.page,
      });
    },
  },
};
</script>

<style lang="scss">
.subscription {
  p {
    font-size: 1.75rem;
  }

  &__text {
    margin-bottom: 2.5rem;
    color: var(--c-grey);
    &:first-child {
      margin-bottom: 1.5rem;
    }
  }

  .premiums {
    display: grid;
    grid-template: 1fr / repeat(3, 1fr);
    column-gap: 4rem;
    row-gap: 2rem;
    grid-column-gap: 4rem;
    grid-row-gap: 2rem;
    .premium {
      padding: 1.3rem 2rem;
      border-width: var(--b-w);
      border-style: solid;
      border-radius: 1.5rem;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.01);
      }

      &:last-child {
        grid-column: 1/4;
      }

      &__container {
        display: flex;
        &:first-child {
          flex-direction: column;
          flex: 1;
        }
        &:last-child {
          flex-direction: row;
          justify-content: space-between;
        }
      }

      &__title {
        margin-bottom: 0.3rem;
      }

      &__text {
        font-size: 1.44rem;
        line-height: 1.44rem;
        height: 1.44rem;
        &_grey {
          font-size: 1.44rem;
          line-height: 1.44rem;
          height: 1.44rem;
          margin-top: 0.2rem;
          margin-bottom: 1.3rem;
          color: var(--c-grey);
        }
      }

      &__price-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }

      &__price {
        span {
          font-family: Verdana;
          font-weight: 600;
          font-size: 1.6rem;
        }
      }

      &__per-month {
        font-size: 1.1rem;
        color: var(--c-grey);
        span {
          font-family: Verdana;
          font-weight: 300;
          font-size: 1rem;
        }
      }

      &__button {
        align-self: flex-start;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 0.8rem;
        border-radius: 1.1rem;
        cursor: pointer;
      }
    }
  }
}

.avocado {
  .subscription {
    .premiums {
      .premium {
        border-color: var(--c-a-green);
        box-shadow: 0 0 1.5rem 0 var(--shadow-c-a);

        &:hover {
          box-shadow: 0 0 2.5rem 0 var(--shadow-c-a);
        }

        &__title {
          color: var(--c-a-green);
        }

        &__text {
          color: var(--c-black);
        }

        &__price {
          color: var(--c-a-green);
        }

        &__button {
          background-color: var(--c-a-green);
          color: var(--c-black);
          box-shadow: 0 0 1.5rem 0 var(--shadow-c-a);

          p {
            color: var(--c-white);
          }

          &:hover {
            box-shadow: 0 0 1.8rem 0 var(--shadow-c-a);
          }
        }
      }
    }
  }
}
.psy {
  .subscription {
    .premiums {
      .premium {
        border-color: var(--c-p-yellow);
        box-shadow: 0 0 1.5rem 0 var(--shadow-c-p);

        &:hover {
          box-shadow: 0 0 2.5rem 0 var(--shadow-c-p);
        }

        &__title {
          color: var(--c-p-yellow);
        }

        &__text {
          color: var(--c-white);
        }

        &__price {
          color: var(--c-p-yellow);
        }

        &__button {
          background-color: var(--c-p-yellow);
          box-shadow: 0 0 1.5rem 0 var(--shadow-c-p);

          p {
            color: var(--c-black);
          }

          &:hover {
            box-shadow: 0 0 1.8rem 0 var(--shadow-c-p);
          }
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .subscription {
    p {
      font-size: 2.4rem;
    }

    .premiums {
      grid-template: 1fr / 1fr;
      padding: 1rem 2rem;

      .premium {
        padding: 2.2rem 2.8rem;

        &:last-child {
          grid-column: 1/2;
        }

        &__title {
          font-size: 2.6rem;
          margin-bottom: 0.7rem;
        }

        &__text {
          font-size: 1.8rem;
          line-height: 1.8rem;
          height: 1.8rem;
          margin-bottom: 0.3rem;

          &_grey {
            font-size: 1.8rem;
            line-height: 1.8rem;
            height: 1.8rem;
            margin-bottom: 1.6rem;
          }
        }

        &__price {
          font-size: 2.7rem;
          span {
            font-size: 2.4rem;
          }
        }

        &__per-month {
          font-size: 1.4rem;
          span {
            font-size: 1.3rem;
          }
        }

        &__button {
          padding: 0.7rem 1.2rem;
          border-radius: 1.3rem;
        }
      }
    }
  }
}
</style>