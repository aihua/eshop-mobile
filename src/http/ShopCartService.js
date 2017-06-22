import axios from 'axios'
import storage from '@/util/storage'

const addShopCart = function (foods, consignee) {
  let url = `http://deal.xiaovbao.cn/api/v1/user/foodShoppingCart/add/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`
  if (consignee) {
    url += `&consignee=${consignee}`
  }
  return axios.post(url, foods)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const editShopCart = function (condition, consignee) {
  let url = `http://deal.xiaovbao.cn/api/v1/user/foodShoppingCart/edit/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`
  if (consignee) {
    url += `&consignee=${consignee}`
  }
  return axios.post(url, condition)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const getShopCart = function () {
  return axios.get(`http://deal.xiaovbao.cn/api/v1/user/foodShoppingCart/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`)
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