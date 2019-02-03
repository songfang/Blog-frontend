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
export function get_user_message() {
    let token = getToken()
    let username = getName()
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {};
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