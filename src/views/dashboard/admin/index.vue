<template>
  <div class="dashboard-editor-container">

    <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" v-loading="line_loading">
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
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 16}" :xl="{span: 16}" style="padding-right:8px;margin-bottom:30px;">
        <div class="echarts">
          <div :style="{height:'500px',width:'100%'}" ref="myEchart" v-loading="map_loading"></div>
        </div>
      </el-col>
      <!-- <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list/>
      </el-col> -->
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 8}" style="margin-bottom:30px;">
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

// 主模块
let echarts = require('echarts/lib/echarts')
// 散点图
require('echarts/lib/chart/scatter')
// 散点图放大
require('echarts/lib/chart/effectScatter')
// 地图
require('echarts/lib/chart/map')
// 图例
require('echarts/lib/component/legend')
// 提示框
require('echarts/lib/component/tooltip')
// 地图geo
require('echarts/lib/component/geo')

import 'echarts/map/js/china' // 引入中国地图数据

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
    BoxCard,
  },
  data() {
    return {
      line_chart_data: {},
      chart_data: {},
      version_list: [],
      activeName: '1',
      version_loading: false,
      chart: null,
      map_data: [
        // { name: '海门', value: 100 },
      ],
      geo_coord_map:  {
          // 海门: [121.15, 31.89],
      },
      map_loading: false,
      line_loading: false,
    }
  },
  created(){
    this.get_blog_month_data()
    this.get_version_list()
  },
  mounted(){
    this.get_location_info()
  },
  methods: {
    handleSetLineChartData(type) {
      this.chart_data = this.line_chart_data[type]
    },
    get_blog_month_data(){
      this.line_loading = true
      this.$store.dispatch('get_blog_month_data').then(res => {
        this.line_loading = false
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
    get_location_info(){
      this.map_loading = true
      this.$store.dispatch('get_location_info').then(res => {
        this.map_data = res.data.map_data
        this.geo_coord_map = res.data.geo_coord_map
        this.china_configure()
        this.map_loading = false
      }).catch((error) => {
        console.log(error)
        this.loading = false
      })
    },
    convertData(map_data) {
      var res = [];
      for (var i = 0; i < map_data.length; i++) {
          var geoCoord = this.geo_coord_map[map_data[i].name];
          if (geoCoord) {
              res.push({
                  name: map_data[i].name,
                  value: geoCoord.concat(map_data[i].value)
              });
          }
      }
      return res;
    },
    china_configure() {
      let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置    
      window.onresize = myChart.resize;
      let map_option = {
        backgroundColor: '#404a59',
        title: {
          text: '全国浏览者分布',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            x: 'right',
            data: ['浏览分布'],
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            map: 'china',
            label: {
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#323c48',
                borderColor: '#111'
              },
              emphasis: {
                areaColor: '#ddb926'
              }
            }
          },
        series : [
            {
                name: '浏览分布',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: this.convertData(this.map_data),
                symbolSize: function (val) {
                    return val[2] * 1;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                }
            },
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: this.convertData(this.map_data.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 6)),
              symbolSize: val => val[2] * 1,
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#f4e925',
                  shadowBlur: 10,
                  shadowColor: '#333'
                }
              },
              zlevel: 1
          }
        ]
      }
      myChart.setOption(map_option)
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
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
