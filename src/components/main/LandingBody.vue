<template>
    <div :class="'section'" v-loading.fullscreen.lock="isLoading">
        
        <div v-if="apiError" :class="'container'">
            <api-error></api-error>
        </div>
        
        <div v-else-if="display" :class="'container'">
            <section-posts
                        :users="users"
                        :posts="posts"
                        @add="$emit('add', $event)"
                        @update="$emit('update', $event)">
            </section-posts>
        </div>
        
        <div v-else :class="'container'">
            <load-button @click="click()"></load-button>
        </div>
    </div>
</template>

<script>
import SectionPosts from './landing/SectionPosts'
import ApiError     from './landing/ApiError'
import LoadButton   from './landing/LoadButton'
import { mapState } from 'vuex'

export default {
    name: 'LandingBody',
    components: {
        SectionPosts,
        ApiError,
        LoadButton
    },
    props: {
        isForceError: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            loading: {
                users: false,
                posts: false
            },
            apiError: false
        }
    },
    computed: {
        ...mapState({
            users: state => state.users,
            posts: state => state.posts
        }),
        isLoading() {
            return this.loading.users || this.loading.posts
        },
        display() {
            return !this.apiError && !this.isLoading && this.users.length > 0 && this.posts.length > 0
        }
    },
    methods: {
        click () {
            this.loading.users = true
            this.loading.posts = true
            this.getApiInfo()
        },
        getApiInfo() {
            this.getUsers()
            this.getPosts()
        },
        getUsers() {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                    .then(json => {
                        setTimeout(() => { // to properly display the loading animation
                            this.isForceError
                                ?
                                    this.handleApiError('error fetching users', 'users')
                                :
                                    this.handleSuccessUsers(json)
                        }, 1200)
                    })
                .catch(error => {
                    this.handleApiError(error, 'users')
                })
        },
        getPosts() {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                    .then(json => {
                        setTimeout(() => {
                            this.isForceError
                                ?
                                    this.handleApiError('error fetching posts', 'posts')
                                :
                                    
                                    this.handleSuccessPosts(json)
                        }, 1200)
                    })
                .catch(error => {
                    this.handleApiError(error, 'posts')
                })
        },
        handleSuccessUsers(json) {
            this.$store.commit('setUsers', json)
            this.loading.users = false
        },
        handleSuccessPosts(json) {
            json.forEach(item => item.loading = false)
            this.$store.commit('setPosts', json)
            this.loading.posts = false
        },
        handleApiError(error, api) {  // error handleling logic always...
            this.apiError = true
            this.loading[api] = false
            console.log(error)
        }
    }
}
</script>
