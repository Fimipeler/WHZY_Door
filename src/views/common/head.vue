<template>
  <div class="component-head">
    <header>
      <a href="/" class="logo-left">
        <img :src="logo" alt="" />
      </a>
      <article class="date-right">
        <div class="time">{{ time }}</div>
        <Divider type="vertical" />
        <div class="date">
          <div class="day">{{ date }}</div>
          <div class="week">{{ week }}</div>
        </div>
      </article>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logo: require("@/assets/img/logo.png"),
      date: "",
      time: "",
      week: ""
    };
  },
  mounted() {
    // 当前时间定时器
    this.getNowTime();
    setInterval(() => {
      this.getNowTime();
    }, 1000);
  },
  methods: {
    // 获取当前时间
    getNowTime() {
      let vm = this;
      var nowLocalTime = Date.parse(new Date());
      var nowTime = new Date(nowLocalTime);
      var year = nowTime.getFullYear();
      var mounth =
        nowTime.getMonth() + 1 < 10
          ? "0" + (nowTime.getMonth() + 1)
          : nowTime.getMonth() + 1;
      var date =
        nowTime.getDate() < 10 ? "0" + nowTime.getDate() : nowTime.getDate();
      vm.date = mounth + "/" + date;
      var hour =
        nowTime.getHours() < 10 ? "0" + nowTime.getHours() : nowTime.getHours();
      var minute =
        nowTime.getMinutes() < 10
          ? "0" + nowTime.getMinutes()
          : nowTime.getMinutes();
      vm.time = hour + ":" + minute;
      if (nowTime.getDay() === 0) {
        vm.week = "星期天";
      } else if (nowTime.getDay() === 1) {
        vm.week = "星期一";
      } else if (nowTime.getDay() === 2) {
        vm.week = "星期二";
      } else if (nowTime.getDay() === 3) {
        vm.week = "星期三";
      } else if (nowTime.getDay() === 4) {
        vm.week = "星期四";
      } else if (nowTime.getDay() === 5) {
        vm.week = "星期五";
      } else if (nowTime.getDay() === 6) {
        vm.week = "星期六";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.component-head {
  header {
    position: relative;
    font-family: "SourceHanSansCN-Regular";
    height: 13vw;
    .logo-left {
      position: absolute;
      top: 5vw;
      left: 3vw;
      img {
        width: 61vw;
      }
    }

    .date-right {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 5vw;
      right: 3vw;

      .time {
        font-size: 4.444vw;
        line-height: 2.7778vw;
        font-family: "SourceHanSansCN-Light";
        font-size: 6vw;
        line-height: 7vw;
        font-weight: 300;
        letter-spacing: 0vw;
        color: rgba(255, 255, 255, 1);
      }

      .ivu-divider {
        height: 5vw;
        margin: 0 1.76vw 0 2.2222vw;
      }

      .date {
        font-family: "SourceHanSansCN-Light";
        font-size: 2vw;
        font-weight: 300;
        line-height: 3vw;
        letter-spacing: 2px;
        color: #ffffff;
      }
    }
  }
}
</style>
