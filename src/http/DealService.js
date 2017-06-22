import { http } from './interceptors'
import storage from '@/util/storage'

const getAllFoods = function () {
  const query = `?tenantId=${storage.get('tenantId')}&consignee=${storage.get('consignee')}`
  
  return http.get(`/user/Menus/${query}`)
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