<template>
    <post-body :post="post" :comments="comments" @add="add" @delete="delete_"></post-body>
</template>

<script>
import PostBody     from '@/components/main/PostBody'
import { mapState } from 'vuex'

export default {
    name: 'PagePost',
    components: {
        PostBody
    },
    props: {
        id: String,
        userName: String
    },
    data () {
        return {
            loading: false,
            comments: []
        }
    },
    provide () {
        return {
            info: () => {
                return {
                    loading: this.loading,
                    post: this.post
                }
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'landing') next()
        else next({
            path: '/'
        })
    },
    created () {
        this.loading = true
        this.getPostComments()
    },
    computed: {
        ...mapState({
            posts: state => state.posts
        }),
        post() {
            return this.posts.find(item => item.id === Number(this.id))
        }
    },
    methods: {
        async getPostComments() {
            try {
                let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}/comments`)
                this.comments = await response.json()
                setTimeout(() => {
                    this.loading = false
                }, 500)

            } catch(error) {
                console.log(error)
                this.loading = false
            }
        },
        add(obj) {
            this.comments.push(obj)
        },
        delete_(id) {
            const idx = this.comments.findIndex(item => item.id === id)
            this.comments.splice(idx, 1)
        }
    }
}
</script>
