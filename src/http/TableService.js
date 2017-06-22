import axios from 'axios'
import storage from '@/util/storage'
import { host } from './domain.js'

const getStatus = function () {
  return axios.get(`${host}/user/table/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`)
  .then(resp => resp.data)
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

export {
  getStatus,
}