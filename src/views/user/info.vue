<template>
  <div class="user-container" v-loading.fullscreen.lock="loading">
      <div class="user-left">
        <el-row>
            <el-col :span="24">
                <el-card :body-style="{ padding: '10px' }" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>个人信息</span>
                    <el-button style="float: right; padding: 3px 0" @click="usereditdialog = true" type="text">编辑</el-button>
                </div>
                <img :src=userform.avatar class="image">
                <div style="padding: 14px;">
                    <p class="userinfo" style="font-weight: bold;font-size: medium;">{{ userform.alias }}</p>
                    <p class="userinfo"><i class="el-icon-location">  {{ userform.country }}</i></p>
                    <p class="userinfo" style="font-weight: bold;font-size: medium;">关于我</p>
                    <p class="userinfo">{{ userform.description }}</p>
                    <el-collapse>
                        <el-collapse-item title="更多信息" name="1">
                            <el-table
                            v-model="usertable"
                            :data="usertable"
                            style="width: 100%;" :show-header="false">
                                <el-table-column
                                    prop="title"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="value"
                                    min-width="180">
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
                    <div class="usercenter">
                        <div class="userbtn">
                            <span class="user-svg-container"><svg-icon icon-class="article" class="icon"/></span>
                            <p class="userinfo">196篇文章</p>
                        </div>
                        <div class="userbtn">
                            <span class="user-svg-container"><svg-icon icon-class="watch" class="icon"/></span>
                            <p class="userinfo">196关注</p>
                        </div>
                        <div class="userbtn">
                            <span class="user-svg-container"><svg-icon icon-class="watcher" class="icon"/></span>
                            <p class="userinfo">196关注者</p>
                        </div>
                        <div class="userbtn">
                            <span class="user-svg-container"><svg-icon icon-class="mywatch" class="icon"/></span>
                            <p class="userinfo">我的关注</p>
                        </div>
                    </div>
                </div>
                </el-card>
            </el-col>
        </el-row>
      </div>
      <div class="user-right">
        <el-card class="box-card" :body-style="{ padding: '5px' }" shadow="hover">
            <div slot="header" class="clearfix">
                <span>最新动态</span>
            </div>
            <el-card class="box-card">
                <div class="user-message">
                    <div class="user-img">
                        <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="img-circle">
                    </div>
                    <div class="clearfix">
                        <div class="user-content">
                            <div class="user-content-header">
                                <span class="userinfo" style="font-weight: bold;font-size: small;">我的名字</span>
                                <span class="userinfo">196篇文章</span>
                                <span class="userinfo" style="font-weight: bold;font-size: small;">我的名字</span>
                                <span class="userinfo-time" style="font-weight: bold;font-size: small;">1天前</span>
                            </div>
                            <div class="user-content-body">
                                <p class="userinfo">会点前端技术，div+css啊，jQuery之类的，不是很精；热爱生活，热爱互联网，热爱新技术；有一个小的团队，在不断的寻求新的突破。</p>
                                <p class="userinfo">会点前端技术，div+css啊，jQuery之类的，不是很精；热爱生活，热爱互联网，热爱新技术；有一个小的团队，在不断的寻求新的突破。</p>
                            </div>
                            <div class="user-content-footer">
                                <span class="thumbs-up-container" size="mini" @click="thumbsup"><svg-icon icon-class="thumbs-up" class="icon"/></span>
                                <span class="thumbs-up-container" size="mini" @click="collectup"><svg-icon icon-class="collect-up" class="icon"/></span>
                                <span class="thumbs-up-container" size="mini" @click="commentup"><svg-icon icon-class="comment-up" class="icon"/></span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card">
                <div class="user-message">
                    <div class="user-img">
                        <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="img-circle">
                    </div>
                    <div class="clearfix">
                        <div class="user-content">
                            <div class="user-content-header">
                                <span class="userinfo" style="font-weight: bold;font-size: small;">我的名字</span>
                                <span class="userinfo">196篇文章</span>
                                <span class="userinfo" style="font-weight: bold;font-size: small;">我的名字</span>
                                <span class="userinfo-time" style="font-weight: bold;font-size: small;">1天前</span>
                            </div>
                            <div class="user-content-body">
                                <p class="userinfo">会点前端技术，div+css啊，jQuery之类的，不是很精；热爱生活，热爱互联网，热爱新技术；有一个小的团队，在不断的寻求新的突破。</p>
                                <p class="userinfo">会点前端技术，div+css啊，jQuery之类的，不是很精；热爱生活，热爱互联网，热爱新技术；有一个小的团队，在不断的寻求新的突破。</p>
                            </div>
                            <div class="user-content-footer">
                                <span class="thumbs-up-container" size="mini" @click="thumbsup"><svg-icon icon-class="thumbs-up" class="icon"/></span>
                                <span class="thumbs-up-container" size="mini" @click="collectup"><svg-icon icon-class="collect-up" class="icon"/></span>
                                <span class="thumbs-up-container" size="mini" @click="commentup"><svg-icon icon-class="comment-up" class="icon"/></span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card> 
            <el-card class="box-card">
                <div class="user-message">
                    <div class="user-img">
                        <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="img-circle">
                    </div>
                    <div class="clearfix">
                        <div class="user-content">
                            <div class="user-content-header">
                                <span class="userinfo" style="font-weight: bold;font-size: small;">我的名字</span>
                                <span class="userinfo">196篇文章</span>
                                <span class="userinfo" style="font-weight: bold;font-size: small;">我的名字</span>
                                <span class="userinfo-time" style="font-weight: bold;font-size: small;">1天前</span>
                            </div>
                            <div class="user-content-body">
                                <p class="userinfo">会点前端技术，div+css啊，jQuery之类的，不是很精；热爱生活，热爱互联网，热爱新技术；有一个小的团队，在不断的寻求新的突破。</p>
                                <p class="userinfo">会点前端技术，div+css啊，jQuery之类的，不是很精；热爱生活，热爱互联网，热爱新技术；有一个小的团队，在不断的寻求新的突破。</p>
                            </div>
                            <div class="user-content-footer">
                                <span class="thumbs-up-container" size="mini" @click="thumbsup"><svg-icon icon-class="thumbs-up" class="icon"/></span>
                                <span class="thumbs-up-container" size="mini" @click="collectup"><svg-icon icon-class="collect-up" class="icon"/></span>
                                <span class="thumbs-up-container" size="mini" @click="commentup"><svg-icon icon-class="comment-up" class="icon"/></span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card> 
        </el-card>
      </div>
      <el-dialog title="个人资料" :visible.sync="usereditdialog" center width="50%">
        <el-form :model="userform">
            <el-form-item label="昵称" label-width="80px">
                <el-input v-model="userform.alias" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" label-width="80px">
                <el-input v-model="userform.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="爱好" label-width="80px">
                <el-input v-model="userform.hobbies" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="职业" label-width="80px">
                <el-input v-model="userform.occupation" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="国家" label-width="80px">
                <el-input v-model="userform.country" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="主页" label-width="80px">
                <el-input v-model="userform.website" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="简介" label-width="80px">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="userform.description" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="头像" label-width="80px">
                <el-upload
                class="avatar-uploader"
                action=""
                accept="image/*"
                :show-file-list="false"
                :http-request="upload"
                :v-loading="uploadloading"
                :before-upload="beforeAvatarUpload">
                <img v-if="userform.avatar" :src="userform.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="usereditdialog = false">取 消</el-button>
            <el-button type="primary" v-loading="usereditloading" @click="edituserinfo">确 定</el-button>
        </div>
        </el-dialog>
  </div>
