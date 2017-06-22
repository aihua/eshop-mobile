import axios from 'axios'
import storage from '@/util/storage'

const getAllFoods = function () {
  return axios.get(`http://deal.xiaovbao.cn/api/v1/user/Menus/?tenantId=${storage.get('tenantId')}&consignee=${storage.get('consignee')}`)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
    return Promise.reject(err)
  })
}

export {
  getAllFoods
}