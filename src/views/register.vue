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
              <video id="video" autoplay></video>
            </div>
          </div>
        </div>
        <div class="signState">
          <!-- 识别成功的勾勾 -->
          <img
            src="../assets/img/03成功icon.png"
            alt=""
            class="successIcon"
            v-show="signSuccess"
          />
          <!-- 身份识别中 -->
          <img
            src="../assets/img/身份识别中.png"
            alt=""
            v-show="!signSuccess"
          />
          <!-- 签到识别成功 -->
          <img
            src="../assets/img/身份识别成功.png"
            alt=""
            v-show="signInState === 0 && signSuccess"
          />
          <img
            src="../assets/img/会议结束.png"
            alt=""
            v-show="signInState === 1 && signSuccess"
          />
        </div>
      </section>
    </main>
    <footer class="footer">©&nbsp;百智诚远</footer>
  </div>
</template>
<script>
import Head from "@/views/common/head";
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
      user: {
        name: "",
        img: "",
        time: ""
      },
      // 识别状态
      signSuccess: false,
      // 签到或者签退
      signInState: this.$store.state.signInState
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
    // this.Upimg();
    if (this.signInState === 0) {
      this.roomSignIn();
      // this.signSuccess = true;
    } else {
      this.roomSignOut();
      // this.signSuccess = true;
    }
    setTimeout(() => {
      this.$router.push("/");
    }, 30000);
  },
  methods: {
    // 开启摄像头
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
    },
    // 人脸识别并上传Base64
    Upimg() {
      const ip = "29500x27y9.picp.vip";
      // 请求人脸接口
      this.GetBase = setInterval(GetBase64, 3000); // 每3s请求一次
      var statue = false;
      let _this = this;
      var ArrayBase64 = []; // 人脸获取集合
      async function GetBase64() {
        var canvas = document.createElement("canvas"); // 创建canvas元素
        var video = document.getElementById("video"); // 获取video元素
        var width = video.videoWidth; // 确保canvas的尺寸与图片一样
        var height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(video, 0, 0, width, height); // 将图片绘制到canvas中
        var base64 = await canvas.toDataURL("image/jpeg");
        var param = base64.split(",")[1];
        // console.log(param);
        var newBase64 = "data:image/png;base64," + param;
        // console.log(newBase64, 'newBase64');

        ArrayBase64.push(newBase64);
        // console.log(ArrayBase64,'ArrayBase64')
        let imgBase64 = ArrayBase64.pop();
        // console.log(imgBase64, "imgBase64");
        if (!statue) {
          statue = true;
          await _this.$axios
            .post("http://" + ip + "/api/Face/Testing/Base64", {
              Base64: imgBase64
            })
            .then(res => {
              if (res.data.status === true) {
                console.log(res.data.msg);
                _this.$axios
                  .post("http://" + ip + "/api/Face/Comparison/Base64", {
                    Base64: imgBase64
                  })
                  .then(res => {
                    if (res.data.status === true) {
                      console.log("登录成功!");
                      console.log(res.data);
                      // 停止人脸识别
                      clearInterval(_this.GetBase);

                      // 判断是签到 还是 签退
                      if (_this.signInState === 0) {
                        // 将当前签到信息存入
                        _this.user.img = imgBase64;
                        _this.user.name = "谢伟";
                        _this.user.time = _this.$refs.Head.time;
                        // 将当前签到信息写入签到列表
                        _this.$store.state.signList.push(_this.user);
                        // 延时3秒跳转index界面
                        setTimeout(() => {
                          // 跳转主页
                          _this.$router.push("/index");
                        }, 3000);
                        // 打印成功信息
                        console.log(_this.$store.state.signList);
                      } else {
                        // 初始化签到人员列表
                        _this.$store.state.signList = [];
                        // 延时3秒跳转index界面
                        setTimeout(() => {
                          // 跳转空闲页
                          _this.$router.push("/free");
                        }, 3000);
                      }
                    } else {
                      console.log(res.data.msg);
                    }
                  })
                  .catch(error => {
                    console.log("匹配请求失败", error);
                    return false;
                  });
              } else {
                console.log(res.data.msg);
              }
            })
            .catch(error => {
              console.log("识别请求失败", error);
              return false;
            });
          statue = false;
        }
      }
    },
    // 签到
    roomSignIn() {
      let _this = this;
      _this.$axios
        .post("/client/mediation/signIn", {
          mediationId: this.$store.state.mediationRoomInfo
            .recentMediationList[0].id,
          signInName: "123"
        })
        .then(res => {
          if (res.status === 200) {
            // 识别成功显示成功标识
            _this.signSuccess = true;
            setTimeout(() => {
              // 跳转主页
              _this.$router.push("/loading");
            }, 3000);
          } else {
            console.log("请求状态失败");
            _this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          // 请求不成功则进入catch
          console.log(err);
          return false;
        });
    },
    // 签退
    roomSignOut() {
      let _this = this;
      let recentMediationList = [];
      _this.$store.state.mediationRoomInfo.recentMediationList.forEach(item => {
        recentMediationList.push(item.id);
      });
      _this.$axios
        .post("/client/mediation/signOut", {
          mediationIds: recentMediationList,
          signOutName: "123"
        })
        .then(res => {
          if (res.status === 200) {
            _this.signSuccess = true;
            setTimeout(() => {
              // 跳转主页
              _this.$router.push("/loading");
            }, 3000);
          } else {
            console.log("请求状态失败");
            _this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          // 请求不成功则进入catch
          console.log(err);
          return false;
        });
    }
  },
  destroyed() {
    clearInterval(this.GetBase);
    // clearInterval(this.$store.state.routerInterval);
    // console.log("destroyed", this.GetBase);
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
      height: 131vw;
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
        background-color: rgba(104, 160, 242, 0.2);
        #video {
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
        img {
          height: 4vw;
          margin-top: 10vw;
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
