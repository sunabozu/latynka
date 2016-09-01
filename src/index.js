import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import routes from './routes'
import locales from './locales'

// new Vue(main)
Vue.use(VueRouter)
Vue.use(VueI18n)

const App = Vue.extend({})
const router = new VueRouter()

router.map(routes)

// set locales
Object.keys(locales).forEach((lang) => {
    Vue.locale(lang, locales[lang])
})

router.start(App, 'body')