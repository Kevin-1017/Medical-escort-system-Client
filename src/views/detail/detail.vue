<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import schedule from '@/components/schedule.vue'
import QRCode from 'qrcode'
import tips from '@/components/tips.vue'

const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const orderData = ref({})
const showCode = ref(false)

const code = ref()
code.value = QRCode.toDataURL('https://www.example.com').then((url) => {
  code.value = url
})

const makeIfo = ref({
  hospital_name: '就诊医院',
  start_time: '期望就诊时间',
  clientName: '就诊人',
  tel: '就诊人电话',
  receiveAddress: '接送地址',
  demand: '其他需求',
})
const orderInfo = ref({
  tel: '联系电话',
  createDate: '下单时间',
  price: '应付金额',
  id: '订单编号',
})

const formatData = (key) => {
  return orderData.value[key]
}

const isState = (state) => {
  let arr = {
    pending: 10,
    unserved: 20,
    done: 30,
    canceled: 40,
  }
  return arr[state]
}

const getOrderData = async () => {
  orderData.value = await proxy.$api.getOrderData({ id: route.query.id })
}

const closeCode = () => {
  showCode.value = false
  getOrderData()
}
const onShowCode = () => {
  showCode.value = true
}
const goBack = () => {
  router.go(-1)
}
onMounted(() => {
  getOrderData()
})
</script>

<template>
  <div class="container">
    <div class="header">
      <van-icon @click="goBack" class="header-left" name="arrow-left" size="30" />
      <span>订单详情</span>
    </div>

    <schedule :item="isState(orderData.order_status)" />

    <tips :order-data="orderData" @show-payment-dialog="onShowCode" />

    <van-cell-group class="card">
      <div class="header-text">预约信息</div>
      <van-cell title="预约服务" value="VIP服务" />
      <van-cell v-for="(item, key) in makeIfo" :title="item" :key="key" :value="formatData(key)" />
    </van-cell-group>
    <van-cell-group class="card">
      <div class="header-text">订单信息</div>
      <van-cell
        v-for="(item, key) in orderInfo"
        :title="item"
        :key="key"
        :value="formatData(key)"
      />
      <van-cell title="联系客服" value="疑问或投诉 >" />
    </van-cell-group>
    <van-dialog :show-confirm-button="false" v-model:show="showCode">
      <van-icon name="cross" @click="closeCode" class="close" />
      <div>微信支付</div>
      <van-image height="150" width="150" :src="code" />
      <div>请使用本人微信扫描二维码</div>
    </van-dialog>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: #f0f0f0;
  height: 100vh;
}
.header {
  display: flex; /* 启用弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  position: relative; /* 为图标绝对定位提供参考 */
  padding: 10px 0; /* 根据实际需求调整内边距 */
  width: 100%; /* 确保容器占满父元素宽度 */
  line-height: 30px;
  font-size: 18px;
  .header-left {
    position: absolute; /* 固定图标在左侧 */
    left: 0; /* 调整图标左间距 */
  }
}
.card {
  margin: 15px 0;
  padding: 10px;
  .header-text {
    padding-left: 5px;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    border-left: 4px solid red;
  }
}
::v-deep(.van-dialog__content) {
  text-align: center;
  padding: 20px;
  .close {
    position: absolute;
    left: 20px;
  }
}
</style>
