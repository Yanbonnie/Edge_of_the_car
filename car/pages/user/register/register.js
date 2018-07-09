// pages/user/register/register.js
var app = getApp();
const { globalData: { REQUEST, key } } = app;
import { methodsArr } from '../../../utils/pageCom.js';
import { Config,URL } from '../../../utils/util.js';
const { cityArr, brandArr } = methodsArr;
import Sort from '../../../utils/city_sort';   //城市排序

let arr2 = [ //cityName
    { "id": "v1", "cityName": "北京" },
    { "id": "v2", "cityName": "上海" },
    { "id": "v5", "cityName": "天津" },
    { "id": "v7", "cityName": "安徽" },
    { "id": "v3", "cityName": "呼和浩特" },
    { "id": "v4", "cityName": "杭州" },
    { "id": "v9", "cityName": "海南" },
    { "id": "v8", "cityName": "张家口" }
];
let str = Sort.pySegSort(arr2);
Page({

    /**
     * 页面的初始数据
     */
    data: {
        photo:'',          //生活照
        photoFile:'',
        brand_id:'',       //品牌id
        organization_pic:'',        //组织机构代码
        organization_picFile:'',
        driver_pic:'',              //驾驶证照
        driver_picFile:'',
        city:'',                    //城市
        type:'',                    //归属
        itemList: ["高级技工", "原厂配件", "新车置换", "车主风采"],
        selectIndex: null,
        brandState:false,
        brandList: [],
        currentBrand: '',
        citylist: [],    //城市列表
        locateCity: '',     //当前城市
        cityState: false,   //是否显示城市弹框
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getBrand(key);
        this.getCityData(key);
        let city = wx.getStorageSync('locatecity');
        this.setData({
            locateCity:city.city
        })
    },
    ...brandArr,
    ...cityArr,
    //点击品牌
    
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
                const { tempFilePaths, tempFiles } = res;
                if (id == 1){
                   this.setData({
                       photo: tempFilePaths[0]
                   }) 
                   wx.showLoading({
                       title: '上传中...',
                       mask: true
                   })
                   this.uploadHandle(tempFilePaths[0]).then(res=>{
                       this.setData({
                           photoFile:res
                       })
                   })
                } else if (id == 3){
                    this.setData({
                        organization_pic: tempFilePaths[0]
                    })
                    wx.showLoading({
                        title: '上传中...',
                        mask: true
                    })
                    this.uploadHandle(tempFilePaths[0]).then(res => {
                        this.setData({
                            organization_picFile:res
                        })
                    })
                }else{  //驾驶证
                    if(index){
                        if(index == 0){
                            this.setData({
                                'driver_pic': tempFilePaths[0]
                            })
                            wx.showLoading({
                                title:'上传中...',
                                mask:true
                            })
                            this.uploadHandle(tempFilePaths[0]).then(res => {
                                console.log(res)
                                this.setData({
                                    'driver_picFile':res
                                })
                            })
                        }else{
                            this.setData({
                                'driver_pic[1]': tempFilePaths[0]
                            })
                            wx.showLoading({
                                title: '上传中...',
                                mask: true
                            })
                            this.uploadHandle(tempFilePaths[0]).then(res => {
                                this.setData({
                                    'driver_picFile[1]': res
                                })
                            })
                        }
                    }else{
                        this.setData({
                            'driver_pic': tempFilePaths[0]
                        })
                        wx.showLoading({
                            title: '上传中...',
                            mask: true
                        })
                        this.uploadHandle(tempFilePaths[0]).then(res => {
                            console.log(res)
                            this.setData({
                                'driver_picFile': res
                            })
                        })
                        /*this.setData({
                            driver_pic: tempFilePaths
                        })
                        wx.showLoading({
                            title: '上传中...',
                            mask: true
                        })
                        for(let i = 0 ; i < tempFilePaths.length;i++){
                            this.uploadHandle(tempFilePaths[0]).then(res => {
                                this.setData({
                                    ["driver_picFile[" + i + "]"]: res
                                })
                            })
                        }*/
                    }
                    
                }
            }
        })
    },
    uploadHandle(tempFilePaths) {/*  */
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: Config.reqUrl + URL['uploadFile'],
                filePath: tempFilePaths,
                name: "file",
                formData: {
                    key
                },
                success: res => {
                    wx.hideLoading();
                    let { status, msg, saveName } = JSON.parse(res.data);
                    let resData = JSON.parse(res.data);
                    if (status == 0) {
                        resolve(saveName)
                    } else {
                        wx.hideLoading();
                        wx.showToast({
                            title: msg ? msg : '上传失败',
                            icon: 'none',
                            mask: true
                        })
                    }
                }
            })
        })

    },
    //注册
    formSubmit(e){
        const { address,city,company,duties,mobile,name} = e.detail.value;
        console.log(e.detail.value)
        const { brand_id } = this.data.currentBrand;
        const type = (this.data.selectIndex || this.data.selectIndex == 0 ) ? this.data.selectIndex + 1 : '' ;
        const { photo, photoFile, organization_pic, organization_picFile, driver_pic, driver_picFile} = this.data;
        if (address == '' || city == '' || company == '' || duties == '' || mobile == '' || name == '' || brand_id == '' || type == '' || photo == '' || organization_pic == '' || driver_pic == '') { // || (driver_pic && driver_pic.length < 2)
            wx.showToast({
                title: '信息不完整',
                icon:'none',
                mask:true
            })
            return;
        }
        // {
        //     '0':driver_picFile[0],
        //         '1': driver_picFile[1]
        // }
        REQUEST('POST','postRegister',{
            address, city, company, duties, mobile, name, brand_id, type, photo: photoFile, organization_pic: organization_picFile, driver_pic: driver_picFile, key, openid: app.globalData.openid
        }).then(res=>{
            console.log(res)
            if(res.status == 0){
                console.log("注册成功了")
                // wx.navigateTo({
                //     url: '/pages/user/index/index',
                // })        
                wx.navigateBack({
                    delta: 1
                })        
            }
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },
})