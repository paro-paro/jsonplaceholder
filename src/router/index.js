import Vue    from 'vue'
import Router from 'vue-router'

import PageLanding from '@/components/pages/PageLanding'
import PagePost    from '@/components/pages/PagePost'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: 'landing',
            component: PageLanding
        },
        {
            path: '/post/:userName/:id',
            name: 'post',
            component: PagePost,
            props: true
        }
    ]
})

export default router
