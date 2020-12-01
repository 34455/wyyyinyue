// pages/login/login.js

import request from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: ""
  },
  //获取密码和账号
  handleinput(e) {
    // let type = e.currentTarget.id;   //通过id 获取用户账号和密码  id单个的时候可以使用
    let type = e.currentTarget.dataset.type   //通过data-key=value 获取用户账号和密码  获取多个的时候可以使用
    this.setData({
      [type]: e.detail.value
    })
  },
  // 登录
  async login() {
    let { phone, password } = this.data;
    // 判断手机号
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
    }
    let phoneRegex = (/^1[3|4|5|7|8][0-9]{9}$/)
    if (!phoneRegex.test(phone)) {
      wx.showToast({
        title: '手机号格式请填写正确',
        icon: 'none'
      })
      return;
    }
    // 判断密码
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }
    const result = await request('/login/cellphone', { phone, password,isLogin:true })
    // console.log('reqlogin',rqLogin)
    if (result.code === 200) {
      wx.showToast({
        title: '登录成功',
        icon: 'none'
      })
      wx.setStorageSync('userinfo', JSON.stringify(result.profile))
      wx.reLaunch({
        url: '/pages/personl/personl',
      })
      return;
    }
    if (result.code == 400 || result.code == 502) {
      wx.showToast({
        title: '手机号或者密码错误',
        icon: 'none'
      })
      return
    } else {
      wx.showToast({
        title: `${result.message}`,
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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