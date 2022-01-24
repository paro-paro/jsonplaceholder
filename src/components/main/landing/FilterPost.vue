<template>
    <div>
        <el-input 
                :value="value"
                :class="'search-style'"
                :size="'small'"
                :clearable="true"
                :placeholder="'Find post by title...'"
                @input="$store.commit('updateSearch', $event)">
        </el-input>
    </div>
</template>

<script>
export default {
    name: 'FilterPost',
    props: {
        value: String
    }
}
</script>

<style scoped>
    /deep/ .el-input__inner:focus {
        box-shadow: 0 0 0 2px #c6aada;
    }
</style>
