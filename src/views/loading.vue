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
    this.routerInterval = setInterval(() => {
      this.$store.dispatch("getMediation");
    }, 5000);
  },
  mounted() {},
  methods: {
    again() {
      this.$store.dispatch("getMediation");
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
