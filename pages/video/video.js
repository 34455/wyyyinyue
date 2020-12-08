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
    videoTimeupdate: [],  //记录视频播放时长
    isTrigger: false, // 标识下拉刷新是否被触发
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
    this.setData({
      isTrigger: false
    })
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
  //自定义下拉刷新的回调  scroll-view
  refresher() {
    // console.log("下拉刷新")
    this.getvideoList(this.data.navId)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //自定义滚动到底部的回调 scroll-view
  tolower() {
    console.log('滚动到底部')
    let { videoList } = this.data
    let videolist = [
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_7181427836767FFE3747324CAB2C0212",
          "coverUrl": "https://p2.music.126.net/4GpMVM84C_i-8w0IyYN9QQ==/109951163573372040.jpg",
          "height": 720,
          "width": 1280,
          "title": "给我们一个童年——叙利亚9岁小女孩唱哭全场",
          "description": "在阿拉伯世界儿童好声音节目上，一位叙利亚女孩哭着演唱了一首Give Us a Childhood.（给我们一个童年）",
          "commentCount": 1311,
          "shareCount": 6665,
          "resolutions": [
            {
              "resolution": 240,
              "size": 12862638
            },
            {
              "resolution": 480,
              "size": 20870096
            },
            {
              "resolution": 720,
              "size": 28383407
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 410000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/n54Kh3GiWnrP-aXv3dw0jQ==/109951163344535047.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 410300,
            "birthday": 782582400000,
            "userId": 64055537,
            "userType": 0,
            "nickname": "Tiger-Rose",
            "signature": "轻音乐居士",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163344535040,
            "backgroundImgId": 109951163348046930,
            "backgroundUrl": "http://p1.music.126.net/tixvH2vIRiMm6KWUdKFYAQ==/109951163348046935.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 0,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951163344535047",
            "backgroundImgIdStr": "109951163348046935",
            "avatarImgId_str": "109951163344535047"
          },
          "urlInfo": {
            "id": "7181427836767FFE3747324CAB2C0212",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/fszP0RLe_1517602547_shd.mp4?ts=1606808235&rid=A15AF15317AED757FD2D594765D94608&rl=3&rs=CKwzMCmMZujzGjEraNvaEAOtoHrNGGsD&sign=6a67abbb7b7094db7a84ce01c2ab9fd4&ext=44LBbAL0bGB4jzFlXI9PjmOWBSsOi%2Bmjx%2BeyTVTvVJggTXXx4JYQs9ffPNVunzyizM2X1WZJKOn7uP2DYboXbdSEfPe%2FIeta5etbM6aHE4filz3F%2BzEA0Hr73fz%2FE0QT1LYy10TIndsLwhKd1m1ZtCaMKlJpRpKMfUwVAYQXz2MMpjxSggm8IrUozowEyFDnRL%2BVFjeEvABPZcw6D3ZB4r3iTI4SFR33%2BSywgB19N7MSADZFGI42d6Miqt%2BOQUor",
            "size": 28383407,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 76108,
              "name": "综艺片段",
              "alg": "groupTagRank"
            },
            {
              "id": 14137,
              "name": "感动",
              "alg": "groupTagRank"
            },
            {
              "id": 3101,
              "name": "综艺",
              "alg": "groupTagRank"
            },
            {
              "id": 4101,
              "name": "娱乐",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "给我们童年,给我们和平（翻自 Survivor） ",
              "id": 555553750,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 13698551,
                  "name": "想见你想见你呀",
                  "tns": [],
                  "alias": []
                },
                {
                  "id": 74854,
                  "name": "Survivor",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 35,
              "st": 0,
              "rt": null,
              "fee": 0,
              "v": 12,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 38104240,
                "name": "第一人格",
                "picUrl": "http://p4.music.126.net/IE6pH9Qebt08vj0mVFS1FA==/109951163216470879.jpg",
                "tns": [],
                "pic_str": "109951163216470879",
                "pic": 109951163216470880
              },
              "dt": 254747,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 10193023,
                "vd": -2
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 6115831,
                "vd": 1203
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 4077235,
                "vd": -2
              },
              "a": null,
              "cd": "01",
              "no": 1,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 0,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "cp": 0,
              "mv": 0,
              "publishTime": 1522488759608,
              "privilege": {
                "id": 555553750,
                "fee": 0,
                "payed": 0,
                "st": 0,
                "pl": 320000,
                "dl": 999000,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 320000,
                "toast": false,
                "flag": 128,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "7181427836767FFE3747324CAB2C0212",
          "durationms": 132280,
          "playTime": 1648849,
          "praisedCount": 14364,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_70760AA9A3AEB93AF274B07DB97D9E70",
          "coverUrl": "https://p2.music.126.net/yVS6ymF1FB-WxsbncXmL4A==/109951164017627621.jpg",
          "height": 360,
          "width": 640,
          "title": "薛之谦和大张伟对唱《意外》,有多不正经就有多深情!",
          "description": "薛之谦和大张伟对唱《意外》,有多不正经就有多深情!",
          "commentCount": 1306,
          "shareCount": 2688,
          "resolutions": [
            {
              "resolution": 720,
              "size": 70529821
            },
            {
              "resolution": 480,
              "size": 61376610
            },
            {
              "resolution": 240,
              "size": 31707485
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 330000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/J5cmHMDOVNaQMuNES4MPQA==/109951164501912244.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 330100,
            "birthday": 755712000000,
            "userId": 1289603861,
            "userType": 202,
            "nickname": "音乐观察员",
            "signature": "流行、经典、民谣音乐爱好者~",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951164501912240,
            "backgroundImgId": 109951164677064240,
            "backgroundUrl": "http://p1.music.126.net/Cce9JhhHmkGuVTJtP8HbsQ==/109951164677064241.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "视频达人(华语、音乐现场)",
              "2": "音乐图文达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "109951164501912244",
            "backgroundImgIdStr": "109951164677064241",
            "avatarImgId_str": "109951164501912244"
          },
          "urlInfo": {
            "id": "70760AA9A3AEB93AF274B07DB97D9E70",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/D4PXWInV_2460437699_shd.mp4?ts=1606808235&rid=A15AF15317AED757FD2D594765D94608&rl=3&rs=akzdMagsjXXUwqApnpIhvKDUUCFxDZBM&sign=60b9f159a8206a2090482c4cdd82d1f9&ext=44LBbAL0bGB4jzFlXI9PjmOWBSsOi%2Bmjx%2BeyTVTvVJggTXXx4JYQs9ffPNVunzyizM2X1WZJKOn7uP2DYboXbdSEfPe%2FIeta5etbM6aHE4filz3F%2BzEA0Hr73fz%2FE0QT1LYy10TIndsLwhKd1m1ZtCaMKlJpRpKMfUwVAYQXz2MMpjxSggm8IrUozowEyFDnRL%2BVFjeEvABPZcw6D3ZB4r3iTI4SFR33%2BSywgB19N7MSADZFGI42d6Miqt%2BOQUor",
            "size": 70529821,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": -8006,
              "name": "#分享榜#",
              "alg": "groupTagRank"
            },
            {
              "id": 24129,
              "name": "薛之谦",
              "alg": "groupTagRank"
            },
            {
              "id": 59101,
              "name": "华语现场",
              "alg": "groupTagRank"
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "意外",
              "id": 27890306,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 5781,
                  "name": "薛之谦",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": "600907000002830296",
              "fee": 8,
              "v": 37,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 2681139,
                "name": "意外",
                "picUrl": "http://p3.music.126.net/WPHmBisDxnoF4DrBLKwl3Q==/109951163169021112.jpg",
                "tns": [],
                "pic_str": "109951163169021112",
                "pic": 109951163169021120
              },
              "dt": 287000,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 11500190,
                "vd": -21700
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 6900131,
                "vd": -19200
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 4600101,
                "vd": -17700
              },
              "a": null,
              "cd": "1",
              "no": 2,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "cp": 29001,
              "mv": 5309397,
              "publishTime": 1381161600007,
              "privilege": {
                "id": 27890306,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 260,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "70760AA9A3AEB93AF274B07DB97D9E70",
          "durationms": 259327,
          "playTime": 3637068,
          "praisedCount": 27213,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_15F2D043BDA37897E37C5D0AEAF9983A",
          "coverUrl": "https://p2.music.126.net/g4neer9IZovooSVgmesRKA==/109951164812344966.jpg",
          "height": 720,
          "width": 1280,
          "title": "12岁女孩DissBattle让对手惊掉下巴",
          "description": "",
          "commentCount": 273,
          "shareCount": 866,
          "resolutions": [
            {
              "resolution": 240,
              "size": 19119438
            },
            {
              "resolution": 480,
              "size": 32538081
            },
            {
              "resolution": 720,
              "size": 45223566
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 500000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/4K8f4Lpvi8PlbUybtZSL-A==/109951164810367168.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 500101,
            "birthday": -2209017600000,
            "userId": 1443582368,
            "userType": 0,
            "nickname": "Beloved0907",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951164810367170,
            "backgroundImgId": 109951162868126480,
            "backgroundUrl": "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951164810367168",
            "backgroundImgIdStr": "109951162868126486",
            "avatarImgId_str": "109951164810367168"
          },
          "urlInfo": {
            "id": "15F2D043BDA37897E37C5D0AEAF9983A",
            "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/mLbdHD4s_2942015730_shd.mp4?ts=1606808235&rid=A15AF15317AED757FD2D594765D94608&rl=3&rs=vlptmaydfUOOIxJuonCfyrtSRcriuPUY&sign=9200c6ed839313caa14e06e5b38f89a4&ext=44LBbAL0bGB4jzFlXI9PjmOWBSsOi%2Bmjx%2BeyTVTvVJggTXXx4JYQs9ffPNVunzyizM2X1WZJKOn7uP2DYboXbdSEfPe%2FIeta5etbM6aHE4filz3F%2BzEA0Hr73fz%2FE0QT1LYy10TIndsLwhKd1m1ZtCaMKlJpRpKMfUwVAYQXz2MMpjxSggm8IrUozowEyFDnRL%2BVFjeEvABPZcw6D3ZB4r3iTI4SFR33%2BSywgB19N7MSADZFGI42d6Miqt%2BOQUor",
            "size": 45223566,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": -8003,
              "name": "#点赞榜#",
              "alg": "groupTagRank"
            },
            {
              "id": 57105,
              "name": "粤语现场",
              "alg": "groupTagRank"
            },
            {
              "id": 57106,
              "name": "欧美现场",
              "alg": "groupTagRank"
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "15F2D043BDA37897E37C5D0AEAF9983A",
          "durationms": 131000,
          "playTime": 1693581,
          "praisedCount": 10787,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_B988D266ADE2569EE332081B809ED7DF",
          "coverUrl": "https://p2.music.126.net/SmpZdFxyv3pDmFN-FGxxqg==/109951163570279967.jpg",
          "height": 1280,
          "width": 720,
          "title": "【洪真英】性感洪真英在线打糕",
          "description": "打糕舞",
          "commentCount": 254,
          "shareCount": 298,
          "resolutions": [
            {
              "resolution": 240,
              "size": 20360660
            },
            {
              "resolution": 480,
              "size": 34403111
            },
            {
              "resolution": 720,
              "size": 52130434
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 310000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/N4DckNz4sidJC-oAnpJf0Q==/109951165016327270.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 310101,
            "birthday": 819820800000,
            "userId": 58865261,
            "userType": 0,
            "nickname": "菠菠萝大大",
            "signature": "我是一个勤劳的搬运工",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951165016327260,
            "backgroundImgId": 109951165416072560,
            "backgroundUrl": "http://p1.music.126.net/bp0igcs7AqhAv8k6hbiw3A==/109951165416072561.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951165016327270",
            "backgroundImgIdStr": "109951165416072561",
            "avatarImgId_str": "109951165016327270"
          },
          "urlInfo": {
            "id": "B988D266ADE2569EE332081B809ED7DF",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/pXcUCEIe_1996983272_shd.mp4?ts=1606808235&rid=A15AF15317AED757FD2D594765D94608&rl=3&rs=GEhzeBPVpKDOKABRSxPgPESlhFJXcwbH&sign=dc9f7fa0a9bb203409e7715be972f5ad&ext=44LBbAL0bGB4jzFlXI9PjmOWBSsOi%2Bmjx%2BeyTVTvVJggTXXx4JYQs9ffPNVunzyizM2X1WZJKOn7uP2DYboXbdSEfPe%2FIeta5etbM6aHE4filz3F%2BzEA0Hr73fz%2FE0QT1LYy10TIndsLwhKd1m1ZtCaMKlJpRpKMfUwVAYQXz2MMpjxSggm8IrUozowEyFDnRL%2BVFjeEvABPZcw6D3ZB4r3iTI4SFR33%2BSywgB19N7MSADZFGI42d6Miqt%2BOQUor",
            "size": 52130434,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 57107,
              "name": "韩语现场",
              "alg": "groupTagRank"
            },
            {
              "id": 57110,
              "name": "饭拍现场",
              "alg": "groupTagRank"
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "B988D266ADE2569EE332081B809ED7DF",
          "durationms": 205953,
          "playTime": 874082,
          "praisedCount": 2138,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_329F6DFCE7539B16BD8D3D9375AAF4D9",
          "coverUrl": "https://p2.music.126.net/mipmz5JhcaB6KmBfBvQqSg==/109951163606332815.jpg",
          "height": 1080,
          "width": 1920,
          "title": "一首暴露年龄的歌曲，前奏响起，熟悉的人记忆被拉到当年的旱冰场！",
          "description": null,
          "commentCount": 97,
          "shareCount": 194,
          "resolutions": [
            {
              "resolution": 240,
              "size": 46818944
            },
            {
              "resolution": 480,
              "size": 82733793
            },
            {
              "resolution": 720,
              "size": 124834300
            },
            {
              "resolution": 1080,
              "size": 165218337
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 110000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/4sWaDyT4P_TEvIXQFCfbQA==/109951164160429563.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 110101,
            "birthday": -2209017600000,
            "userId": 1465790417,
            "userType": 0,
            "nickname": "浪味音",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951164160429570,
            "backgroundImgId": 109951162868128400,
            "backgroundUrl": "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "泛生活视频达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "109951164160429563",
            "backgroundImgIdStr": "109951162868128395",
            "avatarImgId_str": "109951164160429563"
          },
          "urlInfo": {
            "id": "329F6DFCE7539B16BD8D3D9375AAF4D9",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/LMaAgGct_2050155537_uhd.mp4?ts=1606808235&rid=A15AF15317AED757FD2D594765D94608&rl=3&rs=hhwQrGoTLKahDJynryFWJhlAzyRUgGdr&sign=f6f2638085613e1ff7f13d506211458c&ext=44LBbAL0bGB4jzFlXI9PjmOWBSsOi%2Bmjx%2BeyTVTvVJggTXXx4JYQs9ffPNVunzyizM2X1WZJKOn7uP2DYboXbdSEfPe%2FIeta5etbM6aHE4filz3F%2BzEA0Hr73fz%2FE0QT1LYy10TIndsLwhKd1m1ZtCaMKlJpRpKMfUwVAYQXz2MMpjxSggm8IrUozowEyFDnRL%2BVFjeEvABPZcw6D3ZB4r3iTI4SFR33%2BSywgB19N7MSADZFGI42d6Miqt%2BOQUor",
            "size": 165218337,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 57110,
              "name": "饭拍现场",
              "alg": "groupTagRank"
            },
            {
              "id": 57106,
              "name": "欧美现场",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "329F6DFCE7539B16BD8D3D9375AAF4D9",
          "durationms": 187478,
          "playTime": 494655,
          "praisedCount": 854,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_15AED2B79603419CAA4C8CDCE796ACD2",
          "coverUrl": "https://p2.music.126.net/LzgQ-1z6QZNSteY_tIxPAQ==/109951163676266635.jpg",
          "height": 720,
          "width": 1280,
          "title": "直戳内心！外国好声音中那些最触动人心的演唱",
          "description": "充沛的情感永远是演唱中打动人心的第一要素。无论是低吟浅唱，高亢嘹亮抑或是声嘶力竭，满含情感的演唱总是能瞬间直戳我们的心灵。一起来看看外国好声音中那些最触动人心的演唱吧",
          "commentCount": 834,
          "shareCount": 1475,
          "resolutions": [
            {
              "resolution": 240,
              "size": 156631550
            },
            {
              "resolution": 480,
              "size": 260859295
            },
            {
              "resolution": 720,
              "size": 367323199
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 310000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/N2aJTiONCaH1CeamZpURQQ==/109951163589830265.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 310101,
            "birthday": 801072000000,
            "userId": 271702583,
            "userType": 200,
            "nickname": "NeilShine_",
            "signature": "我，音乐，世界",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951163589830270,
            "backgroundImgId": 109951163258257120,
            "backgroundUrl": "http://p1.music.126.net/S-F3QRXtgNQRmwabS9gdew==/109951163258257115.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": [
              "欧美"
            ],
            "experts": null,
            "djStatus": 0,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951163589830265",
            "backgroundImgIdStr": "109951163258257115",
            "avatarImgId_str": "109951163589830265"
          },
          "urlInfo": {
            "id": "15AED2B79603419CAA4C8CDCE796ACD2",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/CGBDYkih_2131210046_shd.mp4?ts=1606808235&rid=A15AF15317AED757FD2D594765D94608&rl=3&rs=WYitOEmblAYlrCuGoSXhddMxGxUgMeuG&sign=28c53cd39ce6cd48e0eeabde4f1d6b0b&ext=44LBbAL0bGB4jzFlXI9PjmOWBSsOi%2Bmjx%2BeyTVTvVJggTXXx4JYQs9ffPNVunzyizM2X1WZJKOn7uP2DYboXbdSEfPe%2FIeta5etbM6aHE4filz3F%2BzEA0Hr73fz%2FE0QT1LYy10TIndsLwhKd1m1ZtCaMKlJpRpKMfUwVAYQXz2MMpjxSggm8IrUozowEyFDnRL%2BVFjeEvABPZcw6D3ZB4r3iTI4SFR33%2BSywgB19N7MSADZFGI42d6Miqt%2BOQUor",
            "size": 367323199,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": -8011,
              "name": "#999+分享#",
              "alg": "groupTagRank"
            },
            {
              "id": 57106,
              "name": "欧美现场",
              "alg": "groupTagRank"
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": "groupTagRank"
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "15AED2B79603419CAA4C8CDCE796ACD2",
          "durationms": 1765142,
          "playTime": 1736081,
          "praisedCount": 9913,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_610BF2C2DB75D183A69F3A4B72905BE8",
          "coverUrl": "https://p2.music.126.net/2b9_Flde8CgOl5FBgtKRYA==/109951164194730940.jpg",
          "height": 720,
          "width": 1280,
          "title": "盘点国外好声音舞台上最佳《 Lose Yourself 》翻唱",
          "description": "盘点国外好声音舞台上最佳《 Lose Yourself 》翻唱！每个人都有自己的演唱风格，能够演唱并改编姆爷Eminem的歌，课件实力不俗",
          "commentCount": 306,
          "shareCount": 265,
          "resolutions": [
            {
              "resolution": 240,
              "size": 71455633
            },
            {
              "resolution": 480,
              "size": 126018591
            },
            {
              "resolution": 720,
              "size": 164419734
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 1000000,
            "authStatus": 1,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/t_oV0f-i6-JyENSUFn62uQ==/109951165130826182.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 1003100,
            "birthday": 912268800000,
            "userId": 45144541,
            "userType": 10,
            "nickname": "悦电音",
            "signature": "悦电音不仅有电音，更有料等你来撩。合作请私信",
            "description": "音乐博主",
            "detailDescription": "音乐博主",
            "avatarImgId": 109951165130826180,
            "backgroundImgId": 109951165189340110,
            "backgroundUrl": "http://p1.music.126.net/fMOrlELkfuAaduAXVCe7lw==/109951165189340108.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951165130826182",
            "backgroundImgIdStr": "109951165189340108",
            "avatarImgId_str": "109951165130826182"
          },
          "urlInfo": {
            "id": "610BF2C2DB75D183A69F3A4B72905BE8",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/TRthvPOf_2562518469_shd.mp4?ts=1606808235&rid=A15AF15317AED757FD2D594765D94608&rl=3&rs=DOyFXzqXJCwdBpSCajoRvGJbqplrdbym&sign=2eb00adc3d5cde707ede79a215abe605&ext=44LBbAL0bGB4jzFlXI9PjmOWBSsOi%2Bmjx%2BeyTVTvVJggTXXx4JYQs9ffPNVunzyizM2X1WZJKOn7uP2DYboXbdSEfPe%2FIeta5etbM6aHE4filz3F%2BzEA0Hr73fz%2FE0QT1LYy10TIndsLwhKd1m1ZtCaMKlJpRpKMfUwVAYQXz2MMpjxSggm8IrUozowEyFDnRL%2BVFjeEvABPZcw6D3ZB4r3iTI4SFR33%2BSywgB19N7MSADZFGI42d6Miqt%2BOQUor",
            "size": 164419734,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 14212,
              "name": "欧美音乐",
              "alg": "groupTagRank"
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "610BF2C2DB75D183A69F3A4B72905BE8",
          "durationms": 552323,
          "playTime": 891289,
          "praisedCount": 4597,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_6122DF99A2F47BBB0922D7B91F89CA47",
          "coverUrl": "https://p2.music.126.net/zDujSVTheIxvcct6jvvBjw==/109951164801935525.jpg",
          "height": 720,
          "width": 1280,
          "title": "惊艳世界的天籁童声/德国好声音冠军——Joyline（13岁）",
          "description": null,
          "commentCount": 98,
          "shareCount": 103,
          "resolutions": [
            {
              "resolution": 240,
              "size": 13325127
            },
            {
              "resolution": 480,
              "size": 21807123
            },
            {
              "resolution": 720,
              "size": 26611158
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 410000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/YBDhZ5VrAtrXfuMAQiE3mg==/109951165175950597.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 411700,
            "birthday": 950198400000,
            "userId": 341001505,
            "userType": 204,
            "nickname": "Leslie-夜半歌声",
            "signature": "多年反复的听，还是那么的经典。希望有个能懂我的。",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951165175950600,
            "backgroundImgId": 109951165507263780,
            "backgroundUrl": "http://p1.music.126.net/JiUMtcXRHlECN7Arx1tgeA==/109951165507263782.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 0,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951165175950597",
            "backgroundImgIdStr": "109951165507263782",
            "avatarImgId_str": "109951165175950597"
          },
          "urlInfo": {
            "id": "6122DF99A2F47BBB0922D7B91F89CA47",
            "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/wRbe2D5Z_2937960275_shd.mp4?ts=1606808235&rid=A15AF15317AED757FD2D594765D94608&rl=3&rs=wVhAhbDAkERUZTeXEaJSWSAxdDDtSFOw&sign=32238accc5c7a4e954fdc5c44179cc31&ext=44LBbAL0bGB4jzFlXI9PjmOWBSsOi%2Bmjx%2BeyTVTvVJggTXXx4JYQs9ffPNVunzyizM2X1WZJKOn7uP2DYboXbdSEfPe%2FIeta5etbM6aHE4filz3F%2BzEA0Hr73fz%2FE0QT1LYy10TIndsLwhKd1m1ZtCaMKlJpRpKMfUwVAYQXz2MMpjxSggm8IrUozowEyFDnRL%2BVFjeEvABPZcw6D3ZB4r3iTI4SFR33%2BSywgB19N7MSADZFGI42d6Miqt%2BOQUor",
            "size": 26611158,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": -24896,
              "name": "#精选欧美百首经典老歌#",
              "alg": "groupTagRank"
            },
            {
              "id": 3101,
              "name": "综艺",
              "alg": "groupTagRank"
            },
            {
              "id": 13172,
              "name": "欧美",
              "alg": "groupTagRank"
            },
            {
              "id": 4101,
              "name": "娱乐",
              "alg": "groupTagRank"
            },
            {
              "id": 58101,
              "name": "听BGM",
              "alg": "groupTagRank"
            },
            {
              "id": 58100,
              "name": "现场",
              "alg": "groupTagRank"
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "The Power of Love",
              "id": 2310341,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 50893,
                  "name": "Celine Dion",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": "600902000006762655",
              "fee": 1,
              "v": 22,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 233121,
                "name": "The Colour Of My Love",
                "picUrl": "http://p3.music.126.net/z5YR5byoFd0EoWKkZ9zIhA==/109951163729309155.jpg",
                "tns": [],
                "pic_str": "109951163729309155",
                "pic": 109951163729309150
              },
              "dt": 343333,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 13736272,
                "vd": -27355
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 8241781,
                "vd": -24757
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 5494535,
                "vd": -23152
              },
              "a": null,
              "cd": "1",
              "no": 1,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "cp": 7001,
              "mv": 5961257,
              "publishTime": 752774400007,
              "privilege": {
                "id": 2310341,
                "fee": 1,
                "payed": 0,
                "st": 0,
                "pl": 0,
                "dl": 0,
                "sp": 0,
                "cp": 0,
                "subp": 0,
                "cs": false,
                "maxbr": 999000,
                "fl": 0,
                "toast": false,
                "flag": 1284,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "6122DF99A2F47BBB0922D7B91F89CA47",
          "durationms": 149583,
          "playTime": 474538,
          "praisedCount": 1918,
          "praised": false,
          "subscribed": false
        }
      }
    ];
    videoList.push(...videolist)
    this.setData({
      videoList
    })
  },
  // 跳转到搜索页面
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
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
    console.log("页面下拉刷新")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面触底");

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({ from }) {
    //  console.log(from)
    if (from === 'button') {
      return {
        title: "自定义video页面button转发",
        path: "/pages/video/video",
        imageUrl: "/static/images/nvsheng.jpg"
      }
    } else {
      return {
        title: "自定义menu转发",
        path: "/pages/video/video",
        imageUrl: "/static/images/nvsheng.jpg"
      }
    }
  }
})