<script>
import UiButton from 'keen-ui/lib/UiButton'
import Vue from 'vue'
import UiSelect from 'keen-ui/lib/UiSelect'


export default {
    components: {
        UiButton,
        UiSelect,
    },

    data() {
        return {
            langs: [
                {
                    text: '🇺🇦',
                    value: 'ua'
                },
                {
                    text: '🇬🇧',
                    value: 'en'
                }
            ],

            activeLang: null
        }
    },

    route: {
        data(transition) {
            //redirect to default if there is no language
            if(this.$route.name == 'default') {
                this.$router.go({
                    name: 'main',
                    params: {
                        lang: 'en'
                    }
                })

                return
            }

            console.log(transition.to.params.lang)
            Vue.config.lang = transition.to.params.lang

            for(let lang of this.langs) {
                if(lang.value === Vue.config.lang)
                    this.activeLang = lang.text
            }
        }
    },

    methods: {
        langSelected(lang) {
            console.log(lang)
            let params = this.$route.params
            params.lang = lang.value

            this.$router.go({
                name: this.$route.name,
                params
            })
        }
    },

    computed: {

    },

    ready() {
        console.log('hello main')
    },

    replace: false,
}
</script>

<template>
    <div>
        <header>
            <h2>Łatynka</h2>
            <div>
                <a :href="$t('header.what_is_this_link')">
                    <ui-button
                        :text="$t('header.what_is_this')"
                        type="flat"
                        color="primary"
                        >
                    </ui-button>
                </a>

                <ui-select
                    name="lang_select"
                    :value.sync="activeLang"
                    :options="langs"
                    @selected="langSelected"
                    >
                </ui-select>
            </div>
        </header>

        <div id="content">
            <router-view></router-view>
        </div>
    </div>    
</template>