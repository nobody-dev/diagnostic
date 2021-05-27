<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :class="{
      [$style.button]: true,
      [$style[`button--size-${size}`]]: size,
      [$style[`button--theme-${theme}`]]: theme,
      [$style['button--adaptive']]: isAdaptive
    }"
    data-test-id="ui-button"
    v-on="$listeners"
  >
    <span v-if="$slots.icon">
      <slot name="icon" />
    </span>

    <span>
      <slot />
    </span>

    <span
      v-if="$slots.iconRight"
      :class="$style.iconRight"
    >
      <slot name="iconRight" />
    </span>
  </component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent
} from '@nuxtjs/composition-api'

export enum UI_BUTTON_SIZES {
  DEFAULT = 'default',
  LARGE = 'large',
  HUGE = 'huge',
}

export enum UI_BUTTON_THEMES {
  DELUXE = 'deluxe',
  OUTLINE = 'outline',
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export default defineComponent({
  name: 'UiButton',

  props: {
    size: {
      type: String,
      default: UI_BUTTON_SIZES.DEFAULT,
      validator: (value: UI_BUTTON_SIZES) => {
        return Object.values(UI_BUTTON_SIZES).includes(value)
      }
    },

    theme: {
      type: String,
      default: UI_BUTTON_THEMES.PRIMARY,
      validator: (value: UI_BUTTON_THEMES) => {
        return Object.values(UI_BUTTON_THEMES).includes(value)
      }
    },

    isLink: {
      type: Boolean,
      default: false
    },

    isAdaptive: {
      type: Boolean,
      default: false
    }
  },

  setup (props) {
    const tag = computed(() => props.isLink ? 'a' : 'button')

    return {
      tag
    }
  }
})
</script>

<style lang="postcss" module>
.button {
  @apply
    box-border
    flex
    items-center
    justify-center
    cursor-pointer;
  /* TODO: Добавить возможность подсвечивать кнопку
  Для этого надо навесить класс на body при нажатии Tab */
  &:focus {
    @apply outline-none;
  }
}
/* SIZES */
.button--size-default {
  @apply
    py-sm
    px-lg
    text-sm
    rounded;
}

.button--size-large {
  @apply
    py-sm
    px-xl
    text-md-ex
    font-semibold
    rounded;
}

.button--size-huge {
  @apply
    py-lg
    px-3xl
    text-2xl
    font-semibold
    rounded-lg;
}
/* THEMES */
.button--theme-deluxe {
  @apply
    bg-main-pink
    text-main-white;

  &:hover {
    @apply bg-secondary-pink-brand;
  }

  &:active {
    @apply bg-tertiary-jazz-jam;
  }
}

.button--theme-outline {
  @apply
    bg-main-white
    text-main-deep-blue
    border
    border-tertiary-rime;

  &:hover {
    @apply
      bg-tertiary-rime
      border-tertiary-niagara;
  }

  &:active {
    @apply
      bg-tertiary-niagara;
  }
}

.button--theme-primary {
  @apply
    bg-secondary-powder
    text-main-pink;

  &:hover {
    @apply bg-tertiary-pastel-pink;
  }

  &:active {
    @apply bg-tertiary-piggy;
  }
}

.button--theme-secondary {
  @apply
    bg-secondary-frosty
    text-main-deep-blue;

  &:hover {
    @apply bg-tertiary-rime;
  }

  &:active {
    @apply bg-tertiary-niagara;
  }
}

.button--adaptive {
  @apply
    w-full
    py-sm
    px-lg
    text-md-ex
    font-semibold
    rounded-md;
}

.icon-right {
  @apply
    ml-sm;
}

@screen tablet {
  .button--adaptive {
    @apply
      w-auto
      py-lg
      px-3xl
      text-2xl;
  }
}
</style>
