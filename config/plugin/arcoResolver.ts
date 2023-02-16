import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default function configArcoResolverPlugin() {
  const arcoResolverPlugin = Components({
    dirs: ['src/components'],
    deep: false,
    resolvers: [ArcoResolver()],
    dts: 'types/components.d.ts'
  })
  return arcoResolverPlugin
}
