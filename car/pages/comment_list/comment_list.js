// pages/comment_list/comment_list.js
const app = getApp();
const { globalData:{methodsArr,REQUEST,openid,key} } = app;
import { commentList } from '../../utils/data.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: '',           //员工信息
        keyword:[],         //评价关键字数组
        estimate:[],        //评价分数详情数据
        commentList: [],
        staff_openid:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(123)
        const { staff_openid } = options;
        this.setData({
            // info: wx.getStorageSync('info')
            staff_openid
        })
        /*let list = commentList.sort((a,b)=>{
            return Math.random() * a.start > Math.random()*b.start
        })
        this.setData({
            commentList:list
        });*/
        this.getStaffEstimate();
    },
    onShow: function (options){
        console.log(options)
        this.getStaffEstimate();
        console.log(456)
    },
    ...methodsArr,
    getStaffEstimate(){
        const { staff_openid } = this.data;
        REQUEST('GET','getStaffEstimate',{
            staff_openid,
            openid:app.globalData.openid,
            key
        }).then(res=>{
            this.setData({
                info: res.staffinfo,
                estimate: res.estimate,
                keyword: res.keyword
            })
        })
    },
    sendComment() {
        const { info } = this.data;
        wx.setStorageSync('staffinfo', info)
        wx.navigateTo({
            url: '/pages/comment/comment',
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