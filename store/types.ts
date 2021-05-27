import {
  ActionTree,
  ActionContext
} from 'vuex'

/* Root */
export interface RootState {
  partnerId: number | null
  assetVersion: number | null
  isGtmVisible: boolean
  gtmDimensionIndex: number | null
  gtmBqHitSenderHost: string
  gtmAccountCode: string
  city?: CityState
  seo?: SeoState
  research?: ResearchState
  location?: LocationState
  asideMenu?: MenuAsideState
}

/* City */
export interface City {
  id: number
  name: string
  url: string
}

export interface CurrentCity {
  id: number
  name: string
  nameDative: string
  nameGenitive: string
  namePrepositional: string
  phone: string
}

export interface CityState {
  currentCity: CurrentCity | null
  cityList: City[]
}

export interface CityActions extends ActionTree<CityState, RootState> {
  getCityList: (ctx: ActionContext<CityState, RootState>) => Promise<void>
  getCurrentCity: (ctx: ActionContext<CityState, RootState>) => Promise<void>
}

/* Location */

export interface Location {
  id: number
  name: string
  color: string
  slug: string
  type: string
}

export interface LocationState {
  locationItemId: number | null
  locationList: Location[]
}

export interface LocationActions extends ActionTree<LocationState, RootState> {
  getLocationList: (ctx: ActionContext<LocationState, RootState>) => Promise<void>
}

/* Research */
export interface Research {
  id: number
  name: string
  shortName: string
  parentName: string
  position: number
  url: string
  slug: string
  hasChildren: boolean
  isTop: boolean
}

export interface ResearchArea {
  id: number
  name: string
  url: string
  clinicsCount: number
}

export interface ResearchState {
  researchItemId: number | null
  researchList: Research[]
  researchAreaList: ResearchArea[]
}

export interface ResearchActions extends ActionTree<ResearchState, RootState> {
  getResearchList: (ctx: ActionContext<ResearchState, RootState>) => Promise<void>
  getResearchAreaList: (ctx: ActionContext<ResearchState, RootState>) => Promise<void>
}

/* Seo */
export interface SeoState {
  pageTitle: string
  metaDescription: string
  canonicalUrl: string
  isNoRobotsRequired: boolean
}

export interface SeoActions extends ActionTree<SeoState, RootState> {
  getData: (ctx: ActionContext<SeoState, RootState>) => Promise<void>
}

export interface MenuAsideState {
  isViewAsideMenu: boolean
}

export interface MenuAsideActions extends ActionTree<MenuAsideState, RootState> {
  changeAsideStatus: (ctx: ActionContext<MenuAsideState, RootState>) => void
}
