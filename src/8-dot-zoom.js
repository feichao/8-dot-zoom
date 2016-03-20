;
(function(global, doc, undefined) {

  var eightZoomSys = {
    zoomElements: [],
    zoomWrapElement: undefined,
    currentZoomElement: undefined,
    isElementMove: false,
    startPoint: {
      x: 0,
      y: 0
    },
    currentPosition: {
      top: 0,
      left: 0,
      heigth: 0,
      width: 0
    },
    isMoveFlag: {
      leftRight: false,
      upDown: false,
      reverseUpDown: false,
      reverseLeftRight: false,
      isMoving: false
    },
    initElement: function() {
      var zoomWrap = doc.createElement('div');
      zoomWrap.className = 'zoom-wrap';
      var zoom1 = doc.createElement('div');
      zoom1.className = 'zoom-anchor zoom-nw';
      var zoom2 = doc.createElement('div');
      zoom2.className = 'zoom-anchor zoom-n';
      var zoom3 = doc.createElement('div');
      zoom3.className = 'zoom-anchor zoom-ne';
      var zoom4 = doc.createElement('div');
      zoom4.className = 'zoom-anchor zoom-e';
      var zoom5 = doc.createElement('div');
      zoom5.className = 'zoom-anchor zoom-se';
      var zoom6 = doc.createElement('div');
      zoom6.className = 'zoom-anchor zoom-s';
      var zoom7 = doc.createElement('div');
      zoom7.className = 'zoom-anchor zoom-sw';
      var zoom8 = doc.createElement('div');
      zoom8.className = 'zoom-anchor zoom-w';

      zoomWrap.appendChild(zoom1);
      zoomWrap.appendChild(zoom2);
      zoomWrap.appendChild(zoom3);
      zoomWrap.appendChild(zoom4);
      zoomWrap.appendChild(zoom5);
      zoomWrap.appendChild(zoom6);
      zoomWrap.appendChild(zoom7);
      zoomWrap.appendChild(zoom8);

      doc.body.appendChild(zoomWrap);

      this.zoomWrapElement = zoomWrap;
    },
    resetPosition: function() {
      this.currentZoomElement.style.left = this.zoomWrapElement.style.left = this.currentPosition.left;
      this.currentZoomElement.style.top = this.zoomWrapElement.style.top = this.currentPosition.top;
      this.currentZoomElement.style.height = this.zoomWrapElement.style.height = this.currentPosition.height;
      this.currentZoomElement.style.width = this.zoomWrapElement.style.width = this.currentPosition.width;
    },
    isElementMove: function() {
      return this.isMoveFlag.leftRight || this.isMoveFlag.upDown || this.isMoveFlag.reverseUpDown || this.isMoveFlag.reverseLeftRight ||
        this.isMoveFlag.isMoving;
    },
    onElementMouseDown: function(event) {
      var target = event.target;

      this.currentZoomElement = target;
      this.startPoint = {
        x: event.clientX,
        y: event.clientY
      };

      this.currentZoomElement.style.position = 'absolute';
      this.currentPosition = {
        top: target.offsetTop,
        left: target.offsetLeft,
        height: target.offsetHeight,
        width: target.offsetWidth
      };

      this.isMoveFlag.isMoving = true;

      this.resetPosition();
    },
    onMouseDown: function(event) {
      this.startPoint = {
        x: event.clientX,
        y: event.clientY
      };

      var className = event.target.className.split(' ');
      if (className.indexOf('zoom-e') !== -1 || className.indexOf('zoom-se') !== -1 || className.indexOf('zoom-ne') !== -1 || className.indexOf('zoom-w') !== -1 || className.indexOf('zoom-sw') !== -1 || className.indexOf('zoom-nw') !== -1) {
        this.isMoveFlag.leftRight = true;
      }

      if (className.indexOf('zoom-n') !== -1 || className.indexOf('zoom-nw') !== -1 || className.indexOf('zoom-ne') !== -1 || className.indexOf('zoom-s') !== -1 || className.indexOf('zoom-sw') !== -1 || className.indexOf('zoom-se') !== -1) {
        this.isMoveFlag.upDown = true;
      }

      if (className.indexOf('zoom-n') !== -1 || className.indexOf('zoom-nw') !== -1 || className.indexOf('zoom-ne') !== -1) {
        this.isMoveFlag.reverseUpDown = true;
      }

      if (className.indexOf('zoom-w') !== -1 || className.indexOf('zoom-nw') !== -1 || className.indexOf('zoom-sw') !== -1) {
        this.isMoveFlag.reverseLeftRight = true;
      }

      if (className.indexOf('zoom-wrap') !== -1) {
        this.isMoveFlag.isMoving = true;
      }

      if (this.isElementMove() && this.currentZoomElement) {
        this.zoomWrapElement.style.display = 'block';
      } else {
        this.zoomWrapElement.style.display = 'none';
      }
    },
    onMouseMove: function(event) {
      if (this.isMoveFlag.leftRight) {
        if (this.isMoveFlag.reverseLeftRight) {
          this.currentPosition.width += this.startPoint.x - event.clientX;
        } else {
          this.currentPosition.width += event.clientX - this.startPoint.x;
        }
      }

      if (this.isMoveFlag.upDown) {
        if (this.isMoveFlag.reverseUpDown) {
          this.currentPosition.height += this.startPoint.y - event.clientY;
        } else {
          this.currentPosition.height += event.clientY - this.startPoint.y;
        }
      }

      if (this.isMoveFlag.reverseUpDown || this.isMoveFlag.isMoving) {
        this.currentPosition.top += event.clientY - this.startPoint.y;
      }

      if (this.isMoveFlag.reverseLeftRight || this.isMoveFlag.isMoving) {
        this.currentPosition.left += event.clientX - this.startPoint.x;
      }

      if (this.isElementMove() && this.currentZoomElement) {
        event.preventDefault();
        this.resetPosition();
      }

      this.startPoint = {
        x: event.clientX,
        y: event.clientY
      };

    },
    onMouseUp: function() {
      this.isMoveFlag.leftRight = false;
      this.isMoveFlag.upDown = false;
      this.isMoveFlag.reverseUpDown = false;
      this.isMoveFlag.reverseLeftRight = false;
      this.isMoveFlag.isMoving = false;
    }
  };

  window.addEventListener('load', function() {
    //query all eight-dot-zoom elements and bind event;
    eightZoomSys.zoomElements = doc.querySelectorAll('[eight-dot-zoom]');
    Array.prototype.forEach.call(eightZoomSys.zoomElements, function(element) {
      element.addEventListener('mousedown', eightZoomSys.onElementMouseDown.bind(eightZoomSys));
    });

    //insert eight-dot-zoom elements
    eightZoomSys.initElement();
  });

  doc.addEventListener('mousedown', eightZoomSys.onMouseDown.bind(eightZoomSys));
  doc.addEventListener('mousemove', eightZoomSys.onMouseMove.bind(eightZoomSys));
  doc.addEventListener('mouseup', eightZoomSys.onMouseUp.bind(eightZoomSys));

})(window, document);