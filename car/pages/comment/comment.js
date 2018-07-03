// pages/comment/comment.js
const app = getApp();
const { globalData:{methodsArr,REQUEST,openid,key} } = app;
let keywords = ['服务热情','有责任心','非常专业','回复及时','态度诚恳','有亲和力','很有耐心']; 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: '',
        keyword:[],
        score:'',            //评分
        content:'',          //评价内容
        selectKeyword: [],   //选中的标签
        indexArr: [0, 0, 0, 0, 0, 0],    //控制标签状态
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            info: wx.getStorageSync('staffinfo')
        })
        let keyword = keywords.sort(function () { return 0.5 - Math.random() }).slice(0,5);
        this.setData({
            keyword
        })
    },
    ...methodsArr,
    //用户进行评价的接口
    postEstimate(){
        const staff_openid = this.data.info.openid;
        const { selectKeyword, score, content } = this.data;
        wx.showLoading({
            title: '提交中...',
            icon:'none',
            mask:true
        })
        REQUEST('POST','postEstimate',{
            staff_openid,
            openid:app.globalData.openid,
            score,
            keyword: selectKeyword,
            content,
            key
        }).then(res=>{
            wx.hideLoading();
            //成功回到评价列表页
            wx.navigateBack({
                delta:1
            })
        })
    },
    //选择关键字
    selectKeyword(e) {
        const { text, index } = e.currentTarget.dataset;
        let { selectKeyword } = this.data;
        if (selectKeyword.some(item => item == text)) {  //如果存在已选中
            selectKeyword = selectKeyword.filter(item => item != text);
            let up = "indexArr[" + index + "]";
            this.setData({
                ["indexArr[" + index + "]"]: 0
            })
        } else {
            selectKeyword.push(text);
            this.setData({
                ["indexArr[" + index + "]"]: 1
            })
        }
        this.setData({
            selectKeyword
        })
    },
    //监听textarea输入
    commentEnter(e){
        const { value } = e.detail;
        this.setData({
            content:value
        })
    },
    //点击星级点评
    changeStar(e) {
        const { index } = e.currentTarget.dataset;
        this.setData({
            score: Number(index) + 1
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
    
})