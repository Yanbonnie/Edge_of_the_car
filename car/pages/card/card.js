// pages/card/card.js
const app = getApp();
const { globalData: { methodsArr, REQUEST, openid,key } } = app;
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
        this.getStaffVisitingCard();
    },
    ...methodsArr,
    //获取卡片信息
    getStaffVisitingCard(){
        const { staff_openid } = this.data;
        REQUEST('GET','getStaffVisitingCard',{
            staff_openid,
            openid:app.globalData.openid,
            key
        }).then(res=>{
            this.setData({
                info: res.staffinfo
            })
        })
    },    
    goIndex() {
        wx.reLaunch({
            url: '/pages/index2/index2',
        })
    },
    goChat(e) {
        const { openid } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/chat/chat?staff_openid=${openid}`,
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