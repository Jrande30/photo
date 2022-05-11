import React from 'react';
import domtoimage from 'dom-to-image-more';

function downloadAsJpeg(){
    let node = document.getElementById('upload-image');
    domtoimage.toJpeg(node, { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-new-image.jpeg';
        link.href = dataUrl;
        link.click();
    });
  }

  export default downloadAsJpeg;