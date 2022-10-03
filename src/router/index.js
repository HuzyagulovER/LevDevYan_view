import { createRouter, createWebHistory } from 'vue-router'
import Avocado from "../views/Avocado.vue";
import Psy from "../views/PSY.vue";
import SignIn from "../views/SignIn.vue";
import store from "../store/index";

const routes = [
	{
		path: '/',
		name: 'home',
		redirect: {
			name: 'PSY'
		}
	},
	{
		path: "/avocado",
		name: "Avocado",
		component: Avocado
	},
	{
		path: "/psy",
		name: "PSY",
		component: Psy
	},
	{
		path: '/signin',
		name: "SignIn",
		component: SignIn,
		beforeEnter: (to, from, next) => {
			if (!store.state.authorized) {
				next()
			} else {
				next({ name: 'PSY' })
			}
		}
	},
	{
		path: "/:catchAll(.*)",
		name: "NotFound",
		redirect: {
			name: 'PSY'
		}
	}
]


const router = createRouter({
	// history: createWebHistory('/'),
	history: createWebHistory('/examples/_Avocado&PSY/'),
	scrollBehavior: function (to, from, savedPosition) {
		if (to.hash) {
			return { el: to.hash, behavior: 'smooth', }
		} else if (savedPosition) {
			return savedPosition
		} else {
			return { left: 0, top: 0 }
		}
	},
	routes
})

export default router