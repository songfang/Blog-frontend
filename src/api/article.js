import request from '@/utils/request'
import { get_sign } from '@/utils/sign'
import { getToken, getName } from '@/utils/auth'

export function fetchList(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/list/',
        method: 'post',
        data: qs.stringify(params)
    })
}

export function get_blog_list(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/list/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function get_top_blog_list(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/toplist/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}


export function get_tags_list(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/listtagsname/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function fetchArticle(token, username, id) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/view/' + id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}


export function editArticle(token, username, data) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let id = data.id
    let params = data
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/edit/' + id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

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
    console.log(params)
    return request({
        url: '/users/upload/',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: params
    })
}

export function fetchPv(pv) {
    return request({
        url: '/article/pv',
        method: 'get',
        params: { pv }
    })
}

export function createArticle(token, username, data) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = data
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/add/',
        method: 'post',
        dataType: "json",
        data: qs.stringify(params)
    })
}

export function updateArticle(data) {
    return request({
        url: '/article/update',
        method: 'post',
        data
    })
}

export function create_browse(token, username, blogid) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/addbrowse/' + blogid + '/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 获取用户是否对文章点赞
 * @param {*} token 
 * @param {*} username 
 * @param {*} blogid 
 */
export function get_blog_thumbsup(token, username, blogid) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/getblogthumbsup/' + blogid + '/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 用户点赞或者取消点赞
 * @param {*} token 
 * @param {*} username 
 * @param {*} blogid 
 */
export function set_blog_thumbsup(token, username, blogid) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/settbloghumbsup/' + blogid + '/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

/**
 * 获取用户是否收藏文章
 * @param {*} token 
 * @param {*} username 
 * @param {*} blogid 
 */
export function get_blog_collectup(token, username, blogid) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/getblogcollectup/' + blogid + '/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function set_blog_collectup(token, username, blogid) {
    console.log(blogid)
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/setblogcollectup/' + blogid + '/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function add_blog_comments(token, username, blogid, comments) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = { "comments": comments }
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/addblogcomments/' + blogid + '/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function listBlogsComments(token, username, blogid) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/listcomments/' + blogid + '/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function list_second_level_comments(token, username, blogid) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/listsecondcomments/' + blogid + '/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}




export function thumbsup_comments(token, username, blogid, commentsid) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/thumbsupcomments/' + blogid + '/' + commentsid + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function rollback_comments(token, username, blogid, commentsid) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/rollbackcomments/' + blogid + '/' + commentsid + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function add_second_level_comments(token, username, blogid, commentsid, second_level_comments_id, comments) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = { "comments": comments }
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    if (second_level_comments_id === "") {
        return request({
            url: '/blogs/addsecondlevelcomments/' + blogid + '/' + commentsid + "/",
            method: 'post',
            dataType: 'json',
            data: qs.stringify(params)
        })
    } else {
        return request({
            url: '/blogs/addthirdlevelcomments/' + blogid + '/' + commentsid + "/" + second_level_comments_id + "/",
            method: 'post',
            dataType: 'json',
            data: qs.stringify(params)
        })
    }
}

export function delete_article(token, username, blogid) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/delete/' + blogid + '/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function get_all_tags_list(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/listalltags/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

edit_tags
export function edit_tags(token, username, tags_id, name, remark) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = { "name": name, "remark": remark }
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/edittags/' + tags_id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function del_tags(token, username, tags_id) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/deltags/' + tags_id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function get_catalogue_list(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/listcataloguename/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function add_catalogue(token, username, data) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = data
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/addcatalogue/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function get_all_catalogue_list(token, username, query) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = query
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/listallcatalogue/',
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

edit_tags
export function edit_catalogue(token, username, catalogue_id, name, remark) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = { "name": name, "remark": remark }
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/editcatalogue/' + catalogue_id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}

export function del_catalogue(token, username, catalogue_id) {
    let qs = require('qs')
    let timestamp = new Date().getTime().toString()
    const sign = get_sign(token, timestamp)
    let params = {}
    params["token"] = token
    params["username"] = username
    params["timestamp"] = timestamp
    params["sign"] = sign
    return request({
        url: '/blogs/delcatalogue/' + catalogue_id + "/",
        method: 'post',
        dataType: 'json',
        data: qs.stringify(params)
    })
}