import { http } from './interceptors'
import storage from '@/util/storage'

const addOrder = function (params, consignee) {

  let url = `/user/foodOrder/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`
  if (consignee) {
    url += `&consignee=${consignee}`
  }
  return http.post(url, params)
    .then(resp => {
      return resp.data
    })
    .catch(err => {
      console.error(err)
      return Promise.reject(err)
    })
}

const getOrder = function (tradeNo) {
  const prefixUrl = `/user/foodOrder/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`
  const search = tradeNo ? `&trade_no=${tradeNo}` : ''

  return http.get(prefixUrl + search)
    .then(resp => {
      return resp.data.result
    })
    .catch(err => {
      console.error(err)
      return Promise.reject(err)
    })
}

const editOrder = function (condition, consignee) {
  let url = `/user/foodShoppingCart/edit/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`
  if (consignee) {
    url += `&consignee=${consignee}`
  }
  return http.post(url, condition)
    .then(resp => {
      return resp.data
    })
    .catch(err => {
      console.error(err)
      return Promise.reject(err)
    })
}

const delOrder = function () {
  let url = `/user/foodShoppingCart/edit/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`
  if (consignee) {
    url += `&consignee=${consignee}`
  }
  return http.post(url, condition)
    .then(resp => {
      return resp.data
    })
    .catch(err => {
      console.error(err)
      return Promise.reject(err)
    })
}


export {
  addOrder,
  getOrder,
  editOrder,
  delOrder
}