<template>
  <div class="index">
    <header class="header">
      <Head></Head>
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
        <!-- 调解室信息 -->
        <div class="mediationRoomInfo">
          <div class="roomName">
            <span>{{ $store.state.mediationRoomInfo.roomName }}</span>
          </div>
          <div class="roomContainer">
            <div class="left">
              <div class="user_warp">
                <!-- <img :src="mediationRoomInfo.img" alt="" /> -->
                <img src="../assets/img/头像.png" alt="" />
              </div>
              <p>
                {{
                  $store.state.mediationRoomInfo.recentMediationList[0]
                    .sponsorName
                }}
              </p>
            </div>
            <div class="right">
              <p>
                {{
                  $store.state.mediationRoomInfo.recentMediationList[0].theme
                }}
              </p>
            </div>
          </div>
          <div class="roomFooter">
            {{
              $store.state.mediationRoomInfo.recentMediationList[0].startTime
                | filter()
            }}&nbsp;-&nbsp;{{
              $store.state.mediationRoomInfo.recentMediationList[0].endTime
                | filter()
            }}
          </div>
        </div>
        <!-- 签到按钮 -->
        <div class="btnSigninWarp">
          <button class="signInBtn" @click="goSignIn('in')"></button>
          <button class="signOutBtn" @click="goSignIn('out')"></button>
        </div>
        <!-- 签到信息 -->
        <div class="signContainer">
          <!-- 签到人数 -->
          <div class="signTitle">
            <p>
              已到人员<i></i>(<span class="signNum">{{
                $store.state.mediationRoomInfo.recentMediationList[0].signNum
              }}</span
              >/<span>{{
                $store.state.mediationRoomInfo.recentMediationList[0]
                  .mediationRoleList.length
              }}</span
              >)
            </p>
          </div>
          <!-- 没有签到人员时显示 -->
          <img
            class="signNullImg"
            src="../assets/img/暂无签到人员.png"
            alt=""
            v-show="
              $store.state.mediationRoomInfo.recentMediationList[0]
                .mediationRoleList.length === 0
            "
          />
          <!-- 签到人员列表 -->
          <div class="signList">
            <!-- 签到人员列表 -->
            <div class="signWarp">
              <div
                class="signInfo"
                v-for="(item, index) in $store.state.mediationRoomInfo
                  .recentMediationList[0].mediationRoleList"
                :key="index"
                v-show="item.bsign"
              >
                <!-- <img :src="item.img" alt="" /> -->
                <img src="../assets/img/头像.png" alt="" />

                <p>{{ item.name }}</p>
                <span>{{ item.updateTime | filter() }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="nextMediation"
          v-show="$store.state.mediationRoomInfo.recentMediationList[1]"
        >
          <div class="left arrow"></div>
          <div class="right">
            <div class="key">
              <p class="nextName">下一场</p>
              <p>
                {{
                  $store.state.mediationRoomInfo.recentMediationList[1] &&
                    $store.state.mediationRoomInfo.recentMediationList[1]
                      .sponsorName
                }}
              </p>
            </div>
            <div class="value">
              <p>
                {{
                  $store.state.mediationRoomInfo.recentMediationList[1] &&
                    $store.state.mediationRoomInfo.recentMediationList[1]
                      .startTime | filter()
                }}&nbsp;-&nbsp;{{
                  $store.state.mediationRoomInfo.recentMediationList[1] &&
                    $store.state.mediationRoomInfo.recentMediationList[1]
                      .endTime | filter()
                }}
              </p>
              <p>
                {{
                  $store.state.mediationRoomInfo.recentMediationList[1] &&
                    $store.state.mediationRoomInfo.recentMediationList[1].ah
                }}
              </p>
            </div>
          </div>
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
      // 页面状态标识
      // showImg: this.$store.state.roomStatus,
      // 调解室信息
      mediationRoomInfo: this.$store.state.mediationRoomInfo
    };
  },
  created() {},
  mounted() {
    var url = window.location.search.substring(1); // 获取url中"?"符后的字串
    window.localStorage.setItem("num", url);
  },
  filters: {
    filter(value) {
      if (value) {
        value = value.substring(11, 16);
      }

      return value;
    }
  },
  methods: {
    // 进入签到页
    goSignIn(item) {
      if (item === "in") {
        this.$store.state.signInState = 0;
      } else {
        this.$store.state.signInState = 1;
      }
      this.$router.push("/register");
      // console.log(this.$store.state.signInState)
    }
  }
  // computed: {
  //   mediation() {
  //     return this.$store.state.mediationRoomInfo;
  //   }
  // },
  // destroyed() {
  //   // console.log("clearIndex")
  //   // clearInterval(this.$store.state.routerInterval);
  // },
  // watch: {
  //   mediation(value) {
  //     if (value.recentMediationList.length > 0) {
  //       if (value.recentMediationList[0].status === 2) {
  //         this.$router.push("/free");
  //       } else {
  //         this.$router.push("/index");
  //       }
  //     } else {
  //       this.$router.push("/free");
  //     }
  //   }
  // }
};
</script>

