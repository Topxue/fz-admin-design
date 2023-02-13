import { storeToRefs } from 'pinia'
import { generate } from '@arco-design/color'
import { useAppStore } from '@/stores'

export default function usePrimaryColor(color: string) {
  const {
    appConfig: {
      value: { isDark }
    }
  } = storeToRefs(useAppStore())

  const el = document.body as HTMLElement

  const colors = generate(color, {
    list: true,
    format: 'rgb',
    dark: isDark
  })

  colors.forEach((hexColor: string, index: number) => {
    const rgb = hexColor.match(/\((.+?)\)/g)?.[0] as string
    const color = rgb.replace(/\(|\)/g, '')

    el.style.setProperty(`--primary-${index + 1}`, color)
  })
}
