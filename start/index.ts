import collectInfo from './collectInfo';
const coll = new collectInfo({
    elementTiming: true,
    captureError:true,
    logUrl: 'http://localhost:7089/insertSourmap', //sourceMap
    rrwebUrl:'http://localhost:7089/uploadrrweb',//存储rrweb
    permaceUrl:'http://localhost:7089/uploadPermace',//存储性能指标
    isRrweb:true,
    module:'vue-hjgh'
  });
  
  console.log('🐻', coll);