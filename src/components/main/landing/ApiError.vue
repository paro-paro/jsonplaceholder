<template>
    <div style="text-align: center"><span>{{ message }}</span></div>
</template>

<script>
export default {
    name: 'ApiError',
    props: {
        message: {
            type: String,
            default: 'Lo sentimos, se ha producido un error inesperado...'
        }
    }
}
</script>
