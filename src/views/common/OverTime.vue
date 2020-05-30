<template>
  <div class="overTime">
    <el-dialog
      title="超时提示"
      :visible.sync="timeDialogTableVisible"
      @open="openDialog"
      @close="closeDialog"
    >
      <div class="pop-content">
        <div class="title">超时提示</div>
        <div class="remark">为了保护您的个人隐私</div>
        <div class="overTime">
          将在
          <div class="time">{{ countTime }}</div>
          秒后返回
          <div class="home">首页</div>
        </div>
      </div>
      <div class="cancel" @click="toCanceBtn">
        <div class="cancelBtn">继续使用</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeDialogTableVisible: false,
      timers: null,
      countTime: 0,
      countDownTime: 0,
      downTimer: ""
    };
  },
  computed: {},
  watch: {
    countTime: function(newValue, oldValue) {
      if (newValue === 0) {
        var that = this;
        clearInterval(this.timers);
        this.timeDialogTableVisible = false;
        setTimeout(() => {
          that.countTime = 0;
          that.$router.push("/");
        }, 200);
      }
    }
  },
  methods: {
    // 开启定时器
    openSetTime() {
      // 开启时赋予时间
      this.countTime = 10;
      var that = this;
      if (this.countTime > 0) {
        this.timers = setInterval(() => {
          console.log("定时器执行");
          that.countTime = that.countTime - 1;
        }, 1000);
      } else {
        // 结束时清空时间

        this.countTime = 0;
        console.log("clearTimers");
        clearInterval(this.timers);
        this.timeDialogTableVisible = false;
      }
    },
    openDialog() {
      this.openSetTime();
    },
    closeDialog() {
      this.countDownTime = 0
      clearInterval(this.timers);
      this.timeDialogTableVisible = false;
      this.setTimer();
    },
    toCanceBtn() {
      // this.countTime = 10
      clearInterval(this.timers);
      this.timeDialogTableVisible = false;
      this.setTimer();
    },
    setTimer() {
      clearTimeout(this.downTimer);
      this.downTimer = setTimeout(() => {
        // 调整倒计时时间
        if (this.countDownTime < 30) {
          console.log(this.countDownTime);
          this.countDownTime++;
          this.setTimer();
        } else {
          // 要做的事
          this.timeDialogTableVisible = true;
        }
      }, 1000);
    }
  },
  mounted() {
    this.setTimer();
  },
  destroyed() {
    console.log("1111");
    clearInterval(this.timers);
    clearInterval(this.downTimer);
  }
};
</script>

<style lang="less" scoped>
.overTime {
  /deep/.el-dialog {
    margin-top: 40vh !important;
    margin: 0 auto;
    width: 54vw;
    height: 27vw;
    border-radius: 7px;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      display: flex;
      flex-direction: column;
      background: #fff;
      padding: 0 0;
      width: 54vw;
      height: 27vw;
      border-radius: 10px;
      .pop-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 54vw;
        height: 20vw;
        padding-top: 2vw;
        border-bottom: 1px solid #b5b5b5;
        color: #333333;
        .title,
        .remark {
          display: flex;
          justify-content: center;
        }
        .title {
          font-size: 2.8vw;
        }
        .remark {
          line-height: 2.3vw;
          font-size: 2.3vw;
          margin: 3vw;
        }
        .overTime {
          display: flex;
          font-size: 2.4vw;
          line-height: 2.3vw;
          .time {
            margin: 0 0.5vw;
            color: #1d6fe8;
            font-size: 3.5vw;
            font-weight: 600;
          }
          .home {
            color: #1d6fe8;
            font-size: 3vw;
            margin-left: 0.5vw;
          }
        }
      }
      .cancel {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 7vw;
        .cancelBtn {
          font-size: 2.8vw;
          color: #1d6fe8;
        }
      }
    }
  }
}
</style>
