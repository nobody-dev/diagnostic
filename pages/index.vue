<template>
  <div
    :class="$style.container"
    data-test-id="home-page"
  >
    <TheSeoBar />

    <TheSearchBar :class="$style.searchBar" />

    <TheResearchList />

    <TheResearchAreaList />

    <TheMap />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import TheSeoBar from '@/components/TheSeoBar.vue'
import TheSearchBar from '@/components/TheSearchBar.vue'
import TheResearchList from '@/components/TheResearchList.vue'
import TheResearchAreaList from '@/components/TheResearchAreaList.vue'
import TheMap from '@/components/TheMap.vue'

export default defineComponent({
  name: 'HomePage',

  components: {
    TheSeoBar,
    TheSearchBar,
    TheResearchList,
    TheResearchAreaList,
    TheMap
  }
})
</script>

<style lang="postcss" module>
.container {
  composes: flex flex-col from global;
}

@screen tablet {
  .search-bar {
    composes: mb-lg from global;
  }
}

@screen desktop {
  .search-bar {
    margin-bottom: 56px;
  }
}
</style>
