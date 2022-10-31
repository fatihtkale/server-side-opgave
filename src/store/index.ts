import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    user: {
      token: '',
      loggedIn: false
    }
  },
  mutations: {
    CHANGE_USER(state, payload){
      state.user.token = payload
    },
    CHANGE_LOGIN_STATE(state, payload){
      state.user.loggedIn = payload
    },
  },
  actions: {
    changeUser({ commit }, payload) {
      commit("CHANGE_USER", payload)
    },
    changeLoginState({ commit }, payload) {
      commit("CHANGE_LOGIN_STATE", payload)
    }
  },
  getters: {},
  modules: {},  
  plugins: [createPersistedState()],
})
