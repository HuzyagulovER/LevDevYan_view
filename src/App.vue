<template>
  <TheHeader />
  <main class="main" role="main" v-if="!technical_support">
    <div
      class="main__button-container"
      v-if="
        (!authorized || (authorized && !premium?.typePremium)) &&
        page !== 'SignIn' &&
        authorized !== undefined
      "
    >
      <p
        class="main__button"
        @click.prevent="scrollToPremiums"
        v-if="authorized"
      >
        Оформить подписку
      </p>
      <RouterLink to="/signin" class="main__button" v-if="!authorized">
        Войти в профиль
      </RouterLink>
    </div>
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
  <TechnicalSupport v-else />

  <TheFooter />

  <TransitionGroup name="fade">
    <Preloader v-if="!isReturned || preloaderActive" />
  </TransitionGroup>
</template>


<script>
import { mapState } from "vuex";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import Preloader from "./components/Preloader.vue";
import TechnicalSupport from "./components/TechnicalSupport.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    Preloader,
    TechnicalSupport,
  },
  data() {
    return {
      isReturned: false,
      from: "",
    };
  },
  computed: {
    ...mapState([
      "page",
      "user",
      "authorized",
      "gAuth",
      "preloaderActive",
      "premiums",
      "premium",
      "screenType",
      "isMyProd",
      "technical_support",
    ]),
    pages() {
      let pages = [];
      this.$router.getRoutes().forEach((p) => {
        if (p.name !== "home") {
          pages.push(p.name);
        }
      });

      return pages;
    },
  },
  inject: ["Vue3GoogleOauth"],
  methods: {
    setStorePage() {
      this.$store.commit("SET_PAGE", this.$route.name);
    },
    updatePremiums() {
      this.$store.commit("SET_PREMIUMS", this.user["typePremium"]);
    },
    scrollToPremiums() {
      const html = document.querySelector("html");
      const el = document.querySelector("#subscription");

      const fz = parseInt(window.getComputedStyle(html).fontSize);
      const pos = el.getBoundingClientRect().top;
      const scroll = html.scrollTop;
      let obj = {};
      if (this.screenType === "mobile") {
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
  async created() {
    this.setStorePage();
    if (!this.isMyProd) {
      this.$store.dispatch("getPrice");
    } else {
      this.isReturned = true;
    }

    if (this.technical_support) {
      await axios.get("https://api.ipify.org?format=json").then((r) => {
        if (r.data.ip === "92.248.212.135")
          this.$store.state.technical_support = false;
      });
    }
  },
  mounted() {
    if (window.screen.width <= 600) {
      document.querySelector("#app").classList.add("mobile");
      this.$store.commit("SET_SCREEN_TYPE", "mobile");
    }
    window.addEventListener("resize", () => {
      if (window.screen.width <= 600) {
        document.querySelector("#app").classList.add("mobile");
        this.$store.commit("SET_SCREEN_TYPE", "mobile");
      } else {
        document.querySelector("#app").classList.remove("mobile");
        this.$store.commit("SET_SCREEN_TYPE", "desktop");
      }
    });
  },

  watch: {
    $route(to, from) {
      this.from = from.name;
      this.setStorePage();
      if (from.name === "SignIn") {
        this.updatePremiums();
      }
      this.$store.commit("SET_PREMIUM");
    },
    page() {
      document.body.classList = this.page?.toLowerCase();
    },
    premiums: {
      deep: true,
      handler() {
        this.$store.commit("SET_PREMIUM");
      },
    },
    Vue3GoogleOauth: {
      deep: true,
      handler() {
        if (this.Vue3GoogleOauth.isReturned) {
          if (this.Vue3GoogleOauth.isInit) {
            if (this.Vue3GoogleOauth.isAuthorized) {
              const token =
                this.Vue3GoogleOauth.instance.currentUser.wb.getAuthResponse()
                  .access_token;

              const tokenObj = { gToken: token };

              this.$store.dispatch("signIn", tokenObj);
            } else {
              this.$store.commit("SET_AUTHORIZED", false);
            }
          } else {
            console.error("There'is error with Vue3GoogleOauth!");
          }

          if (!this.isReturned) {
            this.isReturned = true;
          }
          this.$store.commit("SET_GAUTH", {
            isInit: this.Vue3GoogleOauth.isInit,
            isAuthorized: this.Vue3GoogleOauth.isAuthorized,
            isReturned: this.Vue3GoogleOauth.isReturned,
          });
        }
      },
    },
    //  isReturned() {
    //    if (this.isReturned) {
    //      const token = this.$cookies.get("session_token");
    //      if (token) {
    //        const session = {
    //          session_token: token,
    //        };
    //        this.$store.dispatch("signIn", session);
    //      } else {
    //        this.$store.commit("SET_AUTHORIZED", false);
    //      }
    //    }
    //  },
    authorized() {
      if (this.$route.name === "SignIn" && this.authorized) {
        if (this.from === "Avocado" || this.from === "PSY") {
          this.$router.push({ name: this.from });
        } else {
          this.$router.push({ name: "PSY" });
        }
      }

      if (!this.authorized) {
        const token = this.$cookies.get("session_token");
        if (token) {
          const session = {
            session_token: token,
          };
          this.$store.dispatch("signIn", session);
        } else {
          this.$store.commit("SET_AUTHORIZED", false);
        }
      }
    },
    user: {
      deep: true,
      handler() {
        this.updatePremiums();
      },
    },
  },
};
</script>

<style lang="scss">
@import url("assets/css/base.css");
@font-face {
  font-family: "Mazzard";
  src: url("assets/fonts/MazzardBold.woff");
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: "Mazzard";
  src: url("assets/fonts/MazzardMedium.woff");
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: "Mazzard";
  src: url("assets/fonts/MazzardLight.woff");
  font-weight: 300;
  font-display: swap;
}

html {
  font: {
    family: "Mazzard";
    size: calc(100vw / 100);
    weight: 300;
  }
}

html,
body {
  /* Scrollbar style for Firefox */
  scrollbar-width: thin;

  /* Scrollbar style for Chrome/Edge/Safari */
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
  }
}

input,
button {
  font-family: inherit;
}

img {
  user-select: none;
  pointer-events: none;
}

a,
span,
p li {
  transition: color 0.3s ease;
}

#app {
  display: flex;
  justify-content: center;
  transition: background-color 0.5s ease;
  flex-direction: column;

  .wrapper {
    height: 100%;
  }
}

