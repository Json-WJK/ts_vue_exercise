<template>
  <div @click="GoPage" class="tab2">
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
        <div v-for="(item, index) in topArtists" :key="index" class="topArtistItem">
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
</template>

<script lang="ts">
import { toplist, topArtists } from "@/assets/tool/port";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class NutTab1 extends Vue {
  toplist: [] | null = null; // 歌手榜单
  topArtists: [] | null = null; // 所有榜单
  created() {
    toplist().then((res): void => {
      if (res.status == 200) {
        this.toplist = res.data.list;
      }
    });
    topArtists({ offset: 1, type: 1, limit: 3 }).then((res): void => {
      if (res.status == 200) {
        this.topArtists = res.data.artists;
      }
    });
  }
  // 跳转
  GoPage(url?: string) {
    (this as any).$toast.text("功能正在开发中，先试试其他功能");
  }
}
</script>

<style lang='less' scoped>
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
</style>
