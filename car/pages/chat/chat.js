// pages/chat/chat.js
const app = getApp();
const { globalData: { methodsArr, REQUEST, openid,key} } = app;
let socketOpen = false;
let frameBuffer_Data, session, SocketTask;
let url = 'wss://api.rencheyuan.com:9501/';
let upload_url = 'https://api.rencheyuan.com/wxapp/index/uploadFile'


//通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
function sendSocketMessage(msg) {
    var that = this;
    console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
    SocketTask.send({
        data: JSON.stringify(msg),
        success:res=>{
            console.log("发送成功数据")
        }
    })
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: "",
        dialogue:[],             //聊天记录
        staff_openid:'',

        user_input_text: '',//用户输入文字
        inputValue: '',
        returnValue: '',
        addImg: false,
        //格式示例数据，可为空
        allContentList: [],
        num: 0,
        identity:null,    //1为用户 2为客服
        code:'',          //房间唯一识别码
        action:''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { staff_openid } = options;
        const { openid } = app.globalData;
        this.setData({
            // info: wx.getStorageSync('info')
            staff_openid,
            identity: staff_openid != openid ? 1 : 2,   //1用户  2员工
            action: staff_openid != openid ? 'create_room' : 'jion_room',
        })
        console.log(this.data.identity);
        this.getStaffDetails();
    },
    ...methodsArr,
    onShow(){
        var that = this;
        this.webSocket();
        const { staff_openid, identity, action,code} = this.data;
        const { openid } = app.globalData;
        SocketTask.onOpen(res => {
            socketOpen = true;
            console.log('监听 WebSocket 连接打开事件。', res);
            let DATA = null;
            if(identity == 1){
                DATA = {
                    type:1
                }
            }else{
                DATA = {
                    code
                }
            }
            let msg = {
                staff_openid,
                openid,
                action,
                identity,
                ...DATA
            }

            // console.log(msg)
            sendSocketMessage(msg)
        })
        SocketTask.onClose(onClose => {
            console.log('监听 WebSocket 连接关闭事件。', onClose)
            socketOpen = false;
            // this.webSocket()
        })
        SocketTask.onError(onError => {
            console.log('监听 WebSocket 错误。错误信息', onError)
            socketOpen = false
        })
        SocketTask.onMessage(onMessage => {
            console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
            var onMessage_data = JSON.parse(onMessage.data)
            if (onMessage_data.cmd == 1) {
                that.setData({
                    link_list: text
                })
                console.log(text, text instanceof Array)
                // 是否为数组
                if (text instanceof Array) {
                    for (var i = 0; i < text.length; i++) {
                        text[i]
                    }
                } else {

                }
                that.data.allContentList.push({ is_ai: true, text: onMessage_data.body });
                that.setData({
                    allContentList: that.data.allContentList
                })
                that.bottom()
            }
        })

    },
    webSocket: function () {
        // 创建Socket
        SocketTask = wx.connectSocket({
            url: url,
            data: 'data',
            header: {
                'content-type': 'application/json'
            },
            method: 'post',
            success: function (res) {
                console.log('WebSocket连接创建', res)
            },
            fail: function (err) {
                wx.showToast({
                    title: '网络异常！',
                })
                console.log(err)
            },
        })
    },
    // 提交文字
    submitTo(e) {
        var data = {
            body: this.data.inputValue,
        }
        if (socketOpen) {
            // 如果打开了socket就发送数据给服务器
            sendSocketMessage(data)
            this.data.allContentList.push({ is_my: { text: this.data.inputValue } });
            this.setData({
                allContentList: this.data.allContentList,
                inputValue: ''
            })
            this.bottom();
        }
    },
    bindKeyInput: function (e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    onUnload(){
        console.log("关闭连接")
        SocketTask.close(function (close) {
            console.log('关闭 WebSocket 连接。', close)
        })
    },
    upimg(){
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            success: function (res) {
                that.setData({
                    img: res.tempFilePaths
                })
                wx.uploadFile({
                    url: upload_url,
                    filePath: res.tempFilePaths,
                    name: 'img',
                    success: function (res) {
                        console.log(res)
                        wx.showToast({
                            title: '图片发送成功！',
                            duration: 3000
                        });
                    }
                })
                that.data.allContentList.push({ is_my: { img: res.tempFilePaths } });
                that.setData({
                    allContentList: that.data.allContentList,
                })
                that.bottom();
            }
        })
    },
    addImg: function () {
        this.setData({
            addImg: !this.data.addImg
        })

    },
    // 获取hei的id节点然后屏幕焦点调转到这个节点  
    bottom() {
        this.setData({
            scrollTop: 1000000
        })
    },
    //创建聊天链接

    //获取详情页面
    getStaffDetails(){
        const { staff_openid } = this.data;
        REQUEST('GET','getStaffDetails',{
            openid:app.globalData.openid,
            staff_openid,
            key
        }).then(res=>{
            this.setData({
                info: res.staffinfo,
                dialogue:res.dialogue
            })
        })
    },
    //到达评论列表页面
    commentHandle(e) {
        const { openid } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/comment_list/comment_list?staff_openid=${openid}`,
        })
    },
    uploadImgHandle(){

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
        const { staff_openid } = this.data;
        let url = encodeURIComponent(`/pages/chat/chat?staff_openid=${staff_openid}`) 
        return {
            title: '哇这个给马云修车的帅哥火了月入几十万',
            path: `/pages/entry/entry?share_query=${url}`
        }
    }
})