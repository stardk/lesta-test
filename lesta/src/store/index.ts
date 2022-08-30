import Vue from 'vue'
import Vuex, { MutationTree } from 'vuex'
import { RootState } from '@/store/types'
import { vehicle } from './modules/vehicle'

Vue.use(Vuex)

const state: RootState = {
  loading: false,
}

const mutations: MutationTree<RootState> = {
  setLoading(state, payload) {
    state.loading = payload
  },
}

export default new Vuex.Store<RootState>({
  state,
  mutations,
  modules: {
    vehicle,
  },
})
