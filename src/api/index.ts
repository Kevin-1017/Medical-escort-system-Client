import request from '@/utils/request'

export default {
  login(data: any) {
    return request({
      url: '/auth/login',
      method: 'post',
      data,
    })
  },
  // getHomeData(data: any) {
  //   return request({
  //     url: '/Index/index',
  //     method: 'get',
  //     data,
  //   })
  // },
  createOrder(data: any) {
    return request({
      url: '/order/create',
      method: 'post',
      data,
    })
  },
  getOrderList(data: any) {
    return request({
      url: '/order/h5/list',
      method: 'get',
      data,
    })
  },
  getCreateList(data: any) {
    return request({
      url: '/companion/list',
      method: 'get',
      data,
    })
  },
  getOrderData(data: any) {
    return request({
      url: '/order/h5/detail',
      method: 'get',
      data,
    })
  },
}
