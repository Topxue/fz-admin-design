import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FzDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    return () => {
      return (
        <a-drawer
          width={480}
          maskClosable={false}
          visible={props.visible}
          v-slots={{
            footer: () => slots?.footer?.()
          }}
        >
          {slots?.default?.()}
          {/* <div class="fz-drawer__body">{slots?.default?.()}</div> */}
        </a-drawer>
      )
    }
  }
})
