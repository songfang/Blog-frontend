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
        path: '/user',
        component: Layout,
        redirect: '/user/info',
        name: '个人信息',
        hidden: true,
        meta: { title: '个人信息' },
        children: [{
            path: 'info',
            component: () =>
                import ('@/views/user/info')
        }]
    },
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: '首页',
            meta: { title: '首页', icon: 'dashboard', noCache: true }
        }]
    },
    // {
    //     path: '/documentation',
    //     component: Layout,
    //     redirect: '/documentation/index',
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/documentation/index'),
    //         name: 'Documentation',
    //         meta: { title: 'documentation', icon: 'documentation', noCache: true }
    //     }]
    // },
    // {
    //     path: '/guide',
    //     component: Layout,
    //     redirect: '/guide/index',
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/guide/index'),
    //         name: 'Guide',
    //         meta: { title: 'guide', icon: 'guide', noCache: true }
    //     }]
    // }
]

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [
    // {
    //     path: '/permission',
    //     component: Layout,
    //     redirect: '/permission/index',
    //     alwaysShow: true, // will always show the root menu
    //     meta: {
    //         title: 'permission',
    //         icon: 'lock',
    //         roles: ['admin', 'editor'] // you can set roles in root nav
    //     },
    //     children: [{
    //             path: 'page',
    //             component: () =>
    //                 import ('@/views/permission/page'),
    //             name: 'PagePermission',
    //             meta: {
    //                 title: 'pagePermission',
    //                 roles: ['admin'] // or you can only set roles in sub nav
    //             }
    //         },
    //         {
    //             path: 'directive',
    //             component: () =>
    //                 import ('@/views/permission/directive'),
    //             name: 'DirectivePermission',
    //             meta: {
    //                 title: 'directivePermission'
    //                     // if do not set roles, means: this page does not require permission
    //             }
    //         }
    //     ]
    // },

    // {
    //     path: '/icon',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/svg-icons/index'),
    //         name: 'Icons',
    //         meta: { title: 'icons', icon: 'icon', noCache: true }
    //     }]
    // },

    /** When your routing table is too long, you can split it into small modules**/
    // componentsRouter,
    // chartsRouter,
    // nestedRouter,
    // tableRouter,

    // {
    //     path: '/example',
    //     component: Layout,
    //     redirect: '/example/list',
    //     name: 'Example',
    //     meta: {
    //         title: 'example',
    //         icon: 'example'
    //     },
    //     children: [{
    //             path: 'create',
    //             component: () =>
    //                 import ('@/views/example/create'),
    //             name: 'CreateArticle',
    //             meta: { title: 'createArticle', icon: 'edit' }
    //         },
    //         {
    //             path: 'edit/:id(\\d+)',
    //             component: () =>
    //                 import ('@/views/example/edit'),
    //             name: 'EditArticle',
    //             meta: { title: 'editArticle', noCache: true },
    //             hidden: true
    //         },
    //         {
    //             path: 'view/:id(\\d+)',
    //             component: () =>
    //                 import ('@/views/example/view'),
    //             name: 'VeiwArticle',
    //             meta: { title: 'viewArticle', noCache: true },
    //             hidden: true
    //         },
    //         {
    //             path: 'list',
    //             component: () =>
    //                 import ('@/views/example/list'),
    //             name: 'ArticleList',
    //             meta: { title: 'articleList', icon: 'list' }
    //         }
    //     ]
    // },
    {
        path: '/blog',
        component: Layout,
        redirect: '/blog/list',
        name: '博客',
        meta: {
            title: '博客',
            icon: 'nested'
        },
        children: [{
            path: 'list',
            component: () =>
                import ('@/views/blog/list'), // Parent router-view
            name: '博客列表',
            meta: { title: '博客列表' },
        }, {
            path: 'add',
            component: () =>
                import ('@/views/blog/edit'), // Parent router-view
            name: '编写博客',
            meta: { title: '编写博客' },
        }, {
            path: 'edit/:id(\\d+)',
            hidden: true,
            component: () =>
                import ('@/views/blog/edit'), // Parent router-view
            name: '编辑博客',
            meta: { title: '编辑博客' },
        }, {
            path: 'view/:id(\\d+)',
            hidden: true,
            component: () =>
                import ('@/views/blog/view'), // Parent router-view
            name: '查看博客',
            meta: { title: '查看博客' },
        }, {
            path: 'tags',
            hidden: true,
            component: () =>
                import ('@/views/blog/tags'), // Parent router-view
            name: '标签列表',
            meta: { title: '标签列表' },
        }, {
            path: 'catalogue',
            hidden: true,
            component: () =>
                import ('@/views/blog/catalogue'), // Parent router-view
            name: '目录列表',
            meta: { title: '目录列表' },
        }]
    },

    // {
    //     path: '/tab',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/tab/index'),
    //         name: 'Tab',
    //         meta: { title: 'tab', icon: 'tab' }
    //     }]
    // },

    // {
    //     path: '/error',
    //     component: Layout,
    //     redirect: 'noredirect',
    //     name: 'ErrorPages',
    //     meta: {
    //         title: 'errorPages',
    //         icon: '404'
    //     },
    //     children: [{
    //             path: '401',
    //             component: () =>
    //                 import ('@/views/errorPage/401'),
    //             name: 'Page401',
    //             meta: { title: 'page401', noCache: true }
    //         },
    //         {
    //             path: '404',
    //             component: () =>
    //                 import ('@/views/errorPage/404'),
    //             name: 'Page404',
    //             meta: { title: 'page404', noCache: true }
    //         }
    //     ]
    // },

    // {
    //     path: '/error-log',
    //     component: Layout,
    //     redirect: 'noredirect',
    //     children: [{
    //         path: 'log',
    //         component: () =>
    //             import ('@/views/errorLog/index'),
    //         name: 'ErrorLog',
    //         meta: { title: 'errorLog', icon: 'bug' }
    //     }]
    // },

    // {
    //     path: '/excel',
    //     component: Layout,
    //     redirect: '/excel/export-excel',
    //     name: 'Excel',
    //     meta: {
    //         title: 'excel',
    //         icon: 'excel'
    //     },
    //     children: [{
    //             path: 'export-excel',
    //             component: () =>
    //                 import ('@/views/excel/exportExcel'),
    //             name: 'ExportExcel',
    //             meta: { title: 'exportExcel' }
    //         },
    //         {
    //             path: 'export-selected-excel',
    //             component: () =>
    //                 import ('@/views/excel/selectExcel'),
    //             name: 'SelectExcel',
    //             meta: { title: 'selectExcel' }
    //         },
    //         {
    //             path: 'upload-excel',
    //             component: () =>
    //                 import ('@/views/excel/uploadExcel'),
    //             name: 'UploadExcel',
    //             meta: { title: 'uploadExcel' }
    //         }
    //     ]
    // },

    // {
    //     path: '/zip',
    //     component: Layout,
    //     redirect: '/zip/download',
    //     alwaysShow: true,
    //     meta: { title: 'zip', icon: 'zip' },
    //     children: [{
    //         path: 'download',
    //         component: () =>
    //             import ('@/views/zip/index'),
    //         name: 'ExportZip',
    //         meta: { title: 'exportZip' }
    //     }]
    // },

    // {
    //     path: '/theme',
    //     component: Layout,
    //     redirect: 'noredirect',
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/theme/index'),
    //         name: 'Theme',
    //         meta: { title: 'theme', icon: 'theme' }
    //     }]
    // },

    // {
    //     path: '/clipboard',
    //     component: Layout,
    //     redirect: 'noredirect',
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/clipboard/index'),
    //         name: 'ClipboardDemo',
    //         meta: { title: 'clipboardDemo', icon: 'clipboard' }
    //     }]
    // },

    // {
    //     path: '/i18n',
    //     component: Layout,
    //     children: [{
    //         path: 'index',
    //         component: () =>
    //             import ('@/views/i18n-demo/index'),
    //         name: 'I18n',
    //         meta: { title: 'i18n', icon: 'international' }
    //     }]
    // },

    {
        path: 'external-link',
        component: Layout,
        children: [{
            path: 'https://github.com/PanJiaChen/vue-element-admin',
            meta: { title: 'externalLink', icon: 'link' }
        }]
    },

    { path: '*', redirect: '/404', hidden: true }
]