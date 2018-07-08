// pages/chat/chat.js
const app = getApp();
const { globalData: { methodsArr, REQUEST, openid,key} } = app;
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
        // this.getStaffDetails();
    },
    ...methodsArr,
    //获取详情页面
    getStaffDetails(){
        const { staff_openid } = this.data;
        REQUEST('GET','getStaffDetails',{
            openid:app.globalData.openid,
            staff_openid,
            key
        }).then(res=>{
            this.setData({
                info: res.staffinfo,
                dialogue:res.dialogue
            })
        })
    },
    //到达评论列表页面
    commentHandle(e) {
        const { openid } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/comment_list/comment_list?staff_openid=${openid}`,
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
        const { staff_openid } = this.data;
        console.log(`/page/entry/entry?staff_openid=${staff_openid}&comfrom=2`)
        return {
            title: '哇这个给马云修车的帅哥火了月入几十万',
            path: `/pages/entry/entry?staff_openid=${staff_openid}&comfrom=2`
        }
    }
})