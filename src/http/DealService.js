import axios from 'axios'
import storage from '@/util/storage'

const getAllFoods = function () {
  return axios.get(`http://deal.xiaovbao.cn/api/v1/user/Menus/?tenantId=${storage.get('tenantId')}`)
  .then(resp => {
    return resp.data
  })
  .catch(err => {
    console.error(err)
  })
}

export {
  getAllFoods
}