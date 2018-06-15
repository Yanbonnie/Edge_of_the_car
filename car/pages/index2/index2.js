// pages/index2/index2.js.js
import qqmap from '../../utils/map.js';
import Sort from '../../utils/city_sort';   //城市排序
import { indexData, brands } from '../../utils/data.js';
let arr2 = [
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

let brandList = Sort.pySegSort(brands); 
Page({
    /**
     * 页面的初始数据
     */
    data: {
        citylist: str,    //城市列表
        locateCity: '',     //当前城市
        cityState: false,   //是否显示城市弹框
        brandState:false,
        brandList:brandList,
        currentBrand:'',
        tabIndex:0,
        list: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getAddress();
        
        let list = indexData.filter(item=>{
            return item.type == 'jg'
        });
        this.setData({list})
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
    //到达聊天页面
    goChat(e) {
        const { index }  = e.currentTarget.dataset;
        wx.setStorageSync('info', this.data.list[index]);  //设置缓存
        wx.navigateTo({
            url: '/pages/chat/chat',
        })
    },
    changeTab(e){
        const { index } = e.currentTarget.dataset;
        let list = [];
        if(index == 0){
            list = indexData.filter(item => {
                return item.type == 'jg'
            });
        } else if (index == 1) {
            list = indexData.filter(item => {
                return item.type == 'pj'
            });
        }else{
            list = indexData.filter(item => {
                return item.type == 'zh'
            });
        }
        this.setData({
            tabIndex:index,
            list
        })
    },
    //初始化定位
    getAddress() {
        let cityOrTime = wx.getStorageSync('locatecity') || {},
            time = new Date().getTime(),
            city = '';
        console.log(cityOrTime)
        if (!cityOrTime.time || (time - cityOrTime.time > 1800000)) {//每隔30分钟请求一次定位
            this.getLocate();
        } else {//如果未满30分钟，那么直接从本地缓存里取值
            this.setData({
                locateCity: cityOrTime.city
            })
            console.log(this.data.locateCity)
        }
    },
    //调用定位
    getLocate() {
        new qqmap().getLocateInfo().then(val => {//这个方法在另一个文件里，下面有贴出代码
            if (val.indexOf('市') !== -1) {//这里是去掉“市”这个字
                val = val.slice(0, val.indexOf('市'));
            }
            this.setData({
                locateCity: val
            });
            //把获取的定位和获取的时间放到本地存储
            wx.setStorageSync('locatecity', { city: val, time: new Date().getTime() });
        });
    },
    //显示地址弹框
    showCover(e) {
        const {index} = e.currentTarget.dataset;
        if(index == 1){
            this.setData({
                cityState: true
            })
        }else{
            this.setData({
                brandState: true
            })
        }
        
    },
    //选择地址
    cityTap(e) {
        const cityName = e.detail.cityname;
        this.setData({
            locateCity: cityName,
            cityState: false
        })
        wx.setStorageSync('locatecity', { city: cityName, time: new Date().getTime() });
    },
    //选择品牌
    brandTap(e){
        console.log(e)
        const name = e.detail.name;
        this.setData({
            currentBrand: name,
            brandState:false
        })
    },
    //关闭地址选择
    closeCityHandle() {
        this.setData({
            cityState: false
        })
    },
    //关闭品牌框
    closeBrandHandle(){
        this.setData({
            brandState: false
        })
    }
})