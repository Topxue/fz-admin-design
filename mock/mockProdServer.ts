import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import user from './user'
import messageBox from './message-box'

export function setupProdMockServer() {
  createProdMockServer([...user, ...messageBox])
}
