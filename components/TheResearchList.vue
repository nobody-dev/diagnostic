<template>
  <UiContainer
    :class="$style.container"
    data-test-id="the-research-list"
  >
    <UiTitle tag="h2" :class="$style.title">
      Диагностика
    </UiTitle>
    <UiExpandingBlock
      expanding-caption="Скрыть"
      :caption="`Показать еще ${parentItems.length - 5}`"
      :items="parentItems"
      :class="$style.expandingBlock"
      :gtm-parameters="gtmParameters"
    >
      <template #default="{ item: parentItem }">
        <div
          v-if="!researchCount(parentItem)"
          :class="$style.listWrapper"
        >
          <a
            :href="researchUrl(parentItem.url)"
            @click="clickElement('clickSpecType')"
          >
            <div :class="$style.listTitle">
              {{ parentItem.shortName }}
              <div :class="$style.researchCount">
                {{ researchCountText(parentItem) }}
              </div>
              <IconArrowRight :class="$style.arrow" />
            </div>
          </a>
        </div>
        <div
          v-else
          :class="$style.listWrapper"
          @click="openModal(parentItem)"
        >
          <div :class="$style.listTitle">
            {{ parentItem.shortName }}
            <div :class="$style.researchCount">
              {{ researchCountText(parentItem) }}
            </div>
            <IconArrowRight :class="$style.arrow" />
          </div>
        </div>
      </template>
    </UiExpandingBlock>

    <div :class="$style.listWrapperDesktop">
      <div
        v-for="(parentItem, i) in parentItems"
        :key="i"
        :class="$style.listWrapper"
      >
        <div :class="$style.listTitle">
          <TheResearchListItem
            :url="parentItem.url"
            :name="parentItem.shortName"
          />
          <IconArrowRight :class="$style.arrow" />
        </div>
        <ul :class="$style.list">
          <template v-for="(item, index) in researchListByParent[parentItem.shortName]">
            <li
              v-if="index < researchListByParentCount"
              :key="item.id"
              :class="$style.linkWrapper"
            >
              <TheResearchListItem
                :url="item.url"
                :name="item.shortName"
              />
            </li>
          </template>
        </ul>
        <button
          v-if="isMoreResearch(parentItem)"
          :class="$style.more"
          @click="openModal(parentItem)"
        >
          еще
        </button>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import { useModal } from '@/features/modal'
import IconArrowRight from '@/assets/icons/arrow-right.svg'
import constants from '@/dictionary/constants'
import UiContainer from './UiContainer.vue'
import TheResearchListItem from './TheResearchListItem.vue'
import UiButton from './UiButton.vue'
import UiExpandingBlock from './UiExpandingBlock.vue'
import UiTitle from './UiTitle.vue'
import { useStore } from '~/store'
import { plural } from '~/features/helpers'
import { Research } from '~/store/types'

interface IResearchByParent {
  [parentName: string] : Research[]
}

export default defineComponent({
  name: 'TheResearchList',

  components: {
    UiContainer,
    TheResearchListItem,
    UiButton,
    UiExpandingBlock,
    UiTitle,
    IconArrowRight
  },

  setup () {
    const researchDirectoryModal = useModal(() => import(/* webpackPreload: true */'@/components/TheResearchDirectory.vue'))

    const store = useStore()
    const researchList = computed(() => store.state.research?.researchList).value
    const parentItems = computed(() => researchList?.filter(item => !item.parentName))
    const researchListByParent = computed(() => parentItems.value?.reduce((res: IResearchByParent, item) => {
      res[item.shortName] = researchList?.filter(research => research.parentName === item.shortName) || []

      return res
    }, {}))
    const { $gtm } = useContext()

    function researchUrl (url: String) {
      return process.env.NUXT_ENV_HOST ? process.env.NUXT_ENV_HOST + url : null
    }

    function researchCount (item: Research) {
      return researchListByParent.value ? researchListByParent.value[item.shortName].length : null
    }

    function researchCountText (item: Research) {
      if (researchListByParent.value && researchListByParent.value[item.shortName].length === 0) {
        return `${1} исследование`
      }
      return researchListByParent.value
        ? `${researchListByParent.value[item.shortName].length} ${plural(researchListByParent.value[item.shortName].length, constants.RESEARCH_PLURAL_WORDS)}`
        : `${1} исследование`
    }

    function isMoreResearch (item: Research) {
      return researchListByParent.value ? researchListByParent.value[item.shortName].length > constants.RESEARCH_VIEW_COUNT : false
    }

    async function openModal (researchItemParent: Research) {
      clickElement('openSpecList')
      const researchItemChildren = researchListByParent.value ? researchListByParent.value[researchItemParent.shortName] : []
      await researchDirectoryModal({ researchItemParent, researchItemChildren })
    }

    const researchListByParentCount = 3

    function clickElement (action: string) {
      $gtm.push({ event: 'DdTrackData', name: 'spec list', action, formType: 'diag main' })
    }

    const gtmParameters = { name: 'spec list', action: 'clickMoreSpecMob', formType: 'diag main' }

    return {
      researchList,
      parentItems,
      openModal,
      plural,
      researchListByParent,
      researchListByParentCount,
      researchCount,
      researchCountText,
      isMoreResearch,
      researchUrl,
      clickElement,
      gtmParameters
    }
  }

})
</script>

<style lang="postcss" module>
.container {
  composes: p-lg from global;
}

.title {
  @apply mb-md;
}

.list-wrapper {
  @apply p-md;

  border-bottom: 1px solid theme('colors.secondary.frosty');
}

.list-wrapper-desktop {
  @apply hidden;
}

.list-title {
  @apply text-md relative;

  cursor: pointer;
}

.research-count {
  @apply text-main-steel text-xs mt-xs;

  font-weight: normal;
}

.arrow {
  @apply absolute right-0;

  top: 15px;
}

@screen tablet {
  .title {
    @apply mb-4xl;
  }

  .expanding-block {
    @apply hidden;
  }

  .list-wrapper-desktop {
    @apply block;

    grid-column-gap: 40px;
    column-gap: 40px;
    column-width: 220px;
  }

  .list-wrapper {
    @apply mb-3xl p-none;

    border: none;
  }

  .list-title {
    @apply mb-sm text-lg;

    font-weight: 600;
  }

  .link-wrapper {
    @apply mb-sm ml-xl;

    list-style: disc;
  }

  .arrow {
    @apply hidden;
  }

  .more {
    @apply text-main-ocean;

    cursor: pointer;

    &:hover {
      @apply text-tertiary-blue-jeans;
    }
  }
}
</style>
