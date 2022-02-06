<template>
    <div :class="'row'">
        <div :class="'col-100 col-30'">
            <section-posts-left
                            :user="user"
                            :users="usersSort"
                            :total-posts-by-user="totalPostsByUser"
                            @add="$emit('add', user.id)">
            </section-posts-left>
        </div>

        <div :class="'col-100 col-70'">
            <section-posts-right
                            :posts="postsByUser"
                            :trigger="trigger"
                            :name="user.name"
                            @update="$emit('update', $event)">
            </section-posts-right>
        </div>
    </div>
</template>

<script>
import SectionPostsLeft  from './SectionPostsLeft'
import SectionPostsRight from './SectionPostsRight'
import { mapState }      from 'vuex'
import { sortAscByKey }  from '@/utils/functions'

export default {
    name: 'SectionPosts',
    components: {
        SectionPostsLeft,
        SectionPostsRight
    },
    props: {
        users: {
            type: Array,
            required: true
        },
        posts: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            trigger: 0
        }
    },
    created () {
       if (Object.keys(this.user).length === 0) this.$store.commit('selectUser', this.users[0])
    },
    watch: {
        user () {
            this.trigger++ // reset filter on user change
        }
    },
    computed: {
        ...mapState({
            user: state => state.user
        }),
        usersSort() {
            return [...this.users].sort(sortAscByKey('name'))
        },
        postsByUser() {
            return this.posts.filter(item => item.userId === this.user.id)
        },
        totalPostsByUser() {
            return this.postsByUser.length
        }
    }
}
</script>

<style scoped>
    .row {
        display: flex;
        flex-wrap: wrap;
        padding: 0 2rem;
    }

    .col-100 {
        flex: 0 0 100%;
        max-width: 100%;
    }

    @media only screen and (min-width: 992px) {
        .col-30 {
            flex: 0 0 30%;
            max-width: 30%;
        }
    }

    @media only screen and (min-width: 992px) {
        .col-70 {
            flex: 0 0 70%;
            max-width: 70%;
        }
    }
</style>
