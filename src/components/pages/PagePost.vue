<template>
    <post-body :post="post"  :comments="comments"></post-body>
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
            comments: [],
            loading: false
        }
    },
    provide () {
        return {
            info: () => {
                return {
                    loading: this.loading
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
        getPostComments() {
            this.loading = true
            fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}/comments`)
                .then(response => response.json())
                    .then(arr => {
                        setTimeout(() => {
                            this.comments = arr
                            this.loading = false
                        }, 500)
                    })
                .catch(error => {
                    console.log(error)
                    this.loading = false
                })
        }
    }
}
</script>
