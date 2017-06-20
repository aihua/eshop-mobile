import axios from 'axios'
import storage from '@/util/storage'

const getStatus = function () {
  return axios.get(`http://deal.xiaovbao.cn/api/v1/user/table/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`)
  .then(resp => resp.data)
}

export {
  getStatus,
}