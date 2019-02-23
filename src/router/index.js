import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () =>
                import ('@/views/redirect/index'),
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/register',
        component: () =>
            import ('@/views/login/register'),
        hidden: true
    },
    {
        path: '/emailresetpassword',
        component: () =>
            import ('@/views/login/emailresetpwd'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/authredirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/errorPage/401'),
        hidden: true
    },
    {
        path: '/home',
        component: () =>
            import ('@/views/dashboard/home'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'home',
        children: [{
            path: 'home',
            hidden: true,
            component: () =>
                import ('@/views/dashboard/home'),
        }, {
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: '首页',
            meta: { title: '首页', icon: 'dashboard', noCache: true }
        }]
    },
]

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [{
        path: '/blog',
        component: Layout,
        redirect: '/blog/list',
        name: '博客',
        meta: {
            title: '博客',
            icon: 'article'
        },
        children: [{
            path: 'list',
            component: () =>
                import ('@/views/blog/list'), // Parent router-view
            name: '博客列表',
            meta: { title: '博客列表', roles: ['editor'] },
        }, {
            path: 'add',
            component: () =>
                import ('@/views/blog/edit'), // Parent router-view
            name: '编写博客',
            meta: { title: '编写博客', roles: ['editor'] },
        }, {
            path: 'edit/:id(\\d+)',
            hidden: true,
            component: () =>
                import ('@/views/blog/edit'), // Parent router-view
            name: '编辑博客',
            meta: { title: '编辑博客', roles: ['editor'] },
        }, {
            path: 'view/:id(\\d+)',
            hidden: true,
            component: () =>
                import ('@/views/blog/view'),
            name: '查看博客',
            meta: { title: '查看博客' },
        }, {
            path: 'tags',
            component: () =>
                import ('@/views/blog/tags'), // Parent router-view
            name: '标签列表',
            meta: { title: '标签列表', roles: ['editor'] },
        }, {
            path: 'catalogue',
            component: () =>
                import ('@/views/blog/catalogue'), // Parent router-view
            name: '目录列表',
            meta: { title: '目录列表', roles: ['editor'] },
        }]
    },
    {
        path: '/users',
        component: Layout,
        redirect: '/users/list',
        name: '用户',
        meta: {
            title: '用户',
            icon: 'user',
            roles: ['admin']
        },
        children: [{
            path: 'list',
            component: () =>
                import ('@/views/user/list'), // Parent router-view
            name: '用户列表',
            meta: { title: '用户列表', roles: ['admin'] },
        }, {
            path: 'groupslist',
            component: () =>
                import ('@/views/user/groups'), // Parent router-view
            name: '用户组列表',
            meta: { title: '用户组列表', roles: ['admin'] },
        }, {
            path: 'template',
            component: () =>
                import ('@/views/user/menutemplate'), // Parent router-view
            name: '菜单模板',
            meta: { title: '菜单模板', roles: ['admin'] },
        }, {
            path: 'menulist',
            component: () =>
                import ('@/views/user/menu'), // Parent router-view
            name: '菜单列表',
            meta: { title: '菜单列表', roles: ['admin'] },
        }]
    },
    {
        path: '/messages',
        component: Layout,
        redirect: '/messages/list',
        name: '消息',
        meta: {
            title: '消息',
            icon: 'message',
            roles: ['editor', 'admin']
        },
        children: [{
            path: 'list',
            component: () =>
                import ('@/views/user/messageslist'), // Parent router-view
            name: '未读消息',
            meta: { title: '未读消息', roles: ['editor', 'admin'] },
        }, {
            path: 'info/:id(\\d+)',
            hidden: true,
            component: () =>
                import ('@/views/user/messagesinfo'), // Parent router-view
            name: '消息详情',
            meta: { title: '消息详情', roles: ['editor', 'admin'] },
        }, {
            path: 'logs',
            component: () =>
                import ('@/views/user/logs'), // Parent router-view
            name: '操作日志',
            meta: { title: '操作日志', roles: ['editor', 'admin'] },
        }]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/info',
        name: '个人信息',
        hidden: true,
        meta: {
            title: '个人信息',
            icon: 'user',
            roles: ['editor'],
        },
        children: [{
                path: 'info',
                hidden: true,
                component: () =>
                    import ('@/views/user/info'), // Parent router-view
                name: '编辑个人信息',
                meta: { title: '编辑个人信息', roles: ['editor'] },
            },
            {
                path: 'view/:id(\\d+)',
                hidden: true,
                component: () =>
                    import ('@/views/user/info'), // Parent router-view
                name: '浏览个人信息',
                meta: { title: '浏览个人信息', roles: ['editor'] },
            },
        ]
    },
    {
        path: 'external-link',
        component: Layout,
        children: [{
            path: 'https://github.com/lm1427934400/Blog-frontend',
            meta: { title: '外链', icon: 'link' }
        }]
    },
    { path: '*', redirect: '/404', hidden: true }
]