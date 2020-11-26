// pages/index/index.js
import request from "../../utils/request"

Page({


  /**
   * 页面的初始数据
   */
  data: {
    bannerlist: [],
    recommdlist: [],
    toplist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 首页轮播图
    let requestBanner = await request('/banner', { type: 2 })
    //  console.log('请求成功：',requestBanner); 
    this.setData({
      bannerlist: requestBanner.banners
    })
    //  console.log(this.data.bannerlist,"bannerlist");
    // 推荐歌单
    let recommd = await request('/personalized', { limit: 10 })
    this.setData({
      recommdlist: recommd.result
    })
    // 排行榜
    let index = 0;
    let topArr = [];
    let name = null;
    while (index < 5) {
      let toplist = await request('/top/list', { idx: index++ })
      toplist.playlist.tracks.forEach(item => {
        item.singer = item.ar[0].name
      });
      topArr.push({ name: toplist.playlist.name, tracks: toplist.playlist.tracks })
    }

    this.setData({
      toplist: topArr
    })
    console.log('datatoplist', this.data.toplist);
    // let toplist = await request('/top/list', { idx: 1 })
    // console.log(toplist);
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