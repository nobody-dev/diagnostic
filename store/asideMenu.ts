import {
  MutationTree,
  Module
} from 'vuex'

import {
  MenuAsideState,
  MenuAsideActions,
  RootState
} from './types'

export const state = (): MenuAsideState => ({
  isViewAsideMenu: false
})

export const mutations: MutationTree<MenuAsideState> = {
  CHANGE_ASIDE_STATUS (state: MenuAsideState) {
    state.isViewAsideMenu = !state.isViewAsideMenu
  }
}

export const actions: MenuAsideActions = {
  changeAsideStatus ({ commit }) {
    commit('CHANGE_ASIDE_STATUS')
  }
}

export const asideMenu: Module<MenuAsideState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
}
