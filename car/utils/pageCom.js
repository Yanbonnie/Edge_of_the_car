import { REQUEST } from './util';
import Sort from './city_sort';   //城市排序
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
        },
        //获取品牌
        getBrand(key) {
            REQUEST('GET', 'getBrand', { key }).then(res => {
                let Data = res.data.map(item => {
                    if(item.sublevel){
                        item.sublevel = item.sublevel.map(item2=>{
                            // console.log(111)
                            // console.log({
                            //     ...item2,
                            //     'brand_id':'444444'
                            // })
                            return {
                                ...item2,
                                'brand_id':'44444444'
                            }
                        })
                    }
                    return {
                        ...item,
                        cityName: item.name
                    }
                })
                let brandList = Sort.pySegSort(Data)
                this.setData({ brandList })
            })
        },
        //选择品牌
        brandTap(e) {
            const name = e.detail.name;
            this.setData({
                currentBrand: name,
                brandState: false
            })
            console.log(this.data.currentBrand)
        },
        //关闭品牌框
        closeBrandHandle() {
            this.setData({
                brandState: false
            })
        }
    }
}