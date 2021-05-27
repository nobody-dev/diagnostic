<template>
  <a
    :href="researchUrl"
    @click="clickResearch"
  >
    {{ name }}
  </a>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TheResearchListItem',

  setup (props) {
    const researchUrl = computed(() => process.env.NUXT_ENV_HOST + props.url)
    const { $gtm } = useContext()

    function clickResearch () {
      $gtm.push({ event: 'DdTrackData', name: 'spec list', action: 'clickSpec', formType: 'diag main' })
    }

    return {
      researchUrl,
      clickResearch
    }
  },

  props: {
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
})
</script>
