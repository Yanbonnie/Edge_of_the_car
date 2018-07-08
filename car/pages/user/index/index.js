// pages/user/index/index.js
const app = getApp();
const { globalData: { REQUEST, openid,key } } = app;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_sign:0,       //是否已注册
        integral:0,      //用户积分 
        name:'',     //员工姓名 
        photo:'',       //头像链接 
        popularity:'',    //人气 
        company:'',      //公司
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.getMyInfo();
    },
    onShow(){
        this.getMyInfo();
    },
    //获取我的个人用户接口
    getMyInfo(){
        REQUEST('GET','getMyInfo',{
            openid:app.globalData.openid,
            key
        }).then(res=>{
            const { is_sign} = res;
            let name = '';
            let phot = ''
            if(is_sign == 0){
                this.setData({
                    name:res.info.nickname,
                    photo:res.info.avatar
                })
            }else{
                this.setData({
                    name: res.info.realname,
                    photo: res.info.photo
                })
            }
            const { integral, popularity, company } = res.info;
            this.setData({ is_sign, integral: (integral || integral == 0) ? integral : '', popularity: (popularity || popularity == 0) ? popularity:null, company: company ? company:'' } )
        })
    },
    //到达专属顾问页面
    goAdviser(){
        wx.navigateTo({
            url: '/pages/chat_list/chat_list',
        })
    },
    goMien(){
        wx.navigateTo({
            url: '/pages/mien/index',
        })
    },
    goService(){
        wx.navigateTo({
            url: '/pages/service/service',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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