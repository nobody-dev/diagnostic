import {
  MutationTree,
  GetterTree,
  Module
} from 'vuex'

import { useApi } from '@/features/api'

import {
  SeoState,
  SeoActions,
  RootState
} from './types'

const api = useApi()

export const state: SeoState = {
  pageTitle: '',
  metaDescription: '',
  canonicalUrl: '',
  isNoRobotsRequired: false
}

export const getters: GetterTree<SeoState, RootState> = {}

export const mutations: MutationTree<SeoState> = {
  SET_PAGE_TITLE (state: SeoState, payload) {
    state.pageTitle = payload
  },

  SET_META_DESCRIPTION (state: SeoState, payload) {
    state.metaDescription = payload
  },

  SET_CANONICAL_URL (state: SeoState, payload) {
    state.canonicalUrl = payload
  },

  SET_NO_ROBOTS_REQUIRED (state: SeoState, payload) {
    state.isNoRobotsRequired = payload
  }
}

export const actions: SeoActions = {
  async getData ({ commit, rootGetters }) {
    const { data } = await api.get('/seo/', {
      params: {
        cityId: rootGetters['city/currentCityId']
      }
    })

    commit('SET_PAGE_TITLE', data.pageTitle)
    commit('SET_META_DESCRIPTION', data.metaDescription)
    commit('SET_CANONICAL_URL', data.canonicalUrl)
    commit('SET_NO_ROBOTS_REQUIRED', data.isNoRobotsRequired)
  }
}

export const seo: Module<SeoState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
