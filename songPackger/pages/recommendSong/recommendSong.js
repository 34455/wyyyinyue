// pages/recommendSong/recommendSong.js
import request from "../../../utils/request.js"
import pubsub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: '',  //年
    month: '', //月
    day: '', //日
    recommendList: [], //每日歌曲播放列表
    index: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 判断用户时候登录
    let userinfo = wx.getStorageSync('userinfo')
    if (!userinfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: function () {
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      })
    }
    this.getRecommendList()
    pubsub.subscribe('switchType', (msg, type) => {
      
      let { index, recommendList } = this.data
      if (type == 'pre') {
        index -= 1
        if (index === 0) {
          index = recommendList.length - 1
        }
      } else {
        index += 1
        if (index === recommendList.length - 1) {
          index = 0
        }
      }
      this.setData({
        index
      })
      let musicId = recommendList[index].id
      // 发布消息
      pubsub.publish('musicId', musicId)
    })
    //  获取时间
    this.setData({
      year: new Date().getFullYear(),
      month: (new Date().getMonth() + 1 + "").padStart(2, 0),
      day: (new Date().getDate() + "").padStart(2, 0)
    })

  },
  // 获取播放列表
  async getRecommendList() {
    let recommendList = await request('/recommend/songs')
    // console.log("list",recommendList)
    this.setData({
      recommendList: recommendList.recommend
    })
    // console.log(this.data.recommendList)
  },
  toSongdetail(event) {
    console.log(event)
    let { song, index } = event.currentTarget.dataset
    this.setData({
      index
    })

    wx.navigateTo({
      url: '/songPackger/pages/songDetail/songDetail?musicId=' + song,
    })
    // console.log(event)

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