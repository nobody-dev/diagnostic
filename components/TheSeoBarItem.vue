<template>
  <UiContainer
    :class="$style.container"
    data-test-id="the-seo-bar-item"
  >
    <div :class="$style.content">
      <img
        :class="$style.image"
        :src="src"
        alt="Запись на диагностику"
      >
      <h2 :class="$style.text">
        {{ text }}
      </h2>
    </div>
  </UiContainer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import UiContainer from '@/components/UiContainer.vue'

export default defineComponent({
  name: 'TheSeoBarItem',

  components: {
    UiContainer
  },

  props: {
    text: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="postcss" module>
.container {
  composes: text-main-white from global;

  @apply
    inline-block
    px-sm
    w-1/3;
}

.content {
  composes: flex items-center from global;
}

.image {
  width: 52px;
  height: 52px;
}

.text {
  composes: text-main-deep-blue text-md ml-xs font-semibold from global;
}

@screen desktop {
  .content {
    @apply
      flex-col;
  }

  .image {
    width: 112px;
    height: 112px;
  }

  .text {
    @apply
      text-2xl
      text-center
      mt-2xl;
  }
}
</style>
