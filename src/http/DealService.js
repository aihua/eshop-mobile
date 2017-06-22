import axios from 'axios'
import storage from '@/util/storage'
import { host } from './domain.js'

const getAllFoods = function () {
  const query = `?tenantId=${storage.get('tenantId')}&consignee=${storage.get('consignee')}`
  
  return axios.get(`${host}/user/Menus/${query}`)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

export {
  getAllFoods
}