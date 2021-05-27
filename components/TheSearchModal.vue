<template>
  <UiDialog alignment="center">
    <template #title>
      Поиск
    </template>
    <template #default>
      <div :class="$style.inputs">
        <UiTextField
          v-model="query.research"
          :theme="query.research ? 'outline' : 'filled'"
          placeholder="Диагностика"
          is-resettable
          @click="showList('research')"
          @clear="clearResearch"
        >
          <template #icon>
            <IconArrowDown :class="$style.icon" />
          </template>
        </UiTextField>
        <UiTextField
          v-model="query.location"
          :theme="query.location ? 'outline' : 'filled'"
          :class="$style.location"
          placeholder="Метро или город МО"
          is-resettable
          @click="showList('location')"
          @clear="clearLocation"
        >
          <template #icon>
            <IconArrowDown :class="$style.icon" />
          </template>
        </UiTextField>
      </div>
      <div :class="$style.content">
        <div :class="$style.header">
          {{ currentListHeader }}
        </div>
        <ul :class="$style.list">
          <li
            v-for="(item, key) in competedSuggestions"
            :key="key"
            :class="$style.suggestion"
            @click="select(item.id)"
          >
            <span
              v-if="item.hasColor"
              :style="{ background: item.color }"
              :class="$style.color"
            />
            {{ item.name }}
          </li>
        </ul>
      </div>
    </template>
  </UiDialog>
</template>

<script lang="ts">
import {
  computed,
  ref,
  defineComponent,
  Ref,
  watch,
  onMounted,
  PropType,
  useContext
} from '@nuxtjs/composition-api'
import UiDialog from '@/components/UiDialog.vue'
import UiTextField from '@/components/UiTextField.vue'
import IconArrowDown from '@/assets/icons/arrow-down.svg'
import constants from '@/dictionary/constants'
import Fuse from 'fuse.js'
import { ISearchModalQuery, ISearchBarItem } from '@/components/types'
import { useStore } from '@/store'

export default defineComponent({
  name: 'TheSearchModal',

  components: {
    UiDialog,
    UiTextField,
    IconArrowDown
  },

  props: {
    target: {
      type: String as PropType<string>,
      default: () => ('')
    }
  },

  setup (props, { emit }) {
    const store = useStore()
    const listActive = ref('')

    const currentListHeader = computed(() => listActive.value === 'research'
      ? 'Диагностика'
      : 'Город, метро, район')
    const currentItem = computed(() => listActive.value === 'research'
      ? store.getters['research/currentResearch']
      : store.getters['location/currentLocation'])
    const currentList: Ref<ISearchBarItem[] | undefined> = computed(() => listActive.value === 'research'
      ? store.state.research?.researchList
      : store.state.location?.locationList)
    const competedSuggestions = computed(() => suggestions?.value?.map((item: ISearchBarItem) => {
      if ('type' in item) {
        return {
          ...item,
          hasColor: constants.LOCATION_TYPE_BY_COLOR.includes(item.type),
          color: item.color ? '#' + item.color : '#ffffff00'
        }
      }
      return item
    }))

    function showList (list: string) {
      listActive.value = list
    }
    function clearLocation () {
      store.commit('location/SET_LOCATION_ITEM_ID', null)
    }
    function clearResearch () {
      store.commit('research/SET_RESEARCH_ITEM_ID', null)
    }
    function select (id: number) {
      if (listActive.value === 'location') {
        store.commit('location/SET_LOCATION_ITEM_ID', id)
        clickElement('inputGeo')
      } else {
        store.commit('research/SET_RESEARCH_ITEM_ID', id)
        clickElement('inputSpec')
      }
      emit('resolve')
    }

    onMounted(() => {
      query.value.research = store.getters['research/currentResearch']?.name || ''
      query.value.location = store.getters['location/currentLocation']?.name || ''
      listActive.value = props.target || 'research'
    })

    const query: Ref<ISearchModalQuery> = ref({
      research: '',
      location: ''
    })
    watch(currentItem, (currentItem: ISearchBarItem | null | undefined) => {
      query.value[listActive.value] = currentItem?.name || ''
    })
    watch(query, (value: ISearchModalQuery) => {
      search(value[listActive.value])
    }, { deep: true })

    const suggestions: Ref<ISearchBarItem[] | undefined> = ref([])
    let fuse: Fuse<ISearchBarItem> | null = null
    watch(currentList, (items: ISearchBarItem[] | undefined) => {
      fuse = new Fuse(items || [], {
        includeScore: false,
        minMatchCharLength: 2,
        threshold: 0.2,
        keys: ['name']
      })
      suggestions.value = currentList?.value
    }, {
      immediate: true
    })

    const { $gtm } = useContext()

    function search (symbols: string) {
      clickElement('clickFind')
      let result
      // Если в UISelect не выбрано никакое место или направление, отрисовываем все доступные айтемы,
      // либо фильтруем по введенным символам
      if (!symbols) {
        suggestions.value = currentList?.value
      } else {
        result = fuse?.search(symbols)
        suggestions.value = result?.map(resultItem => resultItem.item) || []
      }
    }

    function clickElement (action: string) {
      $gtm.push({ event: 'DdTrackData', name: 'main filter', action, formType: 'diag main' })
    }

    return {
      listActive,
      currentListHeader,
      currentItem,
      currentList,
      suggestions,
      competedSuggestions,
      query,
      showList,
      clearLocation,
      clearResearch,
      select,
      search
    }
  }
})
</script>

<style lang="postcss" module>
.icon {
  width: 12px;
  height: 12px;
  fill: theme('colors.main.steel');
}

.location {
  composes: mt-sm from global;
}

.content {
  composes: mt-lg h-full from global;
}

.header {
  composes: px-xl py-sm text-md relative uppercase from global;
  right: theme('spacing.lg');
  width: 100vw;
  color: theme('colors.main.steel');
  background: theme('colors.main.mist');
  border-top: 1px solid #dadce6;
  border-bottom: 1px solid #dadce6;
}

.list {
  composes: overflow-hidden overflow-y-auto h-full from global;
}

.suggestion {
  composes: flex items-center text-main-black py-sm font-display text-sm-ex from global;
}

.color {
  composes: rounded-full ml-sm mr-md block from global;
  width: 8px;
  height: 8px;
}
</style>
