<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
    <div class="messages" v-if="show_messages">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
      <el-card class="box-card" :body-style="{ padding: '5px' }" shadow="hover">
          <div slot="header" class="clearfix">
              <span>未读消息</span>
          </div>
          <timeline timeline-theme="lightblue">
            <div v-for="message in unread_messages_list" :key="message.id">
                <timeline-item class="timeline-item">
                    <img src="/static/img/message.png" class="icon-heart" slot="others">
                    <div class="cd-timeline-content">
                        <el-col :span="24">
                            <el-card shadow="none" style="margin: 0px;border: 0px;background-color:#F5F5F5;">
                                <div class="user-message">
                                    <div class="user-img">
                                        <img :src="message.avatar" class="img-circle">
                                    </div>
                                    <div class="clearfix">
                                        <div class="user-content">
                                            <div class="user-content-header">
                                                <span class="userinfo" style="font-weight: bold;font-size: small;">{{ message.operator }}</span>
                                                <span class="userinfo">{{ message.action.zh }}</span>
                                                <span class="userinfo" v-if="message.target" style="font-weight: bold;font-size: small;">{{ message.target.zh }}</span>
                                                <span class="userinfo-time" style="font-weight: bold;font-size: small;">{{ message.created_time }}</span>
                                            </div>
                                            <div class="user-content-body">
                                                <code class="userinfo" v-if="message.target !== '' && message.image_list.length < 1">
                                                    <span class="userinfo" style="font-weight: bold;font-size: small;">{{ message.msg_old }}</span>
                                                    <span class="userinfo">  变更为  </span>
                                                    <span class="userinfo" style="font-weight: bold;font-size: small;">{{ message.msg_new }}</span>
                                                </code>
                                                <img :src="item.value" v-for="item in message.image_list" :key="item.id"  class="feed-photo">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <div class="show_more">
                            <el-button type="success" plain size="mini" @click="handle_read(message)">查看详情</el-button>
                        </div>
                    </div>
                </timeline-item>
            </div>
            <div class="contaner-more">
                <router-link class="inlineBlock" to="/messages/list">
                    <el-button type="primary" plain size="mini"> >> 查看所有消息</el-button>
                </router-link>
            </div>
          </timeline>
      </el-card>
    </el-col>
    </div>
  </section>
</template>

<script>

import { mapGetters } from 'vuex'
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import bus from '@/main.js'

export default {
  name: 'AppMain',
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  data(){
    return {
      currentDate: new Date(),
      redirect: undefined,
      message_list: [],
      show_messages: false,
    }
  },
  created(){
  },
  mounted(){
    bus.$on('show_messages',(data)=>{
        if(this.show_messages){
            this.show_messages = false
        }else{
            this.show_messages = data
        }});
  },
  computed: {
    ...mapGetters([
      'unread_messages_list',
      'unread_messages_total',
    ]),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  methods: {
      handle_read(message){
        this.$store.dispatch('read_messages', message).then(res => {
            message.is_read = true
            this.$router.push({ path: this.redirect || '/messages/info/' + message.id })
        }).catch((error) => {
            console.log(error)
        })
      },
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.messages{
  position:absolute;
  top:0px;
  right: 0px;
  z-index:10
}

.icon-heart{
    width: 30px;
    height: 30px;
}

.show_more{
    margin: 5px;
    float: right;
    font-size: 15px;
}
.cd-timeline-content{
    border-radius: 0px;
    margin-bottom: 10px;
}

.contaner-more{
    width: 100%;
    height: 30px;
    font-size: 15px;
    padding-left: 36px;
    float: right;
    margin-bottom: 20px;
}
</style>

