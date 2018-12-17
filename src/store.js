import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    APP_OFFSET_WIDTH: 0
  },
  mutations: {
    setAppOffsetWidth (state, width) {
      state.APP_OFFSET_WIDTH = width;
    } 
  },
  actions: {

  }
});
