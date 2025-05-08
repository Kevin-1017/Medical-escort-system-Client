<script setup>
import { computed } from 'vue'
import counter from '@/components/counter.vue'
const props = defineProps({
  orderData: {
    type: Object,
    required: true,
  },
})

const formatTime = computed(() => {
  return props.orderData.order_start_time + 7200000 - Date.now()
})
// 定义事件：子组件点击时通知父组件
const emit = defineEmits(['show-payment-dialog'])

const showCode = () => {
  emit('show-payment-dialog') // 向父组件传递点击事件
}
</script>

<template>
  <div class="tips">
    <div class="dzf" v-if="props.orderData.trade_state === '待支付'">
      <div class="text1">订单待支付</div>
      <div class="text2">
        请在<counter :second="formatTime" />
        内完成支付,超时订单自动取消
      </div>
      <div class="text3">
        <van-button @click="showCode" type="success" size="large">立即支付(0.5元)</van-button>
      </div>
    </div>
    <div class="dzf" v-if="props.orderData.trade_state === '待服务'">
      <div class="text1">正在为您安排服务专员...</div>
      <div class="text2">请保持手机畅通，稍后将有服务专员与您联系</div>
    </div>
    <div class="dzf" v-if="props.orderData.trade_state === '已完成'">
      <div class="text1">服务已完成</div>
      <div class="text2">感谢您的使用，如有售后问题请联系客服</div>
    </div>
    <div class="dzf" v-if="props.orderData.trade_state === '已取消'">
      <div class="text1">订单已取消</div>
      <div class="text2">期待下次为您服务，如需帮助可咨询客服</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dzf {
  padding: 20px;
  .text1 {
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    color: #666;
  }
  .text2 {
    font-size: 14px;
    color: #666;
  }
  .text3 {
    text-align: center;
    .van-button {
      margin-top: 10px;
      margin-left: 10px;
      width: 80%;
      font-weight: bold;
    }
  }
}
</style>
