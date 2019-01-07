<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">欢迎注册本站(⊙o⊙)</h3>
      <el-form-item class="el-form-item" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="邮箱" />
      </el-form-item>
      <el-form-item class="el-form-item" prop="alias">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.alias" name="alias" type="text" auto-complete="on" placeholder="昵称" />
      </el-form-item>
      <el-form-item class="el-form-item" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter.native="handleRegister" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item class="el-form-item" prop="repeatpassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.repeatpassword"
          name="repeatpassword"
          auto-complete="on"
          placeholder="重复密码"
          @keyup.enter.native="handleRegister" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item class="el-form-item">
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
          注    册
        </el-button>
      </el-form-item>
      <div class="tips">
        <router-link :to="'/login'" class="link-type">
          <a style="color: #eee; margin: 0px;">登录</a>
        </router-link>
      </div>
      <div class="sigma-content">
        <div class="sigma-middle-line">
          <span class="sigma-line-text">第三方登录</span>
        </div>
      </div>
      <div class="social-signup-container">
        <div class="social-center">
          <div class="sign-btn" @click="wechatHandleClick('wechat')">
            <span class="wx-svg-container"><svg-icon icon-class="wechat" class="icon"/></span>
          </div>
          <div class="sign-btn" @click="tencentHandleClick('tencent')">
            <span class="qq-svg-container"><svg-icon icon-class="qq" class="icon"/></span>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      var re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!value.length) {
        this.$message({
          message: '请输入正确的邮箱!',
          type: 'info'
        })
        return
      }else if(!re.test(value)){
         this.$message({
          message: '邮箱格式不正确!',
          type: 'info'
        })
        return
      } else if(value.length > 256){
        this.$message({
          message: '邮箱长度最大256位!',
          type: 'info'
        })
        return
      }else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!value.length) {
        this.$message({
          message: '请设置正确格式的密码!',
          type: 'info'
        })
        return
      } else if(value.length < 6){
        this.$message({
          message: '密码长度最小6位!',
          type: 'info'
        })
        return
      } else if(value.length > 32){
        this.$message({
          message: '密码长度最大32位!',
          type: 'info'
        })
        return
      }else{
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        repeatpassword:'',
        alias: '',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
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
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    },
    handleRegister() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Register', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    wechatHandleClick(thirdpart) {
      this.$message({
          message: "本功能暂时先不开放!",
          type: 'warning'
        })
    },
    tencentHandleClick(thirdpart) {
      this.$message({
          message: "本功能暂时先不开放!",
          type: 'warning'
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
  .forgetpassword{
    width: 100%;
    position: relative;
    right: 0px;
    font-size: 14px;
    color: $light_gray;
    margin-bottom: 10px;
    text-align: right;
    color: #eee;
  }
  .sigma-content{
    margin: 0px auto;
    text-align: center;
  }
  .sigma-middle-line:before{
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    background-color: #999;
    position: relative;
    top: 10px;
    left: 0;
  }
  .sigma-line-text{
    display: inline-block;
    background: $bg;
    color: $light_gray;
    padding: 0 18px 0 18px;
    position: relative;
    font-size: 14px;
    font-weight: 500;
  }
  .social-signup-container {
    margin: 20px auto;
    .social-center{
      width: 120px;
      margin: 0 auto;
    }
    .sign-btn {
      display: inline-block;
      cursor: pointer;
    }
    .icon {
      color: #fff;
      font-size: 24px;
      margin-top: 8px;
    }
    .wx-svg-container,
    .qq-svg-container {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding-top: 1px;
      border-radius: 4px;
      margin-bottom: 20px;
      margin-right: 5px;
    }
    .wx-svg-container {
      background-color: #8ada53;
    }
    .qq-svg-container {
      background-color: #6BA2D6;
      margin-left: 10px;
    }
  }
}
</style>