<style lang="less">
.index {
  max-height: 100vh;
  background: url("../assets/img/background_img.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;

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
      .titleImg {
        height: 10vw;
        background-color: rgba(104, 160, 242, 0.2);
        border-radius: 1vw;
        text-align: center;
        line-height: 14vw;
        img {
          height: 4vw;
        }
      }
      .mediationRoomInfo {
        width: 81vw;
        height: 40vw;
        margin: 6vw auto 4vw;
        background-color: #0d377d;
        border-radius: 1vw;
        border: solid 0vw rgba(120, 170, 227, 1);
        .roomName {
          text-align: right;
          padding-right: 6vw;
          font-family: SourceHanSansCN-Medium;
          font-size: 4vw;
          font-weight: 600;
          font-stretch: normal;
          line-height: 8vw;
          letter-spacing: 5px;
          background: linear-gradient(
            to bottom,
            rgb(169, 253, 233),
            rgb(2, 193, 254)
          );
          background-clip: text;
          color: transparent;
        }
        .roomContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1.5vw 0;
          .left {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            width: 18vw;
            .user_warp {
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              width: 18vw;
              height: 18vw;
              background-image: url("../assets/img/12头像框.png");
              background-size: 100% 100%;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                // background-color: #fff;
              }
            }
            p {
              font-family: "SourceHanSansCN-Regular";
              font-size: 3vw;
              font-weight: 500;
              font-stretch: normal;
              line-height: 5vw;
              letter-spacing: 0vw;
              color: rgba(77, 203, 255, 1);
            }
          }
          .right {
            width: 44vw;
            margin: 0 0 5vw 6vw;
            margin-bottom: 5vw;
            p {
              font-family: "SourceHanSansCN-Regular";
              font-size: 3.5vw;
              font-weight: 300;
              font-stretch: normal;
              line-height: 7vw;
              letter-spacing: 0vw;
              text-align: center;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              display: -webkit-box; //作为弹性伸缩盒子模型显示。
              -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
              -webkit-line-clamp: 2; //显示的行
              color: rgba(255, 255, 255, 1);
            }
          }
        }
        .roomFooter {
          text-align: right;
          padding-right: 6vw;
          font-family: ";SourceHanSansCN-Medium";
          font-size: 3vw;
          line-height: 4vw;
          letter-spacing: 0vw;
          background: linear-gradient(
            to bottom,
            rgb(169, 253, 233),
            rgb(2, 193, 254)
          );
          background-clip: text;
          color: transparent;
        }
      }
      .btnSigninWarp {
        height: 28vw;
        .signInBtn {
          display: block;
          width: 24vw;
          height: 24vw;
          border: none;
          margin: 0 auto;
          background: url("../assets/img/02签到按钮.png");
          background-size: 100% 100%;
        }
        .signOutBtn {
          width: 12vw;
          height: 12vw;
          position: absolute;
          right: 1vw;
          top: 94vw;
          border: none;
          background: url("../assets/img/02签退.png") no-repeat center;
          background-size: 100% 100%;
        }
      }
      .signContainer {
        text-align: center;
        .signTitle {
          text-align: center;
          background: url("../assets/img/01分割线.png") center no-repeat;
          background-size: 100%;
          p {
            font-family: SourceHanSansCN-Regular;
            font-size: 3.2vw;
            font-weight: normal;
            font-stretch: normal;
            line-height: 4vw;
            letter-spacing: 2px;
            background: linear-gradient(
              to bottom,
              rgb(255, 255, 255),
              rgb(77, 173, 255)
            );
            background-clip: text;
            color: transparent;
            .signNum {
              color: rgba(77, 203, 255, 1);
            }
            i {
              margin: 0 0.8vw;
            }
          }
        }
        .signNullImg {
          width: 36vw;
          height: 6vw;
          margin-top: 11vw;
        }
        .signList {
          width: 87vw;
          height: 22vw;
          overflow: scroll;
          .signWarp {
            display: flex;
            width: fit-content;
            justify-content: center;
            align-items: center;

            .signInfo {
              margin: 4vw 2vw;
              img {
                border-radius: 50%;
                width: 10vw;
                height: 10vw;
              }
              p {
                font-family: "SourceHanSansCN-Normal";
                font-size: 2vw;
                line-height: 3vw;
                letter-spacing: 0vw;
                color: rgba(77, 203, 255, 1);
              }
              span {
                font-family: "SourceHanSansCN-Normal";
                font-size: 1.8vw;
                letter-spacing: 0vw;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
      }
      .nextMediation {
        display: flex;
        justify-content: center;
        align-items: center;
        align-items: stretch;
        height: 12vw;
        background-color: rgba(0, 10, 54, 0.2);
        .left {
          flex: 1;
          background: url("../assets/img/02箭头.png") right center no-repeat;
          background-size: 9vw 6vw;
          background-position-x: 90%;
        }
        .right {
          display: flex;
          flex: 1;
          justify-content: flex-start;
          align-items: center;
          font-family: "SourceHanSansCN-Regular";
          font-size: 2.5vw;
          font-style: italic;
          line-height: 4.5vw;
          letter-spacing: 0vw;
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
  }
  .footer {
    height: 3vh;
    font-size: 2vw;
    line-height: 3vh;
    text-align: center;
    color: white;
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>
