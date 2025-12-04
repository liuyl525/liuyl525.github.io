<template>
  <div class="map-container">
    <div ref="mapRef" class="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'

// 获取地图DOM元素的引用
const mapRef = ref(null)
let myChart = null

// 初始化地图
const initMap = async () => {
  if (!mapRef.value) return
  // 初始化echarts实例
  myChart = echarts.init(mapRef.value)
  // 显示加载动画
  myChart.showLoading()
  try {
    // 获取重庆地图数据
    const { data: cqJson } = await axios.get(`/map-json/map/500000.json`)
    const { data: cqJson2 } = await  axios.get(`/map-json/border/500000.json`)
    const { data: cqJson3 } = await  axios.get(`/map-json/border/cq-main-data.json`)
    console.log('cqJson', cqJson, cqJson2, cqJson3)

    // 注册地图数据
    echarts.registerMap('chongqing', cqJson)
    // 配置项
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br/>数值：{c}',
      },
      series: [
        {
          name: '重庆市',
          type: 'map',
          map: 'chongqing',
          roam: true,
          zoom: 1.2,
          selectedMode: 'single',
          label: {
            show: true,
            fontSize: 10,
          },
          itemStyle: {
            normal: {
              areaColor: '#024287',
              borderColor: '#fff',
            },
            emphasis: {
              areaColor: '#ffd700',
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
            },
            itemStyle: {
              areaColor: '#ffd700',
            },
          },
          data: [
            { name: '渝中区', value: Math.round(Math.random() * 1000) },
            { name: '江北区', value: Math.round(Math.random() * 1000) },
            { name: '南岸区', value: Math.round(Math.random() * 1000) },
            { name: '九龙坡区', value: Math.round(Math.random() * 1000) },
            { name: '沙坪坝区', value: Math.round(Math.random() * 1000) },
            { name: '大渡口区', value: Math.round(Math.random() * 1000) },
            { name: '渝北区', value: Math.round(Math.random() * 1000) },
            { name: '巴南区', value: Math.round(Math.random() * 1000) },
            { name: '北碚区', value: Math.round(Math.random() * 1000) },
            { name: '万州区', value: Math.round(Math.random() * 1000) },
            { name: '涪陵区', value: Math.round(Math.random() * 1000) },
            { name: '黔江区', value: Math.round(Math.random() * 1000) },
            { name: '长寿区', value: Math.round(Math.random() * 1000) },
            { name: '江津区', value: Math.round(Math.random() * 1000) },
            { name: '合川区', value: Math.round(Math.random() * 1000) },
            { name: '永川区', value: Math.round(Math.random() * 1000) },
            { name: '南川区', value: Math.round(Math.random() * 1000) },
            { name: '綦江区', value: Math.round(Math.random() * 1000) },
            { name: '大足区', value: Math.round(Math.random() * 1000) },
            { name: '璧山区', value: Math.round(Math.random() * 1000) },
            { name: '铜梁区', value: Math.round(Math.random() * 1000) },
            { name: '潼南区', value: Math.round(Math.random() * 1000) },
            { name: '荣昌区', value: Math.round(Math.random() * 1000) },
            { name: '开州区', value: Math.round(Math.random() * 1000) },
            { name: '梁平区', value: Math.round(Math.random() * 1000) },
            { name: '武隆区', value: Math.round(Math.random() * 1000) },
          ],
        },
      ],
    }
    // 设置配置项
    myChart.setOption(option)
    // 添加点击事件
    myChart.on('click', (params) => {
      console.log(params.name + '被点击了')
      // 这里可以添加点击后的处理逻辑
    })
  } catch (error) {
    console.error('加载地图数据失败:', error)
  } finally {
    myChart.hideLoading()
  }
}

// 监听窗口大小变化
const handleResize = () => {
  myChart?.resize()
}

onMounted(() => {
  initMap()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  myChart?.dispose()
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map {
  width: 100%;
  height: 600px;
}
</style>
