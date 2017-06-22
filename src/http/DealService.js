import axios from 'axios'
import storage from '@/util/storage'
import { host } from './domain.js'

const getAllFoods = function () {
  return axios.get(`${host}/user/Menus/?tenantId=${storage.get('tenantId')}&consignee=${storage.get('consignee')}`)
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