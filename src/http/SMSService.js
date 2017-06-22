import axios from 'axios'
import storage from '@/util/storage'

const getCode = function (phoneNumber) {
  return axios.post(`http://deal.xiaovbao.cn/api/v1/sms/send/verificationCode/${phoneNumber}?tenantId=${storage.get('tenantId')}`)
  .then(resp => resp.data)
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

const verifyCode = function (phoneNumber, verifyCode) {
  return axios.post(`http://deal.xiaovbao.cn/api/v1/sms/confirm/verificationCode/${phoneNumber}/${verifyCode}?tenantId=${storage.get('tenantId')}`)
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