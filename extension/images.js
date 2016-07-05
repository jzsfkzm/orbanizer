var orban = new Image();
orban.src = chrome.extension.getURL('images/orban.png');

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  var img = document.createElement('img');
  img.onload = function() {
    $(img).faceDetection({
      complete: function (faces) {
        if(faces.length === undefined || faces.length == 0){
          return false;
        }

        var can = document.createElement('canvas');
        can.width = img.width;
        can.height = img.height;
        var ctx = can.getContext('2d');
        ctx.drawImage(img,0 ,0);

        faces.forEach(function(face){
          ctx.drawImage(orban, face.x, face.y, face.width, orban.height * face.width/orban.width);
        });

        var imgData = can.toDataURL('image/png');
        chrome.tabs.sendMessage(sender.tab.id, {uri: imgData, imgId: request.imgId});
      }
    });
  };
  img.src = request.url;

  return true;
});