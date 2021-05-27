<template>
  <div
    ref="root"
    :class="$style.root"
  >
    <UiTextField
      v-model="query"
      v-bind="$attrs"
      :theme="theme"
      size="large"
      is-resettable
      v-on="$listeners"
      @click="showList"
      @clear="clearValue"
    >
      <template #icon>
        <IconArrowDown :class="$style.icon" />
      </template>
    </UiTextField>

    <ul
      v-if="hasShowList"
      :class="$style.list"
    >
      <li
        v-for="(item, key) in suggestions"
        :key="key"
        :class="$style.item"
        @click="select(item.value)"
      >
        <slot
          name="item"
          :value="item"
        >
          {{ item.title }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  computed,
  Ref,
  onMounted,
  PropType
} from '@nuxtjs/composition-api'
import Fuse from 'fuse.js'

import UiTextField from '@/components/UiTextField.vue'
import {
  outClick
} from '@/features/helpers'
import IconArrowDown from '~/assets/icons/arrow-down.svg'

export enum UI_SELECT_THEMES {
  FILLED = 'filled',
  OUTLINE = 'outline',
}

type SelectItem = {
  value: number
  title: string
}

export default defineComponent({
  name: 'ui-select',

  components: {
    UiTextField,
    IconArrowDown
  },

  props: {
    value: {
      type: Number as PropType<number | null>,
      default: () => null
    },

    items: {
      type: Array as PropType<SelectItem[]>,
      default: () => ([])
    },

    theme: {
      type: String as PropType<string>,
      default: UI_SELECT_THEMES.OUTLINE,
      validator: (value: UI_SELECT_THEMES) => {
        return Object.values(UI_SELECT_THEMES).includes(value)
      }
    }
  },

  setup (props, { emit }) {
    const hasShowList = ref(false)

    function showList () {
      hasShowList.value = true
    }

    function hideList () {
      hasShowList.value = false
    }

    const root: Ref<HTMLElement | null> = ref(null)
    onMounted(() => {
      outClick(root.value, hideList)
    })

    function select (value: number) {
      emit('select', value)
      hideList()
    }

    const query = ref('')
    const currentItem = computed(() => props.items.find(item => item.value === props.value))
    watch(() => currentItem.value, (currentItem: SelectItem | undefined) => {
      query.value = currentItem?.title || ''
    }, {
      immediate: true
    })
    watch(query, (value) => {
      search(value)
    })

    const suggestions: Ref<SelectItem[]> = ref([])
    let fuse: Fuse<SelectItem> | null = null
    watch(() => props.items, (items: SelectItem[]) => {
      fuse = new Fuse(items, {
        includeScore: false,
        minMatchCharLength: 2,
        threshold: 0.2,
        keys: ['title']
      })

      suggestions.value = props.items
    }, {
      immediate: true
    })

    function search (symbols: string) {
      let result
      // Если в UISelect не выбрано никакое место или направление, отрисовываем все доступные айтемы,
      // либо фильтруем по введенным символам
      if (!symbols) {
        suggestions.value = props.items
      } else {
        result = fuse?.search(symbols)
        suggestions.value = result?.map(resultItem => resultItem.item) || []
      }
    }

    function clearValue () {
      query.value = ''
      emit('clear')
      showList()
    }

    return {
      hasShowList,
      showList,
      hideList,
      root,
      select,
      currentItem,
      query,
      suggestions,
      search,
      clearValue
    }
  }
})
</script>

<style lang="postcss" module>
.root {
  position: relative;
  cursor: pointer;
}

.icon {
  width: 12px;
  height: 12px;
  fill: theme('colors.main.steel');
}

.list {
  composes: z-20 w-full overflow-hidden overflow-y-auto bg-main-white rounded-md shadow-md absolute from global;
  top: 66px;
  left: 0;
  max-height: 400px;
}

.item {
  composes: flex items-center text-left px-sm py-md font-display text-sm-ex text-secondoty-frosty from global;

  &:hover {
    background: theme('colors.secondary.frosty');
  }
}
</style>
