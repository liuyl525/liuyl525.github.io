<template>
  <div class="layout">
    <header>
      demos
    </header>
    <div class="main">
      <div class="side">
        <sideMenu />
      </div>
      <div class="content">
        <el-card>
          <router-view />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sideMenu from './sideMenu.vue'

</script>

<style scoped lang="scss">
.layout{
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #565c63;
    color: #fff;
    padding: 0 12px;
    box-sizing: border-box;
  }
  .main{
    flex: 1;
    display: flex;
    justify-content: space-between;
    .side{
      width: 240px;
      height: 100%;
      background-color: #565c63;
      color: #fff;
    }
    .content{
      flex: 1;
      height: 100%;
      overflow-y: auto;
      padding: 12px;
      box-sizing: border-box;
      display: flex;
      .el-card{
        flex: 1;
      }
    }
  }
}
</style>
