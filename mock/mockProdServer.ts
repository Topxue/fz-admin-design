import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import user from './user'
// const modules: Record<string, any> = import.meta.glob('./mock/*.ts', {
//   eager: true
// })
// const mockModules = []

// console.log(modules, 'modules...')

// Object.keys(modules).forEach((key) => {
//   mockModules.push(...modules[key].default)
// })

export function setupProdMockServer() {
  createProdMockServer([...user])
}
