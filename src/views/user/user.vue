<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const showShare = ref(false)
const show = ref(false)

const userInfo = computed(() => {
  return JSON.parse(localStorage.getItem('userInfo')) || {}
})

const goOrder = (active) => {
  //这里是给route传参数方便在order中获取被激活的tab
  router.push(`/order?active=${active}`)
}
const quit = () => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <div class="user">
      <van-image class="img" :src="userInfo.avatar" />
      <div class="text">{{ userInfo.name }}</div>
    </div>
    <div class="order">
      <div class="top" @click="goOrder">
        <div class="text1">我的订单</div>
        <div class="text2">全部</div>
      </div>
      <div class="buttom">
        <div class="item">
          <van-image @click="goOrder(1)" width="40" height="40" src="/img/od_10.png" />
          <div>待支付</div>
        </div>
        <div @click="goOrder(2)" class="item">
          <van-image width="40" height="40" src="/img/od_20.png" />
          <div>待服务</div>
        </div>
        <div @click="goOrder(3)" class="item">
          <van-image width="40" height="40" src="/img/od_30.png" />
          <div>已完成</div>
        </div>
        <div @click="goOrder(4)" class="item">
          <van-image width="40" height="40" src="/img/od_40.png" />
          <div>已取消</div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="foot1">
        <div class="text1">
          <van-image src="/img/ic_clients.png" />
          服务对象管理
        </div>
        <div class="text2"><van-icon name="arrow" /></div>
      </div>
      <div @click="showShare = true" class="foot2">
        <div class="text1">
          <van-image src="/img/ic_share.png" />
          分享转发
        </div>
        <div class="text2"><van-icon name="arrow" /></div>
      </div>
    </div>
    <van-share-sheet
      v-model:show="showShare"
      title="转发分享"
      :options="[
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
      ]"
    />
    <van-button type="danger" @click="show = true" class="quit" size="large">退出登录</van-button>
    <van-dialog
      @cancel="show = false"
      @confirm="quit"
      v-model:show="show"
      title="提示"
      show-cancel-button
    >
      <div class="quit_text">是否确认退出登陆</div>
    </van-dialog>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: #f0f0f0;
  height: 100vh;
  overflow: hidden;
  .user {
    width: 95%;
    height: 200px;
    background-color: #fff;
    text-align: center;
    border-radius: 10px;
    margin: 10px;
    .img {
      margin-top: 30px;
      width: 100px;
      height: 100px;
    }
    .text {
      line-height: 30px;
      font-weight: bold;
    }
  }
  .order {
    width: 95%;
    margin: 10px;
    border-radius: 10px;
    background-color: #fff;

    .top {
      margin: 10px;
      padding: 5px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      .text1 {
        color: #333;
        font-size: 18px;
      }
      .text2 {
        color: #999;
        font-size: 18px;
      }
      border-bottom: 0.5px solid #f5f5f5;
    }
    .buttom {
      padding: 0 10px 15px 10px;
      display: flex;
      justify-content: space-around;
      .item {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .foot {
    border-radius: 10px;
    margin: 0 10px;
    padding: 10px;
    line-height: 50px;
    background-color: #fff;
    .foot1,
    .foot2 {
      display: flex;
      justify-content: space-between;
      color: #555;
      font-size: 18px;
    }
    .foot1 {
      border-bottom: 0.5px solid #f5f5f5;
    }
    .van-image {
      width: 20px;
      margin-right: 5px;
    }
    .text1 {
      display: inline-flex; // 保持行内特性
      align-items: center;
    }
  }
  .quit {
    width: 90%;
    margin: 20px;
  }
  .quit_text {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
