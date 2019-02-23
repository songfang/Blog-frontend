import { asyncRouterMap, constantRouterMap } from '@/router'
import {
    getToken,
    getName,
} from '@/utils/auth'
import {
    get_user_menu,
} from '@/api/login'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = {...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const permission = {
    state: {
        token: getToken(),
        name: getName(),
        menu: [],
        routers: constantRouterMap,
        menu: [],
        addRouters: []
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
                // state.routers = constantRouterMap
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data
                let accessedRouters
                if (roles.includes('admin')) {
                    accessedRouters = asyncRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                        // accessedRouters = asyncRouterMap
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        },

        /**
         * 创建用户菜单
         * @param {*} param0 
         * @param {*} data 
         */
        get_user_menu({ commit, state }) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_user_menu(state.token, state.name).then(response => {
                    commit('SET_MENU', response.data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default permission