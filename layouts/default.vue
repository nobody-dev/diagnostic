<template>
  <main
    data-test-id="default-layout"
    :class="$style.root"
  >
    <TheSideBar />

    <div :class="$style.body">
      <TheHeader />

      <Nuxt :class="$style.content" />

      <TheFooter />
    </div>

    <PortalTarget
      name="portal"
      multiple
      slim
    />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed } from '@nuxtjs/composition-api'
import { useStore } from '@/store'
import { PortalTarget } from 'portal-vue'

import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheSideBar from '@/components/TheSideBar.vue'

import { SeoState } from '@/store/types'
import constants from '@/dictionary/constants'

class DefaultLayout extends Vue {
  seoData?: SeoState
  metaNoRobots?: object
  structuredData?: object
}

type structuredData = {
  '@context': string;
  '@type': string
  url: string | undefined
  name: string
  telephone: string | undefined
  email: string
  logo: string
  address?: Address
}

type Address = {
  '@type': string;
  addressLocality: string;
  postalCode: string;
  streetAddress: string;
}

// TODO: Вернуть обертку defineComponent когда composition-api у накста пофиксит баг с хуком head
// Убрана обертка defineComponent т.к. на текущий момент это баг в библиотеке composition-api накста.
// В ней ломается хук head, он перестает корректно работать с динамическими данными
export default {
  name: 'DefaultLayout',

  components: {
    TheHeader,
    TheFooter,
    TheSideBar,
    PortalTarget
  },

  setup () {
    const store = useStore()
    const seoData = computed(() => {
      return store.state.seo
    })
    const currentCity = computed(() => {
      return store.state.city?.currentCity
    })
    const cityList = computed(() => {
      return store.state.city?.cityList
    })

    const structuredData = computed(() => {
      let data: structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        url: cityList.value?.find(el => el.id === currentCity.value?.id)?.url,
        name: 'DocDoc',
        telephone: currentCity.value?.phone,
        email: 'info@sberhealth.ru',
        logo: 'https://diagnostica.docdoc.ru/st/i/common/logo.svg'
      }

      if (currentCity.value?.id === constants.citiesId.moscow) {
        data = { ...data, address: moscowAddress }
      }

      return data
    })

    const moscowAddress = {
      '@type': 'PostalAddress',
      addressLocality: 'Москва',
      postalCode: '115280',
      streetAddress: 'ул. Ленинская Слобода, д. 26, стр.6'
    }

    const metaNoRobots = {
      hid: 'robots',
      name: 'robots',
      content: 'noindex'
    }

    return {
      seoData,
      currentCity,
      cityList,
      structuredData,
      moscowAddress,
      metaNoRobots
    }
  },

  head (this: DefaultLayout): object {
    return {
      title: this.seoData?.pageTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seoData?.metaDescription
        },
        this.seoData?.isNoRobotsRequired ? this.metaNoRobots : {},
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.seoData?.pageTitle
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/logo.svg'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.seoData?.canonicalUrl
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'Диагностика DocDoc'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.seoData?.metaDescription
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: this.seoData?.canonicalUrl
        }
      ],
      script: [
        { type: 'application/ld+json', json: [this.structuredData] },
        {
          hid: 'analytics',
          innerHTML: 'window.analytics = {"gaPageType": "diag main"}',
          type: 'text/javascript'
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        analytics: ['innerHTML']
      }
    }
  }
}
</script>

<style lang="postcss" module>
.root {
  display: flex;
  height: 100%;
  overflow-x: hidden;
}

.body {
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.content {
  flex-grow: 1;
  flex-shrink: 0;
}

@screen desktop {
  .body {
    display: block;
  }
}
</style>
