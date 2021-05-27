import '@nuxt/types'

declare module '@nuxt/types' {
  interface Context {
    $gtm: {
      init: (id: string) => void
      push: (params: {
        event: string
        name: string
        action: string
        formType: string
      }) => void
    }
  }
}
