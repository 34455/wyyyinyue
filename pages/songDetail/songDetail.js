// pages/songDetail/songDetail.js
import request from '../../utils/request.js'
const appInstance = getApp()
import pubsub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    songDetail: [],
    musicId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let musicId = options.musicId
    // console.log(musiceId)
    // this.setData({
    //   musicId
    // })
    if (musicId) {
      //  获取歌曲详情
      this.getSonglist(musicId)

    }
    this.setData({
      musicId
    })
    if (appInstance.globalData.isPlay && appInstance.globalData.musicId === musicId) {
      this.setData({
        isPlay: true
      })
    }
    this.BackgroundAudioManager = wx.getBackgroundAudioManager()
    //后台背景音乐播放
    this.BackgroundAudioManager.onPlay(() => {
      this.isPlay(true)

      appInstance.globalData.musicId = this.data.musicId;
    })
    // 后台背景音乐暂停
    this.BackgroundAudioManager.onPause(() => {
      this.isPlay(false)
    })
    // 后台背景音乐停止
    this.BackgroundAudioManager.onPause(() => {
      // this.setData({
      //   isPlay: false
      // })
      this.isPlay(false)
    })

  },
  isPlay(isPlay) {
    this.setData({
      isPlay
    })
    appInstance.globalData.musicPlay = isPlay;
  },

  // 获取歌曲详情
  async getSonglist(musicId) {
    let songDetail = await request('/song/detail', { ids: musicId })
    this.setData({
      songDetail: songDetail.songs[0]
    })
    wx.setNavigationBarTitle({
      title: this.data.songDetail.al.name
    })
  },
  // 控制播放/暂停
  handlePlay() {
    let isPlay = !this.data.isPlay;
    // this.setData({
    //   isPlay
    // })
    // 音乐播放暂停
    this.songPlay(isPlay, this.data.musicId)
  },
  // 音乐播放暂停
  async songPlay(isPlay, musicId) {
    if (isPlay) {
      let musicUrl = await request('/song/url', { id: musicId })
      // console.log(musicUrl)
      this.BackgroundAudioManager.src = musicUrl.data[0].url;
      this.BackgroundAudioManager.title = this.data.songDetail.al.name
    } else {
      this.BackgroundAudioManager.pause()
    }

  },
  // 点击上一首/下一首
  handleBtn(event){
    let type = event.currentTarget.dataset.type
   console.log(type)
  //  发送数据
   pubsub.publish('switchType',type)
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