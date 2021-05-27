<template>
  <component
    :is="tag"
    v-bind="$attrs"
    data-test-id="ui-title"
    :class="[$style.title, $style[`title--${tag}`]]"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

enum TITLE_TYPES {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4'
}

const DEFAULT_TITLE_TYPE: string = 'h2'

export default defineComponent({
  name: 'UiTitle',

  props: {
    tag: {
      type: String,
      default: DEFAULT_TITLE_TYPE,
      validator: (value: TITLE_TYPES) => {
        return Object.values(TITLE_TYPES).includes(value)
      }
    }
  }
})
</script>

<style lang="postcss" module>
.title {
  @apply
    text-main-deep-blue
    font-semibold
    font-display;
}

.title--h1 {
  @apply
    text-lg;
}

.title--h2 {
  @apply
    text-3xl;
}

.title--h3 {
  @apply
    text-md;
}

.title--h4 {
  @apply
    text-md;
}

@screen desktop {
  .title--h1 {
    @apply
      text-6xl;
  }

  .title--h2 {
    @apply
      text-5xl;
  }

  .title--h3 {
    @apply
      text-2xl;
  }
}
</style>
