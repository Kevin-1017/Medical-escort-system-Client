<script setup>
import { ref, reactive, getCurrentInstance, onMounted, computed } from 'vue'
import QRCode from 'qrcode'
import { useRouter, useRoute } from 'vue-router'
import schedule from '@/components/schedule.vue'
import { showNotify } from 'vant'

const router = useRouter()
const route = useRoute()
const { proxy } = getCurrentInstance()

// 请求参数
const paginationData = reactive({
  pageNum: 1,
  pageSize: 1000,
})

const createInfo = ref()
const showHospital = ref(false)
const showCompanion = ref(false)
const showDate = ref(false)
const showCode = ref(false)
const code = ref()
const minDate = ref(new Date())
const from = reactive({})

// 只获取陪护师信息，
const getCreateInfo = async () => {
  const res = await proxy.$api.getCreateList(paginationData)
  const { list, total: _ } = res
  createInfo.value = list
}
const companionColumns = computed(() => {
  return createInfo.value?.map((item) => {
    return { text: item.name, value: item.id }
  })
})
const companionOnConfirm = ({ selectedOptions }) => {
  from.companion_id = selectedOptions[0].value
  from.companion_name = selectedOptions[0].text
  showCompanion.value = false
}
const hospitalColumns = [
  { text: '医院一', value: 1 },
  { text: '医院二', value: 2 },
]
const hospitalOnConfirm = ({ selectedOptions }) => {
  from.hospital_id = selectedOptions[0].value
  from.hospital_name = selectedOptions[0].text
  showHospital.value = false
}

const dateOnConfirm = ({ selectedValues }) => {
  from.start_time = selectedValues.join('-')
  showDate.value = false
}
const closeCode = async () => {
  showCode.value = false
  router.push('/order')
}
const submit = async () => {
  let arr = [
    'companion_id',
    'demand',
    'hospital_id',
    'hospital_name',
    'receiveAddress',
    'start_time',
    'tel',
  ]
  for (const i of arr) {
    if (!from[i]) {
      showNotify({ message: '请把每一项都填写' })
      return
    }
  }

  await proxy.$api.createOrder(from)
  QRCode.toDataURL('https://www.example.com').then((url) => {
    code.value = url
    showCode.value = true
  })
}
const goBack = () => {
  router.go(-1)
}

onMounted(() => {
  getCreateInfo()
  from.hospital_id = parseInt(route.query.id)
  const hospital = hospitalColumns.find((item) => item.value == from.hospital_id)
  from.hospital_name = hospital ? hospital.text : '请选择就诊医院'
})
</script>

<template>
  <div class="container">
    <div class="header">
      <van-icon @click="goBack" class="header-left" name="arrow-left" size="30" />
      <span>填写服务订单</span>
    </div>
    <div class="banner">
      <schedule item="0" />
    </div>
    <van-cell class="cell">
      <template #title>
        <van-image height="25" width="25" src="/img/card_1.png" />
        {{ 'VIP服务' }}
      </template>
      <template #default> <div class="service-text">服务内容</div></template>
    </van-cell>

    <van-cell-group class="cell">
      <van-cell>
        <template #title>就诊医院 </template>
        <template #default
          ><div @click="showHospital = true">{{ from.hospital_name }}<van-icon name="arrow" /></div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>就诊时间 </template>
        <template #default>
          <div @click="showDate = true">
            {{ from.start_time || '请选择就诊时间' }}<van-icon name="arrow" /></div
        ></template>
      </van-cell>
      <van-cell>
        <template #title>陪诊师 </template>
        <template #default>
          <div @click="showCompanion = true">
            {{ from.companion_name || '请选择陪诊师' }}<van-icon name="arrow" /></div
        ></template>
      </van-cell>
      <van-cell>
        <template #title>接送地址</template>
        <template #default>
          <div>
            <van-field
              class="text"
              input-align="right"
              v-model="from.receiveAddress"
              placeholder="请填写就诊人地址"
            />
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template #title>联系电话 </template>
        <template #default
          ><div>
            <van-field
              class="text"
              input-align="right"
              v-model="from.tel"
              placeholder="请填写您的联系电话"
            />
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group title="服务需求" class="cell">
      <van-field
        class="text"
        style="height: 100px"
        v-model="from.demand"
        placeholder="请简单描述您要就诊的科室.."
      />
    </van-cell-group>

    <van-button @click="submit" class="submit" type="primary" size="large">提交订单</van-button>

    <van-popup v-model:show="showHospital" position="bottom">
      <van-picker
        :columns="hospitalColumns"
        @confirm="hospitalOnConfirm"
        @cancel="showHospital = false"
      />
    </van-popup>

    <van-popup v-model:show="showCompanion" position="bottom">
      <van-picker
        :columns="companionColumns"
        @confirm="companionOnConfirm"
        @cancel="showCompanion = false"
      />
    </van-popup>

    <van-popup v-model:show="showDate" position="bottom">
      <van-date-picker
        @confirm="dateOnConfirm"
        @cancel="showDate = false"
        :min-date="minDate"
        title="选择日期"
      />
    </van-popup>

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
.van-image {
  margin-right: 10px;
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

.cell {
  align-items: center;
  width: 95%;
  margin: 5px auto;
  background-color: #fff;
  :deep(.van-cell__title) {
    display: flex;
    align-items: center;
  }
  ::v-deep(.van-field__control) {
    color: var(--van-cell-value-color);
  }
}
.service-text {
  background: url(data:image/png;base64,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)
    no-repeat center center;
  background-size: 20px;
}
.submit {
  position: absolute;
  bottom: 0;
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
