define(['jquery','helper'],function($,helper){
	var top250 = {
		init: function(){
			var _this = this
	       this.$element = $('#top250')
	       this.$container = this.$element.find('.container')
	       this.index = 0
	       this.isLoading = false
	       this.isFinish = false
	       
	       this.bind()
	       this.start()
	       
	    },
		
		//触发事件
		bind: function(){
			var _this = this
			_this.$element.scroll(function(){
				console.log('aaa')
				if(!_this.isFinish&&helper.isToEnd(_this.$element,_this.$container)){
					_this.start()
				}
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
			//状态锁
	        if(_this.isLoading) return;
	        _this.isLoading = true

	        //加载状态
			_this.$element.find('.loading').show()
	        $.ajax({
	        	url:'https://api.douban.com/v2/movie/top250',
	     	    type:'GET',
	        	data:{
	        		start:_this.index || 0

	        	},
	        	dataType: 'jsonp'
	        }).done(function(ret){
	        	console.log(ret)
	            _this.index += 20
	            //判断数据是否到底
	            if(_this.index >= ret.total){
	            	_this.isFinish = true
	            }
	            callback&&callback(ret)
	            console.log(_this.$container.height())
	        }).fail(function(){
	        	console.log('数据异常')
	        }).always(function(){
	        	_this.isLoading = false
	        	_this.$container.find('.loading').hide()
	        })
		},
		render: function(data){  //渲染
	        var _this = this
	        data.subjects.forEach(function(movie){
	            _this.$container.append(helper.createNode(movie))
	        })   
		},
		
		isToBottom : function(){
			return this.$container.height()-10 <= this.$element.height() + this.$element.scrollTop()
		}
	}
	return top250
})