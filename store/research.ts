import {
  MutationTree,
  GetterTree,
  Module
} from 'vuex'

import { useApi } from '@/features/api'

import {
  ResearchState,
  ResearchActions,
  RootState,
  Research
} from './types'

const api = useApi()

export const state: ResearchState = {
  researchItemId: null,
  researchList: [],
  researchAreaList: []
}

export const getters: GetterTree<ResearchState, RootState> = {
  currentResearch (state: ResearchState) {
    if (state.researchItemId == null) {
      return null
    }
    return state.researchList.find(item => item.id === state.researchItemId)
  }
}

export const mutations: MutationTree<ResearchState> = {
  SET_RESEARCH_LIST (state: ResearchState, payload) {
    state.researchList = payload.map((item: Research, index: number) => {
      return { ...item, id: index }
    })
  },

  SET_RESEARCH_ITEM_ID (state: ResearchState, payload) {
    state.researchItemId = payload
  },

  SET_RESEARCH_AREA_LIST (state: ResearchState, payload) {
    state.researchAreaList = payload
  }
}

export const actions: ResearchActions = {
  async getResearchList ({ commit }) {
    const { data: researchList } = await api.get('/diagnostics/')
    commit('SET_RESEARCH_LIST', researchList)
  },

  async getResearchAreaList ({ commit }) {
    const { data: researchAreaList } = await api.get('/organs/')
    commit('SET_RESEARCH_AREA_LIST', researchAreaList)
  }
}

export const research: Module<ResearchState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
