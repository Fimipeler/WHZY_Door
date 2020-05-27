import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 页面状态
    // status: 2, // 会议的状态 0(进行中) 1(等待中)  2(空闲中)  3(完成)
    // 签到0或者签退1
    signInState: 0,
    // 调解室信息
    mediationRoomInfo: [
      {
        id: 2,
        roomId: 1,
        roomName: "",
        sponsorId: 1,
        sponsorName: "",
        status: 1,
        theme: "",
        ah: "",
        meetType: 0,
        mediationRoleList: [],
        startTime: "2020-05-25 10:24:09",
        endTime: "2020-05-25 10:24:15",
        dateTime: "2020-05-25 00:00:00"
      },
      {
        id: 1,
        roomId: 1,
        roomName: "",
        sponsorId: 1,
        sponsorName: "",
        status: 2,
        theme: "",
        ah: "",
        meetType: 0,
        mediationRoleList: [
          { id: 1, name: "马化腾", bsign: false, bsponsor: false },
          { id: 2, name: "马云", bsign: false, bsponsor: false },
          { id: 3, name: "123", bsign: false, bsponsor: true }
        ],
        startTime: "2020-05-25 18:40:00",
        endTime: "2020-05-25 18:50:00",
        dateTime: "2020-05-25 00:00:00"
      }
    ],
    textList: [],
    // 签到人员列表
    signList: [
      // {
      //   img: require("../assets/img/头像.png"),
      //   name: "张三丰",
      //   time: "18:12"
      // },
      // {
      //   img: require("../assets/img/头像.png"),
      //   name: "张三丰",
      //   time: "18:12"
      // },
      // {
      //   img: require("../assets/img/头像.png"),
      //   name: "张三丰",
      //   time: "18:12"
      // },
      // {
      //   img: require("../assets/img/头像.png"),
      //   name: "张三丰",
      //   time: "18:12"
      // },
      // {
      //   img: require("../assets/img/头像.png"),
      //   name: "张三丰",
      //   time: "18:12"
      // },
      // {
      //   img: require("../assets/img/头像.png"),
      //   name: "张三丰",
      //   time: "18:12"
      // },
      // {
      //   img: require("../assets/img/头像.png"),
      //   name: "张三丰",
      //   time: "18:12"
      // },
      // {
      //   img: require("../assets/img/头像.png"),
      //   name: "张三丰",
      //   time: "18:12"
      // },
      // {
      //   img: require("../assets/img/头像.png"),
      //   name: "张三丰",
      //   time: "18:12"
      // }
    ],
    routerInterval: ""
  },
  mutations: {
    // getData(state, res) {
    //   //   // 类型=1的时候 跳转文本新闻
    //   //   if (res.data.news.type === 1) {
    //   //     // router.push(state.homePage);
    //   //   }
    //   //   // 类型=2的时候 跳转视频新闻
    //   //   else if (res.data.news.type === 2) {
    //   //     // router.push(state.homePage);
    //   //   }
    //   //   // 其他类型的时候 跳转开庭排期
    //   //   else {
    //   //     // router.push("InSessionScheduling");
    //   //   }
    // },
    getMediation(state, res) {
      state.mediationRoomInfo = res;
      state.textList = res.roomName.split("");
      // console.log(state.textList);
      // if (res.recentMediationList.length > 0) {
      //   if (res.recentMediationList[0].status === 2) {
      //     router.push("/free");
      //   } else {
      //     router.push("/index");
      //   }
      // } else {
      //   router.push("/free");
      // }
    }
  },
  actions: {
    // getData(context) {
    //   // 配置修改请求num号
    //   Axios.get(`/equip?num=${globalConfig.num}`)
    //     .then(res => {
    //       if (res.status === 200) {
    //         context.commit("getData", res.data);
    //         // console.log(res.data)
    //       } else {
    //         console.log("请求状态失败");
    //       }
    //     })
    //     .catch(err => {
    //       // 请求不成功则进入catch
    //       router.push("index");
    //       console.log(err);
    //     });
    //   // console.log(data, 111)
    // },
    async getMediation(context) {
      await Axios.post("/client/mediation/queryRecentMediation", {
        roomNum: window.location.search.substring(1)
      })
        .then(res => {
          if (res.status === 200) {
            context.commit("getMediation", res.data.data);
            // console.log(res.data.data);
          } else {
            console.log("请求状态失败");
            console.log(res.data.msg);
          }
        })
        .catch(err => {
          // 请求不成功则进入catch
          router.push("/");
          console.log(err);
        });
    }
  },
  modules: {}
});
