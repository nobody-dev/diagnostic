<template>
  <section
    :class="[
      $style.wrapper,
      $style[`wrapper--align-${alignment}`],
    ]"
  >
    <header
      :class="{
        [$style.item]: true,
        [$style.title]: $slots.title,
      }"
    >
      <slot name="title" />
    </header>

    <div :class="[$style.item, $style.body]">
      <div :class="[$style.item, $style.content, $style[oveflowHiddenClass]]">
        <slot />
      </div>

      <div
        v-if="hasAutoAlignActions"
        :class="[$style.item, $style.actions]"
      >
        <slot name="actions" />
      </div>
    </div>

    <div
      v-if="hasBottomAlignActions"
      :class="[$style.item, $style.actions]"
    >
      <slot name="actions" />
    </div>

    <footer
      v-if="$slots.footer"
      :class="[$style.item, $style.footer]"
    >
      <slot name="footer" />
    </footer>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  computed
} from '@nuxtjs/composition-api'

export enum UI_DIALOG_ALIGN_VALUES {
  LEFT = 'left',
  CENTER = 'center'
}

export enum UI_DIALOG_OVERFLOW_HIDDEN_VALUES {
  x = 'x',
  y = 'y'
}

export default defineComponent({
  name: 'ui-dialog',

  props: {
    alignment: {
      type: String,
      default: 'center',
      validator: (value: UI_DIALOG_ALIGN_VALUES) => {
        return Object.values(UI_DIALOG_ALIGN_VALUES).includes(value)
      }
    },

    hasVerticalContentStretch: {
      type: Boolean,
      default: false
    },

    overflowHiddenDirection: {
      type: String,
      validator: (value: UI_DIALOG_OVERFLOW_HIDDEN_VALUES) => {
        return Object.values(UI_DIALOG_OVERFLOW_HIDDEN_VALUES).includes(value)
      }
    }
  },

  setup (props, { slots }) {
    const hasBottomAlignActions = computed(() => {
      return slots.actions &&
        props.hasVerticalContentStretch
    })

    const hasAutoAlignActions = computed(() => {
      return slots.actions &&
        !props.hasVerticalContentStretch
    })

    const oveflowHiddenClass = computed(() => {
      return props.overflowHiddenDirection ? `content--overflow-hidden-${props.overflowHiddenDirection}` : 'content--overflow-hidden'
    })

    return {
      hasBottomAlignActions,
      hasAutoAlignActions,
      oveflowHiddenClass
    }
  }
})
</script>

<style lang="postcss" module>
.wrapper {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  min-height: inherit;
  margin: 0;
  padding: 0;
  background: theme('colors.main.white');
}

.title {
  @apply text-2xl;

  font-weight: bold;
}

.item {
  width: 100%;
  padding-right: theme('spacing.lg');
  padding-left: theme('spacing.lg');
}

.body {
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: space-between;
  width: 100%;
  padding-right: 0;
  padding-left: 0;
  overflow: hidden;
}

.content {
  flex-grow: 1;
  margin-top: theme('spacing.2xl');
  padding-bottom: theme('spacing.lg');
}

.content--overflow-hidden-x {
  overflow-x: hidden;
}

.content--overflow-hidden-y {
  overflow-y: hidden;
}

.content--overflow-hidden {
  overflow: hidden;
}

.actions {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding-bottom: theme('spacing.lg');
}

.footer {
  @apply text-2xs-ex;

  padding: theme('spacing.lg');
  color: theme('colors.main.deep-blue');
  background: theme('colors.secondary.frosty');
}

.wrapper--align-left {
  & .title {
    width: 100%;
    padding-top: theme('spacing.lg');
    padding-right: theme('spacing.5xl');
    text-align: left;
  }

  & .actions {
    justify-content: flex-end;
  }

  & .footer {
    text-align: left;
  }
}

.wrapper--align-center {
  & .title {
    padding-top: calc(theme('spacing.lg') * 2);
    text-align: center;
  }

  & .actions {
    justify-content: center;
  }

  & .footer {
    text-align: center;
  }
}

@screen tablet {
  .content {
    margin-top: theme('spacing.xl');
    padding: 0 theme('spacing.7xl') theme('spacing.5xl');
  }

  .wrapper--align-left {
    & .title {
      width: 100%;
      padding-top: theme('spacing.4xl');
      padding-left: theme('spacing.7xl');
    }
  }
}
</style>
