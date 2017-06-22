import { http } from './interceptors'
import storage from '@/util/storage'

function getWapParams(amount) {
  const query = `?consignee=${storage.get('consignee')}&tenantId=${storage.get('tenantId')}`
  
  return http.get(`/user/alipayInfo/${amount}/${storage.get('tableId')}${query}`)
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