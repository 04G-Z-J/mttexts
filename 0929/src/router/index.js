import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: () =>
            import ('../views/Layout'),
        redirect: '/home',
        children: [{
                path: '/home',
                component: () =>
                    import ('../views/yx/Home'),
            },
            {
                path: '/cate',
                component: () =>
                    import ('../views/yx/Cate'),
            },
            {
                path: '/cart',
                component: () =>
                    import ('../views/yx/Cart'),
            },
            {
                path: '/my',
                component: () =>
                    import ('../views/yx/My'),
            },
        ],
    },
    {
        path: '/login',
        component: () =>
            import ('../views/Login'),
    },
    {
        path: '/catelist',
        component: () =>
            import ('../views/catelist'),
    },
    {
        path: '/register',
        component: () =>
            import ('../views/Register.vue'),
    },
    {
        path: '/detail',
        component: () =>
            import ('../views/Detail.vue'),
    },
    {
        path: '/search',
        component: () =>
            import ('../views/search.vue'),
    },
    {
        path: '/searchlist',
        component: () =>
            import ('../views/searchlist.vue'),
    },
]

const router = new VueRouter({
    routes,
})

export default router