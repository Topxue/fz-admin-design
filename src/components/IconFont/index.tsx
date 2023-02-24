import { defineComponent, computed, h, compile } from 'vue'
export default defineComponent({
  name: 'IconFont',
  props: {
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 15
    }
  },
  setup(props) {
    const isArcoIcon = computed(
      () => props.icon.indexOf('fa-') < 0 && props.icon.indexOf('icon-') < 0
    )

    return () => {
      return (
        <div>
          {isArcoIcon.value ? (
            <i>{h(compile(`<${props.icon} size="${props.size}" />`))}</i>
          ) : (
            <i class={props.icon} style={{ fontSize: `${props.size}px` }}></i>
          )}
        </div>
      )
    }
  }
})
