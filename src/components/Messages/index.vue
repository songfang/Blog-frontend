<template>
  <div>
    <el-badge v-if="unread_messages_total" :value="unread_messages_total" :max="99" class="item">
    <span size="medium" trigger="click" class="message">
      <svg-icon class-name="international-icon" icon-class="notify" />
    </span>
    </el-badge>
</div>
</template>

<script>

import { mapGetters } from 'vuex'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'unread_messages_list',
      'unread_messages_total',
    ])
  },
  methods: {
  }
}
</script>

<style>
.cd-timeline-content {
  width: 100%;
  position: relative;
  margin-left: 10px;
  background: #F5F5F5;
  padding: 0px;
  box-shadow: 0 3px 0 darken(#e9f0f5, 5%);
  clear: both;
  content: "";
  display: inline-block;
  border-radius: 25px;
}

.cd-timeline-content::before {
    content: '';
    position: absolute;
    top: 16px;
    right: 100%;
    height: 0;
    width: 0;
    border: 7px solid transparent;
    border-right: 7px solid #F5F5F5;
  }

  .cd-timeline-content::after {
    content: '';
    position: absolute;
    top: 16px;
    right: 100%;
    height: 0;
    width: 0;
    border: 7px solid transparent;
    border-right: 7px solid #F5F5F5;
  }

.icon-heart {
    width: 30px;
  }

.timeline-item{
  border-bottom:0px; 
  margin-top:0px; 
  padding-bottom: 0px;
}
.user-container{
    margin: 10px;
    background-color: #e7eaec; 
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
  .feed-photo{
    max-height: 180px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

.international-icon {
  font-size: 20px;
  height: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
}
.item {
  margin-top: 0px;
  margin-right: 0px;
  cursor: pointer;
}
</style>

