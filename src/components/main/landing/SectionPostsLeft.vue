<template>
    <div :class="'flex-div'">
        <h1>Recent posts by</h1>
        <select-user
                    :value="user"
                    :options="users">
        </select-user>
        
        <div :class="'button-info'">
            <div>
                <el-button
                        :plain="true"
                        :size="'mini'"
                        :type="'primary'"
                        @click="$emit('add')">Add post
                </el-button>
            </div>
            <div><span :class="'total-post'">{{ totalPosts }}</span></div>
        </div>
    </div>
</template>

<script>
import SelectUser from './SelectUser'

export default {
    name: 'SectionPostsLeft',
    components: {
        SelectUser
    },
    props: {
        user: Object,
        users: Array,
        totalPostsByUser: Number
    },
    computed: {
        totalPosts() {
            return `Total posts: ${this.totalPostsByUser}`
        }
    }
}
</script>

<style scoped>
    .flex-div {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .button-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    h1 {
        font-size: 25px;
        font-weight: 400;
        margin: 0;
    }

    .total-post {
        font-size: 14px;
        font-weight: 600;
    }

    @media only screen and (min-width: 992px) {
        h1 {
            font-size: 30px;
        }
        .flex-div {
            margin-bottom: 0;
        }
        .button-info {
            flex-direction: column;
            align-items: flex-start;
            margin-right: auto;
            gap: 1rem;
        }
    }
</style>
