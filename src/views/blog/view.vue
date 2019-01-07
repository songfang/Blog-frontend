<template>
  <div v-loading.fullscreen.lock="loading">
    <sticky :class-name="'sub-navbar '+postform.status" v-if="edit_flag">
      <div class="sub-navbar-container">
        <router-link class="inlineBlock" :to="'/blog/edit/' +postform.id">
          <el-button style="margin-left: 10px;" type="success">编辑</el-button>
        </router-link>
      </div>
    </sticky>
    <div class="components-container">
        <div class="editor-container">
          <el-card class="box-card" :body-style="{ padding: '10px'}">
              <div slot="header" class="blog-content-header">
                <span style="font-size: 48px;">{{ postform.title }}</span>
              </div>
              <div class="blog-message">
                  <div class="clearfix">
                      <div class="blog-content">
                          <div class="blog-content-body">
                              <div v-html="postform.body"></div>
                          </div>
                          <div class="blog-content-footer">
                              <div class="blog-content-tags">
                                  <el-tag type="success" style="margin-right: 5px;" v-for="tag in tags_list" :key="tag">{{ tag }} </el-tag>
                              </div>
                              <div class="blog-content-comments">
                                  <div class="userbtn">
                                      <span class="thumbs-up-container" size="mini" @click="set_blog_thumbsup(postform.id)"><svg-icon :icon-class="thumbsup" class="icon"/></span>
                                      <p class="userinfo">赞({{ postform.thumbsup }})</p>
                                  </div>
                                  <div class="userbtn">
                                      <span class="thumbs-up-container" size="mini" @click="set_blog_collectup(postform.id)"><svg-icon :icon-class="collectup" class="icon"/></span>
                                      <p class="userinfo">收藏({{ postform.collectup }})</p>
                                  </div>
                                  <div class="userbtn">
                                      <span class="thumbs-up-container" size="mini"><svg-icon icon-class="mywatch" class="icon"/></span>
                                      <p class="userinfo">浏览({{ postform.browse }})</p>
                                  </div>
                                  <div class="userbtn">
                                    <span class="thumbs-up-container" size="mini" @click="set_blog_comments(postform.id)"><svg-icon icon-class="comment-up" class="icon"/></span>
                                    <p class="userinfo">评论({{ postform.comments }})</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <el-card class="box-card" v-if="postform.comments_disabled == false && comments_list.length >= 1">
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold;">大家评一评</span>
                </div>
                <div class="user-message">
                  <div v-for="comments in comments_list" :key="comments.comments">
                    <el-card class="box-card" style="margin-bottom: 0px;" >
                      <div class="user-img">
                          <img :src="comments.avatar" class="img-circle">
                      </div>
                      <div class="clearfix">
                          <div class="user-content">
                              <div class="user-content-header">
                                  <span class="userinfo" style="font-weight: bold;font-size: small;">{{ comments.auther }}</span>
                                  <span class="userinfo-time" style="font-weight: bold;font-size: small;float:right;">{{ comments.updated_time }}</span>
                              </div>
                              <div class="user-content-body">
                                  <p class="userinfo">{{ comments.comments }}</p>
                              </div>
                              <div class="user-content-footer">
                                <div class="blog-content-comments" style="width: 200px;">
                                    <div class="userbtn">
                                        <span class="thumbs-up-container" size="mini" @click="set_comments_thumbsup(postform.id, comments)"><svg-icon :icon-class="comments.thumbsup_icon" class="icon"/></span>
                                        <p class="userinfo">赞({{ comments.thumbsup }})</p>
                                    </div>
                                    <div class="userbtn">
                                      <span class="thumbs-up-container" size="mini" @click="set_comments_comments(postform.id,comments.id)"><svg-icon icon-class="comment-up" class="icon"/></span>
                                      <p class="userinfo">评论</p>
                                    </div>
                                    <div class="userbtn" v-if="comments.owner === user_info.name">
                                      <span class="thumbs-up-container" size="mini" @click="rollback_comments_comments(postform.id,comments)"><svg-icon icon-class="comment-up-rollback" class="icon"/></span>
                                      <p class="userinfo">撤回</p>
                                    </div>
                                </div>
                              </div>
                          </div>
                      </div>
                      <div v-for="second_level_comments in second_level_comments_list" :key="second_level_comments.comments">
                        <el-card class="box-card" style="margin-bottom: 0px;" v-if="comments.floor.split('.')[0] === second_level_comments.floor.split('.')[0]">
                          <div class="user-img">
                              <img :src="second_level_comments.avatar" class="img-circle">
                          </div>
                          <div class="clearfix">
                              <div class="user-content">
                                  <div class="user-content-header">
                                      <span class="userinfo" style="font-weight: bold;font-size: small;">{{ second_level_comments.auther }}</span>
                                      <span class="userinfo-time" style="font-weight: bold;font-size: small;float:right;">{{ second_level_comments.updated_time }}</span>
                                  </div>
                                  <div class="user-content-body">
                                      <p class="userinfo">{{ second_level_comments.comments }}</p>
                                  </div>
                                  <div class="user-content-footer">
                                    <div class="blog-content-comments" style="width: 200px;">
                                        <div class="userbtn">
                                            <span class="thumbs-up-container" size="mini" @click="set_comments_thumbsup(postform.id, second_level_comments)"><svg-icon :icon-class="second_level_comments.thumbsup_icon" class="icon"/></span>
                                            <p class="userinfo">赞({{ second_level_comments.thumbsup }})</p>
                                        </div>
                                        <div class="userbtn">
                                          <span class="thumbs-up-container" size="mini" @click="set_comments_comments(postform.id,comments.id,second_level_comments.id)"><svg-icon icon-class="comment-up" class="icon"/></span>
                                          <p class="userinfo">评论</p>
                                        </div>
                                        <div class="userbtn" v-if="second_level_comments.owner === user_info.name">
                                          <span class="thumbs-up-container" size="mini" @click="rollback_comments_comments(postform.id,second_level_comments)"><svg-icon icon-class="comment-up-rollback" class="icon"/></span>
                                          <p class="userinfo">撤回</p>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                          </div>
                        </el-card>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-card> 
          </el-card>
        </div>
    </div>

    <el-dialog title="博客评论" :visible.sync="comment_form.visable">
      <div class="user-message">
        <div class="clearfix">
            <div class="user-content">
                <div class="user-content-body">
                    <el-form :model="comment_form" ref="comment_form" class="comment_form">
                    <el-form-item prop="comments" :rules="[{ required: true, message: '评论不能为空'}]">
                      <el-input type="textarea" v-model="comment_form.comments" :autosize="{ minRows: 4, maxRows: 6}" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" v-loading="blog_comments_loading" @click="submit_comment('comment_form')">提交</el-button>
                      <el-button @click="rest_comment('comment_form')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </div>
            </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Sticky from '@/components/Sticky'

