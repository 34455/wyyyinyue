// pages/search/search.js
import request from "../../utils/request"
let isSearch = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: "",
    hotlist: [],  //热搜榜列表
    searchList: [], //搜索列表
    keywords: "",//搜索内容
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let placeholder = await request('/search/default')
    this.setData({
      placeholder: placeholder.data.showKeyword
    })
    let hotlist = await request('/search/hot/detail')
    let history = wx.getStorageSync('history')
    this.setData({
      hotlist: hotlist.data,
      history
    })
  },
  // 搜索歌曲
  handleSearch(event) {
    let keywords = event.detail.value.trim()
    this.setData({
      keywords
    })
    if (isSearch) {
      return;
    }
    isSearch = true;
    if (keywords !== '') {
      this.getsearchList(keywords)
      let { history } = this.data
      if (history.indexOf(keywords) !== -1) {
        history.splice(history.indexOf(keywords), 1)
      }
      history.unshift(keywords)
      this.setData({
        history
      })
      wx.setStorageSync('history', history)
    } else {
      this.setData({
        searchList: []
      })
    }
    setTimeout(() => {
      isSearch = false;
    }, 300);
    console.log('search', this.data.keywords)
  },
  // 清空搜索内容
  clear() {
    this.setData({
      keywords: "",
      searchList: []
    })
  },
  // 清空历史
  clearHistory() {
    wx.showModal({
      content: '确认要删除搜索历史么',
      success: (res) => {
        // console.log(res)
        if (res.confirm) {
          this.setData({
            history: []
          })
          wx.removeStorageSync('history')
        }
      }
    })

  },
  async getsearchList(keywords) {
    let searchList = await request('/search', { keywords: keywords, limit: 10 })
    this.setData({
      searchList: searchList.result.songs
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