<template>
  <div class="blog-container" v-loading="loading">
      <el-row>
        <el-col :span="24">
            <el-row :gutter="10">
                <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 16}" :xl="{span: 16}">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover" v-if="bloglist.length >= 1">
                        <div slot="header" class="clearfix">
                            <span class="blogheader">文章列表</span>
                            <el-input type="text" placeholder="请输入需要搜索的文章" v-model="search" suffix-icon="el-icon-search" class="input-with-select">
                            </el-input>
                        </div>
                        <div style="padding: 5px;">
                            <div v-for="blog in filterbloglist" :key="blog.id">
                                <el-card class="box-card" :body-style="{ padding: '10px' }">
                                    <div class="blog-message">
                                        <div class="clearfix">
                                            <div class="blog-content">
                                                <div class="blog-content-header">
                                                    <router-link class="inlineBlock" :to="'/blog/view/' + blog.id">
                                                        <span class="bloginfo" style="font-weight: bold;font-size: large;">{{ blog.title }}</span>
                                                        <span class="bloginfo-time" style="font-weight: bold;font-size: small;">{{ blog.created_time }}</span>
                                                    </router-link>
                                                </div>
                                                <div class="blog-content-body">
                                                    <p class="bloginfo">{{ blog.sub_title }}</p>
                                                </div>
                                                <div class="blog-content-footer">
                                                    <div class="blog-content-tags">
                                                        <el-tag type="success" style="margin-right: 5px;" v-for="tag in blog.tags_list" :key="tag">{{ tag }} </el-tag>
                                                    </div>
                                                    <div class="blog-content-comments">
                                                        <div class="userbtn">
                                                            <span class="thumbs-up-container" size="mini"><svg-icon icon-class="thumbs-up" class="icon"/></span>
                                                            <p class="userinfo">赞({{ blog.thumbsup }})</p>
                                                        </div>
                                                        <div class="userbtn">
                                                            <span class="thumbs-up-container" size="mini"><svg-icon icon-class="collect-up" class="icon"/></span>
                                                            <p class="userinfo">收藏({{ blog.collectup }})</p>
                                                        </div>
                                                        <div class="userbtn">
                                                            <span class="thumbs-up-container" size="mini"><svg-icon icon-class="mywatch" class="icon"/></span>
                                                            <p class="userinfo">浏览({{ blog.browse }})</p>
                                                        </div>
                                                        <div class="userbtn">
                                                            <span class="thumbs-up-container" size="mini"><svg-icon icon-class="comment-up" class="icon"/></span>
                                                            <p class="userinfo">评论({{ blog.comments }})</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-card>
                            </div>
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
            <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 8}" :xl="{span: 8}">
            <el-card class="box-card" v-if="bloglist.length >= 1" :body-style="{ padding: '5px' }" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>TOP文章</span>
                </div>
                <div v-for="blog in blogtoplist" :key="blog.name">
                    <el-card class="box-card">
                        <div class="blog-message">
                            <div class="clearfix">
                                <div class="blog-content">
                                    <div class="blog-content-header">
                                        <router-link class="inlineBlock" :to="'/blog/view/' + blog.id">
                                            <span class="bloginfo" style="font-weight: bold;font-size: large;">{{ blog.title }}</span>
                                        </router-link>
                                    </div>
                                    <div class="blog-content-body">
                                        <p class="bloginfo">{{ blog.sub_title }}</p>
                                    </div>
                                    <div class="blog-content-footer">
                                        <span class="thumbs-up-container" size="mini"><svg-icon icon-class="thumbs-up" class="icon"/>{{ blog.thumbsup }}</span>
                                        <span class="thumbs-up-container" size="mini"><svg-icon icon-class="collect-up" class="icon"/>{{ blog.collectup }}</span>
                                        <span class="thumbs-up-container" size="mini"><svg-icon icon-class="mywatch" class="icon"/>{{ blog.browse }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-card>
            <el-card class="box-card" v-if="catalogue_list.length >= 1" :body-style="{ padding: '5px' }" shadow="hover">
                <div slot="header" class="clearfix">
                    <router-link class="inlineBlock" :to="'/blog/catalogue/'">
                        <span>目录列表</span>
                    </router-link>
                </div>
                <el-card class="box-card">
                    <div class="blog-message">
                        <ul id="v-for-object" class="catalogue-container">
                            <li  v-for="catalogue in catalogue_list" :key="catalogue.id">
                                <el-tag type="warning" style="margin-bottom: 5px;">{{ catalogue.name }} </el-tag>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-card>
            <div id="catalogue-pie" style="width: 100%;height: 200px;margin-top: 10px;"></div>
    
            <el-card class="box-card" v-if="tags_list.length >= 1" :body-style="{ padding: '5px' }" shadow="hover">
                <div slot="header" class="clearfix">
                    <router-link class="inlineBlock" :to="'/blog/tags/'">
                        <span>TAGS列表</span>
                    </router-link>
                </div>
                <el-card class="box-card">
                    <div class="blog-message">
                        <el-tag type="success" style="margin-right: 5px;margin-bottom: 5px;" v-for="tag in tags_list" :key="tag.id">{{ tag.name }} </el-tag>
                    </div>
                </el-card>
            </el-card>
            <div id="tags-pie" style="width: 100%;height: 600px;margin-top: 10px;"></div>
            </el-col>
            </el-row>
        </el-col>
      </el-row>
  </div>
</template>

<script>

var echarts = require('echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');

export default {
  name: 'Info',
  data(){
    return {
        search: "",
        redirect: undefined,
        loading: true,
        bloglist: [],
        total: 1,
        currentPage:1,
        listQuery: {
            page: 1,
            limit: 20
        },
        catalogue_list: [],
        blogtoplist: [],
        catalogue_name_list: [],
        catalogue_count_list: [],
        tags_list:[],
        tags_name_list: [],
        tags_count_list: [],
    }
  },
  created(){
      this.getbloglist();
  },
  mounted(){
      
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
    getbloglist(){
        this.$store.dispatch('get_blog_list', this.listQuery).then(res => {
            this.bloglist = res.data
            this.total = res.total
            this.loading = false
        }).catch((error) => {
            console.log(error)
            this.loading = false
        })
        this.$store.dispatch('get_catalogue_list', this.listQuery).then(res => {
          this.catalogue_list = res.data
          this.catalogue_list.forEach(items => {
             this.catalogue_name_list.push(items.name)
             this.catalogue_count_list.push({"name": items.name, "value": items.value})  
          });
          this.echartPie('catalogue-pie', this.catalogue_name_list, this.catalogue_count_list)
        }).catch((error) => {
          console.log(error)
        })
      this.$store.dispatch('get_tags_list', this.listQuery).then(res => {
          this.tags_list = res.data
          this.tags_list.forEach(items => {
              this.tags_name_list.push(items.name)
              this.tags_count_list.push({"name": items.name, "value": items.value})
          });
          this.echartPie('tags-pie', this.tags_name_list, this.tags_count_list)
        }).catch((error) => {
          console.log(error)
        })
      this.$store.dispatch('get_top_blog_list',this.listQuery).then(res => {
          this.blogtoplist = res.data
        }).catch((error) => {
          console.log(error)
        })
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.listQuery.limit = val
        this.getbloglist()
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.listQuery.page = val
        this.getbloglist()
    },
    echartPie(containerid, name_list, count_list) { // 饼状图的相关配置与事件 
        // 1. 默认选中了某一个
        // 2. 鼠标离开记录上次选中的作为当前选中的
        var echarts = require('echarts');
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(containerid));
        // 不能在单个容器上初始化多个 ECharts 实例。
        //实例容器，一般是一个具有高宽的div元素。

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: name_list
            },
            series: [
                {
                    name:'文章统计',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: count_list
                }
            ]
        };

        myChart.setOption(option);
        init(0);

        function init(index) {
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: index
            });
        }
        //记录上次高亮的索引
        var lastMouseOverIndex = null;
        // mouseover事件，记录当前数据索引并取消其他高亮，over在out之后
        myChart.on('mouseover', function(params) {
            var dataLen = option.series[0].data.length;
            lastMouseOverIndex = params.dataIndex;
            for(var i = 0; i < dataLen; i++) {
                if(i != params.dataIndex) {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: i
                    })
                }
            }
        });
        // mouseout事件，将上次的高亮
        myChart.on('mouseout', function(params) {
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: lastMouseOverIndex
            })
        });
    },
  },
  computed:{
    filterbloglist: function(){
        let items = this.bloglist
        var searchRegex = new RegExp(this.search, 'i');
        var arr=[];
        for(var i= 0, j = items.length; i < j; i++){
            let match_flag = false
            if(items[i].tags_list){
                for(var tag_index= 0; tag_index < items[i].tags_list.length; tag_index++){
                    if(searchRegex.test(items[i].tags_list[tag_index])){
                        match_flag = true
                    }
                }
            }
            if(searchRegex.test(items[i].sub_title) || 
                searchRegex.test(items[i].title) || 
                searchRegex.test(items[i].updated_time)){
                match_flag = true
            }
            
            if(match_flag){
                let tmp = 
                {
                    "sub_title": items[i].sub_title, 
                    "title": items[i].title,
                    "tags_list": items[i].tags_list, 
                    "updated_time": items[i].updated_time,
                    "created_time": items[i].created_time,
                    "id": items[i].id,
                    "collectup": items[i].collectup, 
                    "browse": items[i].browse,
                    "comments": items[i].comments, 
                    "thumbsup": items[i].thumbsup
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
.blog-container{
    margin: 10px;
    background-color: #e7eaec; 
}
.blog-left{
    width: 70%;
    height: 100%;
    float: left;
    background-color: #e7eaec;
}

.blog-right{
    width: 30%;
    height: 100%;
    float: right;
    background-color: #e7eaec;
}

.image {
    width: 100%;
    display: block;
}
.bloginfo{
    margin: 10px 0px 10px 0px;
    width: 100%;
    font-size: small;
}

.bloginfo-time{
    margin: 0px;
    width: 20%;
    font-size: small; 
    float: right;
    text-align: right;
}
.blogcenter{
    width: 100%;
    margin: 10px 0px 10px 0px;

}
.blogbtn {
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

.blog-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    background-color: #FFFFFF;
}
.blog-message{
    width: 100%;
    height: 240;
    margin: 0px;
}
.blog-img{
    width: 10%;
    float: left;
    left: 0px;
}
.blog-content{
    width: 98%;
    float: left;
    margin-left: 10px;
}
.blog-content-header{
    width: 100%;
}

.blog-content-body{
    width: 100%;
    height: 80px;
}

.blog-content-footer{
    width: 100%;
}

.blog-content-tags{
    width: 30%;
    float: left;
}

.blog-content-comments{
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
      margin: 5px;
  }
  .input-with-select {
    background-color: #fff;
    width: 30%;
    float: right;
  }
  .blogheader{
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
</style>
