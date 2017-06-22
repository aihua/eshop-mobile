import axios from 'axios'
import storage from '@/util/storage'
import { host } from './domain.js'

function redirect() {
  return axios.get(`${host}/oauth`)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

function getWechatPayParams(code) {
  let url = `${host}/wechatPayInfo?code=${code}&tableId=${storage.get('tableId')}&tenantId=${storage.get('tenantId')}`
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
    return Promise.reject(err)
	})
}

export {
  redirect,
  getWechatPayParams
}