import { http } from './interceptors'
import storage from '@/util/storage'

const getStatus = function () {
  return http.get(`/user/table/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`)
  .then(resp => resp.data)
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const getTableName = function (tableId) {
  return http.get(`/user/tableName/${tableId}`)
  .then(resp => resp.data)
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

export {
  getStatus,
  getTableName
}