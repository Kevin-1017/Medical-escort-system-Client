<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
//获取vue实例
const { proxy } = getCurrentInstance()
const router = useRouter()
const from = reactive({
  phoneNumber: '',
  password: '',
})
const onSubmit = async () => {
  let res = await proxy.$api.login(from)
  if (res) {
    localStorage.setItem('c_token', res.c_token)
    localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
    router.push('/home')
  }
}
</script>

<template>
  <h1>用户登录</h1>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="from.phoneNumber"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="from.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"> 提交 </van-button>
    </div>
  </van-form>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
