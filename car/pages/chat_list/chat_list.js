// pages/chat_list/chat_list.js
const app = getApp();
const { globalData: { REQUEST, openid ,key} } = app;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:1,
        list:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getAdvisor();
    },
    getAdvisor(){
        const { page }  = this.data;
        REQUEST('GET','getAdvisor',{
            openid:app.globalData.openid,
            page,
            key
        }).then(res=>{
            this.setData({
                list:res.data
            })
        })
    },
    goChat(e){
        const { staff_openid } = e.currentTarget.dataset;
        REQUEST('GET', 'readMsg',{
            openid:app.globalData.openid,
            staff_openid,
            key
        }).then(res=>{
            wx.navigateTo({
                url: `/pages/chat/chat?staff_openid=${staff_openid}`,
            })
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
})