<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {},
  created() {
    if (this.$router.path !== "/" || this.$router.path !== "/register") {
      this.$router.replace("/");
    }
  },
  methods: {}
};
</script>
<style lang="less">
html,
body {
  height: 100%;
  margin: 0;
  overflow-x: auto;
  font-family: "SourceHanSansSC-Regular" !important;
}

#app {
  font-family: "SourceHanSanSC-Regular" !important;
  width: 100vw;
  height: 100vh;
}
</style>
