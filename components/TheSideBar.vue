<template>
  <aside :class="$style.sideMenu">
    <div :class="[$style.sideMenuInner, { [$style.sideMenuInnerOpened]: isViewAsideMenu }]">
      <nav>
        <ul :class="$style.list">
          <li :class="$style.listItem">
            <div
              :class="$style.listLink"
              @click="clickToHome"
            >
              <IconHome :class="$style.listIcon" />
              Домой
            </div>
          </li>
          <li v-if="cityList.length" :class="$style.listItem">
            <IconGeolocationCity :class="$style.listIcon" />
            <div :class="$style.selectWrapper">
              <select
                :class="$style.select"
                @change="changeCity($event)"
                @click="clickCity"
              >
                <option
                  v-for="city in cityList"
                  :key="city.id"
                  :value="city.id"
                  :selected="city.id === currentCity.id"
                >
                  {{ city.name }}
                </option>
              </select>
              <IconArrowDown :class="$style.selectIcon" />
            </div>
          </li>
        </ul>
      </nav>
      <div :class="$style.infoBlock">
        <p>Звоните нам, мы бесплатно подберём клинику и запишем вас на диагностику</p>
        <a
          href="tel:8 (499) 116-81-79"
          :class="[$style.tel, 'call_phone_7']"
        >8 (499) 116-81-50</a>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import IconArrowDown from '@/assets/icons/arrow-down.svg'
import IconHome from '~/assets/icons/home.svg'
import IconGeolocationCity from '~/assets/icons/geolocationCity.svg'
import IconMonitor from '~/assets/icons/monitor.svg'
import { useStore } from '~/store'
import { ICity, IHandleCityChange } from '~/components/types'

export default defineComponent({
  name: 'SideMenu',

  components: {
    IconHome,
    IconGeolocationCity,
    IconMonitor,
    IconArrowDown
  },

  setup (props, { root }) {
    const store = useStore()
    const isViewAsideMenu = computed(() => store.state.asideMenu?.isViewAsideMenu)
    const cityList = computed(() => store.state.city?.cityList)
    const currentCity = computed(() => store.state.city?.currentCity)
    const doctorUrl = computed(() => process.env.NUXT_ENV_HOST + '/doctor')
    const { $gtm } = useContext()

    function clickToHome () {
      store.dispatch('asideMenu/changeAsideStatus')
      root.$router.push('/')
    }

    function clickCity () {
      $gtm.push({ event: 'DdTrackData', name: 'site header', action: 'clickCity', formType: 'diag main' })
    }

    function changeCity (event: IHandleCityChange) {
      if (cityList.value && cityList.value.length) {
        cityList.value.find((city: ICity) => {
          if (+event.target.value === city.id) {
            window.location.href = city.url
          }
        })
      }
    }

    return {
      doctorUrl,
      isViewAsideMenu,
      cityList,
      currentCity,
      changeCity,
      clickToHome,
      clickCity
    }
  }
})
</script>

<style lang="postcss" module>
  .side-menu {
    @apply
      relative
      top-0
      bottom-0
      left-0;

    box-shadow: inset theme('boxShadow.sm');
  }

  .side-menu__inner {
    @apply
      pt-3xl
      pl-lg;

    width: 224px;
    margin-left: -224px;
    transition: margin 0.2s ease;
    will-change: margin;
  }

  .side-menu__inner--opened {
    @apply
      ml-none;
  }

  .list__item {
    @apply
      flex
      items-center
      mb-3xl;
  }

  .list__icon {
    @apply
      w-lg
      mr-lg
      h-lg;
  }

  .list__link {
    @apply
      flex
      items-center
      relative
      pr-lg
      w-full
      text-md;
  }

  .list__item:last-child {
    @apply
      mb-2xl;
  }

  .select-wrapper {
    position: relative;
  }

  .select {
    @apply
      relative
      bg-main-none
      mr-lg
      outline-none;

    appearance: none;
  }

  .select::after {
    @apply
      absolute;

    background-image: url(~assets/icons/geolocationCity.svg);
    cursor: pointer;
    content: '';
    pointer-events: none;
  }

  .select:placeholder-shown {
    padding: 0;
  }

  .select__icon {
    @apply
      absolute;

    top: 50%;
    right: 0;
    transform: translateY(-50%);
    fill: #828ea5;
  }

  .info-block {
    @apply
      relative
      pt-md
      mr-lg
      text-xs;
  }

  .info-block::before {
    @apply
      absolute
      top-0
      block
      w-full
      bg-main-steel;

    height: 1px;
    opacity: 0.1;
    content: "";
  }

  .tel {
    @apply
      block
      bg-secondary-powder
      mt-md
      py-sm
      px-lg
      text-main-pink
      text-center
      rounded-md
      text-sm;
  }

  @screen desktop {
    .side-menu {
      @apply
        hidden;
    }
  }

</style>
