<template>
  <header class="header">
    <div class="header__container container">
      <div class="header__logo">
        <RouterLink to="/psy">
          <span>LEV<span class="colored">DEV</span>YAN</span>
          <span>lev<span class="colored">dev</span>yan</span>
        </RouterLink>
      </div>

      <div
        class="header__pages-toggler pages-toggler"
        v-if="page?.toLowerCase() !== 'signin'"
      >
        <label for="psy" class="pages-toggler__label" @click="toggle('PSY')">
          <div class="pages-toggler__container">
            <input
              type="radio"
              name="page"
              id="psy"
              value="PSY"
              v-model="tpage"
              class="pages-toggler__input"
            />
            <div class="pages-toggler__radio"></div>
          </div>

          <img
            :src="'./images/psy/ImageLogo.jpg'"
            alt=""
            width="67"
            height="67"
            class="pages-toggler__image"
            :class="{ shadowed: page === 'PSY' }"
          />
        </label>
        <label
          for="avocado"
          class="pages-toggler__label"
          @click="toggle('Avocado')"
        >
          <div class="pages-toggler__container">
            <input
              type="radio"
              name="page"
              id="avocado"
              value="Avocado"
              v-model="tpage"
              class="pages-toggler__input"
            />
            <div class="pages-toggler__radio"></div>
          </div>

          <img
            :src="'./images/avocado/ImageLogo.jpg'"
            alt=""
            width="67"
            height="67"
            class="pages-toggler__image"
            :class="{ shadowed: page === 'Avocado' }"
          />
        </label>
      </div>

      <div class="header__account account" v-if="authorized !== undefined">
        <div class="account__container">
          <p
            class="account__button buy"
            v-if="authorized && !premium"
            @click.prevent="scrollToPremiums"
          >
            Оформить подписку
          </p>
          <p class="account__subscription" v-if="authorized && premium">
            Подписка оформлена
            <span v-if="premium.typePremium !== 'forever'">на</span>
            {{ premium.subscriptionDurationText }} <br />Срок действия
            <span v-if="premium.typePremium === 'forever'">неограничен</span>
            <span v-else>до {{ premiumEndDate }}</span>
          </p>
          <p
            class="account__email"
            :class="{ center: !premium }"
            v-if="authorized"
          >
            {{ user.email }}
          </p>
          <RouterLink to="/signin" v-else class="account__button">
            <p>Войти в профиль</p>
          </RouterLink>
        </div>
        <div
          class="account__container"
          :class="{ hidden: menuActive }"
          v-if="authorized"
        >
          <img
            :src="
              user.photo
                ? user.photo
                : './images/avatars/avatar__user_default.png'
            "
            alt="Avatar"
            width="79"
            height="79"
            class="account__avatar"
          />
          <div
            class="account__logout"
            v-if="screenType === 'desktop'"
            @click="signOut"
          >
            <p>Выйти</p>
          </div>
          <p
            class="account__email center"
            v-if="authorized && screenType === 'mobile'"
          >
            {{ user.email }}
          </p>
        </div>
      </div>
      <div
        class="header__burger burger"
        :class="{ active: menuActive }"
        @click="menuActivation"
      >
        <div class="burger__line"></div>
        <div class="burger__line"></div>
        <div class="burger__line"></div>
      </div>
    </div>
    <div class="mobile-header" :class="{ active: menuActive }">
      <div class="mobile-header__pages-toggler pages-toggler">
        <label for="psy2" class="pages-toggler__label" @click="toggle('PSY')">
          <div class="pages-toggler__container">
            <input
              type="radio"
              name="page2"
              id="psy2"
              value="PSY"
              v-model="tpage"
              class="pages-toggler__input"
            />
            <div class="pages-toggler__radio"></div>
          </div>

          <img
            :src="'./images/psy/ImageLogo.jpg'"
            alt=""
            width="67"
            height="67"
            class="pages-toggler__image"
            :class="{ shadowed: page === 'PSY' }"
          />
        </label>
        <label
          for="avocado2"
          class="pages-toggler__label"
          @click="toggle('Avocado')"
        >
          <div class="pages-toggler__container">
            <input
              type="radio"
              name="page2"
              id="avocado2"
              value="Avocado"
              v-model="tpage"
              class="pages-toggler__input"
            />
            <div class="pages-toggler__radio"></div>
          </div>

          <img
            :src="'./images/avocado/ImageLogo.jpg'"
            alt=""
            width="67"
            height="67"
            class="pages-toggler__image"
            :class="{ shadowed: page === 'Avocado' }"
          />
        </label>
      </div>
      <div class="mobile-header__account mobile-account">
        <div
          class="mobile-account__container"
          :class="{ authorized: authorized }"
        >
          <p
            class="mobile-account__button buy"
            v-if="authorized && !premium"
            @click.prevent="scrollToPremiums"
          >
            Оформить подписку
          </p>
          <p class="mobile-account__subscription" v-if="authorized && premium">
            Подписка оформлена
            <span v-if="premium.typePremium !== 'forever'">на</span>
            {{ premium.subscriptionDurationText }} <br />Срок действия
            <span v-if="premium.typePremium === 'forever'">неограничен</span>
            <span v-else>до {{ premiumEndDate }}</span>
          </p>
          <p
            class="mobile-account__email"
            :class="{ center: !premium }"
            v-if="authorized"
          >
            {{ user.email }}
          </p>
          <RouterLink to="/signin" v-else class="mobile-account__button">
            <p>Войти в профиль</p>
          </RouterLink>
        </div>
        <div class="mobile-account__container" v-if="authorized">
          <img
            :src="
              user.photo !== ''
                ? user.photo
                : './images/avatars/avatar__user_default.png'
            "
            alt="Avatar"
            width="79"
            height="79"
            class="mobile-account__avatar"
          />
          <div class="mobile-account__logout" @click="signOut">
            <p>Выйти</p>
          </div>
        </div>
      </div>
      <Sphere style="top: 30%; left: 103%" />
      <Sphere style="top: 100%; left: 30%" />
    </div>
  </header>
