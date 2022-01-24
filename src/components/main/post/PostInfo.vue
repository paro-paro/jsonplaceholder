<template>
    <div>
        <h1>{{ post.title }}</h1>
        <p>{{ post.body }}</p>
    </div>
</template>

<script>
export default {
    name: 'PostInfo',
    props: {
        post: Object
    }
}
</script>

<style scoped>
    h1 {
        margin: 0;
        font-size: 1.5em;
    }
    
    p {
        font-size: 15px;
        font-family: roboto, sans-serif;
        letter-spacing: 1px;
        line-height: 140%;
        word-wrap: break-word;
        text-align: justify;
        text-justify: inter-word;
        margin-bottom: 0;
    }

    @media only screen and (min-width: 768px) {
        h1 {
           font-size: 2em;
        }
        
        p {
            font-size: 18px;
        }
    }
</style>
