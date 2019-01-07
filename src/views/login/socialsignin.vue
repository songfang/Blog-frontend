<template>
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
</template>

<script>
// import openWindow from '@/utils/openWindow'

export default {
  name: 'SocialSignin',
  methods: {
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

<style rel="stylesheet/scss" lang="scss" scoped>
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
</style>
