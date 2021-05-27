<template>
  <UiContainer
    :class="$style.container"
    data-test-id="the-search-bar"
  >
    <div :class="$style.content">
      <div :class="$style.research">
        <UiSelect
          :value="researchValue"
          :items="selectiveResearchList"
          :theme="currentResearchName ? 'outline' : 'filled'"
          :class="$style.select"
          label="Диагностика"
          @select="changeResearchValue"
          @clear="clearResearch"
        />
        <UiTextField
          v-model="currentResearchName"
          :theme="currentResearchName ? 'outline' : 'filled'"
          :class="$style.searchField"
          placeholder="Диагностика"
          is-resettable
          @click="openModal('research')"
          @clear="clearResearch"
        >
          <template #icon>
            <IconArrowDown :class="$style.icon" />
          </template>
        </UiTextField>
      </div>
      <div :class="$style.location">
        <UiSelect
          :value="locationValue"
          :items="selectiveLocationList"
          :theme="currentLocationName ? 'outline' : 'filled'"
          :class="$style.select"
          label="Метро или город МО"
          @select="changeLocationValue"
          @clear="clearLocation"
        >
          <template v-slot:item="{ value }">
            <div
              v-if="value.hasColor"
              :style="{ background: value.color }"
              :class="$style.color"
            />
            {{ value.title }}
          </template>
        </UiSelect>
        <UiTextField
          v-model="currentLocationName"
          :theme="currentLocationName ? 'outline' : 'filled'"
          :class="$style.searchField"
          placeholder="Метро или город МО"
          is-resettable
          @click="openModal('location')"
          @clear="clearLocation"
        >
          <template #icon>
            <IconArrowDown :class="$style.icon" />
          </template>
        </UiTextField>
      </div>
      <UiButton
        theme="deluxe"
        size="huge"
        is-adaptive
        :class="$style.button"
        @click="search"
      >
        Найти
      </UiButton>
    </div>
  </UiContainer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  Ref,
  useContext
} from '@nuxtjs/composition-api'
import { useStore } from '@/store'
import { useModal } from '@/features/modal'
import IconArrowDown from '@/assets/icons/arrow-down.svg'
import constants from '@/dictionary/constants'
import UiContainer from './UiContainer.vue'
import UiSelect from './UiSelect.vue'
import UiTextField from './UiTextField.vue'
import UiButton from './UiButton.vue'

export default defineComponent({
  name: 'TheSearchBar',

  components: {
    UiContainer,
    UiSelect,
    UiButton,
    UiTextField,
    IconArrowDown
  },

  setup () {
    const store = useStore()
    const researchValue: Ref<number | null> = ref(null)
    const locationValue: Ref<number | null> = ref(null)

    const searchModal = useModal(() => import(/* webpackPreload: true */'@/components/TheSearchModal.vue'))

    const currentLocation = computed(() => store.getters['location/currentLocation'])
    const currentResearch = computed(() => store.getters['research/currentResearch'])
    const currentLocationName = computed(() => currentLocation.value?.name || null)
    const currentResearchName = computed(() => currentResearch.value?.name || null)
    const locationList = computed(() => store.state.location?.locationList || [])
    const researchList = computed(() => store.state.research?.researchList || [])
    const selectiveLocationList = computed(() => locationList?.value.map((item) => {
      return {
        value: item.id,
        title: item.name,
        hasColor: constants.LOCATION_TYPE_BY_COLOR.includes(item.type),
        color: item.color ? '#' + item.color : '#ffffff00'
      }
    }))
    const selectiveResearchList = computed(() => researchList?.value.map((item, index) => {
      return {
        value: index,
        title: item.name
      }
    }))

    const searchQuery = computed((): string => {
      const result = []

      if (currentResearch.value) {
        result.push(currentResearch.value.slug)
      } else if (!currentLocation.value) {
        result.push('kliniki')
      }

      if (currentLocation.value) {
        result.push(currentLocation.value?.type + '/' + currentLocation.value?.slug)
      }

      return result.join('/')
    })

    const { $gtm } = useContext()

    function changeLocationValue (index: number) {
      locationValue.value = index
      store.commit('location/SET_LOCATION_ITEM_ID', index)
      clickElement('inputGeo')
    }
    function changeResearchValue (index: number) {
      researchValue.value = index
      store.commit('research/SET_RESEARCH_ITEM_ID', index)
      clickElement('inputSpec')
    }
    async function openModal (target: string) {
      await searchModal({
        target
      })
    }
    function clearLocation () {
      locationValue.value = null
      store.commit('location/SET_LOCATION_ITEM_ID', null)
    }
    function clearResearch () {
      researchValue.value = null
      store.commit('research/SET_RESEARCH_ITEM_ID', null)
    }

    const search = () => {
      clickElement('clickFind')
      if (searchQuery.value) {
        document.location.assign(`${process.env.NUXT_ENV_HOST}/${searchQuery.value}/`)
      }
    }

    function clickElement (action: string) {
      $gtm.push({ event: 'DdTrackData', name: 'main filter', action, formType: 'diag main' })
    }

    return {
      researchValue,
      locationValue,
      researchList,
      currentLocation,
      currentResearch,
      locationList,
      selectiveLocationList,
      selectiveResearchList,
      searchQuery,
      currentLocationName,
      currentResearchName,
      changeLocationValue,
      changeResearchValue,
      openModal,
      clearLocation,
      clearResearch,
      search
    }
  }
})
</script>

<style lang="postcss" module>
.container {
  composes: p-lg from global;
}

.location {
  @apply mt-sm;
}

.select {
  @apply
    hidden;
}

.color {
  composes: rounded-full ml-sm mr-md from global;
  width: 8px;
  height: 8px;
}

.button {
  @apply mt-lg;
}

.icon {
  width: 12px;
  height: 12px;
  fill: theme('colors.main.steel');
}

@screen tablet {
  .content {
    @apply
      justify-center
      flex;
  }

  .research {
    width: 294px;
    height: 56px;
  }

  .select {
    @apply
      block;
  }

  .location {
    @apply
      ml-sm
      mt-none;

    width: 294px;
    height: 56px;
  }

  .searchField {
    @apply
      hidden;
  }

  .button {
    @apply
      ml-sm
      mt-none;
  }
}

@screen desktop {
  .content {
    @apply
      justify-center
      flex;
  }

  .research {
    width: 434px;
    height: 56px;
  }

  .select {
    @apply
      block;
  }

  .location {
    @apply
      ml-sm
      mt-none;

    width: 434px;
    height: 56px;
  }

  .searchField {
    @apply
      hidden;
  }

  .button {
    @apply
      ml-sm
      mt-none;
  }
}
</style>
