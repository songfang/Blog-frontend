import {
    loginByUsername,
    registerUser,
    logout,
    getUserInfo,
    sendCode,
    resetPassword,
    editUserInfo,
    get_user_message,
    get_users_list,
    get_groups_list,
    edit_groups,
    del_groups,
    add_groups,
    get_messags_list,
    read_messages,
    read_all_messages,
    del_messages,
    del_all_messages,
    get_messages,
    get_unread_messages_list,
} from '@/api/login'
import {
    getToken,
    setToken,
    removeToken,
    getName,
    setName,
    removeName,
    setUser
} from '@/utils/auth'
import store from '@/store'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        groups: [],
        phone: '',
        habbies: '',
        occupation: '',
        country: '',
        description: '',
        website: '',
        longitude: '',
        latitude: '',
        first_name: '',
        last_name: '',
        email: '',
        alias: '',
        last_login: '',
        setting: {
            articlePlatform: []
        },
        users_list: [],
        total: "",
        groups_list: [],
        groups_total: "",
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
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_GROUPS: (state, groups) => {
            state.groups = groups
        },
        SET_PHONE: (state, phone) => {
            state.phone = phone
        },
        SET_HABBIES: (state, habbies) => {
            state.habbies = habbies
        },
        SET_OCCUPATION: (state, occupation) => {
            state.occupation = occupation
        },
        SET_COUNTRY: (state, country) => {
            state.country = country
        },
        SET_DESCRIPTION: (state, description) => {
            state.description = description
        },
        SET_WEBSITE: (state, website) => {
            state.website = website
        },
        SET_LONGITUDE: (state, longitude) => {
            state.longitude = longitude
        },
        SET_LATITUDE: (state, latitude) => {
            state.latitude = latitude
        },
        SET_FIRSTNAME: (state, first_name) => {
            state.first_name = first_name
        },
        SET_LASTNAME: (state, longitude) => {
            state.longitude = longitude
        },
        SET_EMAIL: (state, email) => {
            state.email = email
        },
        SET_ALIAS: (state, alias) => {
            state.alias = alias
        },
        SET_LASTLOGIN: (state, last_login) => {
            state.last_login = last_login
        },
        SET_USERS_LIST: (state, users_list) => {
            state.users_list = users_list
        },
        SET_TOTAL: (state, total) => {
            state.total = total
        },
        SET_GROUPS_LIST: (state, groups_list) => {
            state.groups_list = groups_list
        },
        SET_GROUPS_TOTAL: (state, total) => {
            state.groups_total = total
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
        // 用户名登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                loginByUsername(username, userInfo.password).then(response => {
                    const data = response
                    commit('SET_TOKEN', data.token)
                    commit('SET_NAME', data.name)
                    setToken(data.token)
                    setName(data.name)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', getToken())
                commit('SET_NAME', getName())
                getUserInfo(state.token, state.name).then(response => {
                    if (!response) { // 由于mockjs 不支持自定义状态码只能这样hack
                        reject('error')
                    }
                    const data = response

                    if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }

                    commit('SET_AVATAR', data.avatar)
                    commit('SET_PHONE', data.phone)
                    commit('SET_HABBIES', data.habbies)
                    commit('SET_OCCUPATION', data.occupation)
                    commit('SET_COUNTRY', data.country)
                    commit('SET_DESCRIPTION', data.description)
                    commit('SET_WEBSITE', data.website)
                    commit('SET_LONGITUDE', data.longitude)
                    commit('SET_LATITUDE', data.latitude)
                    commit('SET_FIRSTNAME', data.first_name)
                    commit('SET_LASTNAME', data.last_name)
                    commit('SET_EMAIL', data.email)
                    commit('SET_ALIAS', data.alias)
                    commit('SET_LASTLOGIN', data.last_login)

                    setToken(state.token)
                    setName(state.name)
                    setUser(JSON.stringify(data))
                    resolve(response)
                }).catch(error => {
                    console.log("sdsdfds")
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', getToken())
                commit('SET_NAME', getName())
                logout(state.token, state.name).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_NAME', '')
                    removeToken()
                    removeName()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit, state }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_NAME', '')
                removeToken()
                removeName()
                resolve()
            })
        },

        // 动态修改权限
        ChangeRoles({ commit, dispatch }, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data
                    commit('SET_ROLES', data.roles)
                    commit('SET_NAME', data.name)
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_INTRODUCTION', data.introduction)
                    dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
                    resolve()
                })
            })
        },

        /**
         * 用户注册服务
         * @param {*} param0 
         * @param {*} register_info 
         */
        Register({ commit }, register_info) {
            return new Promise((resolve, reject) => {
                registerUser(register_info).then(response => {
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         *  重置用户密码
         */
        ResetPassword({ commit }, password_info) {
            return new Promise((resolve, reject) => {
                resetPassword(password_info).then(response => {
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         *  发送验证码
         */
        SendCode({ commit }, password_info) {
            return new Promise((resolve, reject) => {
                sendCode(password_info).then(response => {
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         *  编辑用户信息
         * @param {*} param0 
         * @param {*} user_info 
         */
        EditUserInfo({ commit, state }, user_info) {
            return new Promise((resolve, reject) => {
                editUserInfo(user_info).then(response => {
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取用户message
         */
        get_user_message({ commit, state }, query = {}) {
            return new Promise((resolve, reject) => {
                get_user_message(query).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取所有的用户信息
         * @param {*} param0 
         */
        get_users_list({ commit, state }, query) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_users_list(state.token, state.name, query).then(response => {
                    const data = response.data
                    const total = response.total
                    commit('SET_USERS_LIST', data)
                    commit('SET_TOTAL', total)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取所有的用户组列表
         * @param {*} param0 
         * @param {*} query 
         */
        get_groups_list({ commit, state }, query) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_groups_list(state.token, state.name, query).then(response => {
                    const data = response.data
                    const total = response.total
                    commit('SET_GROUPS_LIST', data)
                    commit('SET_GROUPS_TOTAL', total)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 编辑用户组
         * @param {*} param0 
         * @param {*} data 
         */
        edit_groups({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let name = data["name"]
            let remark = data["remark"]
            let id = data["id"]
            return new Promise((resolve, reject) => {
                edit_groups(state.token, state.name, id, name, remark).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 删除用户组
         * @param {*} param0 
         * @param {*} data 
         */
        del_groups({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let tags_id = data["id"]
            return new Promise((resolve, reject) => {
                del_groups(state.token, state.name, tags_id).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 新增用户组
         * @param {*} param0 
         * @param {*} groups_form 
         */
        add_groups({ commit, state }, groups_form) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                add_groups(state.token, state.name, groups_form).then(response => {
                    const data = response.data
                    commit('SET_GROUPS_LIST', data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取用户消息
         * @param {*} param0 
         * @param {*} query 
         */
        get_messages_list({ commit, state }, query) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_messags_list(state.token, state.name, query).then(response => {
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
         * 用户阅读消息
         * @param {*} param0 
         * @param {*} data 
         */
        read_messages({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let messages_id = data["id"]
            return new Promise((resolve, reject) => {
                read_messages(state.token, state.name, messages_id).then(response => {
                    let unread_messages_total = store.getters.unread_messages_total
                    let unread_messages_list = store.getters.unread_messages_list
                    unread_messages_list.forEach(items => {
                        if (items.id === data.id) {
                            unread_messages_list.pop(items)
                            if (unread_messages_total >= 1) {
                                unread_messages_total = unread_messages_total - 1
                            } else {
                                unread_messages_total = 0
                            }
                        }
                    });
                    commit('SET_UNREAD_MESSAGES_LIST', unread_messages_list)
                    commit('SET_UNREAD_MESSAGES_TOTAL', unread_messages_total)

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
        read_all_messages({ commit, state }) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                read_all_messages(state.token, state.name).then(response => {
                    let unread_messages_total = ""
                    let unread_messages_list = []
                    commit('SET_UNREAD_MESSAGES_LIST', unread_messages_list)
                    commit('SET_UNREAD_MESSAGES_TOTAL', unread_messages_total)
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
        del_messages({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let messages_id = data["id"]
            return new Promise((resolve, reject) => {
                del_messages(state.token, state.name, messages_id).then(response => {
                    let unread_messages_total = store.getters.unread_messages_total
                    let unread_messages_list = store.getters.unread_messages_list
                    unread_messages_list.forEach(items => {
                        if (items.id === data.id) {
                            unread_messages_list.pop(items)
                            if (unread_messages_total >= 1) {
                                unread_messages_total = unread_messages_total - 1
                            } else {
                                unread_messages_total = 0
                            }
                        }
                    });
                    commit('SET_UNREAD_MESSAGES_LIST', unread_messages_list)
                    commit('SET_UNREAD_MESSAGES_TOTAL', unread_messages_total)
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
        del_all_messages({ commit, state }) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                del_all_messages(state.token, state.name).then(response => {
                    let unread_messages_total = ""
                    let unread_messages_list = []
                    commit('SET_UNREAD_MESSAGES_LIST', unread_messages_list)
                    commit('SET_UNREAD_MESSAGES_TOTAL', unread_messages_total)
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
        get_messages({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let messages_id = data["id"]
            return new Promise((resolve, reject) => {
                get_messages(state.token, state.name, messages_id).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取未读取的消息
         * @param {*} param0 
         * @param {*} query 
         */
        get_unread_messages_list({ commit, state }, query) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_unread_messages_list(state.token, state.name, query).then(response => {
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
    }
}

export default user