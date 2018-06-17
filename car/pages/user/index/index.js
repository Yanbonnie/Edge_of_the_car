// pages/user/index/index.js
const app = getApp();
const { globalData: { REQUEST, openid } } = app;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_sign:0,       //是否已注册
        integral:0,      //用户积分 
        name:'',         //员工姓名 
        headpic:'',      //头像链接 
        popularity:0,    //人气 
        company:'',      //公司
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //获取我的个人用户接口
    getMyInfo(){
        REQUEST('GET','getMyInfo',{
            openid
        }).then(res=>{
            const { is_sign, integral, name, headpic, popularity, company  } = res;
            this.setData({ is_sign, integral, name, headpic, popularity, company } )
        })
    },
    //到达专属顾问页面
    goAdviser(){
        wx.navigateTo({
            url: `/pages/chat_list/chat_list`,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    registerHandle() {
        wx.navigateTo({
            url: '/pages/user/register/register',
        })
    }
})