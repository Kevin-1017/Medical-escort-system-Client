<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <router-view />
  <van-tabbar :route="true">
    <van-tabbar-item
      v-for="item in router.options.routes[0].children"
      :key="item.path"
      :icon="item.meta.icon"
      :to="item.path"
      :replace="true"
      >{{ item.meta.name }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<style lang="scss" scoped></style>
