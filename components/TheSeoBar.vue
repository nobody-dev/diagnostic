<template>
  <UiContainer
    :class="$style.container"
    data-test-id="the-seo-bar"
  >
    <TheSeoBarItem
      v-for="item in seoBarList"
      :key="item.name"
      :src="item.src"
      :text="item.text"
    />
  </UiContainer>
</template>

<script lang="ts">
import {
  computed, defineComponent
} from '@nuxtjs/composition-api'

import constants from '@/dictionary/constants'

import TheSeoBarItem from './TheSeoBarItem.vue'
import UiContainer from './UiContainer.vue'
import {
  useStore
} from '~/store'

export default defineComponent({
  name: 'TheSeoBar',

  components: {
    UiContainer,
    TheSeoBarItem
  },

  setup () {
    const store = useStore()
    const seoBarList = computed(() => {
      return constants.seoBarList.map((el) => {
        if (el.name === 'appointment') {
          if (store.getters['city/currentCityId'] === 1) {
            return { ...el, text: el.textMoscow }
          } else {
            return { ...el, text: el.text }
          }
        }
        return el
      })
    })

    return {
      seoBarList
    }
  }
})
</script>

<style lang="postcss" module>
.container {
  @apply
    hidden;
}

@screen tablet {
  .container {
    @apply
      flex;

    height: 84px;
  }
}

@screen desktop {
  .container {
    height: 276px;
  }
}
</style>
