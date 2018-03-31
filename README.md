# 移动端的豆瓣电影排行榜
![](https://liqinan1994.github.io/douban-movie/src/1522467101.png)

 请使用*手机浏览器扫一扫 *或 电脑开启*device mode*浏览


### jquery + ajax + 面向对象 实现豆瓣电影


- **滚动懒加载**
```
# 判断是否滚到底了
this.$element.find('#top250') <= this.$element.height() + this.$element.scrollTop() + 10
```
- **加载数据状态锁**
```
# 开始loading设为false
this.isloading = false   

# 得到数据
if ( _this.isloading) {return}  // 还没发,return
_this.isloading = true  // 要发请求,设为true

# 数据到来之后
_this.isloading = false  // 无论成功还是失败都为false
```
- **函数节流**
```
var clock;
// 清除定时器
if(clock){
  clearTimeout(clock)
}
// 设置定时器
clock = setTimeout(function(){

},300)
```
- **loading状态**
```
# html loading 默认隐藏
<div class="loading"><span class="iconfont icon-loading"></span> </div>

# css
animation: 1s load linear infinite;
@keyframes load{
	0% {transform: rotate(0deg);}
	100% {transform: rotate(360deg);}
}

# 加载状态
_this.$element.find('.loading').show()

# 数据到来之后
_this.$element.find('.loading').hide()
```


### 页面构成
- Top250页面
- 北美页面
- 搜索页面

### 数据来源
```
top250 : http://api.douban.com/v2/movie/top250
北美 : http://api.douban.com/v2/movie/us_box
搜索 : http://api.douban.com/v2/movie/search
```
- 获取数据来拼装大段字符串,拼装字符串三种方式
1. 字符串模板 
2. 转义符 \
3. 使用 + 操作符  '+'


### 移动端调试
```
# 全局安装 browser-sync
$ npm install -g browser-sync

# 启动 browser-sync 打开静态服务器
$ browser-sync start --server
```
### 移动端必备
```
# 解决的问题即无视设备的真实分辨率，直接通过dpi，在物理尺寸和浏览器之间重设分辨率，这个分辨率和设备的分辨率无关。
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
width=device-width : 宽度是设备屏幕的宽度
user-scaleble : 用户不能手动缩放
initial-scale : 初始化缩放比例
maximum-scale ：允许用户缩放到的最大比例。
minimum-scale ：允许用户缩放到的最小比例。
```

### require.js
- 使用符合`AMD`规范的`RequireJS`解决命名冲突和文件依赖的问题
```
# 示例
define('modal', ['jQuery', 'dialog'], function($, Dialog){
    $('.modal').show();
    Dialog.open();
});
```
- 使用r.js打包应用
```
# build.js
({
	baseUrl: 'js',
	name: 'main',
	out: 'dist/index.merge.min.js'
})
```


