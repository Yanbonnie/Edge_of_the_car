//app.js
const { methodsArr } = require('./utils/pageCom');
const { REQUEST } = require('./utils/util');
const key = '21ed62ad89c8b67d1a1172d4411a0c21';
App({
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
            this.userInfoReadyCallback({"oppenid":"none"})
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    methodsArr,
    REQUEST,
    key,
    openid:''
  }
})








