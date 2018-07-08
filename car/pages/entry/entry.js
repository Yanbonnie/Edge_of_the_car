// pages/entry/entry.js
const app = getApp();
const { globalData: { REQUEST}} = app;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasUserInfo:true,
        comfrom:'',
        staff_openid:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let openid = wx.getStorageSync('openid');
        const { comfrom, staff_openid } = options;
        if (comfrom){
            this.setData({
                comfrom,
                staff_openid
            })
        }        
        app.globalData.openid = openid;
        if(openid){
            setTimeout(()=>{
                if (comfrom == 1) {
                    wx.reLaunch({
                        url: `/pages/card/card?staff_openid=${staff_openid}`,
                    })
                } else if (comfrom == 2) {
                    wx.reLaunch({
                        url: `/pages/chat/chat?staff_openid=${staff_openid}`,
                    })
                } else {
                    wx.reLaunch({
                        url: '/pages/index/index',
                    })
                } 
            }, 200)
            return;
        }
        this.getUserInfo().then(res=>{   //判断授权按钮是否显示
            if(!res.success){
                this.setData({
                    hasUserInfo:false
                })
            }
        })
        if(app.globalData.userInfo) {
            this.loginHandle(app.globalData.userInfo);          
        } else {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                if(res.userInfo) {
                    this.loginHandle(res)
                }
            }
        }

    },
    bindGetuserinfo: function (e) {  //没有授权的时候进入页面
        if (e.detail.userInfo) {
            // const { iv, encryptedData } = e.detail.userInfo;
            this.setData({
                hasUserInfo:true
            })
            this.loginHandle(e.detail)
            //用户按了允许授权按钮
        } else {
            //用户按了拒绝按钮
            console.log("点击了拒绝授权按钮")
        }
    },
    //登录获取code
    loginHandle({ iv, encryptedData}) {
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                const { code } = res;
                this.getAllUserInfo(code, iv, encryptedData)
            }
        })
    },
    //获取用户信息
    getUserInfo() { 
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                success: res => {
                    resolve({ success: true })
                },
                fail: res => {
                    resolve({ success: false })
                }
            })
        })
    },
    //获取用户的全部信息
    getAllUserInfo(code, iv, encryptedData) {
        const { key } = app.globalData;
        REQUEST('GET', 'userLogin',{
            code,
            iv,
            encryptedData,
            key
        },true).then(res=>{  //成功
            wx.setStorageSync('openid', res.data.openid);
            app.globalData.openid = res.data.openid;
            const { comfrom, staff_openid} = this.data;
            setTimeout(() => {
                if (comfrom == 1) {
                    wx.reLaunch({
                        url: `/pages/card/card?staff_openid=${staff_openid}`,
                    })
                } else if (comfrom == 2) {
                    wx.reLaunch({
                        url: `/pages/chat/chat?staff_openid=${staff_openid}`,
                    })
                } else {
                    wx.reLaunch({
                        url: '/pages/index/index',
                    })
                }
            }, 200)
        }).catch(res=>{   //失败
            wx.showModal({
                title: '',
                content: '登录失败，请重新登录',
                showCancel: false,
                confirmText: '确定',
                success: res => {
                    this.loginHandle(app.globalData.userInfo);
                }
            })
        })
    }
})