import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    values: []
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setValues(state, values) {
      state.values = values;
    },

  },
  actions: {},
  getters: {
    getUsers(state) {
      return state.users;
    },
    getValues(state) {
      return state.values;
    }
  },
  modules: {}
});
