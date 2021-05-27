<template>
  <UiContainer
    :class="$style.container"
    data-test-id="the-research-area-list"
  >
    <UiTitle tag="h2" :class="$style.title">
      Область исследования
    </UiTitle>
    <UiExpandingBlock
      expanding-caption="Скрыть"
      :caption="`Показать еще ${researchAreaItems.length - 5}`"
      :class="$style.expandingBlock"
      :items="researchAreaItems"
      :gtm-parameters="gtmParameters"
    >
      <template #default="{ item: researchAreaItem }">
        <div
          :key="researchAreaItem.id"
          :class="$style.areaListItemWrapper"
        >
          <TheResearchAreaListItem
            :id="researchAreaItem.id"
            :name="researchAreaItem.name"
            :clinics-count="researchAreaItem.clinicsCount"
            :url="researchAreaItem.url"
          />
        </div>
      </template>
    </UiExpandingBlock>

    <div :class="$style.listWrapperDesktop">
      <div
        v-for="researchAreaItem in researchAreaItems"
        :key="researchAreaItem.id"
        :class="$style.areaListItemWrapper"
      >
        <TheResearchAreaListItem
          :id="researchAreaItem.id"
          :name="researchAreaItem.name"
          :clinics-count="researchAreaItem.clinicsCount"
          :url="researchAreaItem.url"
        />
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import UiContainer from './UiContainer.vue'
import UiExpandingBlock from './UiExpandingBlock.vue'
import UiTitle from './UiTitle.vue'
import TheResearchAreaListItem from './TheResearchAreaListItem.vue'
import IconArrow from '~/assets/icons/arrow-down.svg'
import { useStore } from '~/store'

export default defineComponent({
  name: 'TheResearchAreaList',

  components: {
    UiContainer,
    UiExpandingBlock,
    UiTitle,
    TheResearchAreaListItem,
    IconArrow
  },

  setup () {
    const store = useStore()
    const researchAreaItems = computed(() => store.state.research?.researchAreaList)
    const gtmParameters = { name: 'spec area list', action: 'clickMoreArea', formType: 'diag main' }

    return {
      researchAreaItems,
      gtmParameters
    }
  }
})
</script>

<style lang="postcss" module>
.container {
  composes: p-lg text-main-white from global;
}

.title {
  @apply
    mb-md;
}

.list-wrapper-desktop {
  @apply hidden;
}

@screen tablet {
  .area-list-item-wrapper {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .title {
    @apply
      mb-4xl;
  }

  .expanding-block {
    @apply hidden;
  }

  .list-wrapper-desktop {
    @apply block;

    column-count: 2;
  }
}

@screen desktop {
  .list-wrapper-desktop {
    column-count: 3;
  }
}
</style>
