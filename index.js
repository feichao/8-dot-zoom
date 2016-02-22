var zoomWrap;
var className;

var startPoint = {
  x: 0,
  y: 0
};

var isMoveFlag = {
  upDown: false,
  leftRight: false
};


document.onmousedown = function(e) {
  startPoint = {
    x: e.clientX,
    y: e.clientY
  };

  className = e.target.className.split(' ');
  if(className.indexOf('zoom-e') !== -1 || className.indexOf('zoom-se') !== -1 || className.indexOf('zoom-ne') !== -1
    || className.indexOf('zoom-w') !== -1 || className.indexOf('zoom-sw') !== -1 || className.indexOf('zoom-nw') !== -1) {
    isMoveFlag.leftRight = true;
  } 

  if(className.indexOf('zoom-n') !== -1 || className.indexOf('zoom-nw') !== -1 || className.indexOf('zoom-ne') !== -1
    || className.indexOf('zoom-s') !== -1 || className.indexOf('zoom-sw') !== -1 || className.indexOf('zoom-se') !== -1) {
    isMoveFlag.upDown = true;
  } 

  if(className.indexOf('zoom-n') !== -1 ||  className.indexOf('zoom-nw') !== -1 || className.indexOf('zoom-ne') !== -1) {
    isMoveFlag.reverseUpDown = true;
  }

  if(className.indexOf('zoom-w') !== -1 || className.indexOf('zoom-nw') !== -1 || className.indexOf('zoom-sw') !== -1) {
    isMoveFlag.reverseLeftRight = true;
  }

}

document.onmousemove = function(e) {
  e.preventDefault();

  if(isMoveFlag.leftRight) {
    if(isMoveFlag.reverseLeftRight) { 
      zoomWrap.style.width = zoomWrap.offsetWidth + startPoint.x - e.clientX + 'px';
    } else {
      zoomWrap.style.width = zoomWrap.offsetWidth + e.clientX - startPoint.x + 'px';
    }
  }

  if(isMoveFlag.upDown) {
    if(isMoveFlag.reverseUpDown) {
      zoomWrap.style.height = zoomWrap.offsetHeight + startPoint.y - e.clientY + 'px';
    } else {
      zoomWrap.style.height = zoomWrap.offsetHeight + e.clientY - startPoint.y + 'px';
    }
  }

  if(isMoveFlag.reverseUpDown) {
    zoomWrap.style.top = zoomWrap.offsetTop + e.clientY - startPoint.y + 'px';
  }

  if(isMoveFlag.reverseLeftRight) {
    zoomWrap.style.left = zoomWrap.offsetLeft + e.clientX - startPoint.x + 'px';
  }

  startPoint = {
    x: e.clientX,
    y: e.clientY
  };
}

document.onmouseup = function(e) {
  isMoveFlag.leftRight = false;
  isMoveFlag.upDown = false;
  isMoveFlag.reverseUpDown = false;
  isMoveFlag.reverseLeftRight = false;
}

window.onload = function() {
  zoomWrap = document.getElementById('zoom-wrap');
  
}