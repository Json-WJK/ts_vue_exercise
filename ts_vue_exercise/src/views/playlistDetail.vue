<template>
  <!-- 歌单详情  -->
  <div class="playlistDetail">歌单详情</div>
</template>

<script lang="ts">
import { playlistDetail } from "@/assets/tool/port";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class PlaylistDetail extends Vue {
  created() {
    playlistDetail({id: 5219028932}).then((res): void => {
      console.log(res, '歌单详情')
    });
  }
}
</script>
<style lang="less" scoped>
.playlistDetail {
}
</style>
