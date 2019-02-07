import {
    get_blog_data,
    get_blog_month_data,
    get_blog_week_data,
    get_blog_tags_data,
    get_blog_domain_data,
    get_version_list,
    get_location_info,
} from '@/api/dashboard'
import {
    getToken,
    getName,
} from '@/utils/auth'

const dashboard = {
    state: {
        token: getToken(),
        name: getName(),
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
    },

    actions: {
        /**
         * 获取dashboard的文章统计数据
         * @param {*} param0 
         */
        get_blog_data({ commit, state }) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_blog_data(state.token, state.name).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取dashboard的文章月统计信息
         * @param {*} param0 
         */
        get_blog_month_data({ commit, state }) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_blog_month_data(state.token, state.name).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取dashboard的文章周统计数据
         * @param {*} param0 
         */
        get_blog_week_data({ commit, state }) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_blog_week_data(state.token, state.name).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取dashboard的文章tags统计
         * @param {*} param0 
         */
        get_blog_tags_data({ commit, state }) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_blog_tags_data(state.token, state.name).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取dashboard学习领域数据
         */
        get_blog_domain_data({ commit, state }) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_blog_domain_data(state.token, state.name).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取dashboard最新的发布版本情况
         */
        get_version_list({ commit, state }) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_version_list(state.token, state.name).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取位置信息
         * @param {*} param0 
         */
        get_location_info({ commit, state }) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_location_info(state.token, state.name).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default dashboard