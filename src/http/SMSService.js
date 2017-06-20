import axios from 'axios'
import storage from '@/util/storage'

const getCode = function (phoneNumber) {
  return axios.post(`http://deal.xiaovbao.cn/api/v1/sms/send/verificationCode/${phoneNumber}?tenantId=${storage.get('tenantId')}`)
  .then(resp => resp.data)
}

const verifyCode = function (phoneNumber, verifyCode) {
  return axios.post(`http://deal.xiaovbao.cn/api/v1/sms/confirm/verificationCode/${phoneNumber}/${verifyCode}?tenantId=${storage.get('tenantId')}`)
  .then(resp => resp.data)
}

export {
  getCode,
  verifyCode
}