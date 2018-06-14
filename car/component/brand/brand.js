import qqmap from '../../utils/map.js';
Component({
    properties: {
        styles: {//这个是可以自定义最外层的view的样式
            type: String,
            value: '',
            observer: function (newval, oldval) {
                // 监听改变
                console.log(newval, oldval);
            }
        },
        citylist:Object
    },
    data: {
        //下面是字母排序
        letter: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
        cityListId: '',
        coverState: false,
        //下面是热门城市数据，模拟数据
        newcity: ['北京', '上海', '广州', '深圳', '成都', '杭州'],
        locateCity: ''
    },
    methods: {
        //点击城市
        brandTap(e) {
            const {name} = e.currentTarget.dataset;
            this.triggerEvent('brandtap', { name });

        },
        //点击城市字母
        letterTap(e) {
            const Item = e.currentTarget.dataset.item;
            this.setData({
                cityListId: Item,
                coverState: true
            });
            setTimeout(() => {
                this.setData({
                    coverState: false
                })
            }, 600)
        },
        //调用定位
        getLocate() {
            new qqmap().getLocateInfo().then(val=>{//这个方法在另一个文件里，下面有贴出代码
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
        //关闭弹框
        closeTap() {
            this.triggerEvent('closeBrand');
        }
    },
    ready() {
        console.log(this.data.citylist)
        /*console.log(wx.getStorageSync('locatecity'))
        let cityOrTime = wx.getStorageSync('locatecity') || {},
            time = new Date().getTime(),
            city = '';
        if (!cityOrTime.time || (time - cityOrTime.time > 1800000)) {//每隔30分钟请求一次定位
            this.getLocate();
        } else {//如果未满30分钟，那么直接从本地缓存里取值
            this.setData({
                locateCity: cityOrTime.city
            })
        }*/
    },
    
})