</template>

<script>
// const $cookie = require("vue-cookies");
import { mapState } from "vuex";
import Sphere from "../components/Sphere.vue";
export default {
  name: "Header",
  components: {
    Sphere,
  },
  data() {
    return {
      tpage: "",
      showDim: true,
      menuActive: false,
    };
  },
  computed: {
    ...mapState([
      "page",
      "authorized",
      "user",
      "premiums",
      "screenType",
      "gAuth",
    ]),
    premium() {
      return this.premiums[this.page.toLowerCase()];
    },
    premiumEndDate() {
      try {
        let d = new Date(
          (+this.premium.payDate + +this.premium.subscriptionDuration) * 1000
        );

        return (
          ("0" + d.getDate()).slice(-2) +
          "." +
          ("0" + (d.getMonth() + 1)).slice(-2) +
          "." +
          d.getFullYear()
        );
      } catch (error) {
        return error;
      }
    },
  },
  inject: ["Vue3GoogleOauth"],
  methods: {
    toggle(name) {
      this.$router.push({ name: name });
    },
    async signOut() {
      if (this.authorized) {
        this.$store.dispatch("signOut");
        if (this.gAuth) {
          try {
            await this.$gAuth.signOut();
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    scrollToPremiums() {
      const html = document.querySelector("html");
      const el = document.querySelector("#subscription");

      const fz = parseInt(window.getComputedStyle(html).fontSize);
      const pos = el.getBoundingClientRect().top;
      const scroll = html.scrollTop;
      let obj = {};
      if (this.screenType === "mobile") {
        this.menuActivation();
        obj = { top: scroll + pos - fz * 8.5, behavior: "smooth" };
      } else {
        obj = { top: scroll + pos, behavior: "smooth" };
      }
      window.scrollTo(obj);
    },
    menuActivation(ev) {
      if (ev === "off") {
        this.menuActive = false;
        document.querySelector("html").style.overflow = "";
      } else if (ev === "on") {
        this.menuActive = true;
        document.querySelector("html").style.overflow = "hidden";
      } else {
        this.menuActive = !this.menuActive;
        if (document.querySelector("html").style.overflow) {
          document.querySelector("html").style.overflow = "";
        } else {
          document.querySelector("html").style.overflow = "hidden";
        }
      }
    },
  },
  mounted() {},
  watch: {
    page() {
      this.tpage = this.page;
      if (this.screenType === "mobile") {
        setTimeout(() => {
          this.menuActivation("off");
        }, 300);
      }
    },
    screenType() {
      if (this.screenType === "desktop" && this.menuActive) {
        this.menuActive = false;
      }
    },
  },
};
</script>

<style lang="scss">
.header {
  padding: 2rem 3.88rem;

  &__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 4.38rem;
    position: relative;
  }

  &__logo {
    font-weight: 700;
    font-size: 2.125rem;

    * {
      color: inherit;
    }
    a {
      cursor: pointer;
      text-decoration: none;

      & > span:last-child {
        display: none;
      }
    }
  }

  .pages-toggler {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &__container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.5rem;
    }

    &__label {
      display: flex;
      flex-direction: row;
      cursor: pointer;
      &:first-child {
        margin-right: 0.8rem;
      }
    }

    &__input {
      visibility: hidden;
      position: absolute;
    }

    &__input:checked + .pages-toggler__radio {
      &::after {
        width: 70%;
        height: 70%;
      }
    }

    &__radio {
      width: 1rem;
      height: 1rem;
      position: relative;
      border-radius: 50%;
      border-width: 0.1rem;
      border-style: solid;
      border-color: var(--c-a-green);

      &::after {
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        transition: all 0.3s ease;
        background-color: var(--c-a-green);
      }
    }

    &__image {
      width: 4.19rem;
      height: 4.19rem;
      border-radius: 24%;
    }
  }

  .account {
    display: flex;

    &__container {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      transition: opacity 0.3s ease;

      &.hidden {
        opacity: 0;
      }

      &:first-child {
        margin-right: 2.38rem;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.7rem 1.2rem;
      border-radius: 2rem;
      border-width: var(--b-w);
      border-style: solid;
      font-weight: 700;
      font-size: 1.56rem;
      cursor: pointer;
      text-decoration: none;
      text-align: center;

      &.buy {
        margin-bottom: 0.5rem;
        color: inherit;
      }
    }

    &__subscription {
      text-align: right;
      color: var(--c-grey);
      font-weight: 700;
      font-size: 1.19rem;
      margin-bottom: 1rem;

      span {
        text-transform: lowercase;
      }
    }

    &__email {
      font-size: 1.4rem;
      line-height: 1.4rem;
      text-align: right;

      &.center {
        text-align: center;
      }
    }

    &__avatar {
      width: 4.6rem;
      height: 4.6rem;
      margin-bottom: 0.3rem;
      border-radius: 50%;
    }

    &__logout {
      font-size: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      color: var(--c-grey);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .burger {
    display: none;
  }
}
.mobile-header {
  display: none;
}
.avocado {
  .header {
    border-bottom-color: var(--c-a-green);

    &__logo {
      color: var(--c-black);
    }

    .pages-toggler {
      &__radio {
        border-color: var(--c-a-green);

        &::after {
          background-color: var(--c-a-green);
        }
      }
    }

    .account {
      &__email {
        color: var(--c-black);
      }

      &__button {
        border-color: var(--c-a-green);

        &.buy {
          box-shadow: 0 0 1.5rem 0 var(--shadow-c-a);
        }
      }
    }
  }
}
.psy,
.signin {
  .header {
    border-bottom-color: var(--c-p-yellow);

    &__logo {
      color: var(--c-white);
    }

    .pages-toggler {
      &__radio {
        border-color: var(--c-p-yellow);

        &::after {
          background-color: var(--c-p-yellow);
        }
      }
    }

    .account {
      &__email {
        color: var(--c-white);
      }
      &__button {
        border-color: var(--c-p-yellow);

        &.buy {
          box-shadow: 0 0 1rem 0 var(--shadow-c-p);
          color: var(--c-white);
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .header {
    padding: 2rem 3.88rem 2rem 3rem;
    position: fixed !important;
    top: 0;
    left: 0;
    height: var(--mobile-header-height);
    width: 100%;

    &__container {
      z-index: 9;
      justify-content: center;
    }

    &__logo {
      font-variant: small-caps;
      margin-left: 0.88rem;
      a {
        text-decoration: none;

        & > span:first-child {
          display: none;
        }
        & > span:last-child {
          display: inline;
          font-size: 4rem;
        }
      }
    }

    .pages-toggler {
      display: none;
    }

    .account {
      display: flex;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      max-width: 10rem;

      &__container {
        &:first-child {
          display: none;
        }
        align-items: center;
      }

      &__email {
        font-size: 1rem;
        line-height: 1rem;
        text-align: center;
      }

      &__avatar {
        width: 4rem;
        height: 4rem;
      }
    }

    .burger {
      display: flex;
      flex-direction: column;
      position: absolute;
      right: 0;
      top: 50%;
      height: auto;
      width: 3.3rem;
      transform: translateY(-50%);
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-50%) scale(1.1);
      }

      &__line {
        width: 100%;
        height: 0.4rem;
        transition: all 0.3s ease;
        transform-origin: center center;

        &:not(:last-child) {
          margin-bottom: 0.5rem;
        }

        &:first-child {
          transform-origin: 0.38rem 50%;
        }
        &:last-child {
          transform-origin: 0.38rem 50%;
        }
      }

      &.active {
        .burger__line {
          transform: scaleX(0);

          &:first-child {
            transform: translate(13%) rotate(45deg);
          }
          &:last-child {
            transform: translate(13%) rotate(-45deg);
          }
        }
      }
    }
  }

  .mobile-header {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: -100%;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-color: var(--c-p-blue);
    opacity: 0;
    transition: all 1s ease;
    overflow: hidden;

    .pages-toggler {
      display: flex;
      position: relative;
      top: unset;
      left: unset;
      transform: unset;

      &__label {
        &:first-child {
          margin-right: 3.5rem;
        }
      }

      &__image {
        width: 9rem;
        height: 9rem;
      }

      &__radio {
        width: 2rem;
        height: 2rem;
      }
    }

    .mobile-account {
      display: flex;
      flex-direction: column;
      margin-bottom: 6rem;

      &__container {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-end;

        &:first-child {
          margin-right: 0;

          &.authorized {
            margin-bottom: 6rem;
          }
        }
      }

      &__avatar {
        width: 8rem;
        height: 8rem;
        margin-bottom: 1.5rem;
      }

      &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        cursor: pointer;
        text-decoration: none;
        text-align: center;

        border-style: solid;
        border-width: calc(var(--b-w) + 0.1rem);

        padding: 1rem 2rem;
        border-radius: 3.5rem;
        font-size: 3rem;

        &.buy {
          margin-bottom: 1rem;
        }
      }

      &__email {
        font-size: 2rem;
      }

      &__logout {
        font-size: 2rem;
      }

      &__subscription {
        text-align: center;
        color: var(--c-grey);
        font-weight: 700;
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }

    &.active {
      left: 0;
      opacity: 1;
    }
  }

  .avocado {
    .mobile-header {
      background-color: var(--c-white);

      .mobile-account {
        &__button {
          border-color: var(--c-a-green);
        }
      }

      .burger {
        &__line {
          background-color: var(--c-a-green);
        }
      }
    }
    .header {
      background-color: var(--c-white);

      .burger {
        &__line {
          background-color: var(--c-a-green);
        }
      }
    }
    .sphere {
      opacity: 0;
    }
  }

  .psy,
  .signin {
    .mobile-header {
      background-color: var(--c-p-blue);
      .mobile-account {
        &__button {
          border-color: var(--c-p-yellow);
        }
      }
    }
    .header {
      background-color: var(--c-p-blue);
      .burger {
        &__line {
          background-color: var(--c-p-yellow);
        }
      }
    }
  }
}
</style>