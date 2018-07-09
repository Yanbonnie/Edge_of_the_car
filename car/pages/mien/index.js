// pages/index2/index2.js.js
const app = getApp();
const { globalData: { REQUEST, key } } = app;
import { methodsArr} from '../../utils/pageCom.js';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        staffinfo: [],  //员工列表
        page1:1,         //员工列表翻页
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getStaff(4);
    },
    //获取员工列表
    getStaff(e){
        wx.showLoading({
            title: '加载中...',
        })
        REQUEST('GET','getStaff',{
            openid: app.globalData.openid,
            type: 4,
            page:this.data.page1,
            key
        }).then(res=>{
            wx.hideLoading();
            const staffinfo = res.data;
            this.setData({
                staffinfo
            })
        })
    },
    bindscrolltolower(){
        
    },
    //到达聊天页面
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
})