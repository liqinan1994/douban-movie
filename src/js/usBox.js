define(['jquery','helper'],function($,helper){
	//北美
	var usBox = {
		init: function(){
	      this.$element = $('#beimei')
	      this.$container = this.$element.find('.container')
	 
	      this.start()
		},

		start: function(){
	      var _this = this
	      this.getData(function(data){
	      	_this.render(data)
	      })
		},

		getData: function(callback){ //获取数据
			var _this = this

			//加载状态
			_this.$element.find('.loading').show()
	        $.ajax({
	        	url:'https://api.douban.com//v2/movie/us_box',
	     	    type:'GET',
	        	dataType: 'jsonp'
	        }).done(function(ret){
	        	console.log(ret)          
	            callback&&callback(ret)
	        }).fail(function(){
	        	console.log('数据异常')
	        }).always(function(){
	        	_this.$container.find('.loading').hide()
		    })
		},
		render: function(data){  //渲染
	          var _this = this
	        data.subjects.forEach(function(movie){
	         _this.$container.append(helper.createNode(movie.subject))
	        })    
		}

	}
	return usBox
})