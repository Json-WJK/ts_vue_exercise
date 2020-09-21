<template>
  <div id="app">
    <transition :name="data.transitionName">
      <router-view :class="data.pageClass" />
    </transition>
    <Play></Play>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
@Component({
  components: {
    Play: () => import("@/components/play.vue")
  }
})
export default class App extends Vue {
  data = {
    pageClass: "Router", // 页面使用的class
    pageArr: ["/"],
    transitionName: "slide-right" //初始过渡动画方向
  };
  computedClass(path: string) {
    // 选用页面样式
    this.data.pageArr.includes(path) &&
      (this.data.pageClass = "RouterContainBar");
    console.log("计算class", this.data.pageClass);
  }
  @Watch("$route")
  gettransitionName(to: object, from: object) {
    console.log(to, from);
    this.computedClass((to as any).path);
    // 切换动画
    const isBack = (this.$router as any).isBack; // 监听路由变化时的状态为前进还是后退
    if (isBack) {
      this.data.transitionName = "slide-left";
    } else {
      this.data.transitionName = "slide-right";
    }
    (this as any).$router.isBack = false;
  }
  mounted() {
    this.computedClass((this.$router as any).history._startLocation);
    console.log(
      this.$router,
      (this.$router as any).history.router._startLocation,
      "查看路由"
    );
  }
}
</script>
<style lang="less">
@import "assets/css/common.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 100vw;
  width: 100vw;
  min-height: 100vh;
  margin: auto;
  position: relative;
  // 常规页面
  .Router {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    top: 0;
    backface-visibility: hidden;
    perspective: 1000;
  }
  // 带bar页面
  .RouterContainBar {
    position: absolute;
    height: 100%;
    width: 100%;
    transition: all 0.5s ease;
    top: 0;
    backface-visibility: hidden;
    perspective: 1000;
    box-sizing: border-box;
    padding-bottom: 40px;
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