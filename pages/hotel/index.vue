<template>
  <div style="padding:20px">
  
      hotel
      <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted(){
   window.onLoad  = function(){
    var map = new AMap.Map('container',{
        zoom:11,//级别
        center: [116.397428, 39.90923],//中心点坐标
    });
    var marker = new AMap.Marker({
        position:[116.39, 39.9]//位置
    })
    map.add(marker);//添加到地图
    
    }
    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=6ef6db439364cf5ab5c6a09ade8e3e67&callback=onLoad';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
}
</script>

<style scoped>
#container{
  width:500px;
  height: 300px;
}
</style>