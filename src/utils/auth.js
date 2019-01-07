/**
 * 通过Cookies将store中的数据持久化，可以设置cookie的有效期
 * 如果不设置有效期，则默认关闭浏览器失效
 * cookie只能存储string，如果需要存储对象，需要将对象序列化
 * 基本上只是用来存储用户的信息
 * 由于cookie的key唯一，因此一个浏览器只能同时支持单个用户登录
 */


import Cookies from 'js-cookie'

const TokenKey = 'x-token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

const NameKey = 'x-name'
export function getName() {
    return Cookies.get(NameKey)
}

export function setName(name) {
    return Cookies.set(NameKey, name)
}

export function removeName(NameKey) {
    return Cookies.remove(NameKey)
}

const UserKey = 'x-user'
export function getUser() {
    return Cookies.get(UserKey)
}

export function setUser(value) {
    return Cookies.set(UserKey, value)
}

export function removeUser(UserKey) {
    return Cookies.remove(UserKey)
}