<template>
    <div @click="click(post.id)">
        <el-card
                v-loading="post.loading"
                :class="'card'"
                :shadow="'hover'">
            
            <div :slot="'header'">
                <div :class="post.id <= 100 ? 'icons-mobile justify-between' : 'icons-mobile justify-end'">
                    <i
                        :class="post.id <= 100 ? 'el-icon-edit' : 'd-none'"
                        @click.stop="$emit('update', post)"></i>
                    <i
                        :class="'el-icon-delete'"
                        @click.stop="deletePost(post.id)"></i>
                </div>
                <div :class="'header'">
                    <div><span :class="'title'">{{ post.title }}</span></div>
                    <div :class="'icons-desktop'">
                        <i 
                            :class="post.id <= 100 ? 'el-icon-edit' : 'd-none'"
                            @click.stop="$emit('update', post)"></i>
                        <i
                            :class="'el-icon-delete'"
                            @click.stop="deletePost(post.id)"></i>
                    </div>
                </div>
            </div>
            <div :class="'body'">{{ body }}</div>
        </el-card>
    </div>
</template>

<script>
import _truncate from 'lodash/truncate'

export default {
    name: 'CardPost',
    props: {
        post: Object,
        name: String
    },
    computed: {
        body() {
            return _truncate(this.post.body, { length: 35, separator: '...' })
        }
    },
    methods: {
        click(id) {
            this.$router.push({
                name: 'post',
                params: {
                    id: id.toString(),
                    userName: this.name.replace(/[\s]/g, '')
                }
            })
        },
        deletePost(id) {
            this.post.loading = true
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
                .then(() => {
                    this.$store.commit('deletePost', id)
                })
                .catch(error => {
                    this.post.loading = false
                    console.log(error)
                })
        }
    }
}
</script>

<style scoped>
    .card {
        cursor: pointer;
        border: 1px solid lightgray;
    }

    .header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 5px;
    }

    .title {
        font-size: 14px;
        font-weight: 600;
    }

    .body {
        font-size: 12px;
        letter-spacing: 1px;
    }

    .icons-desktop {
        display: none;
    }

    .icons-mobile {
        margin-bottom: 10px;
        display: flex;
        
        align-items: center;
    }

    i.el-icon-edit:hover {
        color: #409EFF;
    }
    
    i.el-icon-delete:hover {
        color: red;
    }

    @media only screen and (min-width: 768px) {
        .header {
            justify-content: space-between;
        }
        .icons-desktop {
            display: flex;
            align-items: center;
            gap: 1.2rem;
        }
        .icons-mobile {
            display: none;
        }
    }

    .justify-between {
        justify-content: space-between;
    }

    .justify-end {
        justify-content: flex-end;
    }
</style>
