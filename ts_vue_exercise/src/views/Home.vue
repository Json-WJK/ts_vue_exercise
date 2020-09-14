<template>
  <div class="home">
    <div v-if="homeData">
      <div class="search">
        <nut-searchbar
          v-model="searchVal"
          placeText="搜索"
          customClass="searchInput"
          searchBtnIconColor="#ffffff"
        ></nut-searchbar>
      </div>
      <div>
        <nut-tab @tab-switch="tabSwitch" :line-width="20">
          <nut-tab-panel tab-title="乐库">
            <nut-swiper
              :paginationVisible="true"
              direction="horizontal"
              :swiperData="homeData.focus.data.content"
              ref="demo1"
            >
              <div
                v-for="(item,index) in homeData.focus.data.content"
                :key="index"
                class="nut-swiper-slide"
              >
              </div>
            </nut-swiper>
          </nut-tab-panel>
          <nut-tab-panel tab-title="推荐">推荐</nut-tab-panel>
          <nut-tab-panel tab-title="视频">视频</nut-tab-panel>
          <nut-tab-panel tab-title="排行榜">排行榜</nut-tab-panel>
        </nut-tab>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getRecommend } from "../assets/tool/port";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  homeData: object | null = null; // 首页数据
  searchVal = ""; // 搜索
  created() {
    getRecommend().then((res: any): void => {
      if (res.status == 200) {
        this.homeData = res.data.response;
      }
    });
  }
  tabSwitch(e: string): void {
    console.log(e, "e");
  }
}
</script>
<style lang="less" scoped>
.search {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 10px 20px 0;
  background: linear-gradient(to right, #34a8aa, #009697);
  .searchInput {
    height: 100%;
  }
}
/deep/ .nut-tab {
  padding: 0;
  border: none;
  background: linear-gradient(to right, #34a8aa, #009697);
  .nut-tab-link {
    color: #fff;
  }
  .nut-tab-active a {
    color: #fff;
    font-size: 16px;
  }
  .nut-tab-title,
  .nut-tab-active,
  .nut-title-nav-list {
    background: transparent;
  }
}
</style>
