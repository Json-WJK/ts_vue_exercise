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
      <div class="mainContent">
        <nut-tab @tab-switch="tabSwitch" :line-width="20">
          <nut-tab-panel tab-title="乐库">
            <div class="tab1">
              <!-- 轮播 -->
              <div class="swiper">
                <nut-swiper
                  :paginationVisible="true"
                  direction="horizontal"
                  :loop="true"
                  :swiperData="homeData.focus.data.content"
                  ref="demo1"
                >
                  <div
                    v-for="(item,index) in homeData.focus.data.content"
                    :key="index"
                    class="nut-swiper-slide"
                  >
                    <img :src="item.pic_info.url" class="swiperImg" alt />
                  </div>
                </nut-swiper>
              </div>
              <!-- 人气歌单推荐 -->
              <div class="recommended">
                <div class="recommended_title">
                  <span>人气歌单推荐</span>
                  <span>
                    更多
                    <nut-icon type="right" size="10px"></nut-icon>
                  </span>
                </div>
                <div class="recommended_content">
                  <div class="recommended_content_item">
                    <div class="recommended_content_img">
                      <img :src="homeData.recomPlaylist.data.v_hot[0].cover" alt />
                    </div>
                    <div
                      class="recommended_content_title"
                    >{{ homeData.recomPlaylist.data.v_hot[0].title }}</div>
                  </div>
                  <div class="recommended_content_item">
                    <div class="recommended_content_img">
                      <img :src="homeData.recomPlaylist.data.v_hot[1].cover" alt />
                    </div>
                    <div
                      class="recommended_content_title"
                    >{{ homeData.recomPlaylist.data.v_hot[1].title }}</div>
                  </div>
                  <div class="recommended_content_item">
                    <div class="recommended_content_img">
                      <img :src="homeData.recomPlaylist.data.v_hot[2].cover" alt />
                    </div>
                    <div
                      class="recommended_content_title"
                    >{{ homeData.recomPlaylist.data.v_hot[2].title }}</div>
                  </div>
                </div>
              </div>
              <!-- 歌单分类 -->
              <div class="classification">
                <div class="classification_title">
                  <span>歌单分类</span>
                  <span>
                    更多
                    <nut-icon type="right" size="10px"></nut-icon>
                  </span>
                </div>
              </div>
              <div class="classification_content">
                <div class="classification_content_item">
                  <div class="classification_content_img">
                    <img :src="homeData.category.data.category[0].items[0].reimgurl" alt />
                  </div>
                  <div class="classification_content_text">
                    <div></div>
                    <div></div>
                  </div>
                  <div class="classification_content_icon"></div>
                </div>
              </div>
            </div>
          </nut-tab-panel>
          <nut-tab-panel tab-title="排行榜">排行榜</nut-tab-panel>
        </nut-tab>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getRecommend, getSongListCategories } from "../assets/tool/port";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  homeData: object | null = null; // 首页推荐数据
  SongListCategories: object | null = null; // 歌单分类
  searchVal = ""; // 搜索
  created() {
    getRecommend().then((res: any): void => {
      if (res.status == 200) {
        this.homeData = res.data.response;
      }
    });
    getSongListCategories().then((res: any): void => {
      if (res.status == 200) {
        this.SongListCategories = res.data.response;
      }
    });
  }
  tabSwitch(e: string): void {
    console.log(e, "e");
  }
}
</script>
<style lang="less" scoped>
.home {
  // 搜索
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
  // 主体内容
  .mainContent {
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
      .nut-tab-title {
        border: none;
      }
      .nut-tab-item {
        padding: 0;
        border: none;
      }
    }
    .tab1 {
      // 轮播
      .swiper {
        .swiperImg {
          height: 100%;
          width: 100%;
        }
      }
      // 人气歌单推荐
      .recommended {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        margin-top: 10px;
        &_title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          span:nth-child(1) {
            font-size: 16px;
            font-weight: bold;
          }
          span:nth-child(2) {
            font-size: 12px;
            color: #666;
            display: flex;
            align-items: center;
          }
        }
        &_content {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          padding-bottom: 33px;
          &_item {
            position: relative;
            width: 32%;
            height: 0;
            font-size: 0;
            line-height: 0;
            padding: 32% 0 0;
            .recommended_content_img {
              height: 100%;
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
              img {
                height: 100%;
                width: 100%;
                border-radius: 5px;
              }
            }
            .recommended_content_title {
              height: 28px;
              margin-top: 5px;
              line-height: 14px;
              font-size: 12px;
              color: #333;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical; 
            }
          }
        }
      }
      // 歌单分类
      .classification {
        width: 100%;
        box-sizing: border-box;
        padding: 0 10px;
        margin-top: 10px;
        &_title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          span:nth-child(1) {
            font-size: 16px;
            font-weight: bold;
          }
          span:nth-child(2) {
            font-size: 12px;
            color: #666;
            display: flex;
            align-items: center;
          }
        }
        &_content {
          &_item {
            height: 35px;
          }
        }
      }
    }
  }
}
</style>
