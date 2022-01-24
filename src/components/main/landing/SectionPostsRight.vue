<template>
    <div>
        <filter-post :value="search"></filter-post>
        
        <div :class="'wrapper-card'">
            <card-post 
                    v-for="post in postsSearch"
                    :key="post.id"
                    :post="post"
                    :name="name"
                    @update="$emit('update', $event)">
            </card-post>
            
            <div v-if="isEmpty" :class="'empty'">{{ emptyText }}</div>
            
            <div v-if="isEmptyFilter" :class="'empty-filter'">
                <img :src="require('@/assets/not-found.svg')" :height="30"/>
                <div :class="'filter-button'" @click="$store.commit('updateSearch', '')">remove filter</div>
            </div>
        </div>
    </div>
</template>

<script>
import FilterPost   from './FilterPost'
import CardPost     from './CardPost'
import { mapState } from 'vuex'
import {
    sortAscByKey,
    normalize
} from '@/utils/functions'

export default {
    name: 'SectionPostsRight',
    components: {
        FilterPost,
        CardPost
    },
    props: {
        posts: Array,
        trigger: Number,
        name: String
    },
    watch: {
        trigger() {
            this.$store.commit('updateSearch', '')
        }
    },
    computed: {
        ...mapState({
            search: state => state.search
        }),
        postsSearch() {
            return this.posts.filter(item => normalize(item.title).includes(normalize(this.search))).sort(sortAscByKey('title'))
        },
        isEmpty() {
            return this.posts.length === 0
        },
        isEmptyFilter() {
            return this.posts.length > 0 && this.postsSearch.length === 0
        },
        emptyText() {
            return `All posts from ${this.name} have been deleted.`
        }
    }
}
</script>

<style scoped>
    .wrapper-card {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .empty {
        font-size: 14px;
        margin-top: .5rem;
    }

    .empty-filter {
        text-align: center;
        margin: 1rem;
    }

    .filter-button {
        margin-top: .5rem;
        font-size: 14px;
        color: red;
        cursor: pointer;
    }

    .filter-button:hover {
        text-decoration: underline;
    }
</style>
