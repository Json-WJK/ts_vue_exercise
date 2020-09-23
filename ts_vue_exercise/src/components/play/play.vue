<template>
  <!-- 播放器 -->
  <div class="Play">
    <!-- 异常播放器 -->
    <audio v-show="false" ref="audio" :src="palyMusicInfo.url"></audio>
    <!-- 展示给用户的播放器 -->
    <div class="showPlay">
      <div style="margin-left: 10px;" v-if="!palyMusicInfo.songs">选一首音乐开始播放吧</div>
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
        <div @click="PlayOrPause" class="playIcon">
          <i v-if="isPlay" class="iconfont">&#xe66a;</i>
          <i v-else class="iconfont" style="font-size: 21px;">&#xe612;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Play extends Vue {
  musicUrl = {};
  audio: any = null; // 播放器控件
  isPlay = false;
  mounted() {
    this.audio = (this as any).$refs["audio"];
  }
  // 正在播放歌曲详情
  get palyMusicInfo() {
    console.log(this.$store.state.palyMusicInfo);
    setTimeout(() => {
      this.audio.play();
      this.setIsPlay();
    }, 0);
    return this.$store.state.palyMusicInfo;
  }
  // 手动点击播放暂停事件
  PlayOrPause() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.setIsPlay();
  }
  setIsPlay() {
    this.isPlay = this.audio.paused;
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