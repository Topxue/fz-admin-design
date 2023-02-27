/**
 * 是否生成打包报告
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true'
}
