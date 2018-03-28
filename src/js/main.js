require.config({
	baseUrl:"src/js"
})

//加载入口模块
require(['app'],function(App){
	App.init()
})