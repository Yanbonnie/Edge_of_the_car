// pages/chat/chat.js
const app = getApp();
const { globalData: { methodsArr, REQUEST, openid} } = app;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: "",
        dialogue:[],             //聊天记录
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
    //获取详情页面
    getStaffDetails(){
        const { staff_openid } = this.data;
        REQUEST('GET','getStaffDetails',{
            openid,
            staff_openid,
        }).then(res=>{
            this.setData({
                info: res.staffinfo,
                dialogue:res.dialogue
            })
        })
    },
    //到达评论列表页面
    commentHandle() {
        wx.navigateTo({
            url: '/pages/comment_list/comment_list',
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