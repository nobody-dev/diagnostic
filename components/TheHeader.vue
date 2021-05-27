<template>
  <UiContainer
    :class="$style.container"
    data-test-id="the-header"
    tag="header"
  >
    <div :class="$style.content">
      <button :class="$style.burger" @click="changeAsideStatus">
        <IconBurger />
      </button>
      <div :class="$style.leftSide">
        <IconLogo
          :class="$style.logo"
          @click="clickElement('clickLogo')"
        />
      </div>

      <div :class="$style.rightSide">
        <div ref="self" :class="$style.currentCity">
          <div :class="$style.currentCityName" @click="changeViewCityList">
            <span>{{ currentCityName }}</span>
            <IconArrowDown :class="[$style.icon, { [$style.iconOpen]: isViewCityList }]" />

            <div :class="$style.changeCityBlock">
              <ul
                v-if="isViewCityList"
                :class="$style.cityList"
              >
                <li
                  v-for="city in cityList"
                  :key="city.id"
                  :class="$style.cityListItem"
                >
                  <a
                    :href="city.url"
                    :class="$style.cityListLink"
                  >
                    {{ city.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div :class="[$style.currentCityPhone, 'call_phone_7']">
            {{ currentCityPhone | formatPhone }}
          </div>
        </div>

        <UiButton
          theme="secondary"
          :href="signInLink"
          target="_blank"
          is-link
          @click="clickElement('clickProfile')"
        >
          Войти
        </UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  Ref,
  useContext
} from '@nuxtjs/composition-api'

import {
  useStore
} from '@/store'

import IconArrowDown from '@/assets/icons/arrow-down.svg'
import IconLogo from '@/assets/icons/logo.svg'
import IconBurger from '@/assets/icons/burger.svg'
import UiContainer from './UiContainer.vue'
import UiButton from './UiButton.vue'
import { outClick } from '~/features/helpers'

export default defineComponent({
  name: 'TheHeader',

  components: {
    IconArrowDown,
    IconLogo,
    IconBurger,
    UiContainer,
    UiButton
  },

  filters: {
    // TODO: При использовании в нескольких местах, перенести фильтр в общий файл
    formatPhone (value: string | null | undefined) {
      if (!value) {
        return ''
      }

      const cleanedPhone = ('' + value).replace(/\D/g, '')
      const match = cleanedPhone.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/)

      if (!match) {
        return ''
      }

      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`
    }
  },

  setup () {
    const isViewCityList = ref(false)
    const store = useStore()
    const cityList = computed(() => store.state.city?.cityList)
    const currentCity = computed(() => store.state.city?.currentCity)
    const currentCityName = computed(() => currentCity.value?.name)
    const currentCityPhone = computed(() => currentCity.value?.phone)
    // TODO: Заменить хардкод на значение, которое приходит с API
    // Задача по доработке API: https://docdoc.atlassian.net/browse/DD-28778
    const signInLink = 'https://lk.sberhealth.ru/login'
    const { $gtm } = useContext()

    function changeAsideStatus () {
      store.dispatch('asideMenu/changeAsideStatus')
    }

    function changeViewCityList () {
      isViewCityList.value = !isViewCityList.value
      clickElement('clickCity')
    }

    function hideList () {
      isViewCityList.value = false
    }

    const self: Ref<HTMLElement | null> = ref(null)
    onMounted(() => {
      outClick(self.value, hideList)
    })

    function clickElement (action: string) {
      $gtm.push({ event: 'DdTrackData', name: 'site header', action, formType: 'diag main' })
    }

    return {
      self,
      isViewCityList,
      cityList,
      currentCityName,
      currentCityPhone,
      signInLink,
      changeAsideStatus,
      changeViewCityList,
      clickElement
    }
  }
})
</script>

<style lang="postcss" module>
.container {
  @apply
    p-lg
    text-main-deep-blue;

  position: relative;
  z-index: 99;
}

.content {
  composes: flex items-center justify-between relative from global;
}

.logo {
  width: 182px;
  height: 21px;
}

.burger {
  @apply
    absolute
    pr-md;
}

.burger:focus {
  @apply
    outline-none;
}

.leftSide {
  @apply
    w-full
    flex
    items-center
    justify-center;
}

.rightSide {
  @apply
    hidden
    flex-wrap
    items-center
    justify-end;
}

.icon {
  @apply
    ml-xs;

  transition: all 0.2s linear;
  fill: theme('colors.main.steel');
}

.icon--open {
  transform: rotate(180deg);
}

.city-list {
  @apply
    absolute
    left-0
    text-sm
    text-main-deep-blue
    rounded-md
    bg-main-white;

  top: 32px;
  z-index: 3;
  box-shadow: theme('boxShadow.md');
}

.city-list__item {
  @apply
    flex
    mb-sm;

  white-space: nowrap;
}

.city-list__item:first-child .city-list__link {
  @apply
    pt-md;
}

.city-list__item:last-child {
  margin-bottom: 0;
}

.city-list__item:last-child .city-list__link {
  @apply
    pb-md;
}

.city-list__item:hover {
  @apply
    text-main-deep-blue
    bg-main-mist;
}

.city-list__link {
  @apply
    w-full
    pt-xs
    pr-4xl
    pb-xs
    pl-md;
}

.current-city {
  @apply
    w-full
    mb-md
    flex
    items-center
    justify-end;
}

.current-city__name {
  @apply
    mr-sm
    flex
    px-sm
    py-xs
    rounded-md
    select-none
    text-xs
    items-center
    text-main-steel
    relative
    bg-secondary-frosty
    cursor-pointer
    justify-end;
}

.current-city__icon {
  @apply
    mr-xs
    fill-current
    text-main-steel;
}

.current-city__phone {
  @apply
    text-sm
    font-bold;
}

@screen desktop {
  .logo {
    width: 280px;
    height: 32px;
  }

  .burger {
    @apply
      hidden;
  }

  .leftSide,
  .rightSide {
    @apply w-1/2;
  }

  .leftSide {
    @apply justify-start;
  }

  .rightSide {
    @apply flex;
  }
}
</style>
