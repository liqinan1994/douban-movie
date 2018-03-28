define(['top250','usBox','search','jquery'],function(top250,usBox,search,$){
	var app = {
		init: function(){
			this.$tabs = $('footer>div')
			this.$panels = $('section')
			this.bind()
			top250.init()
			usBox.init()
			search.init()
		},

		bind: function(){
			var _this = this
			this.$tabs.on('click',function(){
				$(this).addClass('active').siblings().removeClass('active')
	            _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
			})
		}
	}
	return app   
})