// pages/index/index.js
import request from "../../utils/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bannerlist:[],
      recommdlist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 首页轮播图
  let requestBanner =await request('/banner',{type:2})
  //  console.log('请求成功：',requestBanner); 
   this.setData({
     bannerlist:requestBanner.banners
   })
  //  console.log(this.data.bannerlist,"bannerlist");
    // 推荐歌单
    let recommd = await request('/personalized',{limit:10})
    this.setData({
      recommdlist:recommd.result
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