<template>
  <UiContainer>
    <div :class="$style.root">
      <div>
        <h1 :class="$style.code">
          Ошибка {{ error.statusCode }}
        </h1>

        <div :class="$style.message">
          {{ message }}
        </div>

        <UiButton
          :class="$style.buttonBack"
          theme="deluxe"
          size="large"
          is-adaptive
          @click="goToBack()"
        >
          Вернуться назад
        </UiButton>
      </div>

      <div :class="$style.picture">
        <img
          :class="$style.picture__source"
          src="~/assets/images/astrocat.svg?external"
          alt="Error"
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType
} from '@nuxtjs/composition-api'
import UiContainer from '@/components/UiContainer.vue'
import UiButton from '@/components/UiButton.vue'

type ErrorParams = {
  statusCode: number
  message: string
}

export default defineComponent({
  components: {
    UiContainer,
    UiButton
  },

  props: {
    error: {
      type: Object as PropType<ErrorParams>,
      default: null
    }
  },

  layout: 'error',

  setup (props) {
    console.error(`Error ${props.error.statusCode}: ${props.error.message}`)

    const message = computed(() => {
      return props.error.statusCode === 404
        ? 'Нет такой страницы'
        : 'Сервис сейчас не доступен'
    })

    function goToBack () {
      window.history.back()
    }

    return {
      message,
      goToBack
    }
  }
})
</script>

<style lang="postcss" module>
.root {
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: nowrap;
  padding: 46px theme('spacing.2xl') 40px;
}

.code {
  @apply text-5xl font-bold;

  margin-bottom: theme('spacing.md');
}

.message {
  @apply text-md-ex;

  margin-bottom: theme('spacing.4xl');
}

.picture {
  position: relative;
  width: 100%;
  height: 133px;
  margin-bottom: theme('spacing.6xl');
}

.picture__source {
  position: absolute;
  right: 140px;
  width: 157px;
  height: 133px;
}

.picture::before {
  position: absolute;
  top: -215px;
  right: -70px;
  width: 330px;
  height: 330px;
  background: linear-gradient(180deg, #fcf7fa 14.57%, #fcedf5 37.29%, #fd77ad 105.58%);
  border-radius: 50%;
  content: '';
}

@screen tablet {
  .root {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding-top: 62px;
    padding-bottom: 176px;
  }

  .code {
    @apply font-bold;

    margin-bottom: theme('spacing.xl');
    font-size: 60px;
  }

  .message {
    @apply text-3xl;
  }

  .picture {
    width: 312px;
    height: 264px;
    margin-bottom: 0;
  }

  .picture__source {
    position: relative;
    right: auto;
    width: 312px;
    height: 264px;
  }

  .picture::before {
    top: 50%;
    left: 25px;
    width: 215px;
    height: 215px;
    transform: translateY(-50%);
  }
}
</style>
