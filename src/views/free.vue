<template>
  <div class="free">
    <header class="header">
      <div class="logo-left">
        <img :src="logo" alt="" />
      </div>
      <article class="date-right">
        <div class="time">
          {{ date.hour }}
          <div class="dot"><span v-show="showDot">:</span></div>
          {{ date.minute }}
        </div>
        <Divider type="vertical" />
        <div class="date">
          <div class="day">{{ date.day }}</div>
          <div class="week">{{ date.week }}</div>
        </div>
      </article>
    </header>
    <main class="main" v-if="$store.state.mediationRoomInfo">
      <div class="content" id="content">
        <span
          class="rotateText"
          v-for="(item, index) in $store.state.textList"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <div
        class="nextMediation"
        v-show="$store.state.mediationRoomInfo.recentMediationList[0]"
      >
        <div class="left arrow"></div>
        <div class="right">
          <div class="key">
            <p class="nextName">下一场</p>
            <p>
              {{
                $store.state.mediationRoomInfo.recentMediationList[0] &&
                  $store.state.mediationRoomInfo.recentMediationList[0]
                    .sponsorName
              }}
            </p>
          </div>
          <div class="value">
            <p>
              {{
                $store.state.mediationRoomInfo.recentMediationList[0] &&
                  $store.state.mediationRoomInfo.recentMediationList[0]
                    .startTime | filter()
              }}&nbsp;-&nbsp;{{
                $store.state.mediationRoomInfo.recentMediationList[0] &&
                  $store.state.mediationRoomInfo.recentMediationList[0].endTime
                    | filter()
              }}
            </p>
            <p>
              {{
                $store.state.mediationRoomInfo.recentMediationList[0] &&
                  $store.state.mediationRoomInfo.recentMediationList[0].ah
              }}
            </p>
          </div>
        </div>
      </div>
    </main>
    <footer class="footer">©&nbsp;百智诚远</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("@/assets/img/logo_free.png"),
      date: {
        hour: "",
        minute: "",
        week: "",
        day: ""
      },
      showDot: true,
      // 调解室名称
      textList: this.$store.state.textList,
      mediationRoomInfo: this.$store.state.mediationRoomInfo
    };
  },
  created() {},
  filters: {
    filter(value) {
      if (value) {
        value = value.substring(11, 16);
      }

      return value;
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 旋转文字
      this.init();
    });
    // 当前时间定时器
    this.getNowTime();
    this.timeInterval = setInterval(() => {
      this.getNowTime();
      this.showDot = !this.showDot;
    }, 1000);
    // console.log(this.textList);
  },
  methods: {
    // 隔段时间发一次请求
    // sendAxios() {
    //   this.sendInterval = setInterval(() => {
    //     this.$store.dispatch("getData");
    //   }, 5000);
    // },
    // 获取当前时间

    getNowTime() {
      let vm = this;
      var nowLocalTime = Date.parse(new Date());
      var nowTime = new Date(nowLocalTime);
      // var year = nowTime.getFullYear();
      var mounth =
        nowTime.getMonth() + 1 < 10
          ? "0" + (nowTime.getMonth() + 1)
          : nowTime.getMonth() + 1;
      var date =
        nowTime.getDate() < 10 ? "0" + nowTime.getDate() : nowTime.getDate();
      vm.date.day = mounth + "/" + date;
      vm.date.hour =
        nowTime.getHours() < 10 ? "0" + nowTime.getHours() : nowTime.getHours();
      vm.date.minute =
        nowTime.getMinutes() < 10
          ? "0" + nowTime.getMinutes()
          : nowTime.getMinutes();
      // vm.time = hour + ":" + minute;
      if (nowTime.getDay() === 0) {
        vm.date.week = "星期天";
      } else if (nowTime.getDay() === 1) {
        vm.date.week = "星期一";
      } else if (nowTime.getDay() === 2) {
        vm.date.week = "星期二";
      } else if (nowTime.getDay() === 3) {
        vm.date.week = "星期三";
      } else if (nowTime.getDay() === 4) {
        vm.date.week = "星期四";
      } else if (nowTime.getDay() === 5) {
        vm.date.week = "星期五";
      } else if (nowTime.getDay() === 6) {
        vm.date.week = "星期六";
      }
    },
    // 旋转文字
    init() {
      // 获取文字数组
      var boxes = document.getElementsByClassName("rotateText");
      // 起始角度
      // var stard = -(360 / this.textList.length);
      var stard = -10.3 * this.textList.length;
      // 内圈
      Array.prototype.forEach.call(boxes, function(item, index) {
        item.style.left = "47.5vw";
        item.style.top = "33vw";
        item.style.transform = `rotate(${stard +
          25 * index}deg) translate(0,-17vw)`;
      });
    }
  },
  computed: {
    mediation() {
      return this.$store.state.mediationRoomInfo;
    }
  },
  watch: {
    textList(value) {
      this.init();
    }
  },
  destroyed() {
    clearInterval(this.timeInterval);
    console.log();
    // clearInterval(this.$store.state.routerInterval);
  }
};
</script>

