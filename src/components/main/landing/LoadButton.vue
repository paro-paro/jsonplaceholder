<template>
    <div :class="'row'">
        <el-button
                :plain="true"
                :size="'medium'" 
                :type="'primary'"
                @click="$emit('click')">Load posts
        </el-button>
    </div>
</template>

<script>
export default {
    name: 'LoadButton',
}
</script>

<style scoped>
    .row {
        display: flex;
        justify-content: center;
    }
</style>
