<template>
    <el-form
            ref="Form"
            :class="'form'"
            :model="form"
            :rules="rules"
            :hide-required-asterisk="true"
            :show-message="true"
            @submit.prevent.native="submit()">
        
        <el-form-item 
                    :prop="'email'">
            
                <el-input
                        v-model="form.email"
                        ref="Input"
                        :size="'medium'"
                        :type="'text'"
                        :maxlength="40"
                        :clearable="true"
                        :placeholder="'Email'">
                </el-input>
        </el-form-item>

        <el-form-item
                    :prop="'body'">
            
                <el-input
                        v-model="form.body"
                        :type="'textarea'"
                        :maxlength="500"
                        :placeholder="'Comment'">
                </el-input>
        </el-form-item>

        <el-form-item>
            <el-button
                    :plain="true"
                    :native-type="'submit'"
                    :type="'primary'"
                    :size="'small'"
                    :loading="loading">Save
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'FormComment',
    props: {
        ids: Array
    },
    inject: [
        'info'
    ],
    data () {
        return {
            loading: false,
            form: {
                email: '',
                body: ''
            },
            rules: {
                email: [
                    {
                        required: true,
                        message: 'Please fill in this field',
                        trigger: 'change'
                    },
                    {
                        type: 'email',
                        message: 'This email format is not valid',
                        trigger: 'blur'
                    }
                ],
                body: [
                    {
                        required: true,
                        message: 'Please fill in this field',
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    mounted () {
        setTimeout(() => {
            this.$refs.Input.focus()
        }, 500)
    },
    computed: {
        postId() {
            return this.info().post.id
        }
    },
    methods: {
        submit () {
            this.$refs.Form.validate(valid => {
                if (valid) {
                    this.loading = true
                    setTimeout(() => {
                        this.addComment()
                    }, 1200)
                }
                else return false
            })
        },
        addComment() { 
            this.$emit('add', {
                id: this.ids.length === 0 ? 1 : Math.max(...this.ids) + 1,
                email: this.form.email,
                body: this.form.body,
                name: '',
                postId: this.postId,
                isDelete: true
            })
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
    .form {
        margin: auto;
        max-width: 420px;
    }
    
    /deep/ .el-form-item {
        margin-bottom: 30px !important;
    }
    
    /deep/ .el-textarea__inner {
        min-height: 80px !important;
    }
</style>
