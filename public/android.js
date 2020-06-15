// 打开摄像头
function DKSXT() {
  console.log("openCamera");
  window.android.openCamera();
  return "openCamera";
}
// 关闭摄像头
function GBSXT() {
  console.log("closeCamera");
  window.android.closeCamera();
  return "closeCamera";
}
// 调用安卓传图片方法
function getAndroidImg() {
  console.log("getAndroidImg");
  window.android.getBaseImg();
  return globalConfig.img;
}

export { DKSXT, GBSXT, getAndroidImg };
