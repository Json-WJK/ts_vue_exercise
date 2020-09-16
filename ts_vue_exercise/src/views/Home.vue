<template>
  <div class="home">
    <div v-if="personalizedNewsong">
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
                  :autoPlay="3000"
                  :loop="true"
                  :swiperData="banners"
                  ref="demo1"
                >
                  <div v-for="(item,index) in banners" :key="index" class="nut-swiper-slide">
                    <img :src="item.blurPicUrl" class="swiperImg" alt />
                  </div>
                </nut-swiper>
              </div>
              <!-- 新音乐推荐 -->
              <div class="personalizedNewsong">
                <div class="personalizedNewsong_title">
                  <span>新音乐推荐</span>
                  <span>
                    更多
                    <nut-icon type="right" size="10px"></nut-icon>
                  </span>
                </div>
                <div class="personalizedNewsong_content">
                  <div class="personalizedNewsong_content_item">
                    <div class="personalizedNewsong_content_img">
                      <img :src="personalizedNewsong[0].picUrl" alt />
                    </div>
                    <div class="personalizedNewsong_content_title">{{ personalizedNewsong[0].name }}</div>
                  </div>
                  <div class="personalizedNewsong_content_item">
                    <div class="personalizedNewsong_content_img">
                      <img :src="personalizedNewsong[1].picUrl" alt />
                    </div>
                    <div class="personalizedNewsong_content_title">{{ personalizedNewsong[1].name }}</div>
                  </div>
                  <div class="personalizedNewsong_content_item">
                    <div class="personalizedNewsong_content_img">
                      <img :src="personalizedNewsong[2].picUrl" alt />
                    </div>
                    <div class="personalizedNewsong_content_title">{{ personalizedNewsong[2].name }}</div>
                  </div>
                </div>
              </div>
              <!-- 推荐歌单 -->
              <div class="personalized">
                <div class="personalized_title">
                  <span>推荐歌单</span>
                  <span>
                    更多
                    <nut-icon type="right" size="10px"></nut-icon>
                  </span>
                </div>
                <div class="personalized_content">
                  <nut-scroller @jump="jump()">
                    <div
                      slot="list"
                      class="nut-hor-list-item"
                      v-for="(item, index) of personalized"
                      :key="index"
                    >
                      <div v-for="(el, i) of item" :key="i" class="personalized_content_item">
                        <div class="personalized_content_item_img">
                          <img :src="el.picUrl" alt />
                        </div>
                        <div class="personalized_content_item_text">
                          <div class="personalized_content_item_text_name">{{ el.name }}</div>
                          <div class="personalized_content_item_text_copywriter">{{ el.copywriter }}</div>
                        </div>
                      </div>
                    </div>
                  </nut-scroller>
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
import { banner, personalizedNewsong, personalized } from "../assets/tool/port";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  banners: [] | null = null; // bannner
  personalizedNewsong: [] | null = null; // 新音乐推荐
  personalized: any = [[], []]; // 推荐歌单
  searchVal = ""; // 搜索
  created() {
    personalizedNewsong().then((res): void => {
      if (res.status == 200) {
        this.personalizedNewsong = res.data.result;
      }
    });
    banner().then((res): void => {
      if (res.status == 200) {
        this.banners = res.data.albums;
      }
    });
    personalized().then((res): void => {
      if (res.status == 200) {
        res.data.result.map((item: object, index: number): void => {
          index < 3 && this.personalized[0].push(item);
          index >= 3 && this.personalized[1].push(item);
        });
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
      // 新音乐推荐
      .personalizedNewsong {
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
            .personalizedNewsong_content_img {
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
            .personalizedNewsong_content_title {
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
      // 推荐歌单
      .personalized {
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
          height: 200px;
          width: 100%;
          /deep/.nut-hor-list {
            width: 605px;
          }
          &_item {
            width: 290px;
            height: 50px;
            background: #eee;
            display: flex;
            align-items: center;
            margin-top: 5px;
            &_img {
              width: 50px;
              height: 50px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            &_text {
              height: 100%;
              margin-left: 5px;
              display: flex;
              flex-flow: column;
              justify-content: space-evenly;
              width: 235px;
              &_name {
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 13px;
              }
              &_copywriter {
                color: #666;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
              }
            }
          }
          /deep/ .nut-hor-list-item:not(:first-child) {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
