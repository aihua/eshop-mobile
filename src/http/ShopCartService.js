import { http } from './interceptors'
import storage from '@/util/storage'

const addShopCart = function (foods, consignee) {
  let url = `/user/foodShoppingCart/add/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`
  if (consignee) {
    url += `&consignee=${consignee}`
  }
  return http.post(url, foods)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const editShopCart = function (condition, consignee) {
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

const getShopCart = function () {
  return http.get(`/user/foodShoppingCart/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

export {
  addShopCart,
  editShopCart,
  getShopCart
}