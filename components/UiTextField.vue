<template>
  <div
    :class="{
      [$style.root]: true,
      [$style.rootHasLabel]: hasLabel,
      [$style.rootHasValue]: hasValue,
      [$style[`theme-${theme}`]]: theme,
      [$style[`size-${size}`]]: size,
    }"
  >
    <input
      :id="id"
      v-model="localValue"
      :class="$style.input"
      autocomplete="off"
      v-bind="$attrs"
      v-on="listeners"
    >

    <label
      v-if="label"
      :class="$style.label"
      :for="id"
    >
      {{ label }}
    </label>

    <button
      v-if="hasShowResetButton"
      :class="$style.button"
      @click="resetValue"
    >
      <IconReset :class="$style.resetIcon" />
    </button>

    <button
      v-if="hasShowCustomIcon"
      :class="$style.button"
      @click="setFocus"
    >
      <slot name="icon" />
    </button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  ref,
  onMounted,
  watch
} from '@nuxtjs/composition-api'

import IconReset from '@/assets/icons/close.svg'

import {
  generateId
} from '@/features/helpers'

export enum UI_TEXT_FIELD_THEMES {
  FILLED = 'filled',
  OUTLINE = 'outline',
}

export enum UI_TEXT_FIELD_SIZES {
  SMALL = 'small',
  LARGE = 'large',
}

export default defineComponent({
  name: 'UiTextField',

  components: {
    IconReset
  },

  props: {
    value: {
      type: [String, Number],
      default: ''
    },

    theme: {
      type: String,
      default: UI_TEXT_FIELD_THEMES.OUTLINE,
      validator: (value: UI_TEXT_FIELD_THEMES) => {
        return Object.values(UI_TEXT_FIELD_THEMES).includes(value)
      }
    },

    size: {
      type: String,
      default: UI_TEXT_FIELD_SIZES.SMALL,
      validator: (value: UI_TEXT_FIELD_SIZES) => {
        return Object.values(UI_TEXT_FIELD_SIZES).includes(value)
      }
    },

    label: {
      type: String,
      default: ''
    },

    isResettable: {
      type: Boolean,
      default: false
    }
  },

  setup (props, { listeners, emit, slots }) {
    const id = ref('')

    onMounted(() => {
      id.value = generateId(6, 'text-field-')
    })

    const hasFocus = ref(false)
    function setFocus () {
      const $input = document.querySelector(`#${id.value}`) as HTMLElement
      $input && $input.focus()
    }

    const hasShowResetButton = computed(() => props.isResettable && (hasFocus.value || localValue.value))

    const localValue = ref<string | number>('')
    const hasValue = computed(() => !!localValue.value)
    watch(() => props.value, (value) => {
      localValue.value = value
    }, {
      immediate: true
    })

    function resetValue () {
      localValue.value = ''
      emit('clear')
      setFocus()
    }

    const hasShowCustomIcon = computed(() => slots.icon && !hasShowResetButton.value)

    const hasLabel = computed(() => {
      return props.label && props.size === UI_TEXT_FIELD_SIZES.LARGE
    })

    const inputListeners = reactive({
      ...listeners,
      input (event: Event) {
        emit('input', (event.target as HTMLInputElement).value)
      },

      focus (event: Event) {
        hasFocus.value = true
        emit('focus', (event.target as HTMLInputElement).value)
      },

      blur (event: Event) {
        hasFocus.value = false
        emit('blur', (event.target as HTMLInputElement).value)
      }
    })

    return {
      listeners: inputListeners,
      id,
      hasLabel,
      hasFocus,
      setFocus,
      hasShowResetButton,
      hasValue,
      localValue,
      resetValue,
      hasShowCustomIcon
    }
  }
})
</script>

<style lang="postcss" module>
.root {
  position: relative;
  box-sizing: border-box;
  width: 100%;
}

.root--has-label {
  & .input:not(:focus)::placeholder {
    color: transparent;
  }

  &.root--has-value .input,
  & .input:focus {
    padding-top: theme('spacing.xl');
    padding-bottom: theme('spacing.md');
  }

  &.root--has-value .label,
  & .input:focus ~ .label {
    @apply text-2xs;

    transform: translateY(-16px);
  }
}

.input {
  width: 100%;
  height: 100%;
  color: theme('colors.main.deep-blue');
  text-overflow: ellipsis;
  border-style: solid;
  border-width: theme('borderWidth.sm');
  outline: none;
  transition: border-color 0.2s ease-in-out, color 0.3s ease-in-out;

  &::placeholder {
    color: theme('colors.main.steel');
  }
}

.label {
  @apply text-2xl;

  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 theme('spacing.lg');
  color: theme('colors.main.steel');
  cursor: text;
  transition: all 0.2s ease-in-out;
}

.button,
.button:focus {
  position: absolute;
  top: 50%;
  right: theme('spacing.lg');
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  overflow: hidden;
  background: transparent;
  border: none;
  outline: none;
  transform: translateY(-50%);
}

.size-small {
  height: 40px;
}

.size-small .input {
  @apply text-md;

  padding: theme('spacing.md') theme('spacing.3xl') theme('spacing.md') theme('spacing.md');
  border-radius: theme('borderRadius.md');
}

.size-small .label {
  display: none;

  @apply text-md;
}

.size-large {
  height: 56px;
}

.size-large .input {
  @apply text-2xl;

  padding: theme('spacing.lg') theme('spacing.3xl') theme('spacing.lg') theme('spacing.lg');
  border-radius: theme('borderRadius.lg');
}

.theme-filled .input {
  background: theme('colors.secondary.frosty');
  border-color: transparent;

  &:focus,
  &:hover {
    border-color: theme('colors.tertiary.niagara');
  }
}

.theme-outline .input {
  border-color: theme('colors.tertiary.rime');

  &:focus,
  &:hover {
    border-color: theme('colors.tertiary.niagara');
  }
}

.reset-icon {
  width: 12px;
}
</style>
