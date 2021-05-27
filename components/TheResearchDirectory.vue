<template>
  <UiDialog
    alignment="left"
    :class="$style.wrapper"
    overflow-hidden-direction="x"
  >
    <template #title>
      <TheResearchListItem
        :url="researchTitleUrl"
        :name="researchTitle"
      />
    </template>
    <template #default>
      <ul :class="$style.list">
        <li
          v-for="(letterItem, index) in listSplicedDiseases"
          :key="letterItem.id"
          :class="$style.listItem"
        >
          <span :class="$style.title">
            {{ index }}
          </span>
          <ul>
            <li
              v-for="item in listSplicedDiseases[index]"
              :key="item.id"
              :class="$style.linkWrapper"
            >
              <TheResearchListItem
                :url="item.url"
                :name="item.shortName"
              />
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </UiDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import UiDialog from '@/components/UiDialog.vue'
import TheResearchListItem from './TheResearchListItem.vue'
import { Research } from '~/store/types'

interface IAccumObject {
  [key: string]: Research[];
}

export default defineComponent({
  name: 'TheResearchDirectory',

  props: {
    researchItemParent: {
      type: Object as PropType<Research>
    },
    researchItemChildren: {
      type: Array as PropType<Research[]>,
      default: () => ([])
    }
  },

  components: {
    UiDialog,
    TheResearchListItem
  },
  setup (props) {
    const researchTitle: string = props.researchItemParent?.shortName || ''
    const researchTitleUrl: string = props.researchItemParent?.url || ''
    const researchItemChildren: Research[] = props.researchItemChildren
    researchItemChildren.sort((a: Research, b: Research) => {
      return +a.shortName - +b.shortName
    })
    function getDiseasesByFirstLetter (letter: string, array: Research[]) {
      return array.filter(item => item.shortName.charAt(0).toLowerCase() === letter.toLowerCase())
    }
    function getSplicedDiseases (researchItemChildren: Research[]) {
      return researchItemChildren.reduce((accum: IAccumObject, current: Research) => {
        const firstLetter: string = current.shortName.charAt(0)
        accum[firstLetter] = [...getDiseasesByFirstLetter(firstLetter, researchItemChildren)]
        return accum
      }, {})
    }
    function sortKeys (obj: object) {
      return Object.entries(obj).sort((a, b) => {
        if (a[0] < b[0]) { return -1 }
        if (a[0] > b[0]) { return 1 }
        return 0
      }).reduce((_sortedObj, [k, v]) => ({
        ..._sortedObj,
        [k]: v
      }), {})
    }
    const listSplicedDiseases = sortKeys(getSplicedDiseases(researchItemChildren))

    return {
      researchTitle,
      researchTitleUrl,
      listSplicedDiseases
    }
  }
})
</script>

<style lang="postcss" module>
.title {
  composes: mb-sm font-semibold text-main-steel text-lg from global;
}

.link-wrapper {
  composes: mb-sm ml-xl list-disc from global;
}

.link-wrapper:last-child {
  @apply
    mb-3xl;
}

@screen tablet {
  .list {
    column-count: 3;
  }

  .list__item {
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
  }
}

@screen desktop {
  .title {
    @apply
      text-2xl;
  }

  .list {
    column-count: 4;
  }

  .list__item {
    @apply
      mr-md;

    width: 220px;
  }
}
</style>
