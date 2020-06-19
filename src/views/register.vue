<template>
  <div class="register">
    <header class="header">
      <Head ref="Head"></Head>
    </header>
    <main class="main" v-if="$store.state.mediationRoomInfo">
      <section>
        <!-- 头部页面标识  -->
        <div class="titleImg">
          <!-- 1- > 等待中 -->
          <img
            src="../assets/img/计时沙漏.png"
            alt=""
            v-show="
              $store.state.mediationRoomInfo.recentMediationList[0].status === 1
            "
          />
          <!--   0-> 进行中 -->
          <img
            src="../assets/img/时钟.png"
            alt=""
            v-show="
              $store.state.mediationRoomInfo.recentMediationList[0].status === 0
            "
          />
        </div>
        <h1>{{ mediationName }}</h1>
        <!-- 人脸识别 -->
        <div class="content">
          <canvas id="canv" style="position: absolute; z-index: -1;"></canvas>
          <div class="baseBox">
            <div class="video-box">
              <!-- <video id="video" autoplay loop preload></video> -->
            </div>
          </div>
        </div>
        <div class="signState">
          <!-- 识别成功的勾勾 -->
          <!-- <img
            src="../assets/img/03成功icon.png"
            alt=""
            class="successIcon"
            v-show="signSuccess"
          /> -->
          <!-- 身份识别中 -->
          <p v-show="message === 1">身份识别中。。。</p>
          <p v-show="message === 2">人脸识别成功！</p>
          <p v-show="message === 3">人脸识别失败！</p>
          <p v-show="message === 4">签到成功！</p>
          <p v-show="message === 5">签到失败！</p>
          <p v-show="message === 6">签退成功！</p>
          <p v-show="message === 7">签退失败！</p>
          <!-- <img
            src="../assets/img/身份识别中.png"
            alt=""
            v-show="!signSuccess && !lsb"
          /> -->
          <!-- 签到识别成功 -->
          <!-- <img
            src="../assets/img/身份识别成功.png"
            alt=""
            v-show="signInState === 0 && signSuccess"
          /> -->
          <!-- <img
            src="../assets/img/会议结束.png"
            alt=""
            v-show="signInState === 1 && signSuccess"
          /> -->
          <!-- <img src="../assets/img/身份识别失败.png" alt="" v-show="lsb" /> -->
        </div>
        <div class="backWarp">
          <div class="reBackIndex" @click="$router.push('/loading')"></div>
        </div>
      </section>
    </main>
    <footer class="footer">©&nbsp;百智诚远</footer>
    <!-- <OverTime></OverTime> -->
    <!-- <img id="showImg" :src="img_base" alt="" /> -->
  </div>
