// pages/card/card.js
const app = getApp();
const { globalData: { methodsArr, REQUEST, openid } } = app;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        info: "",
        staff_openid:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { staff_openid } = options;
        this.setData({
            // info: wx.getStorageSync('info')
            staff_openid            
        })
    },
    ...methodsArr,
    //获取卡片信息
    getStaffVisitingCard(){
        const { staff_openid } = this.data;
        REQUEST('GET','getStaffVisitingCard',{
            staff_openid,
            openid
        }).then(res=>{
            this.setData({
                info:res
            })
        })
    },    
    goIndex() {
        wx.reLaunch({
            url: '/pages/index2/index2',
        })
    },
    goChat() {
        wx.navigateTo({
            url: '/pages/chat/chat',
        })
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

    }
})