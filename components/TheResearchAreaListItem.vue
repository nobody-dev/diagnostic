<template>
  <a
    :href="researchAreaUrl"
    :class="$style.listItem"
    @click="clickResearchArea"
  >
    <img
      :src="currentIcon.mobile.icon"
      :class="[$style.icon, $style.iconMobile]"
      :alt="currentIcon.mobile.alt"
    >
    <img
      :src="currentIcon.desktop.icon"
      :class="[$style.icon, $style.iconDesktop]"
      :alt="currentIcon.desktop.altIcon"
    >
    <div :class="$style.info">
      <span :class="$style.infoTitle">{{ name }}</span>
      <div :class="$style.infoCounter">
        {{ clinicsCount }} {{ clinicCountText }}
      </div>
    </div>
    <IconArrowRight :class="$style.arrow" />
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import IconArrowRight from '@/assets/icons/arrow-right.svg'
import { plural } from '@/features/helpers'
import constants from '@/dictionary/constants'
import UiContainer from './UiContainer.vue'

export default defineComponent({
  name: 'TheResearchAreaListItem',

  props: {
    id: {
      type: Number,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    clinicsCount: {
      type: Number,
      required: true
    },

    url: {
      type: String,
      default: '/'
    }
  },

  components: {
    UiContainer,
    IconArrowRight
  },

  setup (props) {
    const { clinicsCount, id } = props

    const currentIcon = computed(() => {
      const resultIcons = {
        mobile: {
          icon: '',
          altIcon: ''
        },
        desktop: {
          icon: '',
          altIcon: ''
        }
      }
      const currentResearchAreaItem = constants.researchAreaIconList.find((item) => {
        if (item.id === id) {
          return item
        }
      })
      resultIcons.desktop.icon = currentResearchAreaItem?.iconName ? require(`@/assets/icons/TheResearchAreaListItem/${currentResearchAreaItem.iconName}.svg?external`) : ''
      resultIcons.desktop.altIcon = currentResearchAreaItem?.name || ''
      resultIcons.mobile.icon = currentResearchAreaItem?.iconName ? require(`@/assets/icons/TheResearchAreaListItem/mobile/${currentResearchAreaItem.iconName}.svg?external`) : ''
      resultIcons.mobile.altIcon = currentResearchAreaItem?.name || ''
      return resultIcons
    })

    const clinicCountText = computed(() => {
      const words = ['центр', 'центра', 'центров']
      return plural(clinicsCount, words)
    })

    const researchAreaUrl = computed(() => process.env.NUXT_ENV_HOST + props.url)

    const { $gtm } = useContext()

    function clickResearchArea () {
      $gtm.push({ event: 'DdTrackData', name: 'spec area list', action: 'clickArea', formType: 'diag main' })
    }

    return {
      currentIcon,
      clinicCountText,
      researchAreaUrl,
      clickResearchArea
    }
  }
})
</script>

<style lang="postcss" module>
.container {
  composes: p-lg text-center text-main-white from global;
}

.list-item {
  @apply
    flex
    relative
    items-center
    px-xs
    py-md;
}

.list-item::after {
  @apply
    bottom-0
    left-0
    right-0
    w-full
    bg-secondary-frosty
    absolute;

  height: 1px;
  content: '';
}

.list-item::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  content: "";
}

.arrow {
  @apply
    ml-auto;
}

.icon {
  width: 40px;
  height: 40px;
}

.icon-desktop {
  display: none;
}

.info {
  @apply
    ml-lg;
}

.info-title {
  @apply
    text-main-deep-blue;
}

.info-counter {
  @apply
    text-main-steel
    text-xs;
}

@screen tablet {
  .arrow {
    @apply hidden;
  }

  .list-item {
    @apply pt-none px-none pb-lg;
  }

  .list-item::after {
    @apply hidden;
  }

  .icon {
    width: 76px;
    height: 76px;
  }

  .icon-desktop {
    display: block;
  }

  .icon-mobile {
    display: none;
  }

  .info-title {
    @apply
      font-bold;
  }
}
</style>
