<template>
  <div id="loading">
    <header class="header">
      <Head></Head>
    </header>
    <section>
      <img src="../assets/img/数据加载失败.png" alt="" @click="again" />
    </section>
  </div>
</template>

<script>
import Head from "@/views/common/head";
export default {
  components: {
    Head
  },
  created() {
    clearInterval(this.$store.state.routerInterval);
    this.$store.dispatch("getMediation");
  },
  mounted() {
    this.$store.state.routerInterval = setInterval(() => {
      this.$store.dispatch("getMediation");
    }, 5000);
  },
  methods: {
    again() {
      let timeout = "";
      clearTimeout(timeout);
      this.$loading.show();
      timeout = setTimeout(() => {
        this.$loading.hide();
        this.$store.dispatch("getMediation");
      }, 3000);
    }
  },
  computed: {
    mediation() {
      return this.$store.state.mediationRoomInfo;
    }
  },
  watch: {
    mediation: {
      handler(newValue, oldValue) {
        console.log("loading");
        if (newValue.recentMediationList.length > 0) {
          if (newValue.recentMediationList[0].status === 2) {
            this.$router.push("/free");
          } else {
            this.$router.push("/index");
          }
        } else {
          this.$router.push("/free");
        }
      },
      // immediate: true,
      deep: true
    }
  },
  destroyed() {
    this.$loading.hide();
  }
};
</script>
<style lang="less">
#loading {
  height: 100vh;
  max-height: 100vh;
  background: url("../assets/img/background_img.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  section {
    text-align: center;
    img {
      margin-top: 5vw;
      width: 90vw;
      height: 88vh;
    }
  }
}
</style>
