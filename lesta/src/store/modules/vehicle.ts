import axios from 'axios'
import { apiUrl, queries } from '@/config/apiConfig'
import Vehicle from '@/types/Vehicle'
import Nation from '@/types/Nation'
import VehicleType from '@/types/VehicleType'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '@/store/types'

interface VehicleState {
  vehicles: Vehicle[]
  types: VehicleType[]
  nations: Nation[]
}

interface Query {
  nation?: string
  level?: number | string
  type?: string
}

const state: VehicleState = {
  vehicles: [],
  types: [],
  nations: [],
}

const mutations: MutationTree<VehicleState> = {
  setVehicles(state, payload) {
    state.vehicles = payload
  },

  setTypes(state, payload) {
    state.types = payload
  },

  setNations(state, payload) {
    state.nations = payload
  },
}

const getters: GetterTree<VehicleState, RootState> = {
  extremeLevels(state) {
    return state.vehicles.reduce(
      (levels, item) => {
        const minVal = item.level < levels.min ? item.level : levels.min
        const maxVal = item.level > levels.max ? item.level : levels.max
        return { min: minVal, max: maxVal }
      },
      { min: Infinity, max: -Infinity }
    )
  },
}

const actions: ActionTree<VehicleState, RootState> = {
  async fetchVehicles({ commit }, query: Query = {}): Promise<void> {
    axios
      .post(apiUrl, {
        query: queries.vehicles,
      })
      .then((response) => {
        commit('setVehicles', response.data.data.vehicles)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  async fetchNations({ commit }): Promise<void> {
    axios
      .post(apiUrl, {
        query: queries.nations,
      })
      .then((response) => {
        commit('setNations', response.data.data.nations)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  async fetchTypes({ commit }): Promise<void> {
    axios
      .post(apiUrl, {
        query: queries.types,
      })
      .then((response) => {
        commit('setTypes', response.data.data.types)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}

const namespaced = true

export const vehicle: Module<VehicleState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
