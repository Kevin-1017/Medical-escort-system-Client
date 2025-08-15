import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/layoutContainer.vue'
import Home from '@/views/home/home.vue'
import Order from '@/views/order/order.vue'
import User from '@/views/user/user.vue'
import Login from '@/views/login/login.vue'
import createOrder from '@/views/createOrder/createOrder.vue'
import detail from '@/views/detail/detail.vue'

const baseUrl = import.meta.env.BASE_URL || '/'

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          meta: {
            icon: 'home-o',
            name: '首页',
          },
          component: Home,
        },
        {
          path: '/order',
          meta: {
            icon: 'orders-o',
            name: '订单',
          },
          component: Order,
        },
        {
          path: '/user',
          meta: {
            icon: 'user-circle-o',
            name: '我的',
          },
          component: User,
        },
      ],
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/create-order',
      component: createOrder,
    },
    {
      path: '/detail',
      component: detail,
    },
  ],
})

export default router
