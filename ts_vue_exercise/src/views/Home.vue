<template>
  <!-- 首页 -->
  <div class="home">
    <div class="mainContent">
      <!-- 搜索icon -->
      <div @click="goSearch" class="searchIcon">
        <nut-icon type="search" color="#fff" size="15px"></nut-icon>
      </div>
      <nut-tab :line-width="20" :is-show-line="false">
        <nut-tab-panel tab-title="乐库">
          <NutTab1></NutTab1>
        </nut-tab-panel>
        <nut-tab-panel tab-title="排行榜">
          <NutTab2></NutTab2>
        </nut-tab-panel>
      </nut-tab>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    NutTab1: () => import("@/components/home/nut-tab1.vue"),
    NutTab2: () => import("@/components/home/nut-tab2.vue")
  }
})
export default class Home extends Vue {
  goSearch(): void {
    this.$router.push("/search");
  }
}
</script>
<style lang="less" scoped>
.home {
  // 主体内容
  .mainContent {
    width: 100%;
    height: 100%;
    // 搜索框icon
    .searchIcon {
      position: fixed;
      top: 0;
      right: 0;
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
    /deep/ .nut-tab-part {
      width: 100%;
      height: 100%;
      .nut-tab {
        padding: 0;
        border: none;
        height: 100%;
        .nut-tab-title {
          background: linear-gradient(to right, #34a8aa, #009697);
          box-shadow: rgb(125, 125, 125) 0px 0px 5px;
          border: none;
          height: 40px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1;
          .nut-tab-link {
            color: #ddd;
            font-size: 13px;
          }
          .nut-tab-active a {
            color: #fff;
            font-size: 16px;
          }
        }
        .nut-tab-active,
        .nut-title-nav-list {
          background: transparent;
        }
        .nut-tab-item {
          padding: 40px 0 0 0;
          border: none;
          height: 100%;
          .nut-tab-panel {
            overflow: auto;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