</template>
<script>
import Head from "@/views/common/head";
// import OverTime from "@/views/common/OverTime";
import { GBSXT, getAndroidImg } from "../../public/android.js";
export default {
  components: {
    Head
  },
  data() {
    return {
      // 功能室名称
      mediationName: this.$store.state.mediationRoomInfo.roomName,
      // 人脸识别定时器
      GetBase: "",
      // 当前签到人员
      userName: "",
      // 识别状态
      signSuccess: false,
      lsb: false,
      // 签到或者签退
      signInState: this.$store.state.signInState,
      img_base: globalConfig.img,
      statue: false,
      message: 1
    };
  },
  created() {
    // 开启摄像头
    // this.openNavgate();
    // this.Upimg();
  },
  mounted() {
    // 清楚定时器
    clearInterval(this.$store.state.routerInterval);
    // 开启摄像头
    // this.openNavgate();
    this.$nextTick(() => {
      console.log(111);
      // this.openNavgate();
      this.Upimg();
    });
  },
  methods: {
    // 开启PC端摄像头
    openNavgate() {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      getUserMedia.call(
        navigator,
        {
          video: {
            width: 720,
            height: 720
          },
          audio: false
        },
        function(localMediaStream) {
          var video = document.getElementById("video");
          video.srcObject = localMediaStream;
          video.onloadedmetadata = function(e) {
            // console.log("Label: " + localMediaStream.id);
            // console.log("AudioTracks", localMediaStream.getAudioTracks());
            // console.log("VideoTracks ", localMediaStream.getVideoTracks());
          };
        },
        function(e) {
          console.log("Reeeejected!", e);
        }
      );
    }, // 人脸识别并上传Base64
    Upimg() {
      let _this = this;
      // const ip = "192.168.0.120";
      // 请求人脸接口 每3s请求一次
      _this.GetBase = setInterval(() => {
        GetBase64();
      }, 3000);
      // var ArrayBase64 = []; // 人脸获取集合
      async function GetBase64() {
        // var canvas = document.createElement("canvas"); // 创建canvas元素
        // var video = document.getElementById("video"); // 获取video元素
        // var width = video.videoWidth; // 确保canvas的尺寸与图片一样
        // var height = video.videoHeight;
        // canvas.width = width;
        // canvas.height = height;
        // canvas.getContext("2d").drawImage(video, 0, 0, width, height); // 将图片绘制到canvas中
        // var base64 = await canvas.toDataURL("image/jpeg");
        // var param = base64.split(",")[1];
        // var newBase64 = "data:image/png;base64," + param;
        // var newBase64 = param;
        // ArrayBase64.push(newBase64);
        // var imgBase64 = ArrayBase64.pop();
        // console.log("imgBase64");

        // 调用安卓方法
        _this.img_base = getAndroidImg();
        console.log(_this.img_base);
        if (!_this.statue) {
          // let data = { pageNo: "1", pageSize: "20", base64: imgBase64 };
          let data = { pageNo: "1", pageSize: "20", base64: _this.img_base };
          await _this.$axios
            .post(`/interface/rlsb`, data)
            .then(res => {
              if (res.data.code === 200) {
                if (_this.$router.currentRoute.path === "/register") {
                  console.log("识别成功!");
                  _this.message = 2;
                  _this.userName = res.data.data.list[0].faceInfo.name;
                  // 判断是签到 还是 签退
                  if (_this.signInState === 0) {
                    // 签到
                    _this.roomSignIn(_this.userName);
                  } else {
                    // 签退
                    _this.roomSignOut(_this.userName);
                  }
                }
              } else {
                console.log(res.data.msg);
                _this.message = 3;
              }
            })
            .catch(error => {
              _this.message = 3;
              console.log("匹配请求失败", error);
            });
        }
      }
    },
    // 签到
    async roomSignIn(userName) {
      console.log("签到");
      let _this = this;
      await _this.$axios
        .post("/client/mediation/signIn", {
          mediationId: this.$store.state.mediationRoomInfo
            .recentMediationList[0].id,
          signInName: userName
        })
        .then(res => {
          if (res.data.code === 200) {
            _this.message = 6;
            _this.statue = true;
            // 识别成功显示成功标识
            setTimeout(() => {
              // 跳转主页
              _this.$router.push("/loading");
            }, 3000);
          } else {
            console.log(res.data.msg);
            _this.message = 7;
          }
        })
        .catch(err => {
          // 请求不成功则进入catch
          console.log(err);
          _this.message = 7;
        });
    },
    // 签退
    async roomSignOut(userName) {
      console.log("签退");
      let _this = this;
      // 获取当前场与下一场会议的ID
      let recentMediationList = [];
      _this.$store.state.mediationRoomInfo.recentMediationList.forEach(item => {
        recentMediationList.push(item.id);
      });
      await _this.$axios
        .post("/client/mediation/signOut", {
          mediationIds: recentMediationList,
          signOutName: userName
        })
        .then(res => {
          if (res.data.code === 200) {
            _this.message = "签到成功";
            _this.statue = true;
            setTimeout(() => {
              // 跳转主页
              _this.$router.push("/loading");
            }, 3000);
          } else {
            console.log(res.data.msg);
            _this.message = res.data.msg;
          }
        })
        .catch(err => {
          // 请求不成功则进入catch
          console.log(err);
          _this.message = "签退失败";
        });
    }
  },
  watch: {
    img_base: function(newValue, oldValue) {
      console.log(newValue);
      this.img_base = newValue;
    }
  },
  destroyed() {
    clearInterval(this.GetBase);
    // clearInterval(this.$store.state.routerInterval);
    // console.log("destroyed", this.GetBase);
    GBSXT();
  }
};
</script>
<style lang="less">
.register {
  width: 100vw;
  height: 100vh;
  background: url("../assets/img/background_img.png") no-repeat;
  background-size: 100% 100%;
  .header {
    height: 15vh;
    text-align: center;
  }
  .main {
    height: 82vh;
    padding: 0 5vw;
    section {
      height: 135vw;
      padding: 1vw;
      background: url("../assets/img/01框.png");
      background-size: 100% 100%;
      text-align: center;
      .titleImg {
        height: 10vw;
        background-color: rgba(104, 160, 242, 0.2);
        border-radius: 1vw;
        line-height: 14vw;
        img {
          height: 4vw;
        }
      }
      h1 {
        font-family: "SourceHanSansCN-Medium";
        font-size: 4.5vw;
        font-weight: 600;
        font-stretch: normal;
        line-height: 12vw;
        letter-spacing: 5px;
        background: linear-gradient(
          to bottom,
          rgb(169, 253, 233),
          rgb(2, 193, 254)
        );
        background-clip: text;
        color: transparent;
      }
      .video-box {
        width: 81vw;
        height: 84vw;
        overflow: hidden;
        margin: 0 auto;
        border-radius: 1.5vw;
        // background-color: rgba(104, 160, 242, 0.2);
        #video {
          width: 84vw;
          height: 84vw;
          margin-left: 50%;
          transform: translateX(-50%);
        }
        img {
          width: 84vw;
          height: 84vw;
          margin-left: 50%;
          transform: translateX(-50%);
        }
      }
      .signState {
        position: relative;
        text-align: center;
        .successIcon {
          width: 20vw;
          height: 20vw;
          margin: 0;
          position: absolute;
          top: 0;
          left: 50%;
          -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, -50%);
        }
        p {
          font-size: 4vw;
          margin-top: 10vw;
          background: linear-gradient(
            to bottom,
            rgb(169, 253, 233),
            rgb(2, 193, 254)
          );
          background-clip: text;
          color: transparent;
        }
      }
      .backWarp {
        .reBackIndex {
          margin: 3vw auto 0;
          width: 20vw;
          height: 6vw;
          background: url("../assets/img/返回按钮.png") no-repeat;
          background-size: 20vw 6vw;
          cursor: pointer;
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
  #showImg {
    position: absolute;
    bottom: 10px;
    right: 20px;
    width: 10vh;
    height: 10vh;
  }
}
</style>
