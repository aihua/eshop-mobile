import { http } from "./interceptors"
import storage from "@/util/storage"

function getWapParams(amount) {
  const query =
    `?` +
    ["tenantId", "consignee"]
      .map(key => (storage.has(key) ? `${key}=${storage.get(key)}` : ""))
      .filter(e => e)
      .join("&")

  return http
    .get(`/user/alipayInfo/${amount}/${storage.get("tableId")}${query}`)
    .then(resp => {
      return resp.data
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export { getWapParams }
