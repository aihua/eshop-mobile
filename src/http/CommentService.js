import axios from 'axios'
import storage from '@/util/storage'

const getShopComment = function () {
  const query = `?tenantId=${storage.get('tenantId')}`

  return axios.get(`/user/merchantRatings/${query}`)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const addShopComment = function (params) {

  return axios.post(`/user/merchantRatings`, params)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const addFoodComment = function (params) {
  
  return axios.post(`/user/rating`, params)
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