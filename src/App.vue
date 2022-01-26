<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
    html, body {
        font-family: roboto, sans-serif;
        color: #444;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* responsive design: mobile first */
    #app {
        padding: 35px 2rem;
    }

    .section {
        display: flex;
        justify-content: center;
    }

    .container {
        width: 100%;
    }

    @media only screen and (min-width: 576px) { /* 576px <= screen size < 768px */
        .container {
            max-width: 540px;
        }
        .el-dialog--center {
            min-width: 500px;
        }
    }

    @media only screen and (min-width: 768px) { /* 768px <= screen size < 992px */
        .container {
            max-width: 720px;
        }
        .el-dialog--center {
            min-width: 620px;
        }
    }

    @media only screen and (min-width: 992px) { /* 992px <= screen size < 1200px */
        #app {
            padding: 70px 2rem;
        }
        .container {
            max-width: 960px;
        }
        .el-dialog--center {
            min-width: 648px;
        }
    }

    @media only screen and (min-width: 1200px) { /* screen size >= 1200px */
        .container {
            max-width: 1200px;
        }
        .el-dialog--center {
            min-width: 648px;
        }
    }

    /* override element-ui classes */
    .el-dialog--center {
        width: 100%;
        max-width: 640px;
    }

    .el-dialog__header {
        padding: 20px 30px 5px 30px !important;
    }

    .el-dialog--center .el-dialog__body {
        padding: 0 30px 30px 30px !important;
    }

    .el-form-item {
        margin-bottom: 15px;
    }

    .el-form-item__label {
        font-weight: 600;
        font-size: 12px !important;
        padding: 0 !important;
    }

    .el-form-item__error {
        letter-spacing: 1px;
    }

    .el-input__inner {
        font-family: roboto, sans-serif;
        letter-spacing: 1px;
        line-height: 140%;
    }

    .el-textarea__inner {
        font-family: roboto, sans-serif;
        letter-spacing: 1px;
        line-height: 140%;
    }

    .el-input__icon {
        color: #212529 !important;
    }

    .search-style .el-input__inner {
        border: none;
        color: black;
        opacity: 1;
        background-color: #F5F5F5;
    }

    .el-input__inner::-webkit-input-placeholder {
        opacity: 0.5   !important;
        color: #212529 !important;
    }

    .el-textarea__inner::-webkit-input-placeholder {
        opacity: 0.5   !important;
        color: #212529 !important;
    }

    .el-card__header {
        padding: .5rem .5rem !important;
    }
    
    .el-card__body {
        padding: .8rem .5rem !important;
    }

    /* utility classes */
    .d-none {
        display: none;
    }
</style>
