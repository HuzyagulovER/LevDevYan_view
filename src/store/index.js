import { Store } from 'vuex'
import _ from 'lodash'
const $cookies = require('vue-cookies')
$cookies.config('30d')
import axios from 'axios';
// const path = ''
const path = '/examples/_Avocado&PSY'

const store = new Store({
	state: {
		technical_support: false,
		isMyProd: false,

		preloaderActive: false,
		screenType: 'desktop',
		gAuth: false,

		page: '',
		links: {
			telegram: {
				PSY: 'https://t.me/my_psy_app',
				Avocado: 'https://t.me/my_avocado_app'
			},
			policy: 'https://github.com/levkorol/doc/wiki/ПОЛИТИКА-КОНФИДЕНЦИАЛЬНОСТИ',
			terms_of_use: 'https://github.com/levkorol/doc/wiki/Условия-использования',
		},
		downloadLinks: {
			PSY: 'https://myapppsy.page.link/levdev',
			Avocado: 'https://harlion.page.link/site'
		},
		contactsData: {
			itn: 781626288637,
			psrnsp: '316784700336099',
			email: 'infolevdev@gmail.com'
		},

		defaultUser: {
			id: '',
			name: '',
			email: '',
			photo: '',
			typePremium: {}
		},

		user: {
			id: '',
			name: '',
			email: '',
			photo: '',
			typePremium: []
		},

		authorized: undefined,
		authorizationErrorStatus: '',

		premiums: {},
		premium: {},

		psyEgos: {
			child: {
				name: 'Ребенок',
				points: [
					{
						name: 'Фрирайтинг',
						text: 'Позволяет выплеснуть в текст всё, что тяготит ум'
					},
					{
						name: 'Дневник идей',
						text: 'Твой личный дневник креатива, который разовьёт в тебе умение нестандартно мыслить'
					},
					{
						name: 'Медитации',
						text: 'Помогают становится все более осознаннее в хаосе повседневной жизни'
					},
				]
			},
			adult: {
				name: 'Взрослый',
				points: [
					{
						name: 'Моя скорая помощь',
						text: 'Специальный список действий, который поможет тебе избавиться от апатии и депрессии'
					},
					{
						name: 'Действия любви к себе',
						text: 'Перечень шагов для того, чтобы повысить свою самооценку и почувствовать себя уверенно'
					},
				]
			},
			parent: {
				name: 'Родитель',
				points: [
					{
						name: 'Позитивные утверждения',
						text: 'Позитивные установки, которые помогут тебе замечать больше хорошего вокруг и сделают тебя более радостным и уверенным человеком'
					},
					{
						name: 'Правила жизни',
						text: 'Определённым образом составленный список правил, который даёт внутреннюю опору'
					},
					{
						name: 'Идеальная жизнь',
						text: 'Позволяет понять, чего сейчас не хватает для идеальной жизни и сформировать цели, проставить приоритеты в своих ценностях'
					},
				]
			},
		},

		avocadoBonuses: [
			'Можно ставить любое время <br/> голодания и приёма пищи!',
			'Можно создавать более 3x привычек.',
			'Просматривать актуальный <br/> статус организма на данный момент.',
			'Становится доступна более <br/> подробная статистика!',
			'Доступны новые <br/> программы голодания!',
			'Открывается мотивация <br/> от Avocado!'
		],

		prices: {},

	},
	getters: {},
	mutations: {
		SET_PAGE(state, payload) {
			state.page = payload
		},
		SET_USER(state, payload) {
			for (const key in state.user) {
				if (Object.hasOwnProperty.call(payload, key)) {
					state.user[key] = payload[key]
				}
			}
		},
		SET_PREMIUMS(state, payload) {
			let prem = {};
			for (const key in payload) {
				let i = 0, preprem = {};
				for (const key2 in payload[key]) {
					if (payload[key][key2] == '') {
						i++
					}
					preprem[key2] = payload[key][key2]
				}

				if (i === 0) {
					prem[key] = preprem
				}
			}
			state.premiums = prem
		},
		SET_PREMIUM(state) {
			state.premium = state.premiums[state.page.toLowerCase()]
		},
		SET_SCREEN_TYPE(state, payload) {
			state.screenType = payload
		},
		SET_GAUTH(state, payload) {
			state.gAuth = payload
		},
		SET_AUTHORIZED(state, payload) {
			state.authorized = payload
		},
		SET_AUTHORIZATION_ERROR_STATUS(state, payload) {
			state.authorizationErrorStatus = payload
		},
		CLEAR_USER(state) {
			state.user = _.cloneDeep(state.defaultUser)
		},
		SET_PRICES(state, payload) {
			state.prices = payload
		},
		CHANGE_PRELOADER_ACTIVE(state, payload) {
			state.preloaderActive = payload
		}
	},
	actions: {
		async signIn({ commit }, data) {
			try {
				await axios({
					method: 'post',
					url: path + '/php/signIn.php',
					data: data
				}).then(r => {
					const data = r.data
					console.log(r);
					if (data.success) {
						const userData = _.cloneDeep(data.user)

						$cookies.set('session_token', userData.session_token)

						commit('SET_AUTHORIZED', true)
						commit('SET_USER', _.omit(userData, ['session_token']))

					} else {
						commit('SET_AUTHORIZED', false)
						commit('SET_AUTHORIZATION_ERROR_STATUS', data.error.status)
						setTimeout(() => {
							commit('SET_AUTHORIZATION_ERROR_STATUS', '')
						}, 3000);
					}
				})
			} catch (error) {
				console.log(error);

				const data = error.response.data
				const status = data.error.status

				if (status === 'OUTDATED_SESSION') {
					$cookies.remove('session_token')
				} else {
					commit('SET_AUTHORIZED', false)
					commit('SET_AUTHORIZATION_ERROR_STATUS', status)
					setTimeout(() => {
						commit('SET_AUTHORIZATION_ERROR_STATUS', '')
					}, 3000);
				}
			}
		},

		async signUp({ commit }, data) {
			await axios({
				method: 'post',
				url: path + '/php/signUp.php',
				data: data
			}).then(r => {
				const user = _.cloneDeep(r.data)

				if (false) { // eslint-disable-line
					commit('SET_USER', user)
				}
			})
		},

		async signOut({ state, commit }) {
			$cookies.remove('session_token')
			commit('SET_USER', state.defaultUser);
			commit('SET_AUTHORIZED', false)

			// const session = {
			// 	'session_token': $cookies.get('session_token')
			// }

			// await axios({
			// 	method: 'post',
			// 	url: path + '/php/signOut.php',
			// 	data: session
			// }).then(() => {
			// 	commit('SET_AUTHORIZED', false)
			// 	commit('CLEAR_USER')
			// })
		},

		async getPrice({ commit }) {
			await axios({
				method: 'get',
				url: path + '/php/getPrice.php',
			}).then(r => {
				commit('SET_PRICES', r.data)
			})
		},

		async buySubscription({ state, commit }, payload) {
			payload.email = state.user.email
			payload.series = $cookies.get("session_series");
			try {
				await axios({
					method: 'post',
					url: path + '/php/yooKassaHandler.php',
					data: payload
				}).then(r => {

					commit("CHANGE_PRELOADER_ACTIVE", false);

					if (typeof r.data === 'string') {
						window.open(r.data, '_blank')
					} else {
						console.warn('Error with creation payment');
						console.warn(r.data);
					}
				})
			} catch (error) {
				commit("CHANGE_PRELOADER_ACTIVE", false);
				console.error(error);
			}

		}
	}
})

export default store