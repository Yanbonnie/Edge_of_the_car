module.exports = {
    methodsArr:{
        //到达个人中心页面
        goCard(){
            wx.reLaunch({
                url: '/pages/card/card',
            })
        },
        //拨打电话
        makePhoneHandle(e){
            const { phone } = e.currentTarget.dataset;
            wx.makePhoneCall({
                phoneNumber:phone
            })
        }
    }
}