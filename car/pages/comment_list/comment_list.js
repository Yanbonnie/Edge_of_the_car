// pages/comment_list/comment_list.js
const app = getApp();
const { methodsArr } = app.globalData;
import { commentList } from '../../utils/data.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: '',
        commentList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            info: wx.getStorageSync('info')
        })
        let list = commentList.sort((a,b)=>{
            return Math.random() * a.start > Math.random()*b.start
        })
        this.setData({
            commentList:list
        });
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
    ...methodsArr,
    sendComment() {
        wx.navigateTo({
            url: '/pages/comment/comment',
        })
    }
})