import axios from 'axios'
import storage from '@/util/storage'

const getShopComment = function () {
  return axios.get(`http://deal.xiaovbao.cn/api/v1/user/merchantRatings/?tenantId=${storage.get('tenantId')}`)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const addShopComment = function (params) {
  return axios.post(`http://deal.xiaovbao.cn/api/v1/user/merchantRatings`, params)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const addFoodComment = function (params) {
  return axios.post(`http://deal.xiaovbao.cn/api/v1/user/rating`, params)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

export {
  getShopComment,
  addShopComment,
  addFoodComment
}