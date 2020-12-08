// pages/songDetail/songDetail.js
import request from '../../../utils/request.js'
const appInstance = getApp()
import pubsub from 'pubsub-js'
let moment = require('moment');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,  //是否播放音乐
    songDetail: [], //歌曲详情
    musicId: '', //音乐id
    musicLink: '', //音乐链接
    timeStart: '00:00', //开始时间
    timeEnd: '00:00', // 总时间
    autoWidth: '', //进度条长度
    i:""
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
    this.BackgroundAudioManager.onStop(() => {
      // this.setData({
      //   isPlay: false
      // })
      this.isPlay(false)
    })
    // 音乐实时更新
    this.BackgroundAudioManager.onTimeUpdate(() => {
      // console.log("当前时间", this.BackgroundAudioManager.currentTime)
      // console.log("总时长", this.BackgroundAudioManager.duration)
      let timeStart = moment(this.BackgroundAudioManager.currentTime * 1000).format('mm:ss')
      let autoWidth = this.BackgroundAudioManager.currentTime/this.BackgroundAudioManager.duration *100
      this.setData({
        timeStart,
        autoWidth
      })
      // console.log(this.data.autoWidth)
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
    // console.log(songDetail)
    let timeEnd = moment(songDetail.songs[0].dt).format('mm:ss');
    this.setData({
      songDetail: songDetail.songs[0],
      timeEnd
    })
    wx.setNavigationBarTitle({
      title: this.data.songDetail.al.name
    })
  },
  // 拖动
  bindchange(event){
    console.log('tuodong',event)
    this.setData({
      i:event.detail.value
    })
    // this.BackgroundAudioManager.currentTime=this.data.autoWidth*60;
    // console.log('i', i)
  },
  // 控制播放/暂停
  handlePlay() {
    let isPlay = !this.data.isPlay;
    // this.setData({
    //   isPlay
    // })
    // 音乐播放暂停
    this.songPlay(isPlay, this.data.musicId, this.data.musicLink)
  },
  // 音乐播放暂停
  async songPlay(isPlay, musicId, musicLink) {
    if (isPlay) {
      // console.log(musicUrl)
      if (!musicLink) {
        let musicUrl = await request('/song/url', { id: musicId })
        musicLink = musicUrl.data[0].url
        this.setData({
          musicLink
        })
      }
      this.BackgroundAudioManager.src = musicLink;
      this.BackgroundAudioManager.title = this.data.songDetail.al.name
    } else {
      this.BackgroundAudioManager.pause()
    }

  },
  // 点击上一首/下一首
  handleBtn(event) {
    // 本次播放停止
    this.BackgroundAudioManager.stop()
    let type = event.currentTarget.dataset.type
    // 订阅者消息
    pubsub.subscribe('musicId', (msg, musicId) => {
      // console.log(msg,musicId)
      this.getSonglist(musicId)
      pubsub.unsubscribe('musicId')
      this.songPlay(true, musicId)
    })
    //  发送数据
    pubsub.publish('switchType', type)

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