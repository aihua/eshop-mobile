function set(key, val) {
  const isObj = val != null && typeof val === 'object'
  
  if (isObj) {
    localStorage.setItem(key, JSON.stringify(val))
  } else {
    localStorage.setItem(key, val)
  }
  return localStorage
}

function get(key) {
  let v = localStorage.getItem(key)

  try {
    v = JSON.parse(v)
  } catch(e) {
    return v
  }
  return v
}

function clear() {
  localStorage.clear()
  return localStorage
}

function remove(key) {
  localStorage.removeItem(key)
  return localStorage
}

function has(key) {
  return Object.keys(localStorage).indexOf(key) >= 0
}

export default {
  set,
  get,
  clear,
  remove,
  has
}