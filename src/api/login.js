import request from '@/utils/request'
import { get_sign } from '@/utils/sign'
import { getToken, getName } from '@/utils/auth'

/**
 * login 不需要进行sign校验
 * @param {*} username 
 * @param {*} password 
 */
export function loginByUsername(username, password) {
    let qs = require('qs')
    let params = {
        'username': username,
        'password': password
    }
    return request({
        url: '/users/login/',
        method: 'post',
        dataType: "json",
        data: qs.stringify(params)
    })
}

/**
 * 需要进行token、timestamp、sign校验
 */
export function logout(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {
        'token': token,
        'username': username,
        'timestamp': timestamp,
        'sign': sign
    }
    return request({
        url: '/users/logout/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 获取用户信息
 * @param {*} token 
 * @param {*} username 
 */
export function getUserInfo(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {
        'token': token,
        'username': username,
        'timestamp': timestamp,
        'sign': sign
    }
    return request({
        url: '/users/info/',
        method: 'post',
        data: qs.stringify(params)
    })
}


/**
 * 注册用户
 * @param {*} register_info 
 */
export function registerUser(register_info) {
    let qs = require('qs')
    let username = register_info.username
    let password = register_info.password
    let repeatpassword = register_info.repeatpassword
    let params = {
        'username': username,
        'password': password,
        'repeatpassword': repeatpassword
    }
    return request({
        url: '/users/register/',
        method: 'post',
        dataType: "json",
        data: qs.stringify(params)
    })
}


/**
 * 重置用户密码
 */

export function resetPassword(register_info) {
    let qs = require('qs')
    let username = register_info.username
    let password = register_info.password
    let repeatpassword = register_info.repeatpassword
    let params = {
        'username': username,
        'password': password,
        'repeatpassword': repeatpassword
    }
    return request({
        url: '/users/resetpassword/',
        method: 'post',
        dataType: "json",
        data: qs.stringify(params)
    })
}

/**
 * 发送验证码
 */
export function sendCode(register_info) {
    let qs = require('qs')
    let username = register_info.username
    let password = register_info.password
    let repeatpassword = register_info.repeatpassword
    let params = {
        'username': username,
        'password': password,
        'repeatpassword': repeatpassword
    }
    return request({
        url: '/users/code/',
        method: 'post',
        dataType: "json",
        data: qs.stringify(params)
    })
}

/**
 * 上传文件
 * @param {*} data 
 */
export function uploadFiles(data) {
    let token = getToken()
    let username = getName()
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = new FormData();
    params.append("files", data)
    params.append("token", token)
    params.append("username", username)
    params.append("timestamp", timestamp)
    params.append("sign", sign)
    return request({
        url: '/users/upload/',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: params
    })
}

/**
 * 编辑用户信息
 * @param {*} data 
 */
export function editUserInfo(data) {
    let token = getToken()
    let username = getName()
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = data;
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/users/edit/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 获取用户动态
 */
export function get_user_message(query) {
    let token = getToken()
    let username = getName()
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query;
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/users/messages/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}


/**
 * 获取所有的用户信息
 * @param {*} token 
 * @param {*} username 
 * @param {*} query 
 */
export function get_users_list(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/users/list/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 获取所有的用户组列表
 * @param {*} token 
 * @param {*} username 
 * @param {*} query 
 */
export function get_groups_list(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/users/listgroups/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 编辑用户组
 * @param {*} token 
 * @param {*} username 
 * @param {*} catalogue_id 
 * @param {*} name 
 * @param {*} remark 
 */
export function edit_groups(token, username, group_id, name, remark) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = { "name": name, "remark": remark }
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/users/editgroups/' + group_id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 删除用户组
 * @param {*} token 
 * @param {*} username 
 * @param {*} group_id 
 */
export function del_groups(token, username, group_id) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/users/delgroups/' + group_id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 新增用户组
 * @param {*} token 
 * @param {*} username 
 * @param {*} data 
 */
export function add_groups(token, username, data) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = data
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/users/addgroups/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 获取当前用户所有消息
 * @param {*} token 
 * @param {*} username 
 * @param {*} query 
 */
export function get_messags_list(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/messages/list/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 用户阅读消息
 * @param {*} token 
 * @param {*} username 
 * @param {*} query 
 */
export function read_messages(token, username, messages_id) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/messages/read/' + messages_id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 用于读取所有消息
 * @param {*} token 
 * @param {*} username 
 */
export function read_all_messages(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/messages/readall/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 删除用户消息
 * @param {*} token 
 * @param {*} username 
 * @param {*} messages_id 
 */
export function del_messages(token, username, messages_id) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/messages/del/' + messages_id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 删除所有用户消息
 * @param {*} token 
 * @param {*} username 
 */
export function del_all_messages(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/messages/delall/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 获取messages信息
 * @param {*} token 
 * @param {*} username 
 * @param {*} messages_id 
 */
export function get_messages(token, username, messages_id) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/messages/info/' + messages_id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 获取未读的消息
 * @param {*} token 
 * @param {*} username 
 * @param {*} query 
 */
export function get_unread_messages_list(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/messages/unlist/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 获取用户menu
 * @param {*} token 
 * @param {*} username 
 * @param {*} query 
 */
export function get_menu_list(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/users/listmenu/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 编辑用户菜单
 * @param {*} token 
 * @param {*} username 
 * @param {*} data
 */
export function edit_menu(token, username, data) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = data
    let id = data["id"]
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/users/editmenu/' + id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params, { arrayFormat: 'brackets' })
    })
}

/**
 * 获取用户菜单
 * @param {*} token 
 * @param {*} username 
 */
export function get_user_menu(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/users/getmenu/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}