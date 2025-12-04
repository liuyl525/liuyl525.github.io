import Layout from '@/components/layout/index.vue'

const defaultRoutes = [
  {
    path: '/',
    name: 'home',
    redirect: '/echartsMap',
    component: Layout,
    meta: {
      title: 'EchartsDemos',
    },
    children: [
      {
        path: '/echartsMap',
        name: 'EchartsMap',
        component: () => import('@/views/echartsDemos/map/index.vue'),
        meta: {
          title: '地图',
        }
      },
    ]
  }
]
export default defaultRoutes
