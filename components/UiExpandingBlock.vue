<template v-once>
  <div
    :class="{
      [$style.expandingBlock]: true,
      [$style.active] : active
    }"
  >
    <div ref="expandingContent">
      <template v-for="(item, index) in items">
        <div
          v-if="expanded || (!expanded && index <= indexCount)"
          :key="index"
        >
          <slot :item="item" />
        </div>
      </template>
    </div>

    <div :class="$style.hidingBlock">
      <UiButton
        is-adaptive
        theme="secondary"
        :class="$style.button"
        @click="toggleExpanded"
      >
        {{ captionText }}
        <template #iconRight>
          <IconArrow
            :class="{[$style.expanded] : expanded}"
          />
        </template>
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, useContext } from '@nuxtjs/composition-api'
import UiButton from './UiButton.vue'
import IconArrow from '~/assets/icons/arrow-down.svg'

type GtmParams = {
  name: string
  action: string
  formType: string
}

export default defineComponent({
  name: 'UiExpandingBlock',

  components: {
    UiButton,
    IconArrow
  },

  props: {
    caption: {
      type: String,
      default: 'Развернуть'
    },

    expandingCaption: {
      type: String,
      default: 'Cвернуть'
    },

    items: {
      type: Array,
      default: () => ([])
    },

    gtmParameters: {
      type: Object as PropType<GtmParams>,
      default: null
    }
  },

  setup ({ caption, expandingCaption, gtmParameters }) {
    const expanded = ref(false)
    const active = computed(() => expanded ? 'expanding-open' : '')
    const captionText = computed(() => expanded.value ? expandingCaption : caption)
    const indexCount = 4
    const { $gtm } = useContext()

    function toggleExpanded () {
      if (!expanded.value) {
        clickElement()
      }
      expanded.value = !expanded.value
    }

    function clickElement () {
      $gtm.push({ event: 'DdTrackData', name: gtmParameters.name, action: gtmParameters.action, formType: gtmParameters.formType })
    }

    return {
      expanded,
      active,
      captionText,
      toggleExpanded,
      indexCount
    }
  }
})
</script>

<style lang="postcss" module>
.expanding-block {
  composes: relative from global;
  padding-bottom: 50px;
}

.hiding-block {
  composes: absolute from global;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
}

.expanded {
  transform: rotate(180deg);
}

@screen tablet {
  .expanding-block {
    padding-bottom: 0;
  }
}
</style>
