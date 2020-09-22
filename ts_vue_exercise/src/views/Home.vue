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
          <div class="tab1">
            <!-- 轮播 -->
            <div v-if="personalizedPrivatecontent" class="swiper">
              <nut-swiper
                :paginationVisible="true"
                direction="horizontal"
                :autoPlay="3000"
                :loop="true"
                :swiperData="personalizedPrivatecontent"
                ref="demo1"
              >
                <div
                  v-for="(item,index) in personalizedPrivatecontent"
                  :key="index"
                  class="nut-swiper-slide"
                >
                  <img :src="item.sPicUrl" class="swiperImg" alt />
                </div>
              </nut-swiper>
            </div>
            <!-- 新音乐推荐 -->
            <div v-if="personalizedNewsong" class="personalizedNewsong">
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
              <div v-if="personalized" class="personalized_content">
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
        <nut-tab-panel tab-title="排行榜">
          <div class="tab2">
            <!-- 热门歌手 -->
            <div class="topArtist">
              <div class="topArtist_title">
                <span>热门歌手</span>
                <span>
                  更多
                  <nut-icon type="right" size="10px"></nut-icon>
                </span>
              </div>
              <div class="topArtist_content">
                <div v-for="(item, index) in topArtist" :key="index" class="topArtistItem">
                  <div class="img">
                    <img :src="item.img1v1Url" alt />
                  </div>
                  <div class="name">{{ item.name }}</div>
                </div>
              </div>
            </div>
            <!-- 音乐榜单 -->
            <div class="toplist">
              <div class="toplist_title">
                <span>音乐榜单</span>
                <span>
                  更多
                  <nut-icon type="right" size="10px"></nut-icon>
                </span>
              </div>
              <div class="toplist_content">
                <div v-for="(item, index) in toplist" :key="index" class="toplistItem">
                  <div class="img">
                    <img :src="item.coverImgUrl" alt />
                  </div>
                  <div class="name">{{ item.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </nut-tab-panel>
      </nut-tab>
    </div>
  </div>
</template>

<script lang="ts">
import {
  personalizedPrivatecontent,
  personalizedNewsong,
  personalized,
  toplist,
  topArtist
} from "../assets/tool/port";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  personalizedPrivatecontent: [] | null = null; // 独家放送bannber
  personalizedNewsong: [] | null = null; // 新音乐推荐
  personalized: any = [[], []]; // 推荐歌单
  toplist: [] | null = null; // toplist
  playlistAll: [] | null = null; // playlistAll
  topArtist: [] | null = null; // topArtist
  created() {
    personalizedNewsong().then((res): void => {
      if (res.status == 200) {
        this.personalizedNewsong = res.data.result;
      }
    });
    personalizedPrivatecontent().then((res): void => {
      if (res.status == 200) {
        this.personalizedPrivatecontent = res.data.result;
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
    toplist().then((res): void => {
      if (res.status == 200) {
        this.toplist = res.data.list;
      }
    });
    topArtist({ offset: 1, type: 1, limit: 3 }).then((res): void => {
      if (res.status == 200) {
        this.topArtist = res.data.artists;
      }
    });
  }
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
          &_item {
            width: 32%;
            .personalizedNewsong_content_img {
              width: 100%;
              img {
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
          height: 260px;
          width: 100%;
          /deep/.nut-hor-list {
            width: 605px;
          }
          &_item {
            width: 290px;
            height: 70px;
            display: flex;
            align-items: center;
            margin-top: 5px;
            &_img {
              width: 70px;
              height: 70px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 10px;
              }
            }
            &_text {
              height: 100%;
              margin-left: 5px;
              display: flex;
              flex-flow: column;
              justify-content: space-evenly;
              width: 215px;
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
    .tab2 {
      // 热门歌手
      .topArtist {
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
          margin-top: 10px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .topArtistItem {
            width: 32%;
            .img {
              width: 100%;
              img {
                width: 100%;
                border-radius: 10px;
                box-shadow: rgb(200, 200, 200) 0px 0px 10px;
              }
            }
            .name {
              width: 100%;
              text-align: center;
              font-size: 13px;
            }
          }
        }
      }
      // 音乐榜单
      .toplist {
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
          margin-top: 10px;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .toplistItem {
            width: 80px;
            margin-bottom: 10px;
            .img {
              width: 100%;
              img {
                width: 100%;
                border-radius: 5px;
              }
            }
            .name {
              width: 100%;
              text-align: center;
              font-size: 12px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
