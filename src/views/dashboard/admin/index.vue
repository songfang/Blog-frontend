<template>
  <div class="dashboard-editor-container">

    <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="chart_data"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <el-card class="box-card-component" style="margin-left:8px;" v-loading="version_loading">
          <el-collapse v-model="activeName" accordion>
            <div v-for="version in version_list" :key="version.id">
                <el-collapse-item :title="version.version + '版本发布记录'" name="1">
                  <div>{{ version.message }}</div>
              </el-collapse-item>
            </div>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import BoxVersion from './components/BoxVersion'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'


export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    BoxVersion,
    TodoList,
    BoxCard
  },
  data() {
    return {
      line_chart_data: {},
      chart_data: {},
      version_list: [],
      activeName: '1',
      version_loading: false,
    }
  },
  created(){
    this.get_blog_month_data()
    this.get_version_list()
  },
  methods: {
    handleSetLineChartData(type) {
      this.chart_data = this.line_chart_data[type]
    },
    get_blog_month_data(){
      this.$store.dispatch('get_blog_month_data').then(res => {
        this.line_chart_data = {
          blog_browse: {
            expectedData: res.data.blog_browse_list,
          },
          blog_count: {
            expectedData: res.data.blog_count_list,
          },
          blog_collect: {
            expectedData: res.data.blog_collect_list,
          },
          messages: {
            expectedData: res.data.messages_list,
          },
        }
        this.chart_data = this.line_chart_data.blog_browse
      }).catch((error) => {
        console.log(error)
        this.loading = false
      })
    },
    get_version_list(){
      this.version_loading = true
      this.$store.dispatch('get_version_list').then(res => {
        this.version_list = res.data
        this.version_loading = false
      }).catch((error) => {
        console.log(error)
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
