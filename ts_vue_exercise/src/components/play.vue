<template>
  <div class="Play"></div>
</template>

<script lang="ts">
import { musicUrl } from "../assets/tool/port";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Play extends Vue {
  @Prop()
  id!: number;
  musicUrl = {};
  mounted() {
    const data = {
      id: this.id,
      br: 999000
    };
    musicUrl(data).then((res): void => {
      if (res.status == 200) {
        this.musicUrl = res.data;
      }
    });
  }
}
</script>

<style lang="less" scoped>
.Play {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: #1f9e9f;
}
</style>