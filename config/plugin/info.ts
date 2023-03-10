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
      console.log(bold(green(`ð æ¬¢è¿ä½¿ç¨${blue('[fz-design-admin]')}`)))
      // if (config.command === 'build') {
      //   startTime = dayjs(new Date())
      // }
    },
    closeBundle() {
      if (config.command === 'build') {
        bold(green(`ðæ­åæåå®æ`))
        // endTime = dayjs(new Date())
        // bold(
        //   green(
        //     `ðæ­åæåå®æï¼æ»ç¨æ¶${dayjs
        //       .duration(endTime.diff(startTime))
        //       .format('mmåssç§')}ï¼æååçå¤§å°ä¸º${200}kbï¼`
        //   )
        // )
      }
    }
  }
}
