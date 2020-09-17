<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="less">
@import "assets/css/common.css";

.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease;
}
.fade-leave-to {
  display: none;
}
.fade-enter-active {
  opacity: 1;
  transform: translate(0, 0);
}

.fade-leave-active {
  opacity: 0;
  transform: translate(130%, 0);
}
/* .fade-enter需要放在.fade-enter-active的后面 */
.fade-enter {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