</template>

<script>
import { uploadFiles } from '@/api/login'

export default {
  name: 'Info',
  data(){
    return {
      currentDate: new Date(),
      redirect: undefined,
      loading: true,
      userform: {
          name: "",
          email: "",
          alias: "",
          avatar: "",
          phone: "",
          hobbies: "",
          occupation: "",
          country: "",
          description: "",
          website: "",
          longitude: "",
          latitude: "",
          first_name: "",
          last_name: "",
          last_login: "",
      },
      usertable: [],
      usereditdialog: false,
      uploadloading: false,
      usereditloading: false,
    }
  },
  created(){
      this.getuserinfo();
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    getuserinfo(){
        this.$store.dispatch('GetUserInfo').then(res => {
            this.userform = res
            this.getusertable()
            this.loading = false
        }).catch((error) => {
            console.log(error)
            this.loading = false
        })
    },
    getusertable(){
        if(this.userform.email){
            let userinfo = {"title": "邮箱", "value": this.userform.email}
            this.usertable.push(userinfo)
        }
        if(this.userform.phone){
            let userinfo = {"title": "手机", "value": this.userform.phone}
            this.usertable.push(userinfo)
        }
        if(this.userform.hobbies){
            let userinfo = {"title": "爱好", "value": this.userform.hobbies}
            this.usertable.push(userinfo)
        }
        if(this.userform.occupation){
            let userinfo = {"title": "职业", "value": this.userform.occupation}
            this.usertable.push(userinfo)
        }
        if(this.userform.website){
            let userinfo = {"title": "网站", "value": this.userform.website}
            this.usertable.push(userinfo)
        }
    },
    thumbsup(){
        this.$message({
          showClose: true,
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
    },
    collectup(){
        this.$message({
          showClose: true,
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
    },
    commentup(){
        this.$message({
          showClose: true,
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
    },
    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
    },
    upload(params){
      var formData = new FormData();  
      formData.append("file", params.file);
      uploadFiles(params.file).then(res => {
        this.userform.avatar = res.data
        this.$message({
          showClose: true,
          message: '图片上传成功，保存即可生效！',
          type: 'success'
        });
        this.uploadloading = false
        }).catch(err => {
          console.log('报错', err)
          this.uploadloading = false
        })
    },
    edituserinfo(){
        this.usereditloading = true
        this.$store.dispatch('EditUserInfo', this.userform).then(() => {
            this.$message({
                showClose: true,
                message: '恭喜你，编辑内容成功！',
                type: 'success'
            });
            this.usereditdialog = false;
            this.usereditloading = false
            this.$router.go(0)
        })
    },
  }

}
</script>

<style>
.user-container{
    margin: 10px;
    background-color: #676a6c; 
}
.user-left{
    width: 35%;
    height: 100%;
    float: left;
    background-color: #e7eaec;
}

.user-right{
    width: 64%;
    height: 100%;
    float: right;
    background-color: #e7eaec;
}

.image {
    width: 100%;
    display: block;
}
.userinfo{
    margin: 10px 0px 10px 0px;
    width: 100%;
    font-size: small;
}

.userinfo-time{
    margin: 0px;
    width: 20%;
    font-size: small; 
    float: right;
    text-align: right;
}
.usercenter{
    width: 100%;
    margin: 10px 0px 10px 0px;

}
.userbtn {
    display: inline-block;
    cursor: pointer;
    text-align: center;
    margin: auto;
    width: 23%;
}
.icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
}
.wx-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    background-color: #8ada53;
}

.user-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    background-color: #FFFFFF;
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
    width: 100%;
    display: block;
    border-radius:50%;
}

.thumbs-up-container {
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    padding-top: 0px;
    border-radius: 4px;
    cursor:pointer;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
