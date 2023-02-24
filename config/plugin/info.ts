import type { Plugin } from 'vite'
// import duration from 'dayjs/plugin/duration'
import { green, blue, bold } from 'picocolors'

export function viteBuildInfo(): Plugin {
  let config: { command: string }
  return {
    name: 'vite:buildInfo',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    buildStart() {
      console.log(bold(green(`👏 欢迎使用${blue('[fz-design-admin]')}`)))
      // if (config.command === 'build') {
      //   startTime = dayjs(new Date())
      // }
    },
    closeBundle() {
      if (config.command === 'build') {
        bold(green(`🎉恭喜打包完成`))
        // endTime = dayjs(new Date())
        // bold(
        //   green(
        //     `🎉恭喜打包完成（总用时${dayjs
        //       .duration(endTime.diff(startTime))
        //       .format('mm分ss秒')}，打包后的大小为${200}kb）`
        //   )
        // )
      }
    }
  }
}
