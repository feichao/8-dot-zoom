### 主题

  原生JS实现的8点拖拽缩放系统。

  [demo](http://blog.0xfc.cn/2016/03/20/eight-dot-zoom/)

### 详情
  使页面中的任何元素都可以实现拖拽缩放的功能，只要在HTML属性中添加eight-dot-zoom即可。支持IE8以上现代浏览器。
  


  如何使用：

   1. 引用8-dot-zoom.css和8-dot-zoom.js

   2. 在需要移动的元素上添加eight-dot-zoom属性

    如下：
``` html
<img src="..." eight-dot-zoom/>
```
   3. 引用完8-dot-zoom.js后可以使用下述方式指出拖拽边界：

```javascript
//指定拖拽元素的父元素的位置信息为其边界
window.EightZoomSys.demarcation = 'parent';
//指定某一元素的位置信息为其边界
window.EightZoomSys.demarcation = Element;
//直接指定边界
window.EightZoomSys.demarcation = {
    top: 100,
    left: 100,
    width: 500,
    height: 500
}
```
