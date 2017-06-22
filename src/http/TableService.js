import axios from 'axios'
import storage from '@/util/storage'

const getStatus = function () {
  return axios.get(`/user/table/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`)
  .then(resp => resp.data)
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

export {
  getStatus,
}