<template>
    <div>
        <landing-body :isForceError="false" @add="add" @update="update"></landing-body>
        <dialog-add 
                    v-if="show"
                    :mode="mode"
                    :userId="userId"
                    :post="post"
                    @close="close()">
        </dialog-add>
    </div>
</template>

<script>
import LandingBody from '@/components/main/LandingBody'
import DialogAdd   from '@/components/main/landing/DialogAdd'

export default {
    name: 'PageLanding',
    components: {
        LandingBody,
        DialogAdd
    },
    data () {
        return {
            show: false,
            mode: 'add',
            userId: null,
            post: {}
        }
    },
    methods: {
        add(userId) {
            this.userId = userId
            this.show = true
        },
        update(post) {
            this.mode = 'edit'
            this.post = post
            this.show = true
        },
        close() {
            this.mode = 'add'
            this.userId = null
            this.post = {}
            this.show = false
        }
    }
}
</script>
