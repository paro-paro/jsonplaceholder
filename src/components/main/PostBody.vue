<template>
    <div :class="'section'">
        <div :class="'container'">
            <div :class="'wrapper header'">
                <el-button
                        :plain="false"
                        :size="'small'"
                        :type="'default'"
                        :icon="'el-icon-arrow-left'"
                        @click="$router.go(-1)">Go back
                </el-button>
                <span>{{ userName }}</span>
            </div>

            <div :class="'wrapper'">
                <hr>
            </div>

            <div :class="'wrapper article'">
                <post-info 
                        :post="post">
                </post-info>
            </div>

            <div :class="'wrapper'">
                <post-comments
                            :comments="comments"
                            @add="$emit('add', $event)"
                            @delete="$emit('delete', $event)">
                </post-comments>
            </div>
        </div>
    </div>
</template>

<script>
import PostInfo     from './post/PostInfo'
import PostComments from './post/PostComments'
import { mapState } from 'vuex'

export default {
    name: 'PostBody',
    components: {
        PostInfo,
        PostComments
    },
    props: {
        post: Object,
        comments: Array
    },
    computed: {
        ...mapState({
            users: state => state.users
        }),
        userName() {
            return this.users.find(item => item.id === this.post.userId).name
        }
    }
}
</script>

<style scoped>
    .wrapper {
        max-width: 760px;
        padding: 0 20px 0 20px;
        margin: 0 auto 0 auto;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .article {
        display: flex;
        flex-direction: column
    }

    hr {
        opacity: 0.4;
        margin-top: 1.2rem;
        margin-bottom: 1.2rem;
    }

    @media only screen and (max-width: 400px) {
        .header {
            flex-direction: column;
            gap: 1rem;
        }
    }
</style>
