const Promise = require('../libs/es6-promise');
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//接口域名统一配置
const Config = {
    reqUrl: 'https://xnt.xhwxpos.com/sznt/wxapp/Index/'
}

//接口地址
const URL = {
    "userLogin": "userLogin",                                //用户登录
    "getBrand": "getBrand",                                  //获取品牌接⼝
    "getCity":"getCity",                                     //获取城市接口
    "getStaff":"getStaff",                                   //获取员工列表
    "getStaffDetails": "getStaffDetails",                    //获取员工详情信息
    "getStaffVisitingCard":"getStaffVisitingCard",           //获取员工名片信息接口   
    "getStaffEstimate": "getStaffEstimate",                  //获取员⼯工评价接⼝口
    "postEstimate":"postEstimate",                           //用户进行评价接口
    "getMyInfo": "getMyInfo",                                //获取我的个⼈人⽤用户接⼝口
    "getAdvisor": "getAdvisor",                              //获取专属顾问接口
    "readMsg": "readMsg",                                    //用户阅读信息

          
}
//请求接口封装
const REQUEST = (method, url, data, err = false) => {   //err->true  需要对失败进行特殊处理
    return new Promise((resolve, reject) => {
        wx.request({
            method,
            url: Config.reqUrl + url,
            data,
            success: res => {
                console.log(res)
                if (res.data.status == 0) {
                    resolve(res.data);
                } else {
                    if (err) {
                        reject(res.data)
                    } else {
                        wx.showToast({
                            icon: 'none',
                            mask: true,
                            title: res.data.msg,
                        })
                    }

                }
            }
        })
    })
}


module.exports = {
    formatTime: formatTime,
    REQUEST
}
