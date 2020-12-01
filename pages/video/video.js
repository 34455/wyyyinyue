// pages/video/video.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqNavList: [],
    navId: "",
    videoList: [],
    videoId: '',
    videoTimeupdate: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取视频标签导航列表
    this.getNavlist()
  },
  // 获取视频标签导航列表
  async getNavlist() {
    let reqNavList = await request('/video/group/list')
    // console.log('reqNavList', reqNavList)
    this.setData({
      reqNavList: reqNavList.data.slice(0, 14),
      navId: reqNavList.data[0].id
    })
    // console.log(this.data.navId)
    // 获取视频列表
    this.getvideoList(this.data.navId)
  },
  // 获取视频列表
  async getvideoList(navId) {
    // console.log(navId)
    let data = await request('/video/group', { id: navId })
    // 消息消失
    wx.hideLoading({
      success: (res) => { },
    })
    // console.log('videolist',data)
    let index = 0
    // 判断数据是否返回
    if (data.code === 200) {
      let videoList = data.datas.map(item => {
        item.id = index++;
        return item
      })
      this.setData({
        videoList
      })
    }
  },
  // 切换nav
  handleNav(e) {
    // console.log('handleNav',e)
    let navId = e.currentTarget.id
    this.setData({
      navId: navId >>> 0,
      videoList: [],
    })
    wx.showLoading({
      title: '正在加载',
    })
    //  // 获取视频列表
    this.getvideoList(this.data.navId)
  },
  // 视频播放下一个/继续播放
  handlePlay(event) {
    // console.log('handleplay', event)
    let vid = event.currentTarget.id;
    this.setData({
      videoId: vid
    })
    // console.log(this.data.videoId)
    // 播放下一个以及判读是否是本次视频
    // this.vid!==vid&&this.VideoContext&&this.VideoContext.stop()
    // this.vid=vid;
    // 设置实例
    this.VideoContext = wx.createVideoContext(vid);
    let { videoTimeupdate } = this.data
    // 跳转到暂停的时间
    let videoItem = videoTimeupdate.find(item => item.vid === vid)
    if (videoItem) {
      this.VideoContext.seek(videoItem.currentTime)
    }
    // 播放
    this.VideoContext.play()
    // VideoContext.stop()
  },
  // 更新时间
  handleTimeupdate(event) {
    // console.log('handelUpdate',event)
    let videoUpdate = { vid: event.currentTarget.id, currentTime: event.detail.currentTime }
    // console.log(videoUpdate)
    let { videoTimeupdate } = this.data
    let videoItem = videoTimeupdate.find(item => item.vid === videoUpdate.vid);
    if (videoItem) {   //之前有
      videoItem.currentTime = event.detail.currentTime
    } else {
      videoTimeupdate.push(videoUpdate)
    }
    this.setData({
      videoTimeupdate
    })
  },
  // 视频结束
  handleTimeend(event) {
    console.log("结束", event)
    let { videoTimeupdate } = this.data
    videoTimeupdate.splice(videoTimeupdate.findIndex(item => item.vid === event.currentTarget.id), 1)
    this.setData({
      videoTimeupdate
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  }
})