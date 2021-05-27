import { ComponentOptions, PropOptions } from 'vue'
import { Portal, Wormhole } from 'portal-vue'
import UiModal from '@/components/UiModal.vue'

export const ID_TARGET_MOUNT_ELEMENT = 'portal'

type Source = ComponentOptions<Vue> | Function

export const useModal = (source: Source): Function => {
  let portal: InstanceType<typeof Portal>

  async function createModal <T> (Component: ComponentOptions<Vue>, props?: PropOptions): Promise<T> {
    if (portal === undefined) {
      /**
       * Монтирование портала для передачи в него компонента модального окна
       */
      portal = new Portal({
        propsData: {
          to: ID_TARGET_MOUNT_ELEMENT
        }
      }).$mount()
    }

    return await new Promise<T>((resolve, reject) => {
      const handlers = {
        resolve (data: T): void {
          Wormhole.close({
            from: portal.name,
            to: portal.to
          }, true)
          resolve(data)
        },

        reject (err: T): void {
          Wormhole.close({
            from: portal.name,
            to: portal.to
          }, true)
          reject(err)
        }
      }

      const passengers = [
        portal.$createElement(
          UiModal,
          {
            on: handlers
          },
          [
            portal.$createElement(
              Component,
              {
                props,
                on: handlers
              }
            )
          ]
        )
      ]

      Wormhole.open({
        from: portal.name,
        to: portal.to,
        passengers
      })
    })
  }

  return async function <T> (props?: PropOptions): Promise<T> {
    if (typeof source === 'function') {
      const importModule: Function = source
      const { default: Component } = await importModule()
      return await createModal<T>(Component, props)
    }

    return await createModal<T>(source, props)
  }
}

export default {
  useModal
}