export default {
  name: 'MarkdownDemo',
  components: { Sticky },
  data() {
    return {
      postform: {
          id: -1,
          title: "",
          sub_title: "",
          body: "",
          html: '',
          comments_disabled: false,
          catalogue: "",
          tags: "",
          updated_time: "",
          collectup: "",
          browse: "",
          thumbsup: "",
          comments: "",
      },
      catalogue_list: [],
      tags_list: [],
      comments_list: [],
      second_level_comments_list: [],
      listQuery: {
        page: 1,
        limit: 100
      },
      loading: true,
      edit_flag: false,
      thumbsup: "",
      collectup: "",
      comment_form: {
        blogid: "",
        commentsid: "",
        second_level_comments_id: "",
        comments: "",
        visable: false,
      },
      blog_comments_loading: false,
      user_info: {
        name: "",
        alias: "",
        avatar: "",
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.postform.id = id
    this.browse(id)
    this.get_blog_info(id)
    this.get_user_info()
    this.get_blog_thumbsup(id)
    this.get_blog_collectup(id)
    this.get_blog_comments_list(id)
    this.get_second_level_comments_list(id)
  },
  computed: {
  },
  mounted(){
  },
  methods: {
    /**
     * 文章浏览
     */
    browse(id){
      this.$store.dispatch('create_browse', id).then(res => {
      }).catch((error) => {
        console.log(error)
      })
    },
    /**
     * 获取文章信息
     */
    get_blog_info(id) {
      this.$store.dispatch('FethchArticle', id).then(res => {
        this.postform.title = this.$store.getters.title
        this.postform.sub_title = this.$store.getters.sub_title
        this.postform.body = this.$store.getters.body
        this.postform.catalogue = this.$store.getters.catalogue
        this.tags_list = this.$store.getters.tags_list
        this.postform.updated_time = this.$store.getters.updated_time
        this.postform.thumbsup = res.data.thumbsup
        this.postform.collectup = res.data.collectup
        this.postform.browse = res.data.browse
        this.postform.comments = res.data.comments
        this.postform.comments_disabled = res.data.comments_disabled
        if(res.data.auther === this.$store.getters.name){
          this.edit_flag = true
        }else{
          this.edit_flag = false
        }
        this.loading = false
      }).catch((error) => {
        console.log(error)
        this.loading = false
      })
    },
    /**
     * 获取用户信息
     */
    get_user_info(){
      this.$store.dispatch('GetUserInfo').then(res => {
          this.user_info.avatar = res.avatar
          this.user_info.name = res.name
          this.user_info.alias = res.alias
      }).catch((error) => {
          console.log(error)
      })
    },
    /**
     * 获取当前用户是否对当前文章点赞
     */
    get_blog_thumbsup(id){
      this.$store.dispatch('get_blog_thumbsup', id).then(res => {
        if(res.data.is_thumbsup){
          this.thumbsup = "thumbs-up"
        }else{
          this.thumbsup = "thumbs-up-cancel"
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /**
     * 当前用户对当前文章点赞或者撤回点赞
     */
    set_blog_thumbsup(id){
      this.$store.dispatch('set_blog_thumbsup', id).then(res => {
        if(res.data.is_thumbsup){
          this.thumbsup = "thumbs-up"
        }else{
          this.thumbsup = "thumbs-up-cancel"
        }
        this.postform.thumbsup = res.data.thumbsup;
      }).catch((error) => {
        console.log(error)
      })
    },
    /**
     * 获取当前用户是否收藏当前文章
     */
    get_blog_collectup(id){
        this.$store.dispatch('get_blog_collectup', id).then(res => {
        if(res.data.is_collectup){
          this.collectup = "collect-up"
        }else{
          this.collectup = "collect-up-cancel"
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /**
     * 当前用户对当前文章收藏、取消收藏
     */
    set_blog_collectup(id){
      this.$store.dispatch('set_blog_collectup', id).then(res => {
        if(res.data.is_collectup){
          this.collectup = "collect-up"
        }else{
          this.collectup = "collect-up-cancel"
        }
        this.postform.collectup = res.data.collectup;
      }).catch((error) => {
        console.log(error)
      })
    },
    /**
     * 弹出文章一级评论框
     */
    set_blog_comments(id) {
      this.comment_form.blogid = id
      if(this.comment_form.visable){
        this.comment_form.visable = false
      } else {
        this.comment_form.visable = true
      }
    },
    /**
     * 提交评论
     */
    submit_comment(formName) {
      this.$refs[formName].validate((valid) => {
        this.blog_comments_loading = true
        if (valid) {
          /**
           * 提交文章一级评论
           */
          if(this.comment_form.commentsid === ""){
            let data = {"blogid": this.postform.id, "comments": this.comment_form.comments}
            this.$store.dispatch('add_blog_comments', data).then(res => {
              let data = {
                "id": res.data.id,
                "comments": res.data.comments, 
                "auther": res.data.auther,
                "owner": res.data.owner,
                "avatar": res.data.avatar,
                "updated_time": res.data.updated_time,
                "thumbsup_icon":"thumbs-up-cancel",
                "floor":res.data.floor ,
                "thumbsup":0,
                "visable": true}
              this.comments_list.push(data)
              this.blog_comments_loading = false
              this.postform.comments = res.data.comments_total
              this.comment_form.comments = ""
              this.comment_form.blogid = this.postform.id
              this.comment_form.commentsid = ""
              this.comment_form.visable = false
            }).catch((error) => {
              console.log(error)
            })
          }else{
            /**
             * 提交文章二级评论
             */
            let data = {"blogid": this.comment_form.blogid,
            "commentsid": this.comment_form.commentsid,
            "second_level_comments_id": this.comment_form.second_level_comments_id,
            "comments": this.comment_form.comments}
            this.$store.dispatch('add_second_level_comments', data).then(res => {
              let data = {
                "id": res.data.id,
                "comments": res.data.comments, 
                "auther": res.data.auther,
                "owner": res.data.owner, 
                "avatar": res.data.avatar,
                "updated_time": res.data.updated_time,
                "thumbsup_icon":"thumbs-up-cancel",
                "floor":res.data.floor ,
                "thumbsup":0,
                "visable": true}
              this.second_level_comments_list.push(data)
              this.blog_comments_loading = false
              this.comment_form.comments = ""
              this.comment_form.blogid = this.postform.id
              this.comment_form.commentsid = ""
              this.comment_form.visable = false
            }).catch((error) => {
              console.log(error)
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * 重置
     */
    rest_comment(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 一级评论列表
     */
    get_blog_comments_list(id){
      this.$store.dispatch('ListBlogsComments', id).then(res => {
        const data_list = res.data
        data_list.forEach(items => {
          let thumbsup = "thumbs-up"
          if(items.is_thumbsup){
            thumbsup = "thumbs-up" 
          }else{
            thumbsup = "thumbs-up-cancel"
          }
          let data = {"thumbsup": items.thumbsup,
          "thumbsup_icon": thumbsup, 
          "id": items.id , 
          "comments":items.comments,
           "auther": items.auther,
           "owner": items.owner,
           "avatar": items.avatar,
           "pre_comment": items.pre_comment,
           "is_thumbsup": items.is_thumbsup,
           "updated_time": items.updated_time,
           "floor": items.floor}
          this.comments_list.push(data)
        });
        this.comment_form.visable = false
      }).catch((error) => {
          console.log(error)
      })
    },
    /**
     * 获取二级评论列表
     */
    get_second_level_comments_list(id){
      this.$store.dispatch('list_second_level_comments', id).then(res => {
        const data_list = res.data
        data_list.forEach(items => {
          let thumbsup = "thumbs-up"
          if(items.is_thumbsup){
            thumbsup = "thumbs-up" 
          }else{
            thumbsup = "thumbs-up-cancel"
          }
          let data = {"thumbsup": items.thumbsup,
          "thumbsup_icon": thumbsup, 
          "id": items.id , 
          "comments":items.comments,
           "auther": items.auther,
           "owner": items.owner,
           "avatar": items.avatar,
           "pre_comment": items.pre_comment,
           "is_thumbsup": items.is_thumbsup,
           "updated_time": items.updated_time,
           "floor": items.floor}
          this.second_level_comments_list.push(data)
        });
      }).catch((error) => {
          console.log(error)
      })
    },
    /**
     * 一级、二级评论点赞
     */
    set_comments_thumbsup(blogid, comments){
      let data = {"blogid": blogid, "commentsid": comments.id}
      this.$store.dispatch('thumbsup_comments', data).then(res => {
        let thumbsup_icon = "thumbs-up"
        if(res.data.is_thumbsup){
          thumbsup_icon = "thumbs-up"
        }else{
          thumbsup_icon = "thumbs-up-cancel"
        }
        let index = this.comments_list.indexOf(comments)
        if(index !== -1){
          this.$set(this.comments_list[index], "thumbsup", res.data.thumbsup)
          this.$set(this.comments_list[index], "thumbsup_icon", thumbsup_icon)
        }else{
          index = this.second_level_comments_list.indexOf(comments)
          this.$set(this.second_level_comments_list[index], "thumbsup", res.data.thumbsup)
          this.$set(this.second_level_comments_list[index], "thumbsup_icon", thumbsup_icon)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /**
     * 弹出一级、二级评论对话框
     */
    set_comments_comments(blogid, commentsid, second_level_comments_id){
      if(blogid){
        this.comment_form.blogid = blogid
      }
      if(commentsid){
        this.comment_form.commentsid = commentsid
      }
      if(second_level_comments_id){
        this.comment_form.second_level_comments_id = second_level_comments_id
      }      
      if(this.comment_form.visable){
        this.comment_form.visable = false
      } else {
        this.comment_form.visable = true
      }
    },
    /**
     * 撤回一级、二级评论
     */
    rollback_comments_comments(blogid, comments){
      let data = {"blogid": blogid, "commentsid": comments.id}
      var index = this.comments_list.indexOf(comments)
      if(index !== -1){
        this.comments_list.splice(index, 1)
      }else{
        index = this.second_level_comments_list.indexOf(comments)
        this.second_level_comments_list.splice(index, 1)
      }
      this.$store.dispatch('rollback_comments', data).then(res => {
        this.postform.comments = res.data.comments
      }).catch((error) => {
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>
.components-container{
  word-wrap: break-word; 
  word-break: break-all; 
  height: 100%;
  margin: 0px;
  
}
.form-container{
  margin: 0px;
  height: 100%;
}
.editor-container{
  margin: 10px;
}
.markdown-container{
  width: 100%;
  height: 100%;
}
.sub-navbar {
  height: 40px;
  position: relative;
  width: 100%;
}
.sub-navbar-container{
  height: 50px;
  line-height: 50px;
  position: relative;
  width: 100%;
  text-align: right;
  padding-right: 20px;
  margin: 0px 10px 10px 10px;
  transition: 600ms ease position;
}
.no-border{
  width: 240px;
  text-align: center;
}
.catalogue-container{
  width: 45%;
  float: left;
}
.tags-container{
  width: 20%;
  float: right;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 40px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  height: 40px;
  margin-left: 10px;
  vertical-align: bottom;
}
.header-container{
  padding: 0px;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: black;
}
.box-card{
  padding: 0px;
}

.blog-content-comments{
    width: 300px;
    float: right;
    font-size: medium;
}
.userbtn {
  display: inline-block;
  cursor: pointer;
  text-align: center;
  margin: auto;
  width: 60px;
}
.blog-content-header{
  text-align: center;
}
.blog-content-body{
  height: 100%;
  overflow:scroll;

}
code {
  white-space: normal;
}
.html-container::after {
    white-space: normal;
}

.user-message{
    width: 100%;
    margin: 0px 0px 20px 0px;
}
.user-img{
    width: 5%;
    float: left;
    left: 0px;
}
.user-content{
    width: 98%;
    float: left;
    margin-left: 10px;
}
.user-content-header{
    width: 100%;
}

.user-content-body{
    width: 100%;
}

.user-content-footer{
    width: 100%;
}

.clearfix {
    overflow: auto;
}

.img-circle {
    width: 40px;
    height: 40px;
    display: block;
}
.comment_form{
  margin-top: 10px;
}
</style>
