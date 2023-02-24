import type { App } from 'vue'
import checkPermission from './permission'
/**
 * 导出指令方法：v-xxx
 * @methods checkPermission 用户权限指令，用法：v-auth
 */
export function directive(app: App) {
  // 用户权限指令
  checkPermission(app)
}
