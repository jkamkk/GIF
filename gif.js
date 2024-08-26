var images = [];  // 这应该是用户上传的图片
var delay = document.getElementById('delay').value;  // 这应该是用户设置的延迟时间

var gif = new GIF({
  workers: 2,
  quality: 10
});

// 添加图片到GIF
for(var i = 0; i < images.length; i++) {
  gif.addFrame(images[i], {delay: delay});
}

gif.on('finished', function(blob) {
  // 显示生成的GIF
  var img = document.getElementById('result');
  img.src = URL.createObjectURL(blob);
});

gif.render();
