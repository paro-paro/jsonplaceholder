<template>
    <div style="text-align: center"><span>{{ message }}</span></div>
</template>

<script>
export default {
    name: 'ApiError',
    props: {
        message: {
            type: String,
            default: 'Sorry, an unexpected error has occurred...'
        }
    }
}
</script>
