import main from './components/main.vue'
import Translator from './components/translator.vue'


export default {
    '/:lang': {
        component: main,
        name: 'main',

        subRoutes: {
            '/trans/:mode/*origText': {
                component: Translator,
                name: 'translator'
            },

            '/trans/:mode': {
                component: Translator,
                name: 'translator_notext'
            },

            '/': {
                component: Translator,
                name: 'translator_empty'
            }
        }
    },

    '/': {
        component: main,
        name: 'default'
    }
}