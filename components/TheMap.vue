<template>
  <UiContainer
    :class="$style.container"
    data-test-id="the-map"
  >
    <div>
      <h1 :class="$style.title">
        Диагностические центры на карте
      </h1>

      <p :class="$style.text">
        Мы собрали все диагностические центры на карте {{ city }}. Выберите вид диагностики, область исследования и удобную станцию метро. Мы подберем актуальный список клиник, ранжированный с учетом стоимости обследования. Запишитесь в клинику по телефону. Скажите оператору, что пришли через СберЗдоровье и получите скидку.
      </p>

      <div :class="$style.content">
        <a :href="mapUrl">
          <UiButton
            theme="deluxe"
            size="huge"
            is-adaptive
            :class="$style.button"
            @click="clickOnButton"
          >
            Посмотреть на карте
          </UiButton>
        </a>

        <img
          :class="$style.image"
          src="~/assets/images/man.png"
          alt="Man"
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts">
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'
import UiContainer from './UiContainer.vue'
import UiButton from './UiButton.vue'
import { useStore } from '~/store'

export default defineComponent({
  name: 'TheMap',

  setup () {
    const mapUrl = computed(() => process.env.NUXT_ENV_HOST + '/map')

    const store = useStore()
    const city = computed(() => store.state?.city?.currentCity?.nameGenitive)

    const { $gtm } = useContext()

    function clickOnButton () {
      $gtm.push({ event: 'DdTrackData', name: 'diag map', action: 'clickMap', formType: 'diag main' })
    }

    return {
      mapUrl,
      city,
      clickOnButton
    }
  },

  components: {
    UiContainer,
    UiButton
  }
})
</script>

<style lang="postcss" module>
.container {
  @apply
    p-lg
    overflow-hidden;
}

.title {
  @apply
    text-main-deep-blue
    text-5xl
    font-semibold
    font-display;
}

.text {
  @apply
    text-main-deep-blue
    font-normal
    text-md-ex
    py-lg;
}

.content {
  @apply
    w-full
    mb-6xl;

  height: 40px;
}

.image {
  composes: relative pointer-events-none from global;

  @apply hidden;
}

.button {
  composes: relative from global;
}

@screen tablet {
  .content {
    @apply
      h-full
      mb-none;

    background: url('~assets/images/map-bg.jpg') no-repeat;
  }

  .button {
    top: 76px;
    left: 32px;
  }

  .image {
    @apply
      block
      z-10;

    bottom: 67px;
    left: 240px;
  }
}

@screen desktop {
  .button {
    left: 438px;
  }

  .image {
    bottom: 46px;
    left: 660px;
  }
}
</style>
