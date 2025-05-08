<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const active = ref(0)
const router = useRouter()
const route = useRoute()
// 获取路由配置的数组
let arr = router.options.routes[0]
onMounted(() => {
  //控制高亮
  active.value = arr.children.findIndex((item) => '/' + item.path == route.path)
})
watch(
  () => route.path,
  (newPath) => {
    //控制高亮
    active.value = arr.children.findIndex((item) => '/' + item.path == newPath)
  },
)
</script>

<template>
  <RouterView />
  <van-tabbar v-model="active">
    <van-tabbar-item
      v-for="item in router.options.routes[0].children"
      :key="item.path"
      :url="item.path"
      :icon="item.meta.icon"
      >{{ item.meta.name }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<style lang="scss" scoped></style>
