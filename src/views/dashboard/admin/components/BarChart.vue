<template>
  <div :class="className" v-loading="loading" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      blog_count_list: [],
      blog_browse_list: [],
      blog_collect_list: [],
      messages_list: [],
      loading: false,
    }
  },
  created() {
  },
  mounted() {
    this.get_blog_week_data()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    get_blog_week_data(){
      this.loading = true
      this.$store.dispatch('get_blog_week_data').then(res => {
        this.blog_browse_list = res.data.blog_browse_list
        this.blog_count_list = res.data.blog_count_list
        this.blog_collect_list = res.data.blog_collect_list
        this.messages_list = res.data.messages_list
        this.loading = false
        this.initChart()
      }).catch((error) => {
        console.log(error)
        this.loading = false
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '文章数量',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.blog_count_list,
          animationDuration
        }, {
          name: '访问量',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.blog_browse_list,
          animationDuration
        }, {
          name: '收藏量',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.blog_collect_list,
          animationDuration
        }, {
          name: '消息数量',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: this.messages_list,
          animationDuration
        }]
      })
    }
  }
}
</script>
