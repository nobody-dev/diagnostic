import { Location, Research } from '@/store/types'

export interface ICity {
  id: number
  name: string
  url: string
}

export interface IHandleCityChange {
  target: HTMLSelectElement
}

export type ISearchBarItem = Research | Location

export interface ISearchModalQuery {
  [key: string]: string
  research: string
  location: string
}
