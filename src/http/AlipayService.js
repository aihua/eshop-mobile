import axios from 'axios'
import storage from '@/util/storage'
import { host } from './domain.js'

function getWapParams(amount) {
  const query = `?consignee=${storage.get('consignee')}&tenantId=${storage.get('tenantId')}`
  
  return axios.get(`${host}/user/alipayInfo/${amount}/${storage.get('tableId')}${query}`)
    .then(resp => {
      return resp.data
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export {
  getWapParams
}