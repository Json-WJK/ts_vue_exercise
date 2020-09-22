import Vue from 'vue'
import Vuex from 'vuex'
import _this from '@/main'
import { musicUrl } from "@/assets/tool/port";

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
          if (!res.data.data[0].url) {
            (_this as any).$toast.text("该音乐暂时无法播放，换一个试试");
            return
          }
          context.commit('setPalyMusicInfoM', res.data.data[0])
        }
      });
    }
  },
  modules: {
  }
})