<style lang="less" scoped>
.free {
  height: 100vh;
  background: url("../assets/img/background_free.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .header {
    height: 27vh;
    text-align: center;
    padding-top: 8vw;
    .logo-left {
      margin: 0 auto 8vw;
      text-align: center;
      img {
        width: 53vw;
      }
    }
    .date-right {
      height: 4vw;
      display: flex;
      justify-content: center;
      align-items: center;

      .time {
        font-size: 4.444vw;
        line-height: 2.7778vw;
        font-family: "SourceHanSansCN-Light";
        font-size: 6vw;
        line-height: 7vw;
        font-weight: 300;
        letter-spacing: 0vw;
        color: rgba(255, 255, 255, 1);
        .dot {
          display: inline-block;
          width: 1vw;
          text-align: center;
        }
      }

      .ivu-divider {
        height: 5vw;
        margin: 0 3vw;
      }

      .date {
        font-family: "SourceHanSansCN-Light";
        font-size: 2.3vw;
        font-weight: 300;
        line-height: 3vw;
        letter-spacing: 3px;
        color: #ffffff;
      }
    }
  }
  .main {
    height: 70vh;
    padding-top: 12vw;
    .content {
      position: relative;
      width: 99vw;
      height: 68vw;
      margin-bottom: 10vw;
      text-align: center;
      background: url("../assets/img/空闲中.png") no-repeat center;
      background-size: 100% 100%;
      span {
        position: absolute;
        font-family: "SourceHanSansCN-Medium";
        font-size: 5vw;
        font-weight: normal;
        font-stretch: normal;
        line-height: 4vw;
        letter-spacing: 0vw;
        color: rgba(40, 234, 238, 1);
      }
    }
    .nextMediation {
      display: flex;
      justify-content: center;
      align-items: center;
      align-items: stretch;
      height: 14vw;
      background-color: rgba(77, 178, 255, 0.05);
      .left {
        flex: 3.5;
        background: url("../assets/img/02箭头.png") right center no-repeat;
        background-size: 9vw 6vw;
        background-position-x: 85%;
      }
      .right {
        display: flex;
        flex: 5.5;
        justify-content: flex-start;
        align-items: center;
        font-family: "SourceHanSansCN-Regular";
        font-size: 2.5vw;
        font-weight: 300;
        font-stretch: normal;
        line-height: 5vw;
        letter-spacing: 2px;
        color: rgba(255, 255, 255, 1);
        .key {
          // margin-right: 3vw;
          .nextName {
            width: 12vw;
            font-family: "SourceHanSansCN-Medium";
            font-size: 3vw;
            font-weight: 600;
            background: linear-gradient(
              to bottom,
              rgb(255, 255, 255),
              rgb(84, 181, 255)
            );
            background-clip: text;
            color: transparent;
          }
        }
      }
    }
  }
  .footer {
    height: 3vh;
    font-size: 2vw;
    line-height: 3vh;
    text-align: center;
    color: white;
  }
}
</style>
