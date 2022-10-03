import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GAuth from 'vue3-google-oauth2'
import axios from 'axios'
import VueAxios from 'vue-axios'

const gAuthOptions = {
	clientId: '759617398160-t9jkueuah4kfsue9o79kqocitd104i5g.apps.googleusercontent.com',  // edprod
	// clientId: '759617398160-t9jkueuah4kfsue9o79kqocitd104i5g.apps.googleusercontent.com',  // localhost
	// clientId: '759617398160-t9fur3rqfah6vhlvnp2dp2p57r95fdsn.apps.googleusercontent.com',  // openserver
	// clientId: '49071153476-r0lc4lc3aoqk2ds78puv8ir44go2bh3c.apps.googleusercontent.com',  // levdevyan
	scope: 'email',
	prompt: 'consent',
	plugin_name: "chat",
}

const app = createApp(App)

app.use(store)
app.use(router)
app.use(GAuth, gAuthOptions)
app.use(VueAxios, axios)
app.use(require('vue-cookies'))
app.mount('#app')
