import axios from 'axios'
import storage from '@/util/storage'
import { host } from './domain.js'

const addShopCart = function (foods, consignee) {
  let url = `${host}/user/foodShoppingCart/add/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`
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
  let url = `${host}/user/foodShoppingCart/edit/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`
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
  return axios.get(`${host}/user/foodShoppingCart/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`)
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