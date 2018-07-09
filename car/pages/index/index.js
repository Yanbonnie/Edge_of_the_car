// pages/index2/index2.js.js
const app = getApp();
const { globalData: { REQUEST, key } } = app;
import { methodsArr} from '../../utils/pageCom.js';
const { cityArr, brandArr } = methodsArr;
import qqmap from '../../utils/map.js';
import Sort from '../../utils/city_sort';   //城市排序
import { indexData, brands } from '../../utils/data.js';
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

// let brandList = Sort.pySegSort(brands); 
Page({
    /**
     * 页面的初始数据
     */
    data: {
        citylist: [],    //城市列表
        locateCity: '',     //当前城市
        cityState: false,   //是否显示城市弹框
        brandState:false,
        brandList:[],
        currentBrand:'',
        tabIndex:1,
        staffinfo: [],  //员工列表
        page1:1,         //员工列表翻页
        page2:1,
        page3:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getAddress();
        this.getStaff(1);
        this.getBrand(key);
        this.getCityData(key);
    },
    ...brandArr,
    ...cityArr,
    //获取员工列表
    getStaff(e){
        const { index } = e.currentTarget ? e.currentTarget.dataset : { index : 1 };
        const { page } = e.currentTarget ? e.currentTarget.dataset : { page : 1 } ;

        this.setData({
            tabIndex: index
        })
        wx.showLoading({
            title: '加载中...',
        })
        REQUEST('GET','getStaff',{
            openid: app.globalData.openid,
            type: index,
            page,
            key
        }).then(res=>{
            wx.hideLoading();
            const staffinfo = res.data;
            this.setData({
                staffinfo
            })
        })
    },
    bindscrolltolower(){
        
    },
    //到达聊天页面
    goChat(e) {
        const { openid } = e.currentTarget.dataset;
        // wx.setStorageSync('info', this.data.list[index]);  //设置缓存
        wx.navigateTo({
            url: `/pages/chat/chat?staff_openid=${openid}`,
        })
    },
    //初始化定位
    getAddress() {
        let cityOrTime = wx.getStorageSync('locatecity') || {},
            time = new Date().getTime(),
            city = '';
        if (!cityOrTime.time || (time - cityOrTime.time > 1800000)) {//每隔30分钟请求一次定位
            this.getLocate();
        } else {//如果未满30分钟，那么直接从本地缓存里取值
            this.setData({
                locateCity: cityOrTime.city
            })
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
        }).catch(res => {
            this.setData({
                locateCity: '定位失败'
            })
        });
    },
    //显示地址弹框
    showCover(e) {
        const { index } = e.currentTarget.dataset;
        if (index == 1) {
            this.setData({
                cityState: true
            })
        } else {
            this.setData({
                brandState: true
            })
        }

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
        return {
            title: '哇这个给马云修车的帅哥火了月入几十万',
            path: `/pages/entry/entry`
        }
    },
})