import axios from 'axios'
import storage from '@/util/storage'

const addOrder = function (params, consignee) {
  let url = `http://deal.xiaovbao.cn/api/v1/user/foodOrder/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`
  if (consignee) {
    url += `&consignee=${consignee}`
  }
  return axios.post(url, params)
    .then(resp => {
      return resp.data
    })
    .catch(err => {
      console.error(err)
      return Promise.reject(err)
    })
}

const getOrder = function (tradeNo) {
  const prefixUrl = `http://deal.xiaovbao.cn/api/v1/user/foodOrder/${storage.get('tableId')}?tenantId=${storage.get('tenantId')}`
  const search = tradeNo ? `&trade_no=${tradeNo}` : ''

  return axios.get(prefixUrl + search)
    .then(resp => {
      return resp.data.result
    })
    .catch(err => {
      console.error(err)
      return Promise.reject(err)
    })
}

export {
  addOrder,
  getOrder
}