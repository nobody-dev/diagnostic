import {
  MutationTree,
  GetterTree,
  Module
} from 'vuex'

import { useApi } from '@/features/api'

import {
  CityState,
  CityActions,
  RootState
} from './types'

const api = useApi()

export const state = (): CityState => ({
  currentCity: null,
  cityList: []
})

export const getters: GetterTree<CityState, RootState> = {
  currentCityId (state: CityState) {
    return state.currentCity?.id
  }
}

export const mutations: MutationTree<CityState> = {
  SET_CURRENT_CITY (state: CityState, payload) {
    state.currentCity = payload
  },

  SET_CITY_LIST (state: CityState, payload) {
    state.cityList = payload
  }
}

export const actions: CityActions = {
  async getCityList ({ commit }) {
    const { data: cityList } = await api.get('/city/')
    commit('SET_CITY_LIST', cityList)
  },

  async getCurrentCity ({ commit }) {
    const { data: currentCity } = await api.get('/city/detect/')
    commit('SET_CURRENT_CITY', currentCity)
  }
}

export const city: Module<CityState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
