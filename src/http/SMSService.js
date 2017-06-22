import { http } from './interceptors'
import storage from '@/util/storage'

const getCode = function (phoneNumber) {
  return http.post(`/sms/send/verificationCode/${phoneNumber}?tenantId=${storage.get('tenantId')}`)
  .then(resp => resp.data)
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const verifyCode = function (phoneNumber, verifyCode) {
  return http.post(`/sms/confirm/verificationCode/${phoneNumber}/${verifyCode}?tenantId=${storage.get('tenantId')}`)
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