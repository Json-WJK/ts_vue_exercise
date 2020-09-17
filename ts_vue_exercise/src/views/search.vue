<template>
  <div class="Search">
    <div class="searchInputBox">
      <nut-searchbar
        v-model="searchVal"
        placeText="搜索"
        customClass="searchInput"
        searchBtnIconColor="#ffffff"
        @keyup.enter="search"
        @submit="search"
      ></nut-searchbar>
    </div>
    <div class="searchResTitle">单曲</div>
    <div class="searchResList">
      <div v-for="(item, index) in searchRes" :key="index" class="ListItem">
        <div class="songName">{{ item.name }}</div>
        <div class="arName">{{ item.ar[0].name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { cloudsearch } from "../assets/tool/port";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Search extends Vue {
  searchVal = "";
  searchRes = [];
  mounted() {
    const data = {
      keywords: this.searchVal,
    };
  }
  search() {
    const data = {
      keywords: this.searchVal,
    };
    cloudsearch(data).then((res): void => {
      console.log(res);
      if (res.status == 200) {
        this.searchRes = (res as any).data.result.songs;
      }
    });
  }
}
</script>

<style lang="less" scoped>
.Search {
  width: 100%;
  // 搜索
  .searchInputBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding: 2px 5px;
    background: linear-gradient(to right, #34a8aa, #009697);
    .searchInput {
      height: 100%;
    }
    /deep/ #input-form {
      height: 100%;
    }
  }
  .searchResTitle {
    font-size: 15px;
    color: #333;
    margin-top: 50px;
    box-sizing: border-box;
    padding: 0 10px;
    font-weight: bold;
  }
  .searchResList {
    box-sizing: border-box;
    padding: 0 10px 10px;
    .ListItem {
      margin-top: 15px;
      .songName {
        font-size: 14px;
        color: #34a8aade;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .arName {
        font-size: 13px;
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 2px;
      }
    }
  }
}
</style>