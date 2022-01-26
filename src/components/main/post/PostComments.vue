<template>
    <div>
        <div :class="'wrapper'">
            <div v-if="loading">
                <i :class="'el-icon-loading'"></i>
            </div>

            <div v-else>
                <div v-if="totalComments === 0">
                    <p :class="'no-comments'">No comments available</p>
                    <el-button
                            :class="'text-button'"
                            :type="'text'"
                            @click="showForm = !showForm">{{ buttonText2 }}
                    </el-button>
                </div>
                <el-button
                        v-else
                        :class="'text-button'"
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
                
                <div v-if="obj.isDelete" style="text-align: right !important">
                    <i :class="'el-icon-delete'" @click="$emit('delete', obj.id)"></i>
                </div>
            </el-card>
        </div>
        
        <div v-if="show" :class="'wrapper'">
            <el-button
                    :class="'text-button'"
                    :type="'text'"
                    @click="showForm = !showForm">{{ buttonText2 }}
            </el-button>
        </div>

        <div v-if="showForm" :class="'wrapper'">
            <form-comment
                        :ids="ids"
                        @add="$emit('add', $event)"
                        @close="close()">
            </form-comment>
        </div>
    </div>
</template>

<script>
import FormComment from './FormComment'

export default {
    name: 'PostComments',
    components: {
        FormComment
    },
    props: {
        comments: Array
    },
    inject: [
        'info'
    ],
    data () {
        return {
            show: false,
            showForm: false
        }
    },
    watch: {
        show(value) {
            if (!value) this.showForm = false
        },
        totalComments(value) {
            if (value === 0 && this.show) this.show = false
        }
    },
    computed: {
        ids() {
            return this.comments.map(item => item.id)
        },
        loading() {
            return this.info().loading
        },
        totalComments() {
            return this.comments.length
        },
        buttonText() {
            return this.show ? 'Hide' : `Show comments (${this.totalComments})`
        },
        buttonText2() {
            return this.showForm ? 'Cancel' : 'Add comment'
        }
    },
    methods: {
        close() {
            if (!this.show) this.show = true
            this.showForm = false
        }
    }
}
</script>

<style scoped>
    .wrapper {
        text-align: center;
        margin: 2rem;
    }

    .wrapper-comments {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .text-button {
        padding: 0;
    }

    .el-button.text-button:hover {
        text-decoration: underline;
    }

    .no-comments {
        font-size: 14px;
        font-style: italic;
    }

    .el-card:nth-child(even) {
        text-align: right;
    }

    .el-icon-delete {
        cursor: pointer;
    }

    .el-icon-delete:hover {
        color: red;
    }

    .p-email {
        display: inline;
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
