const createSteps = (start, end, range = 10) => {
  if (start > end) {
    return createSteps(end, start, range).reverse()
  }
  const maxIndex = Math.floor(end / range)
  const minIndex = Math.ceil(start / range)

  const originalSteps = Array.from({ length: maxIndex + 1 }, (_, i) => i * range)

  return [start, ...originalSteps.slice(minIndex, maxIndex + 1), end]
}

// 将url中search提取成obj
// ?a=12&b=11&a=89 => {a: [12, 89], b: 11}
const objFrom = function (search) {
  if (!search) {
    return {}
  }

  const arr = search.slice(1).split('&')
  return arr.reduce((accu, curr) => {
    const [key, val] = curr.split('=')
    if (accu[key]) {
      accu[key] = [accu[key], val]
    } else {
      accu[key] = val
    }

    return accu
  }, {})
}

export {
  createSteps,
  objFrom
}