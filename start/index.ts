import collectInfo from '../src/collectInfo';
const coll = new collectInfo({
  resourceTiming: false,
  elementTiming: false,
  captureError: true,//是否开启错误跟踪
  isRrweb: true,//是否开启用户操作录制
  logUrl: 'http://localhost:8852/insertSourceMapLog',//上传错误文件sourcemap的地址
  rrwebUrl: 'http://localhost:8852/insertRrwebLog',//用户操作的视频上传地址
  permaceUrl: 'http://localhost:8852/uploadPermace',//界面性能的上传地址
  // maxTime: '',//最大测试时间
  module: 'vue-hjgh',//软件名称
});

