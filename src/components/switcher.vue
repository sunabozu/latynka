<script>
import UiButton from 'keen-ui/lib/UiButton'


export default {
    components: {
        UiButton
    },

    data() {
        return {

        }
    },

    props: [
        'buttons',
        'active'
    ],

    methods: {
        onClick(hash) {
            if(hash === this.active)
                return

            this.$emit('changed', hash)
        }
    }
}
</script>

<template>
    <div class="switcher">
        <ui-button
            v-for="button in buttons"
            :text="button.title"
            :color="button.hash == active ? 'primary' : 'default'"
            @click="onClick(button.hash)"
            >
        </ui-button>
    </div>
</template>