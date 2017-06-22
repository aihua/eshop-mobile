import { http } from './interceptors'
import storage from '@/util/storage'

function redirect() {
  return http.get(`/oauth`)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

function getWechatPayParams(code) {
  let url = `/wechatPayInfo?code=${code}&tableId=${storage.get('tableId')}&tenantId=${storage.get('tenantId')}`
  if (storage.get('consignee')) {
    url += `&consignee=${storage.get('consignee')}`
  }
	return http.get(url)
	.then(resp => {
		console.log(resp.data)
		return resp.data
	})
	.catch(err => {
		console.error(err)
    return Promise.reject(err)
	})
}

export {
  redirect,
  getWechatPayParams
}