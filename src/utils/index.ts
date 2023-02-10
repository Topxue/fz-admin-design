/**
 * @description 数组扁平化
 * @param target --目标数组
 * @author ives-xue
 */
export function flatter(target: any) {
  if (Array.isArray(target)) {
    let result: any = []
    target.forEach((item) => {
      if (Array.isArray(item)) {
        result = result.concat(flatter(item))
      } else {
        result.push(item)
      }
    })
    return result
  } else {
    return target
  }
}

/**
 * @description 深拷贝
 * @param target -目标值
 * @param map -缓存容器
 * @author ives-xue
 */
export const deepClone = (target: any, map: any = new Map()) => {
  if (typeof target === 'object' && target !== null) {
    const cache = map.get(target)
    if (cache) {
      return cache
    }
    const isArray = Array.isArray(target)
    const result: any = isArray ? [] : {}
    map.set(target, result)
    if (isArray) {
      target.forEach((item, index) => {
        result[index] = deepClone(item, map)
      })
    } else {
      Object.keys(target).forEach((key) => {
        result[key] = deepClone(target[key], map)
      })
    }
    return result
  } else {
    return target
  }
}