header.header,
section,
footer.footer {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}

header.header {
  z-index: 2;
  .container {
    max-width: var(--wrapper-max-width);
    width: var(--wrapper-max-width);
  }
}

section,
footer.footer {
  $padding: 6rem;
  padding-left: $padding !important;
  padding-right: $padding !important;
  & > .container {
    //  max-width: calc(var(--container-max-width) + 6rem);
    max-width: var(--container-max-width);

    width: 100%;
  }
}

$divLineThickness: 0.13rem;

header.header,
section:not(:last-child) {
  position: relative;
  margin-bottom: $divLineThickness;
  &::after {
    content: "";
    height: $divLineThickness;
    width: 100vw;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
  }
}

footer.footer {
  position: relative;
  margin-bottom: $divLineThickness;
  &::after {
    content: "";
    height: $divLineThickness;
    width: 100vw;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 0);
  }
}

main.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main__button-container {
    display: none;
  }
}

section {
  padding: 4.3rem 0;
  width: 100%;
  height: 100%;
  flex-grow: 1;

  .title {
    font-weight: 700;
    font-size: 3.31rem;
    line-height: 3.94rem;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
}

.bold {
  font-weight: 700 !important;
}
.medium {
  font-weight: 500 !important;
}
.grey {
  color: var(--c-grey) !important;
}
.center {
  text-align: center;
}

@media (min-width: 1600px) {
  html {
    font: {
      size: 16px;
    }
  }
}
@media screen and (max-width: 600px) {
  html {
    font-size: 2vw;
  }
  main.main {
    margin-top: var(--mobile-header-height);

    .main__button-container {
      display: flex;
      padding-top: 4.3rem;
      width: 100%;
      justify-content: center;
    }
    .main__button {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 6rem;
      width: 70%;

      font-size: 2.5rem;
      font-weight: 700;
      line-height: 2.5rem;

      border-width: 0.3rem;
      border-color: var(--c-a-green);
      border-style: solid;
      border-radius: 3rem;

      text-decoration: none;
    }
  }

  .avocado {
    main.main {
      .main__button {
        border-color: var(--c-a-green);
      }
    }
  }
  .psy {
    main.main {
      .main__button {
        border-color: var(--c-p-yellow);
      }
    }
  }
  section,
  footer.footer {
    $padding: 3rem;
    padding-left: $padding !important;
    padding-right: $padding !important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

//* colors

body.avocado {
  scrollbar-color: var(--c-a-green) transparent;

  &::-webkit-scrollbar-thumb {
    background-color: var(--c-a-green);
  }

  p,
  a {
    color: var(--c-black);
  }

  #app {
    background-color: var(--c-white);
  }

  header.header,
  section,
  footer.footer {
    &::after {
      background-color: var(--c-a-green);
    }

    .colored {
      color: var(--c-a-green) !important;
    }
  }

  section {
    .title {
      color: var(--c-black);
    }
  }

  .border-colored {
    border: var(--b-w) solid var(--c-a-green);
  }
  .shadowed {
    box-shadow: 0 0 1.5rem 0 var(--shadow-c-a);
  }
}
body.psy,
body.signin {
  scrollbar-color: var(--c-p-yellow) var(--c-p-blue);

  &::-webkit-scrollbar-thumb {
    background-color: var(--c-p-yellow);
  }
  &::-webkit-scrollbar-track {
    background-color: var(--c-p-blue);
  }

  p,
  a {
    color: var(--c-white);
  }

  #app {
    background-color: var(--c-p-blue);
  }

  header.header,
  section,
  footer.footer {
    &::after {
      background-color: var(--c-p-yellow);
    }

    .colored {
      color: var(--c-p-yellow) !important;
    }
  }

  section {
    .title {
      color: var(--c-white);
    }
  }

  .border-colored {
    border: var(--b-w) solid var(--c-p-yellow);
  }
  .shadowed {
    box-shadow: 0 0 1.5rem 0 var(--shadow-c-p);
  }
}
</style>
