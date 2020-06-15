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
  methods: {},
  computed: {
    mediation() {
      return this.$store.state.mediationRoomInfo;
    }
  },
  watch: {
    mediation: {
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          console.log("Watch");
          if (newValue.recentMediationList.length > 0) {
            if (newValue.recentMediationList[0].status === 2) {
              this.$router.push("/free");
            } else {
              this.$router.push("/index");
            }
          } else {
            this.$router.push("/free");
          }
        }
      },
      // immediate: true,
      deep: true
    }
  }
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
