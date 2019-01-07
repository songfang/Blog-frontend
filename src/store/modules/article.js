import {
    createArticle,
    fetchArticle,
    editArticle,
    uploadFiles,
    get_blog_list,
    add_catalogue,
    get_catalogue_list,
    get_tags_list,
    get_top_blog_list,
    create_browse,
    get_blog_thumbsup,
    set_blog_thumbsup,
    get_blog_collectup,
    set_blog_collectup,
    add_blog_comments,
    listBlogsComments,
    list_second_level_comments,
    thumbsup_comments,
    rollback_comments,
    add_second_level_comments,
    delete_article,
    get_all_tags_list,
    del_tags,
    edit_tags,
    get_all_catalogue_list,
    del_catalogue,
    edit_catalogue,
} from '@/api/article'
import {
    getToken,
    getName,
} from '@/utils/auth'

const article = {
    state: {
        token: getToken(),
        name: '',
        status: 'draft',
        title: '', // 文章题目
        sub_title: '', // 摘要
        body: '', // 文章内容
        image_uri: '', // 文章图片
        catalogue: '',
        tags: [],
        id: undefined,
        comments_disabled: false,
        inputVisible: false,
        inputValue: '',
        article_list: [],
        total: 0,
        catalogue_list: [],
        tags_list: [],
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_TITLE: (state, title) => {
            state.title = title
        },
        SET_SUBTITLE: (state, sub_title) => {
            state.sub_title = sub_title
        },
        SET_BODY: (state, body) => {
            state.body = body
        },
        SET_IMAGEURL: (state, image_uri) => {
            state.image_uri = image_uri
        },
        SET_CATALOGUE: (state, catalogue) => {
            state.catalogue = catalogue
        },
        SET_TAGS: (state, tags) => {
            state.tags = tags
        },
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_COMMENT_DISABLED: (state, comments_disabled) => {
            state.comments_disabled = comments_disabled
        },
        SET_INPUTVISIBLE: (state, inputVisible) => {
            state.inputVisible = inputVisible
        },
        SET_INPUTVALUE: (state, inputValue) => {
            state.inputValue = inputValue
        },
        SET_ARTICLELIST: (state, article_list) => {
            state.article_list = article_list
        },
        SET_TOTAL: (state, total) => {
            state.total = total
        },
        SET_CATALOGUE_LIST: (state, catalogue_list) => {
            state.catalogue_list = catalogue_list
        },
        SET_TAGS_LIST: (state, tags_list) => {
            state.tags_list = tags_list
        },
    },

    actions: {
        /**
         * 获取博客列表
         */
        get_blog_list({ commit, state }, query) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_blog_list(state.token, state.name, query).then(response => {
                    const data = response.data
                    const total = response.total
                    commit('SET_ARTICLELIST', data)
                    commit('SET_TOTAL', total)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取热门文章
         * @param {*} param0 
         * @param {*} query 
         */
        get_top_blog_list({ commit, state }, query) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_top_blog_list(state.token, state.name, query).then(response => {
                    const data = response.data
                    const total = response.total
                    commit('SET_ARTICLELIST', data)
                    commit('SET_TOTAL', total)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         *  博客目录列表
         */
        get_catalogue_list({ commit, state }, query) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_catalogue_list(state.token, state.name, query).then(response => {
                    const data = response.data
                    commit('SET_CATALOGUE_LIST', data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         *  博客tags名称列表
         */

        get_tags_list({ commit, state }, query) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_tags_list(state.token, state.name, query).then(response => {
                    const data = response.data
                    commit('SET_TAGS_LIST', data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 创建博客
         * @param {*} param0 
         * @param {*} postForm 
         */
        CreateArticle({ commit, state }, postForm) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                createArticle(state.token, state.name, postForm).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 编辑博客
         */
        FethchArticle({ commit, state }, id) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', getToken())
                commit('SET_NAME', getName())
                fetchArticle(state.token, state.name, id).then(response => {
                    const data = response.data
                    commit('SET_TITLE', data.title)
                    commit('SET_SUBTITLE', data.sub_title)
                    commit('SET_BODY', data.body)
                    commit('SET_CATALOGUE', data.catalogue)
                    commit('SET_TAGS_LIST', data.tags)
                    commit('SET_IMAGEURL', data.image_uri)
                    commit('SET_COMMENT_DISABLED', data.comments_disabled)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         *  编辑博客
         */

        EditArticle({ commit, state }, postForm) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                // console.log(state.token, state.name)
                editArticle(state.token, state.name, postForm).then(response => {
                    const data = response.data
                    commit('SET_TITLE', data.title)
                    commit('SET_SUBTITLE', data.sub_title)
                    commit('SET_BODY', data.body)
                    commit('SET_CATALOGUE', data.catalogue)
                    commit('SET_TAGS_LIST', data.tags)
                    commit('SET_IMAGEURL', data.image_uri)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 上传文件
         * @param {*} param0 
         * @param {*} file 
         */
        UploadFiles({ commit, state }, file) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                // console.log(state.token, state.name)
                uploadFiles(state.token, state.name, file).then(response => {
                    const data = response.data
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         *  新建博客目录
         */
        add_catalogue({ commit, state }, catalogue_form) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                add_catalogue(state.token, state.name, catalogue_form).then(response => {
                    const data = response.data
                    commit('SET_CATALOGUE_LIST', data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 用户浏览
         * @param {*} param0 
         */
        create_browse({ commit, state }, blogid) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                create_browse(state.token, state.name, blogid).then(response => {
                    const data = response.data
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取点赞
         * @param {*} param0 
         * @param {*} blogid 
         */
        get_blog_thumbsup({ commit, state }, blogid) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_blog_thumbsup(state.token, state.name, blogid).then(response => {
                    const data = response.data
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 用户点赞
         * @param {*} param0 
         * @param {*} blogid 
         */
        set_blog_thumbsup({ commit, state }, blogid) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                set_blog_thumbsup(state.token, state.name, blogid).then(response => {
                    const data = response.data
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取收藏
         * @param {*} param0 
         * @param {*} blogid 
         */
        get_blog_collectup({ commit, state }, blogid) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_blog_collectup(state.token, state.name, blogid).then(response => {
                    const data = response.data
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 用户收藏
         * @param {*} param0 
         * @param {*} blogid 
         */
        set_blog_collectup({ commit, state }, blogid) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                set_blog_collectup(state.token, state.name, blogid).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 添加博客评论
         * @param {*} param0 
         * @param {*} blogid 
         * @param {*} comments 
         */
        add_blog_comments({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let blogid = data["blogid"]
            let comments = data["comments"]
            return new Promise((resolve, reject) => {
                add_blog_comments(state.token, state.name, blogid, comments).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取评论
         * @param {*} param0 
         * @param {*} blogid 
         */
        ListBlogsComments({ commit, state }, blogid) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                listBlogsComments(state.token, state.name, blogid).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取二级评论
         * @param {*} param0 
         * @param {*} blogid 
         */
        list_second_level_comments({ commit, state }, blogid) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                list_second_level_comments(state.token, state.name, blogid).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 针对评论点赞
         * @param {*} param0 
         * @param {*} blogid 
         */
        thumbsup_comments({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let blogid = data["blogid"]
            let commentsid = data["commentsid"]
            return new Promise((resolve, reject) => {
                thumbsup_comments(state.token, state.name, blogid, commentsid).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 撤回评论
         * @param {*} param0 
         * @param {*} data 
         */
        rollback_comments({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let blogid = data["blogid"]
            let commentsid = data["commentsid"]
            return new Promise((resolve, reject) => {
                rollback_comments(state.token, state.name, blogid, commentsid).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 二级评论
         * @param {*} param0 
         * @param {*} data 
         */
        add_second_level_comments({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let blogid = data["blogid"]
            let commentsid = data["commentsid"]
            let second_level_comments_id = data["second_level_comments_id"]
            let comments = data["comments"]
            return new Promise((resolve, reject) => {
                add_second_level_comments(state.token, state.name, blogid, commentsid, second_level_comments_id, comments).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 删除文章
         * @param {*} param0 
         * @param {*} data 
         */
        delete_article({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let blogid = data["blogid"]
            return new Promise((resolve, reject) => {
                delete_article(state.token, state.name, blogid).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取所有的tags列表
         * @param {*} param0 
         * @param {*} query 
         */
        get_all_tags_list({ commit, state }, query) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_all_tags_list(state.token, state.name, query).then(response => {
                    const data = response.data
                    commit('SET_TAGS_LIST', data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 编辑tags
         * @param {*} param0 
         * @param {*} data 
         */
        edit_tags({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let name = data["name"]
            let remark = data["remark"]
            let id = data["id"]
            return new Promise((resolve, reject) => {
                edit_tags(state.token, state.name, id, name, remark).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 删除tags
         * @param {*} param0 
         * @param {*} data 
         */
        del_tags({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let tags_id = data["id"]
            return new Promise((resolve, reject) => {
                del_tags(state.token, state.name, tags_id).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 获取目录
         * @param {*} param0 
         * @param {*} query 
         */
        get_all_catalogue_list({ commit, state }, query) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            return new Promise((resolve, reject) => {
                get_all_catalogue_list(state.token, state.name, query).then(response => {
                    const data = response.data
                    commit('SET_TAGS_LIST', data)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 编辑目录
         * @param {*} param0 
         * @param {*} data 
         */
        edit_catalogue({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let name = data["name"]
            let remark = data["remark"]
            let id = data["id"]
            return new Promise((resolve, reject) => {
                edit_catalogue(state.token, state.name, id, name, remark).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 删除目录
         * @param {*} param0 
         * @param {*} data 
         */
        del_catalogue({ commit, state }, data) {
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', getName())
            let tags_id = data["id"]
            return new Promise((resolve, reject) => {
                del_catalogue(state.token, state.name, tags_id).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default article