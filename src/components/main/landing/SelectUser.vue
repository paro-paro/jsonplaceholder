<template>
    <div>
        <el-select 
                style="width: 195px"
                :value="value"
                :value-key="'id'"
                :size="'small'"
                :filterable="true"
                @change="$store.commit('selectUser', $event)">

            <el-option 
                    v-for="opt in options"
                    :key="opt.id"
                    :label="opt.name"
                    :value="opt">{{ opt.name }}
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    name: 'SelectUser',
    props: {
        value: Object,
        options: Array
    }
}
</script>

<style scoped>
    /deep/ .el-input__inner {
        letter-spacing: 0;
    }
</style>
