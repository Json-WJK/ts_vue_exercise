<template>
  <div id="app">
    <transition :name="data.transitionName">
      <router-view :class="data.pageClass" />
    </transition>
    <!-- 播放器 -->
    <Play v-show="data.palyIsShow"></Play>
  </div>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
@Component({
  components: {
    Play: () => import("@/components/play/play.vue")
  }
})
export default class App extends Vue {
  data = {
    pageClass: "Router", // 页面使用的class
    palyIsShow: false,
    pageArr: ["/", "/search"],
    routeLength: 1, // 当前页面栈页面数量
    transitionName: "slide-left" //初始过渡动画方向
  };
  computedClass(path: string) {
    // 选用页面样式
    this.data.pageArr.includes(path) &&
      (() => {
        this.data.pageClass = "RouterContainBar";
        this.data.palyIsShow = true;
      })();
    this.data.pageArr.includes(path) ||
      (() => {
        this.data.pageClass = "Router";
        this.data.palyIsShow = false;
      })();
  }
  @Watch("$route")
  gettransitionName(to: object, from: object) {
    this.computedClass((to as any).path);
    // 切换动画
    console.log(
      this.data.routeLength,
      (this.$router.options.routes as any).length
    );
    if (this.data.routeLength > (this.$router.options.routes as any).length) {
      this.data.transitionName = "slide-left";
    } else {
      this.data.transitionName = "slide-right";
    }
    this.data.routeLength = (this.$router.options.routes as any).length;
    console.log(this.$router);
  }
  mounted() {
    this.computedClass((this.$router as any).app._route.fullPath);
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
    transition: all 0.3s ease;
    top: 0;
    backface-visibility: hidden;
    perspective: 1000;
  }
  // 带底部播放器的页面
  .RouterContainBar {
    position: absolute;
    height: 100%;
    width: 100%;
    transition: all 0.5s ease;
    top: 0;
    backface-visibility: hidden;
    perspective: 1000;
    box-sizing: border-box;
    padding-bottom: 50px;
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>