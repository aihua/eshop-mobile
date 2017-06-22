import axios from 'axios'
import storage from '@/util/storage'

function getWapParams(amount) {
  return axios.get(`http://deal.xiaovbao.cn/api/v1/user/alipayInfo/${amount}/${storage.get('tableId')}
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