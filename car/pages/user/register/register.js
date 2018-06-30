// pages/user/register/register.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        itemList: ["高级技工", "原厂配件", "新车置换", "车主风采"],
        selectIndex: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    selectStyle() { //1为高级技工，2为原厂配件，3为新车置换，4为车主风采
        const { itemList } = this.data;
        wx.showActionSheet({
            itemList,
            success: res => {
                console.log(res.tapIndex)
                this.setData({
                    selectIndex: res.tapIndex
                })
            }
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})