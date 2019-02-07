import request from '@/utils/request'
import { get_sign } from '@/utils/sign'

export function get_blog_data(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/countdata/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function get_blog_month_data(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/countmonthdata/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function get_blog_week_data(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/countweekdata/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function get_blog_tags_data(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/counttagsdata/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function get_blog_domain_data(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/countdomaindata/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function get_version_list(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/messages/version/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 获取位置统计信息
 * @param {*} token 
 * @param {*} username 
 */
export function get_location_info(token, username) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/countlocationinfo/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}