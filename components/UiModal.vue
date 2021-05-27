<template>
  <div
    ref="overlay"
    :class="$style.overlay"
    @click="onClickByOverlay"
  >
    <div :class="$style.window">
      <div>
        <button
          :class="$style.buttonClose"
          @click="close()"
        >
          <IconClose :class="$style.iconClose" />
        </button>
      </div>

      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  Ref
} from '@nuxtjs/composition-api'
import IconClose from '@/assets/icons/close.svg'

export default defineComponent({
  name: 'UiModal',

  components: {
    IconClose
  },

  setup (props, { emit }) {
    let $body: HTMLBodyElement | null = null

    function lockBodyScroll () {
      $body && $body.classList.add('body--fixed')
    }

    function unlockBodyScroll () {
      $body && $body.classList.remove('body--fixed')
    }

    const overlay: Ref<HTMLElement | null> = ref(null)
    function onClickByOverlay ($event: Event) {
      if (overlay.value !== $event.target) {
        return
      }

      close()
    }

    function close (payload?: any) {
      emit('resolve', payload)
    }

    onMounted(() => {
      $body = document.querySelector('body')

      lockBodyScroll()
    })

    onUnmounted(() => {
      unlockBodyScroll()
    })

    return {
      overlay,
      onClickByOverlay,
      unlockBodyScroll,
      lockBodyScroll,
      close
    }
  }
})
</script>

<style lang="postcss" module>
:global(.body--fixed) {
  overflow: hidden;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: rgba(38, 54, 75, 0.6);
}

.window {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  margin: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  background: theme('colors.main.white');
  border-radius: 0;
}

.button-close {
  position: absolute;
  top: theme('spacing.lg');
  right: theme('spacing.lg');
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  color: theme('colors.main.steel');
  background: theme('colors.secondary.frosty');
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  fill: theme('colors.main.steel');

  &:hover {
    background: theme('colors.tertiary.rime');
  }

  &:active {
    transform: scale(0.9);
  }
}

.icon-close {
  width: 10px;
  height: 10px;
}

@screen tablet {
  .window {
    width: auto;
    min-width: 300px;
    height: auto;
    min-height: 300px;
    margin: theme('spacing.2xl') 0;
    overflow-y: hidden;
    border-radius: 8px;
    box-shadow: theme('boxShadow.md');
  }
}
</style>
