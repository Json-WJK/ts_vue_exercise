<template>
  <!-- 播放器 -->
  <div @click="goPlayDetail" class="Play">
    <!-- 播放器实例 -->
    <audio
      v-show="false"
      ref="audio"
      @playing="playing"
      @pause="pause"
      @timeupdate="timeupdate"
      :src="palyMusicInfo.url"
    ></audio>
    <!-- 展示给用户的播放器 -->
    <div class="showPlay">
      <!-- 默认文案 -->
      <div style="margin-left: 10px;" v-if="!palyMusicInfo.songs">选一首音乐开始播放吧</div>
      <!-- 当前进度 -->
      <div class="playProportion" :style="{ width: playProportion + '%' }"></div>
      <div class="img">
        <img v-if="palyMusicInfo.songs" :src="palyMusicInfo.songs[0].al.picUrl" alt />
      </div>
      <div class="text">
        <div v-if="palyMusicInfo.songs" class="text_box">
          <div class="name">{{ palyMusicInfo.songs[0].name }}</div>
          <div class="song">
            <span
              v-for="(item, index) in palyMusicInfo.songs[0].ar"
              :key="index"
            >{{ index == 0? item.name: '/' + item.name }}</span>
          </div>
        </div>
      </div>
      <div class="icons">
        <div @click.stop="PlayOrPause" class="playIcon">
          <i v-if="audioIsPlay" style="font-size: 21px;" class="iconfont">&#xe612;</i>
          <i v-else class="iconfont">&#xe66a;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Play extends Vue {
  mounted() {
    this.$store.commit("setAudio", (this as any).$refs["audio"]);
  }
  // 播放器实例
  get audio() {
    return this.$store.state.audio;
  }
  // 正在播放歌曲详情 如果正在播放的音乐数据发生变化 --- 则为新点击的音乐
  get palyMusicInfo() {
    console.log(this.$store.state.palyMusicInfo);
    setTimeout(() => {
      this.audio.play();
      this.setAudioIsPlay();
    }, 0);
    return this.$store.state.palyMusicInfo;
  }
  // 当前播放器播放暂停状态
  get audioIsPlay() {
    return this.$store.state.audioIsPlay;
  }
  // 当前播放进度
  get playProportion() {
    return this.$store.state.playProportion;
  }
  // 手动点击播放暂停事件
  PlayOrPause() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
  playing() {
    // console.log("播放器开始播放");
    this.setAudioIsPlay();
  }
  pause() {
    // console.log("播放器暂停播放");
    this.setAudioIsPlay();
  }
  timeupdateTimeout: any = null; // 播放位置变化任务存储
  timeupdate() {
    // console.log("当播放位置改变时");
    this.$store.dispatch;
    if (!this.timeupdateTimeout) {
      this.timeupdateTimeout = setTimeout(() => {
        (() => {
          clearTimeout(this.timeupdateTimeout);
          this.timeupdateTimeout = null;
          const proportion = (
            (this.$store.state.audio.currentTime /
              this.$store.state.audio.duration) *
            100
          ).toFixed(2);
          this.$store.commit("setPlayProportion", proportion);
        })();
      }, 1000);
    }
  }
  // 更新播放器状态
  setAudioIsPlay() {
    this.$store.commit("setAudioIsPlay");
  }
  // 跳转播放器详情
  goPlayDetail() {
    if (this.palyMusicInfo.songs) {
      this.$router.push("/playDetail");
    } else {
      (this as any).$toast.text("选择一首音乐开始播放吧");
    }
  }
}
</script>

<style lang="less" scoped>
.Play {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: rgb(125, 125, 125) 0px 0px 1px;
  .showPlay {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .playProportion {
      position: absolute;
      top: -2px;
      left: 0;
      background: linear-gradient(to right, #34a8aa, #009697);
      height: 2px;
    }
    .img {
      width: 40px;
      height: 40px;
      margin-left: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .text {
      margin-left: 5px;
      .text_box {
        max-width: 250px;
        .name {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 12px;
          color: #333;
          font-weight: bold;
          line-height: 18px;
        }
        .song {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 10px;
          color: #999;
          line-height: 15px;
        }
      }
    }
    .icons {
      margin: 0 10px 0 auto;
      .playIcon {
        height: 100%;
        .iconfont {
          font-size: 15px;
        }
      }
    }
  }
}
</style>