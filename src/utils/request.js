import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, getName } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        if (store.getters.token) {
            config.headers['X-Token'] = store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
        } else {
            config.headers['X-Token'] = getToken()
        }
        if (store.getters.name) {
            config.headers['X-Name'] = store.getters.name // 让每个请求携带自定义name 请根据实际情况自行修改
        } else {
            config.headers['X-Name'] = getName()
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        const res = response.data
        if (res.code !== 20000) {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            })

            if (res.code === 50001) {
                // 50001 用户名为空
                Message({
                    message: '用户名为空',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50002) {
                // 50002 密码为空
                Message({
                    message: '密码为空',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50003) {
                // 50003 密码不正确
                Message({
                    message: '用户名和密码不匹配！',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50004) {
                // 50004 用户未激活
                Message({
                    message: '用户未激活！',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50005) {
                // 50005 请求不包含timestamp
                Message({
                    message: '访问接口参数错误，不带时间搓!',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50006) {
                // 50006 请求中的timestamp超过5分钟
                Message({
                    message: '访问接口参数错误，时间戳超时!',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50007) {
                // 50007 请求不包含sign
                Message({
                    message: '访问接口参数错误，不包含sign!',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50008) {
                // 50008 请求sign错误
                Message({
                    message: '访问接口参数错误，sign错误!',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50009 || res.code === 50010 || res.code === 50012 || res.code === 50011) {
                // 50009: token 为空;50010:非法的token; 50012:其他客户端登录了;  50011:Token 过期了;
                this.$message.confirm(
                    '你已被登出，可以取消继续留在该页面，或者重新登录',
                    '确定登出', {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            } else if (res.code === 50013) {
                // 50013 请求参数错误错误
                Message({
                    message: '访问接口参数错误，参数有误！',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50014) {
                // 50014 请求参数错误错误
                Message({
                    message: '重复输入密码错误！',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50015) {
                // 50015 请求参数错误错误
                Message({
                    message: '用户已经存在！',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50016) {
                // 50015 请求参数错误错误
                Message({
                    message: '用户激活码发送失败！',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else if (res.code === 50017) {
                // 50017 catalogue已经存在
                Message({
                    message: '目录已经存在！',
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service