<template>
  <div class="tab1">
    <!-- 轮播 -->
    <div v-if="banner" class="swiper">
      <nut-swiper
        :paginationVisible="true"
        direction="horizontal"
        :autoPlay="3000"
        :loop="true"
        :swiperData="banner"
        ref="demo1"
      >
        <div
          v-for="(item,index) in banner"
          :key="index"
          @click="$toast.text('功能正在开发中，先试试其他功能')"
          class="nut-swiper-slide"
        >
          <img :src="item.imageUrl" class="swiperImg" alt />
        </div>
      </nut-swiper>
    </div>
    <!-- 新音乐推荐 -->
    <div v-if="personalizedNewsong" class="personalizedNewsong">
      <div class="personalizedNewsong_title">
        <span>新音乐推荐</span>
        <span @click="GoPage">
          更多
          <nut-icon type="right" size="10px"></nut-icon>
        </span>
      </div>
      <div class="personalizedNewsong_content">
        <div @click="play(personalizedNewsong[0])" class="personalizedNewsong_content_item">
          <div class="personalizedNewsong_content_img">
            <img :src="personalizedNewsong[0].picUrl" alt />
          </div>
          <div class="personalizedNewsong_content_title">{{ personalizedNewsong[0].name }}</div>
          <div class="personalizedNewsong_content_songName">
            <span
              v-for="(el, i) in personalizedNewsong[0].song.artists"
              :key="i"
            >{{ i == 0? el.name: '/' + el.name }}</span>
          </div>
        </div>
        <div @click="play(personalizedNewsong[1])" class="personalizedNewsong_content_item">
          <div class="personalizedNewsong_content_img">
            <img :src="personalizedNewsong[1].picUrl" alt />
          </div>
          <div class="personalizedNewsong_content_title">{{ personalizedNewsong[1].name }}</div>
          <div class="personalizedNewsong_content_songName">
            <span
              v-for="(el, i) in personalizedNewsong[1].song.artists"
              :key="i"
            >{{ i == 0? el.name: '/' + el.name }}</span>
          </div>
        </div>
        <div @click="play(personalizedNewsong[2])" class="personalizedNewsong_content_item">
          <div class="personalizedNewsong_content_img">
            <img :src="personalizedNewsong[2].picUrl" alt />
          </div>
          <div class="personalizedNewsong_content_title">{{ personalizedNewsong[2].name }}</div>
          <div class="personalizedNewsong_content_songName">
            <span
              v-for="(el, i) in personalizedNewsong[2].song.artists"
              :key="i"
            >{{ i == 0? el.name: '/' + el.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <div @click="GoPage" class="personalized">
      <div class="personalized_title">
        <span>推荐歌单</span>
        <span @click="GoPage">
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
</template>

<script lang="ts">
import {
  banner,
  personalizedNewsong,
  personalized
} from "@/assets/tool/port";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class NutTab1 extends Vue {
  banner: [] | null = null; // 独家放送bannber
  personalizedNewsong: [] | null = null; // 新音乐推荐
  personalized: any = [[], []]; // 推荐歌单
  // 点击播放
  play(music: any) {
    this.$store.dispatch("setPalyMusicInfoA", music.id).then((): void => {
      this.$router.push("/playDetail");
    });
  }
  // 跳转
  GoPage(url?: string) {
    (this as any).$toast.text("功能正在开发中，先试试其他功能");
  }
  created() {
    personalizedNewsong().then((res): void => {
      if (res.status == 200) {
        this.personalizedNewsong = res.data.result;
      }
    });
    banner().then((res): void => {
      if (res.status == 200) {
        this.banner = res.data.banners;
      }
    });
    personalized({ limit: 6 }).then((res): void => {
      if (res.status == 200) {
        res.data.result.map((item: object, index: number): void => {
          index < 3 && this.personalized[0].push(item);
          index >= 3 && this.personalized[1].push(item);
        });
      }
    });
  }
}
</script>

<style lang='less' scoped>
.tab1 {
  // 轮播
  .swiper {
    width: 100%;
    height: 150.64px;
    padding: 10px;
    box-sizing: border-box;
    /deep/ .nut-swiper {
      width: 100%;
      height: 100%;
    }
    .swiperImg {
      height: 100%;
      width: 100%;
      border-radius: 5px;
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
          height: 13px;
          margin-top: 5px;
          font-size: 13px;
          color: #333;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .personalizedNewsong_content_songName {
          height: 11px;
          margin-top: 5px;
          font-size: 11px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
</style>
