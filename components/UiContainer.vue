<template functional>
  <component
    :is="props.tag"
    v-bind="data.attrs"
    :class="data.class"
    class="wrapper w-full flex justify-center items-center"
    data-test-id="ui-container"
    v-on="listeners"
  >
    <section :class="$style.container">
      <slot />
    </section>
  </component>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'UiContainer',

  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
})
</script>

<style lang="postcss" module>
  .container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
