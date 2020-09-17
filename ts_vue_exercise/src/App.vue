<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="Router" />
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  transitionName = "slide-right"; //初始过渡动画方向

  @Watch("$route")
  gettransitionName(to: object, from: object) {
    console.log(to, from);
    // 切换动画
    const isBack = (this.$router as any).isBack; // 监听路由变化时的状态为前进还是后退
    if (isBack) {
      this.transitionName = "slide-left";
    } else {
      this.transitionName = "slide-right";
    }
    (this.$router as any).isBack = false;
  }
}
</script>
<style lang="less">
@import "assets/css/common.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  margin: auto;
  position: relative;

  .Router {
    position: absolute;
    height: 100%;
    transition: all 0.5s ease;
    top: 0;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
