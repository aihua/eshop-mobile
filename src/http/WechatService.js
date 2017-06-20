import axios from 'axios'
import storage from '@/util/storage'

function redirect() {
  return axios.get(`http://deal.xiaovbao.cn/api/v1/oauth`)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
  })
}

function getWechatPayParams(code) {
  let url = `http://deal.xiaovbao.cn/api/v1/wechatPayInfo?code=${code}&tableId=${storage.get('tableId')}&tenantId=${storage.get('tenantId')}`
  if (storage.get('consignee')) {
    url += `&consignee=${storage.get('consignee')}`
  }
	return axios.get(url)
	.then(resp => {
		console.log(resp.data)
		return resp.data
	})
	.catch(err => {
		console.error(err)
	})
}

export {
  redirect,
  getWechatPayParams
}