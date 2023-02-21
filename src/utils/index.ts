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

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual(a: any, b: any) {
  if (!a || !b) return false
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)
  if (aProps.length != bProps.length) return false
  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i]
    const propA = a[propName]
    const propB = b[propName]
    // eslint-disable-next-line no-prototype-builtins
    if (!b.hasOwnProperty(propName)) return false
    if (propA instanceof Object) {
      if (!isObjectValueEqual(propA, propB)) return false
    } else if (propA !== propB) {
      return false
    }
  }
  return true
}
