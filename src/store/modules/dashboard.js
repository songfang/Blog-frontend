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
        percent_list: [],
        blog_count: "",
        blog_browse_count: "",
        blog_collect_count: "",
        blog_messages_count: "",
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_PERCENT: (state, percent_list) => {
            state.percent_list = percent_list
        },
        SET_BLOG_COUNT: (state, count) => {
            state.blog_count = count
        },
        SET_BLOG_BROWSE_COUNT: (state, count) => {
            state.blog_browse_count = count
        },
        SET_BLOG_COLLECT_COUNT: (state, count) => {
            state.blog_collect_count = count
        },
        SET_MESSAGES_COUNT: (state, count) => {
            state.blog_messages_count = count
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
                    commit('SET_BLOG_COUNT', response.data.blog_count)
                    commit('SET_BLOG_BROWSE_COUNT', response.data.blog_browse)
                    commit('SET_BLOG_COLLECT_COUNT', response.data.blog_collect)
                    commit('SET_MESSAGES_COUNT', response.data.messages_count)
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
                    commit('SET_PERCENT', response.percent)
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