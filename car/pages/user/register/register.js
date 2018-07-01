// pages/user/register/register.js
var app = getApp();
const { globalData: { REQUEST, key } } = app;
import { methodsArr } from '../../../utils/pageCom.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        photo:'',          //生活照
        brand_id:'',       //品牌id
        organization_pic:'',        //组织机构代码
        driver_pic:'',              //驾驶证照
        city:'',                    //城市
        type:'',                    //归属
        itemList: ["高级技工", "原厂配件", "新车置换", "车主风采"],
        selectIndex: null,
        brandState:false,
        brandList: [],
        currentBrand: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getBrand(key);
        let city = wx.getStorageSync('locatecity');
        this.setData({
            city
        })
    },
    ...methodsArr,
    //点击品牌
    showPinPai(){
        this.setData({
            brandState: true
        })
    },
    //选择归属
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
    //选择照片
    chooseImgHandle(e){
        const { id,index } = e.currentTarget.dataset;  //1-生活照 2-驾驶证  3-上传组织代码
        wx.chooseImage({
            count: (id == 1 || id == 3) ? 1 : index ? 1 : 2,
            success:res=>{
                const { tempFilePaths } = res;
                if (id == 1){
                   this.setData({
                       photo: tempFilePaths[0]
                   }) 
                } else if (id == 3){
                    this.setData({
                        organization_pic:tempFilePaths[0]
                    })
                }else{  //驾驶证
                    if(index){
                        if(index == 0){
                            this.setData({
                                'driver_pic[0]': tempFilePaths[0]
                            })
                        }else{
                            this.setData({
                                'driver_pic[1]': tempFilePaths[0]
                            })
                        }
                    }else{
                        this.setData({
                            driver_pic: tempFilePaths
                        })
                    }
                    
                }
            }
        })
    },
    //注册
    formSubmit(e){
        const { address,city,company,duties,mobile,name} = e.detail.value;
        const { brand_id } = this.data.currentBrand;
        const type = this.data.selectIndex ? this.data.selectIndex + 1 : '' ;
        const { photo, organization_pic, driver_pic} = this.data;
        if (!address || !city || !company || !duties || !mobile || !name || !brand_id || !type || !photo || !organization_pic || !driver_pic || (driver_pic&& driver_pic.length < 2)){
            wx.showToast({
                title: '信息不完整',
                icon:'none',
                mask:true
            })
            return;
        }

        REQUEST('POST','postRegister',{
            address, city, company, duties, mobile, name, brand_id, type, photo, organization_pic, driver_pic, key, openid: app.globalData.openid
        }).then(res=>{
            console.log(res)
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