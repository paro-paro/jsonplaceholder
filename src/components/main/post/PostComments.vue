<template>
    <div>
        <div :class="'wrapper-button'">
            <div v-if="loading">
                <span><i :class="'el-icon-loading'"></i></span>
            </div>

            <div v-else>
                <span v-if="totalComments === 0" :class="'no-comments'">No comments available</span>
                <el-button
                        v-else
                        style="padding: 0"
                        :type="'text'"
                        @click="show = !show">{{ buttonText }}
                </el-button>
            </div>
        </div>
        <div v-if="show" :class="'wrapper-comments'">
            <el-card 
                    v-for="obj in comments"
                    :key="obj.id"
                    :shadow="'always'">
                
                <div :slot="'header'"><p :class="'p-email'">{{ obj.email }}</p></div>
                <p :class="'p-body'">{{ obj.body }}</p>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostComments',
    props: {
        comments: Array
    },
    inject: [
        'info'
    ],
    data () {
        return {
            show: false
        }
    },
    computed: {
        loading() {
            return this.info().loading
        },
        totalComments() {
            return this.comments.length
        },
        buttonText() {
            return this.show ? 'Hide' : `Show comments (${this.totalComments})`
        }
    }
}
</script>

<style scoped>
    .wrapper-button {
        text-align: center;
        margin: 2rem;
    }

    .no-comments {
        font-size: 14px;
        font-style: italic;
        /*color: #409EFF;*/
    }
    
    .el-button:hover {
        text-decoration: underline;
    }

    .wrapper-comments {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .p-email {
        font-size: 10px;
        letter-spacing: 1px;
        font-style: italic;
        font-weight: 600;
        margin: 0.2rem;
    }

    .p-body {
        font-size: 12px;
        letter-spacing: 1px;
        margin: 0.2rem;
        text-align: left;
    }

    .el-card:nth-child(even) {
        text-align: right;
    }

    @media only screen and (min-width: 370px) {
        .p-email {
            font-size: 12px;
        }
        .p-body {
            font-size: 13px;
        }
    }

    @media only screen and (min-width: 420px) {
        .p-email {
            font-size: 13px;
        }
        .p-body {
            font-size: 14px;
        }
    }
</style>
