<template>
    <el-dialog
                :top="'8vh'"
                :center="true"
                :visible.sync="visible"
                :close-on-click-modal="!loading"
                :close-on-press-escape="!loading"
                :show-close="false"
                :fullscreen="fullscreen"
                @close="$emit('close')">

            <div :slot="'title'" :class="'title'">
                <span><b>{{ title }}</b></span>
                <span
                    style="cursor: pointer"
                    @click="visible = false"><i :class="loading ? 'd-none' :'el-icon-close'"></i>
                </span>
            </div>
            <hr style="opacity: 0.4">

            <el-form
                    ref="Form"
                    :model="form"
                    :rules="rules"
                    :hide-required-asterisk="true"
                    :show-message="true"
                    :label-position="'top'"
                    :label-width="'auto'"
                    @submit.prevent.native="submit()">
                
                <el-form-item 
                            :prop="'title'"
                            :label="'Title'">
                    
                        <el-input
                                v-model="form.title"
                                ref="Input"
                                :size="'medium'"
                                :type="'text'"
                                :maxlength="60"
                                :clearable="true"
                                :placeholder="'Title'">
                        </el-input>
                </el-form-item>

                <el-form-item
                            :prop="'body'"
                            :label="'Content'">
                    
                        <el-input
                                v-model="form.body"
                                :type="'textarea'"
                                :maxlength="800"
                                :placeholder="'Content'">
                        </el-input>
                </el-form-item>

                <el-form-item style="margin-bottom: 0">
                    <div style="margin-top: .5rem; text-align: center">
                        <el-button
                                :plain="true"
                                :native-type="'submit'"
                                :type="'primary'"
                                :size="'medium'"
                                :loading="loading">Save
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
    </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'DialogAdd',
    props: {
        mode: String,
        userId: Number,
        post: Object
    },
    data () {
        return {
            visible: false,
            loading: false,
            form: {
                title: '',
                body: ''
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: 'Please fill in this field',
                        trigger: 'change'
                    }
                ],
                body: [
                    {
                        required: true,
                        message: 'Please fill in this field',
                        trigger: 'change'
                    }
                ]
            },
            fullscreen: false
        }
    },
    created () {
        this.visible = true
        if (this.mode === 'edit') this.form = { ...this.post }
    },
    mounted () {
        this.handleOnMounted()
        setTimeout(() => {
            this.$refs.Input.focus()
        }, 200)
    },
    computed: {
        ...mapState({
            ids: state => state.posts.map(item => item.id)
        }),
        title() {
            return this.mode === 'add' ? 'Add post' : 'Update post'
        }
    },
    methods: {
        submit () {
            this.$refs.Form.validate(valid => {
                if (valid) {
                    this.mode === 'add' ? this.addPost() : this.updatePost()
                }
                else return false
            })
        },
        addPost() {
            this.loading = true
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: this.form.title,
                    body: this.form.body,
                    userId: this.userId
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
            })
            .then(response => response.json())
                .then(obj => {
                    setTimeout(() => {
                        this.addPostVuex(obj)
                        this.close()
                    }, 1000)
                })
            .catch(error => {
                console.log(error)
                this.close()
            })

        },
        updatePost() {
            this.loading = true
            fetch(`https://jsonplaceholder.typicode.com/posts/${this.form.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: this.form.id,
                    title: this.form.title,
                    body: this.form.body,
                    userId: this.form.userId
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.json())
                .then(obj => {
                    setTimeout(() => {
                        this.updatePostVuex(obj)
                        this.close()
                    }, 1000)
                })
            .catch(error => {
                console.log(error)
                this.close()
            })
        },
        addPostVuex(obj) {
            obj.loading = false
            obj.id = Math.max(...this.ids) + 1 // because jsonplaceholder api always returns id = 101
            this.$store.commit('addPost', obj)
        },
        updatePostVuex(obj) {
            obj.loading = false
            this.$store.commit('updatePost', obj)
        },
        close() {
            this.loading = false
            this.visible = false
        },
        handleOnMounted() {
            if (window.screen.width <= 576) this.fullscreen = true
            
            var mediaqueryList = window.matchMedia('only screen and (max-width: 576px)')
            mediaqueryList.addListener(e => {
                if(e.matches) {
                    this.fullscreen = true
                } else {
                    this.fullscreen = false
                }
            })
        }
    }
}
</script>

<style scoped>
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    /deep/ .el-textarea__inner {
        min-height: 150px !important;
    }
</style>
