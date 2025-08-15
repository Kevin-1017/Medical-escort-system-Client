<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import counter from '@/components/counter.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const { proxy } = getCurrentInstance()

const orderList = ref()
const active = ref('')
const statusMap = {
  all: {
    text: '',
    color: '#999999',
  },
  pending: {
    text: '待支付',
    color: '#ffa200',
  },
  unserved: {
    text: '待服务',
    color: '#1da6fd',
  },
  done: {
    text: '已完成',
    color: '#21c521',
  },
  canceled: {
    text: '已取消',
    color: '#999999',
  },
}

const clickTab = async (item) => {
  getOrderList(item.name)
}
const getOrderList = async (status) => {
  orderList.value = await proxy.$api.getOrderList({ order_status: status })
}

const goDetail = (item) => {
  router.push(`/detail?id=${item.id}`)
}

onMounted(() => {
  if (route.query.active) {
    active.value = route.query.active
    getOrderList(active.value)
  } else {
    getOrderList('all')
  }
})
</script>

<template>
  <div class="container">
    <div class="header">我的订单</div>
    <van-tabs @click-tab="clickTab" v-model:active="active">
      <van-tab title="全部" name="all" />
      <van-tab title="待支付" name="pending" />
      <van-tab title="待服务" name="unserved" />
      <van-tab title="已完成" name="done" />
      <van-tab title="已取消" name="canceled" />

      <van-row @click="goDetail(item)" v-for="item in orderList" :key="item.out_trade_no">
        <van-col span="5"
          ><van-image width="50" radius="5" height="50" src="/img/card_1.png" />
        </van-col>
        <van-col span="14">
          <div class="text1">{{ 'VIP服务' }}</div>
          <div class="text2">
            <div>{{ item.hospital_name }}</div>
            <div>预约时间:{{ item.start_time }}</div>
          </div>
        </van-col>
        <van-col
          class="text2"
          span="5"
          :style="{
            color: statusMap[item.order_status].color,
          }"
          >{{ statusMap[item.order_status].text }}
          <counter :second="100000" v-if="item.order_status === 'pending'" />
        </van-col>
      </van-row>
    </van-tabs>
    <div class="bottom-text">没有更多了</div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: #f0f0f0;
  height: 100vh;
}
.header {
  background-color: #fff;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}
.van-row {
  background-color: #fff;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  .text1 {
    font-size: 16px;
    line-height: 25px;
    font-weight: bold;
  }
  .text2 {
    font-size: 14px;
    line-height: 20px;
    color: #999999;
  }
}
.bottom-text {
  line-height: 50px;
  text-align: center;
  color: #999999;
  font-size: 14px;
}
</style>
