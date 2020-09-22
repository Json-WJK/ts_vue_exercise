import Vue from 'vue'
import Vuex from 'vuex'
import { musicUrl } from "../assets/tool/port";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    palyMusicInfo: {}
  },
  mutations: {
    setPalyMusicInfoM(state, info) {
      state.palyMusicInfo = info
    }
  },
  actions: {
    setPalyMusicInfoA(context, id) {
      const data = {
        id,
        br: 999000
      };
      musicUrl(data).then((res): void => {
        if (res.status == 200) {
          context.commit('setPalyMusicInfoM', res.data.data[0])
        }
      });
    }
  },
  modules: {
  }
})
