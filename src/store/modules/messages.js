import {
    get_messags_list,
    read_messages,
    read_all_messages,
    del_messages,
    del_all_messages,
    get_messages,
} from '@/api/login'
import {
    getToken,
    getName,
} from '@/utils/auth'

const messages = {
    state: {
        messages_list: [],
        messages_total: "",
        unread_messages_list: [],
        unread_messages_total: "",
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_MESSAGES_LIST: (state, messages_list) => {
            state.messages_list = messages_list
        },
        SET_MESSAGES_TOTAL: (state, total) => {
            state.messages_total = total
        },
        SET_UNREAD_MESSAGES_LIST: (state, messages_list) => {
            state.unread_messages_list = messages_list
        },
        SET_UNREAD_MESSAGES_TOTAL: (state, total) => {
            state.unread_messages_total = total
        },
    },

    actions: {
        /**
         * 获取用户消息
         * @param {*} param0 
         * @param {*} query 
         */
        get_messages_list(query) {
            let token = getToken()
            let name = getName()
            return new Promise((resolve, reject) => {
                get_messags_list(token, name, query).then(response => {
                    const data = response.data
                    const total = response.total
                    commit('SET_MESSAGES_LIST', data)
                    commit('SET_MESSAGES_TOTAL', total)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取未阅读的消息
         * @param {*} query 
         */
        get_unread_messages_list(query) {
            let token = getToken()
            let name = getName()
            return new Promise((resolve, reject) => {
                get_messags_list(token, name, query).then(response => {
                    const data = response.data
                    const total = response.total
                    commit('SET_UNREAD_MESSAGES_LIST', data)
                    commit('SET_UNREAD_MESSAGES_TOTAL', total)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 用户阅读消息
         * @param {*} param0 
         * @param {*} data 
         */
        read_messages(data) {
            let token = getToken()
            let name = getName()
            let messages_id = data["id"]
            return new Promise((resolve, reject) => {
                read_messages(token, name, messages_id).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 读取所有消息
         * @param {*} param0 
         */
        read_all_messages() {
            let token = getToken()
            let name = getName()
            return new Promise((resolve, reject) => {
                read_all_messages(token, name).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 删除用户消息
         * @param {*} param0 
         * @param {*} data 
         */
        del_messages(data) {
            let token = getToken()
            let name = getName()
            let messages_id = data["id"]
            return new Promise((resolve, reject) => {
                del_messages(token, name, messages_id).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 删除所有消息
         * @param {*} param0 
         */
        del_all_messages() {
            let token = getToken()
            let name = getName()
            return new Promise((resolve, reject) => {
                del_all_messages(token, name).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取messages信息
         * @param {*} param0 
         * @param {*} data 
         */
        get_messages(data) {
            let token = getToken()
            let name = getName()
            let messages_id = data["id"]
            return new Promise((resolve, reject) => {
                get_messages(token, name, messages_id).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default messages