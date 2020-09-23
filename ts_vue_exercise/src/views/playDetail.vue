<template>
  <!-- 首页 -->
  <div class="playDetail">
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
export default class PlayDetail extends Vue {
}
</script>
<style lang="less" scoped>
.playDetail {
}
</style>
