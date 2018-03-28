define(['jquery','helper'],function($,helper){
	//搜索
	var search = {
		init: function(){

			console.log('search ok')
			this.$element = $('#search')
			this.$container = this.$element.find('.container')
			this.keyWord = ''
			this.index = 0
			this.isFinish = false
			this.isLoading = false
	        
	        this.bind()
	        
		},
		bind: function(){
	        _this = this
	        this.$container.find('.button').on('click',function(){
	        	_this.keyWord = _this.$container.find('input').val()
	        	_this.start()
	        })
		},
		start: function(){
			var _this = this
			this.getData(function(data){
				_this.render(data)
			})

		},
		getData: function(callback){ //得到数据
	        var _this = this

	        //加载状态
	        _this.$element.find('.loading').show()

	        $.ajax({
	        	url:'https://api.douban.com//v2/movie/search',
	        	type:'GET',
	        	dataType: 'jsonp',
	        	data: {
	        		q: _this.keyWord
	        	}
	        }).done(function(ret){
	        	console.log(ret)
	        	_this.index += 20
	        	if(_this.index >= ret.total){
	            	_this.isFinish = true
	            }
	        	callback&&callback(ret)
	        }).fail(function(){
	        	console.log('数据异常')
	        }).always(function(){
	        	_this.$element.find('.loading').hide()
	        })
		},
		render: function(data){ //渲染
			var _this = this
			data.subjects.forEach(function(movie){
	        _this.$container.append(helper.createNode(movie))
	        }) 

	    }
	}
	return search
})