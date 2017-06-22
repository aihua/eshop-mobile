import axios from 'axios'
import storage from '@/util/storage'
import { host } from './domain.js'

const getCode = function (phoneNumber) {
  return axios.post(`${host}/sms/send/verificationCode/${phoneNumber}?tenantId=${storage.get('tenantId')}`)
  .then(resp => resp.data)
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const verifyCode = function (phoneNumber, verifyCode) {
  return axios.post(`${host}/sms/confirm/verificationCode/${phoneNumber}/${verifyCode}?tenantId=${storage.get('tenantId')}`)
  .then(resp => resp.data)
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

export {
  getCode,
  verifyCode
}