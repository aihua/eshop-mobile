import axios from 'axios'
import storage from '@/util/storage'
import { host } from './domain.js'

function getWapParams(amount) {
  return axios.get(`${host}/user/alipayInfo/${amount}/${storage.get('tableId')}
  ?consignee=${storage.get('consignee')}
  &tenantId=${storage.get('tenantId')}
  `)
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