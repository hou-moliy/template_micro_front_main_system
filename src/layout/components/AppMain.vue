<template>
  <section class="app-main"
           id="microApp">
    <!-- <transition name="fade-transform"
                mode="out-in"> -->
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
    <!-- </transition> -->
    <!-- 挂在子应用 -->
    <section id="Appmicro" />
  </section>
</template>

<script>
// 注入基座配置
import startQiankun from "@/qiankunStart";
export default {
  name: "AppMain",
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews;
    },
    key () {
      return this.$route.path;
    },
  },
  mounted () {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      startQiankun({
        sandbox: { experimentalStyleIsolation: true },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
