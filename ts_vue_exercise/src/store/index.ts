import Vue from 'vue'
import Vuex from 'vuex'
import _this from '@/main'
import { songUrl, songDetail } from "@/assets/tool/port";

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
      const loading = (_this as any).$toast.loading("加载中...", {
        duration: 10000
      });
      let ok = 0
      let url: object | null = null
      let detail: object | null = null
      const data1 = {
        id
      };
      const data2 = {
        ids: id
      }
      // 音乐播放地址
      songUrl(data1).then((res): void => {
        if (res.status == 200) {
          ok += 50
          url = res.data.data[0]
        }
      });
      // 音乐各类信息
      songDetail(data2).then((detailRes): void => {
        if (detailRes.status == 200) {
          ok += 50
          detail = detailRes.data
        }
      })
      const interval = setInterval(() => {
        if (ok == 100) {
          clearInterval(interval)
          loading.hide()
          if (!(url as any).url) {
            (_this as any).$toast.text("该音乐暂时无法播放，换一首试试");
            return
          }
          // if (!(url as any).url == _this.$store.state.palyMusicInfo.url) {
          //   (_this as any).$toast.text("正在播放这首歌哦");
          //   return
          // }
          const info = Object.assign(url, detail)
          context.commit('setPalyMusicInfoM', info)
        }
      }, 50)
    }
  },
  modules: {
  }
})
