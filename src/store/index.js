import Vue  from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        users: [],
        posts: [],
        user: {},
        search: ''
    },
    mutations: {
        setUsers(state, arr) {
            state.users = arr
        },
        setPosts(state, arr) {
            state.posts = arr
        },
        addPost(state, obj) {
            state.posts.push(obj)
        },
        updatePost(state, obj) {
            const idx = state.posts.findIndex(item => item.id === obj.id)
            state.posts.splice(idx, 1, obj)
        },
        deletePost(state, id) {
            const idx = state.posts.findIndex(item => item.id === id)
            state.posts.splice(idx, 1)
        },
        selectUser(state, obj) {
            state.user = obj
        },
        updateSearch(state, str) {
            state.search = str
        }
    }
})

export default store
