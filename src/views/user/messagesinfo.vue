<template>
  <div class="user-container" v-loading="loading">
    <el-row>
    <el-col :span="24">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-card :body-style="{ padding: '10px' }" shadow="hover">
        <div slot="header" class="clearfix">
            <span style="font-weight: bold;font-size: medium;">【{{ message_form.msg_new }}】</span>
            <span style="color: grey;font-size: medium;">{{ message_form.updated_time }}</span>
        </div>
        <div style="padding: 10px;">
            <p>
                尊敬的
                <span style="font-weight: bold;font-size: medium;">{{ message_form.receiver }}</span>: 
            </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;您好，
                <span style="font-weight: bold;">{{ message_form.operator }}</span>
                {{ message_form.action }}您的{{ message_form.target }} 
                <span style="font-weight: bold;">《{{ message_form.msg_new }}》。</span></p>
            <p>感谢您的支持！</p>
            <div class="bottom clearfix">
                <el-button 
                type="primary" 
                style="float: right;" 
                plain 
                v-loading="del_btn_loading"
                @click="handle_delete()">删除
            </el-button>
            </div>
        </div>
        </el-card>
      </el-col>
    </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Info',
  data(){
    return {
      currentDate: new Date(),
      redirect: undefined,
      loading: false,
      message_form: {
          id: "",
          operator: "",
          action: "",
          target: "",
          msg_old: "",
          msg_new: "",
          receiver: "",
          updated_time: "",
          created_time: "",
          is_successed: "",
          is_read: "",
          is_running: "",
      },
      del_btn_loading: false,
    }
  },
  created(){
      const id = this.$route.params && this.$route.params.id
      this.message_form.id = id
      this.get_messages_info()
      this.handle_read()
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
    get_messages_info(){
        this.loading = true
        this.$store.dispatch('get_messages', this.message_form).then(res => {
            this.loading = false
            this.message_form = res.data
            this.message_form.action = action
        }).catch((error) => {
            console.log(error)
        })
    },
    handle_delete(){
        this.$confirm('此操作将永久删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.del_btn_loading = true
            this.$store.dispatch('del_messages', this.message_form).then(res => {
                this.del_btn_loading = false
                this.$router.push({ path: this.redirect || '/messages/list/' })
            }).catch((error) => {
                console.log(error)
            })
        }).catch(() => {  

            });
    },
    handle_read() {
        this.$store.dispatch('read_messages', this.message_form).then(res => {
        }).catch((error) => {
            console.log(error)
        })
    },
  }

}
</script>

<style>
.user-container{
    margin: 10px;
    background-color: #e7eaec; 
}
.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
</style>
