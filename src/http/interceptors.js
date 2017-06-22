import axios from 'axios'
import host from './domain.js'
console.log('node env: ' + process.env.NODE_ENV)

//https://github.com/mzabriskie/axios#interceptor
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.url = host[process.env.NODE_ENV] + config.url
  return config
}, function (error) {
  // Do something with request error
  console.error(error)
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log(response)
  return response
}, function (error) {
  // Do something with response error
  console.error(error)
  return Promise.reject(error)
})