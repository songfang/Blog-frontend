<template>
  <div class="users-container" v-loading="loading">
      <div class="users-left">
        <el-row>
            <el-col :span="24">
                <el-card :body-style="{ padding: '0px' }" shadow="hover" v-if="userslist.length >= 1">
                <div slot="header" class="clearfix">
                    <span class="usersheader">用户列表</span>
                    <el-input type="text" placeholder="请输入需要搜索的用户" v-model="search" suffix-icon="el-icon-search" class="input-with-select">
                    </el-input>
                </div>
                <div style="padding: 5px;">
                    <el-row :gutter="8">
                        <div v-for="users in filteruserslist" :key="users.id">
                            <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}">
                                <div class="chart-wrapper">
                                    <el-card class="box-card" :body-style="{ padding: '10px' }">
                                        <el-col :span="24">
                                            <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}">
                                                <div class="users-content-body">
                                                    <img :src="users.avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
                                                </div>
                                            </el-col>
                                            <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 16}" :xl="{span: 16}">
                                                <div class="users-content-body">
                                                    <router-link class="inlineBlock" :to="'/user/view/' + users.id">
                                                        <p class="userinfo" style="font-weight: bold;font-size: medium;">{{ users.alias }}</p>
                                                        <el-tag type="success" style="margin: 0px 0px 0px 10px" v-for="role in users.roles" :key="role">{{ role }} </el-tag>
                                                        <p class="userinfo" v-if="users.country"><i class="el-icon-location">  {{ users.country }}</i></p>
                                                        <p class="userinfo" v-if="users.phone">电话： {{ users.phone }}</p>
                                                        <p class="userinfo" v-if="users.email">邮件： {{ users.email }}</p>
                                                        <p class="userinfo" v-if="users.website">网站： {{ users.website }}</p>
                                                        <p class="userinfo" v-if="users.description" >简介： {{ users.description }}</p>
                                                    </router-link>
                                                </div>
                                            </el-col>
                                        </el-col>
                                    </el-card>
                                </div>
                            </el-col>
                        </div>
                    </el-row>
                </div>

                <el-pagination class="pagination-container"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="listQuery.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>

                </el-card>
            </el-col>
        </el-row>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Info',
  data(){
    return {
        search: "",
        redirect: undefined,
        loading: true,
        userslist: [],
        total: 1,
        currentPage:1,
        listQuery: {
            page: 1,
            limit: 20
        },
        tags_list:[],
        catalogue_list: [],
        userstoplist: [],
    }
  },
  created(){
      this.getuserslist();
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
    getuserslist(){
        this.$store.dispatch('get_users_list', this.listQuery).then(res => {
            this.userslist = res.data
            this.total = res.total
            this.loading = false
        }).catch((error) => {
            console.log(error)
            this.loading = false
        })
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.listQuery.limit = val
        this.getuserslist()
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.listQuery.page = val
        this.getuserslist()
    }
  },
  computed:{
    filteruserslist: function(){
        let items = this.userslist
        var searchRegex = new RegExp(this.search, 'i');
        var arr=[];
        for(var i= 0, j = items.length; i < j; i++){
            let match_flag = false
            if(items[i].roles){
                for(var index= 0; index < items[i].roles.length; index++){
                    if(searchRegex.test(items[i].roles[index])){
                        match_flag = true
                    }
                }
            }
            if(searchRegex.test(items[i].username) || 
                searchRegex.test(items[i].email) || 
                searchRegex.test(items[i].avatar) ||
                searchRegex.test(items[i].phone) ||
                searchRegex.test(items[i].hobbies) ||
                searchRegex.test(items[i].occupation) ||
                searchRegex.test(items[i].country) ||
                searchRegex.test(items[i].description) ||
                searchRegex.test(items[i].website) ||
                searchRegex.test(items[i].alias)){
                match_flag = true
            }
            
            if(match_flag){
                let tmp = 
                {
                    "id": items[i].id,
                    "username": items[i].username, 
                    "email": items[i].email,
                    "roles": items[i].roles,
                    "avatar": items[i].avatar, 
                    "phone": items[i].phone,
                    "hobbies": items[i].hobbies,
                    "occupation": items[i].occupation,
                    "country": items[i].country,
                    "description": items[i].description,
                    "website": items[i].website,
                    "longitude": items[i].longitude,
                    "latitude": items[i].latitude,
                    "alias": items[i].alias,
                    "updated_time": items[i].updated_time,
                    "created_time": items[i].created_time,
                }
                arr.push(tmp);
            }
        }
        return arr;
    }
  },
}
</script>

<style>
.users-container{
    margin: 10px;
    background-color: #676a6c; 
}
.users-left{
    width: 100%;
    height: 100%;
    float: left;
    background-color: #e7eaec;
}

.users-right{
    width: 30%;
    height: 100%;
    float: right;
    background-color: #e7eaec;
}

.image {
    width: 100%;
    display: block;
}
.usersinfo{
    margin: 10px 0px 10px 0px;
    width: 100%;
    font-size: small;
}

.usersinfo-time{
    margin: 0px;
    width: 20%;
    font-size: small; 
    float: right;
    text-align: right;
}
.userscenter{
    width: 100%;
    margin: 10px 0px 10px 0px;

}
.usersbtn {
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

.users-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    background-color: #FFFFFF;
}

.users-message{
    width: 100%;
    height: 40;
    margin: 0px;
}
.users-img{
    width: 10%;
    float: left;
    left: 0px;
}
.users-content{
    width: 98%;
    float: left;
    margin-left: 10px;
}
.users-content-header{
    width: 100%;
}

.users-content-body{
    width: 100%;
    height: 240px;
}

.users-content-footer{
    width: 100%;
}

.users-content-tags{
    width: 30%;
    float: left;
}

.users-content-comments{
    width: 260px;
    float: right;
    font-size: x-small;
}

.clearfix {
    overflow: auto;
}

.img-circle {
    max-width: 100%;
    max-height: 100%;
    display: block;
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

  .userbtn {
    display: inline-block;
    cursor: pointer;
    text-align: center;
    margin: auto;
    width: 60px;
  }
  .userinfo{
      margin: 10px;
      font-size: small;
  }
  .input-with-select {
    background-color: #fff;
    width: 30%;
    float: right;
  }
  .usersheader{
      font-size: 30px;
  }
  .pagination-container{
      margin-top: 20px;
      margin-bottom: 10px;
      float: right;
  }
  .catalogue-container{
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .catalogue-li-container{
      height: 25px;
  }
.chart-wrapper {
    background: #fff;
    padding: 5px 5px 0;
    margin-bottom: 32px;  
    transition:All 0.4s ease-in-out;
    -webkit-transition:All 0.4s ease-in-out;
    -moz-transition:All 0.4s ease-in-out;
    -o-transition:All 0.4s ease-in-out;
  }


.chart-wrapper:hover {
    transform:scale(1.2);
    -webkit-transform:scale(1.2);
    -moz-transform:scale(1.2);
    -o-transform:scale(1.2);
    -ms-transform:scale(1.2);
}

.user-avatar {
    cursor: pointer;
    width: 120px;
    height: 120px;
    border-radius: 100%;
}
</style>
