import {
  MutationTree,
  GetterTree,
  Module
} from 'vuex'

import { useApi } from '@/features/api'

import {
  LocationState,
  LocationActions,
  RootState,
  Location
} from './types'

const api = useApi()

export const state: LocationState = {
  locationItemId: null,
  locationList: []
}

export const getters: GetterTree<LocationState, RootState> = {
  currentLocation (state: LocationState) {
    if (state.locationItemId == null) {
      return null
    }
    return state.locationList.find(item => item.id === state.locationItemId)
  }
}

export const mutations: MutationTree<LocationState> = {
  SET_LOCATION_LIST (state: LocationState, payload) {
    state.locationList = payload.map((item: Location, index: number) => {
      return { ...item, id: index }
    })
  },
  SET_LOCATION_ITEM_ID (state: LocationState, payload) {
    state.locationItemId = payload
  }
}

export const actions: LocationActions = {
  async getLocationList ({ commit, rootGetters }) {
    const cityId: number = rootGetters['city/currentCityId']
    const { data } = await api.get(`/geo/cityId/${cityId}/`)
    const { result: locationList } = data

    commit('SET_LOCATION_LIST', locationList)
  }
}

export const location: Module<LocationState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
