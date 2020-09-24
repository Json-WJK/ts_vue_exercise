<template>
  <!-- 播放器详情页  -->
  <div class="playDetail">
    <!-- 毛玻璃背景 -->
    <div class="BGIMG">
      <img :src="palyMusicInfo.songs[0].al.picUrl" alt />
    </div>
    <!-- 主体内容 -->
    <div class="content">
      <!-- 顶部栏 -->
      <div class="topBar">
        <div @click="$router.go(-1)" class="goBack">
          <nut-icon type="right" size="12px" color="#fff"></nut-icon>
        </div>
        <div class="info">
          <div class="name">{{ palyMusicInfo.songs[0].name }}</div>
          <div class="song">
            <span
              v-for="(item, index) in palyMusicInfo.songs[0].ar"
              :key="index"
            >{{ index == 0? item.name: '/' + item.name }}</span>
          </div>
        </div>
      </div>
      <!-- 旋转song图片 -->
      <div v-if="palyMusicInfo.songs" class="songImg">
        <img :src="palyMusicInfo.songs[0].al.picUrl" :class="audioIsPlay? 'spinClass': ''" alt />
      </div>
      <!-- 播放操作栏 -->
      <div class="bottomBar">
        <div @click="PlayOrPause" class="PlayOrPause">
          <i v-if="audioIsPlay" class="iconfont">&#xe615;</i>
          <i v-else class="iconfont">&#xe645;</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class PlayDetail extends Vue {
  // 播放器
  get audio() {
    return this.$store.state.audio;
  }
  // 正在播放歌曲详情
  get palyMusicInfo() {
    return this.$store.state.palyMusicInfo;
  }
  // 当前播放器播放暂停状态
  get audioIsPlay() {
    return this.$store.state.audioIsPlay;
  }
  // 手动点击播放暂停事件
  PlayOrPause() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}
</script>
<style lang="less" scoped>
.playDetail {
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .BGIMG {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(20px);
      transform: scale(1.1);
    }
  }
  .content {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    .topBar {
      display: flex;
      align-items: center;
      height: 40px;
      .goBack {
        width: 20px;
        height: 100%;
        transform: rotateY(180deg);
        display: flex;
        align-items: center;
        margin-right: 5px;
      }
      .info {
        .name {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 12px;
          color: #fff;
          font-weight: bold;
          line-height: 18px;
        }
        .song {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 10px;
          color: #aaa;
          line-height: 15px;
        }
      }
    }
    .songImg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 240px;
      height: 240px;
      box-sizing: border-box;
      padding: 40px;
      background: #000;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .spinClass {
        animation: spin 15s linear infinite;
      }
    }
    .bottomBar {
      position: absolute;
      bottom: 30px;
      left: 0;
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      .PlayOrPause {
        color: #fff;
        .iconfont {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
