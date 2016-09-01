<script>
import UiTextbox from 'keen-ui/lib/UiTextbox'
import Switcher from './switcher.vue'
import UiButton from 'keen-ui/lib/UiButton'

import {ukr2latynka, pol2cyr} from '../utils'


export default {
    components: {
        UiTextbox,
        Switcher,
        UiButton,
    },

    data() {
        return {
            origText: '',

            buttons: [
                {
                    title: 'UA => LAT (Ł)',
                    hash: 'UA2LAT1'
                },
                {
                    title: 'UA => LAT (Ї)',
                    hash: 'UA2LAT2'
                },
                {
                    title: 'PL => CYR',
                    hash: 'PL2CYR'
                }
            ],

            activeButton: 'UA2LAT1',
        }
    },

    route: {
        data(transition) {
            this.activeButton = transition.to.params.mode !== undefined ? transition.to.params.mode : this.activeButton

            this.origText = transition.to.params.origText !== undefined ? transition.to.params.origText : ''
        }
    },

    methods: {
        onSwitch(hash) {
            console.log(this.origText)
            this.$router.go({
                name: 'translator',
                params: {
                    mode: hash,
                    origText: this.origText
                }
            })
        },

        origTextChange() {
            this.$router.go({
                name: 'translator',
                params: {
                    mode: this.activeButton,
                    origText: this.origText
                }
            })
        },

        onResultFocussed(e) {
            e.target.select()
        }
    },

    computed: {
        translation() {
            if(!this.origText)
                return ''

            switch(this.activeButton) {
                default:
                case 'UA2LAT1':
                    return ukr2latynka(this.origText, 'loz')
                case 'UA2LAT2':
                    return ukr2latynka(this.origText, 'ire')
                case 'PL2CYR':
                    return pol2cyr(this.origText)
            }
            
        }
    },

    ready() {
        // console.log('hello')
    },

    replace: false,
}
</script>

<template>
    <div>
        <ui-textbox
            name="your_text"
            :autofocus="true"
            :multi-line="true"
            :rows="7"
            :value.sync="origText"
            :placeholder="$t('body.placeholder')"
            @keydown="origTextChange | debounce 2000"
            >
        </ui-textbox>
        <switcher
            :buttons="buttons"
            :active="activeButton"
            @changed="onSwitch"
            >
        </switcher>
        <ui-textbox
            name="translation"
            :multi-line="true"
            :rows="7"
            :value.sync="translation"
            @click="onResultFocussed"
            >
        </ui-textbox>
    </div>    
</template>