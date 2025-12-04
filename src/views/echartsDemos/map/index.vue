<template>
  <div class="map-container">
    <EchartsMap />
  </div>
</template>

<script setup lang="ts">
import EchartsMap from './EchartsMap/index.vue'

</script>
<style scoped lang="scss">
.map-container{
  width: 100%;
  height: 100%;
  background: #14376b;
}
</style>
