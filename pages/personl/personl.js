// pages/personl/personl.js
import request from "../../utils/request";
let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let movedistance = 0; // 手指移动的距离 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    covertranslate: `translateY(0)`,
    transition: ``,
    userinfo:{},
    recentPlayList:[]
  },
  // 手指触发最初位置
  handlestart(e) {
    // 获取手指最初位置
    startY = e.touches[0].clientY
    this.setData({
      transition: ``
    })
  },
  // 手指移动
  handlemove(e) {
    // 获取手指移动位置
    moveY = e.touches[0].clientY
    movedistance = moveY - startY
    if (movedistance <= 0) {
      return
    } else if (movedistance >= 80) {
      movedistance = 80
    }
    this.setData({
      covertranslate: `translateY(${movedistance}rpx)`
    })
  },
  // 手指移动结束
  handleend(e) {
    // console.log('end',e);
    this.setData({
      covertranslate: `translateY(0rpx)`,
      transition: `transform 1s linear`,
      recentPlayListData:[]
    })
  },
  // 跳转到个人中心
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad:  function (options) {
    // 获取用户信息
    let userinfo = wx.getStorageSync('userinfo')
    // console.log("userinfo",userinfo); 
    if(userinfo){
      this.setData({
        userinfo:JSON.parse(userinfo)
      })
     
    }
      // 获取用户播放量
    this.playrecord( this.data.userinfo.userId)
    // console.log(id)
  },
   // 获取用户播放量
  async playrecord(userId){
    console.log(userId)
  const recentPlayListData= await request('/user/record',{uid:userId});
    console.log('playrecordlist',recentPlayListData)
    let index =0;
  let recentPlayList= this.recentPlayListData.weekData.slice(0,10).map((item)=>{
      item.id=index++
      return item
    })
  this.setData({
    recentPlayList
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