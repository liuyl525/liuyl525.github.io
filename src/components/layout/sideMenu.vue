<template>
  <div class="side-menu">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="/chartsDemos"
      text-color="#fff"
    >
      <el-sub-menu :index="item.path" v-for="(item, index) in defaultRoutes" :key="index">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
          <el-menu-item v-for="(subItem, subIndex) in item.children" :key="subIndex" :index="subItem.path" @click="jumpTo(subItem)">{{ subItem.meta.title }}</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import defaultRoutes from '@/router/routes.ts'
import { useRouter } from 'vue-router'
const router = useRouter()
const jumpTo = (item: any) => {
  router.push({
    path: item.path
  })
}
</script>

<style scoped lang="scss">
.side-menu{
  width: 100%;
  height: 100%;
}
</style>
