<template>
  <!-- 播放器 -->
  <div class="Play">
    <audio v-show="false" autoplay  :src="palyMusicInfo.url"></audio>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Play extends Vue {
  musicUrl = {};
  get palyMusicInfo() {
    console.log(this.$store.state.palyMusicInfo, "当前播放音乐变化");
    return this.$store.state.palyMusicInfo;
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
  background: #1f9e9f;
}
</style>