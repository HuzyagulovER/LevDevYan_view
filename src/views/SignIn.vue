<template>
  <section class="sing-in">
    <div class="sing-in__container container">
      <div class="sing-in__wrapper">
        <div
          class="sing-in__google border-colored shadowed"
          :class="{ disabled: !gAuth.isInit }"
          @click="googleSignIn"
        >
          <svg
            width="24"
            height="24"
            viewBox="-2 -2 24 24"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin"
          >
            <path
              d="M4.376 8.068A5.944 5.944 0 0 0 4.056 10c0 .734.132 1.437.376 2.086a5.946 5.946 0 0 0 8.57 3.045h.001a5.96 5.96 0 0 0 2.564-3.043H10.22V8.132h9.605a10.019 10.019 0 0 1-.044 3.956 9.998 9.998 0 0 1-3.52 5.71A9.958 9.958 0 0 1 10 20 9.998 9.998 0 0 1 1.118 5.401 9.998 9.998 0 0 1 10 0c2.426 0 4.651.864 6.383 2.302l-3.24 2.652a5.948 5.948 0 0 0-8.767 3.114z"
            />
          </svg>
          <p>Продолжить через Google</p>
        </div>
        <form action="" class="sing-in__form form" @submit.prevent="signIn">
          <div class="form__errors errors">
            <p
              v-if="
                authorizationErrorStatus === 'WRONG_PASSWORD' ||
                authorizationErrorStatus === 'GOOGLE_USER'
              "
            >
              Неверный пароль
            </p>
            <p v-if="authorizationErrorStatus === 'USER_IS_NOT_EXIST'">
              Пользователь с таким логином не найден
            </p>
            <p v-if="authorizationErrorStatus === 'GOOGLE_USER'">
              Попробуйте авторизоваться через Google
            </p>
          </div>
          <input
            class="form__input border-colored shadowed"
            :class="{
              _error:
                authorizationErrorStatus === 'USER_IS_NOT_EXIST' ||
                authorizationErrorStatus === 'GOOGLE_USER',
            }"
            type="email"
            name="login"
            id="login"
            placeholder="Email"
            v-model="email"
          />
          <input
            class="form__input border-colored shadowed"
            :class="{
              _error:
                authorizationErrorStatus === 'WRONG_PASSWORD' ||
                authorizationErrorStatus === 'GOOGLE_USER',
            }"
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            v-model="password"
          />
          <button class="form__button shadowed bold" type="submit">
            Войти в профиль
          </button>
          <p class="form__policy">
            Продолжая использовать Google или Email, вы соглашаетесь с
            <a :href="links.terms_of_use">Условиями использования</a>
            и <a :href="links.policy">Политикой конфиденциальности</a> сайта.
          </p>
        </form>
      </div>
    </div>
    <Sphere style="top: 90%; left: -7%" />
    <Sphere style="top: 40%; left: 107%" />
  </section>
</template>

<script>
import { mapState } from "vuex";
import Sphere from "../components/Sphere.vue";
export default {
  name: "SignIn",
  components: {
    Sphere,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  inject: ["Vue3GoogleOauth"],
  computed: {
    ...mapState(["gAuth", "links", "gAuth", "authorizationErrorStatus"]),
  },
  methods: {
    async googleSignIn() {
      try {
        const user = await this.$gAuth.signIn();
        if (!user) {
          return null;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    formCheck(data, type) {
      if (type === "email") {
        let regex = new RegExp(
          "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])" // eslint-disable-line
        );
        return regex.test(data);
      }

      if (type === "password") {
        return true;
      }
    },

    async signIn() {
      if (
        this.formCheck(this.email, "email") &&
        this.formCheck(this.password, "password")
      ) {
        const data = {
          email: this.email,
          password: this.password,
        };

        this.$store.dispatch("signIn", data);
      }
    },

    async signUp() {
      if (
        this.formCheck(this.email, "email") &&
        this.formCheck(this.password, "password")
      ) {
        const data = {
          email: this.email,
          password: this.password,
          name: "Eddd",
        };
        this.$store.dispatch("signUp", data);
      }
    },
  },
  watch: {
    gAuth: {
      deep: true,
      handler() {
        if (this.gAuth.isAuthorized) {
          this.$router.replace({ name: "PSY" });
        }
      },
    },
  },
};
</script>

<style lang="scss">
.sing-in {
  justify-content: center;
  align-items: center;
  .container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  &__wrapper {
    width: 34.1rem;
    max-width: 100%;
  }

  &__google {
    width: 100%;
    margin-bottom: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.disabled {
      p {
        color: var(--c-grey);
      }
      svg {
        fill: var(--c-grey);
      }
      border-color: var(--c-grey) !important;
      cursor: default;

      &,
      &:hover {
        box-shadow: unset !important;
      }
    }

    svg {
      height: 70%;
      width: auto;
      fill: var(--c-white);
      margin-right: 1rem;
    }
  }

  &__google,
  .form__input,
  .form__button {
    height: 4rem;
    border-radius: 2rem;
    font-size: 1.75rem;
  }

  &__google,
  .form__button {
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 0 2.5rem 0 var(--shadow-c-p) !important;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;

    .errors {
      p {
        color: red;
        text-align: center;
        font-size: 1.5rem;
      }
    }

    & > * {
      width: 100%;
      margin-bottom: 1rem;
    }

    &__input {
      background-color: transparent;
      padding: 0 2rem;
      color: var(--c-white);
      letter-spacing: 0.1rem;
      transition: all 0.3s ease;

      &::placeholder {
        font-weight: 300;
      }

      &._error {
        box-shadow: 0 0 2.5rem 0 red !important;
        border-color: red !important;
      }
    }

    &__button {
      background-color: var(--c-p-yellow);
      color: var(--c-black);
      border: 0;
      cursor: pointer;
    }

    &__policy {
      text-align: center;
      color: var(--c-grey);
      a {
        color: inherit;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .sing-in {
    &__google,
    .form__input,
    .form__button {
      height: 5rem;
      border-radius: 2.5rem;
      font-size: 1.9rem;
    }

    &__google {
      p {
        line-height: 1;
      }
    }

    &__wrapper {
      padding: 0 3rem;
      width: auto;
    }

    .form {
      display: flex;
      flex-direction: column;
      height: auto;
      width: 100%;

      &__button {
        font-size: 2.2rem;
      }

      &__policy {
        font-size: 1.4rem;
      }
    }
  }
}
</style>