import Vue from 'vue'
import Vuex from 'vuex'
import _this from '@/main'
import { songUrl, songDetail } from "@/assets/tool/port";
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audio: {}, // 播放器实例
    audioIsPlay: false, // 播放器当前是否在播放
    palyMusicInfo: {}, // 当期播放器正在播放的音乐详情
    playProportion: '0' // 当前播放进度
  },
  mutations: {
    // 更新播放器实例
    setAudio(state, audio) {
      state.audio = audio
    },
    // 更新播放器播放暂停状态
    setAudioIsPlay(state) {
      state.audioIsPlay = !((state.audio as any).paused)
      console.log(state.audioIsPlay)
    },
    // 更新播放器正在播放的音乐
    setPalyMusicInfoM(state, info) {
      state.palyMusicInfo = info
    },
    // 更新当前播放进度
    setPlayProportion(state, playProportion) {
      state.playProportion = playProportion
    }
  },
  actions: {
    // 请求播放器正在播放音乐详细信息 -- 开始播放
    setPalyMusicInfoA(context, id) {
      return new Promise((resolve): void => {
        // 如果该歌曲为当前播放器实例中的歌曲 直接开始播放
        if (id == _this.$store.state.palyMusicInfo.id) {
          _this.$store.state.audio.play()
          _this.$router.push('/playDetail')
          resolve(_this.$store.state.setPalyMusicInfoM)
          return
        }
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
            const info = Object.assign(url, detail)
            context.commit('setPalyMusicInfoM', info)
            resolve(info)
          }
        }, 50)
      })
    }
  },
  modules: {
  },
  plugins: [persistedState({ storage: window.sessionStorage })] // 数据持久化
})
