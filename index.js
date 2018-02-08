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
	
	bind: function(){
		var _this = this
		_this.$element.scroll(function(){
			console.log('aaa')
			if(_this.isToBottom()){
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
	getData: function(callback){
		var _this = this
        if(_this.isLoading) return;
        _this.isLoading = true
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
	render: function(data){
        var _this = this
        data.subjects.forEach(function(movie){
        	var tpl = `<div class="item">
 						<a href="#">
 							<div class="cover">
							    <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
					        </div>
							<div class="detail">
 								<h2>肖申克的救赎</h3>
 								<p><span class='score'>9.6</span>分/<span class='collect'>1212264</span>收藏</p>
 								<p><span class='year'>1994</span>/<span class='type'>犯罪/剧情</span></p>
 								<p class='extra'>导演:<span class='directors'>弗兰克·德拉邦特</span></p>
 								<p class='extra'>主演: <span class="casts">蒂姆·罗宾斯、摩根·弗里曼、鲍勃·冈顿</span></p>
 							</div>
 					    </a>
 					</div>`
	 		var $node = $(tpl)
	 		$node.find('.cover img').attr('src',movie.images.medium)
	 		$node.find('.detail h2').text(movie.title)
	 		$node.find('.detail .score').text(movie.rating.average)
	 		$node.find('.detail .collect').text(movie.collect_count)
	 		$node.find('.detail .year').text(movie.year)
	 		$node.find('.detail .type').text(movie.genres.join('/'))
	 		$node.find('.detail .directors').text(function(){
	 			var directorsArr = []
	            movie.directors.forEach(function(item){
	                  directorsArr.push(item.name)
	            })
            return directorsArr.join('、')
            })

	 	$node.find('.detail .casts').text(function(){
 			var castsArr = []
 			movie.casts.forEach(function(item){
 				castsArr.push(item.name)
 			})
 			return castsArr.join('、')
 		})	
        _this.$container.append($node)
        })   
	},
	
	isToBottom : function(){
		return this.$container.height()-10 <= this.$element.height() + this.$element.scrollTop()
	}

}

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

	getData: function(callback){
		var _this = this
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
	render: function(data){
          var _this = this
        data.subjects.forEach(function(movie){

        	var tpl = `<div class="item">
 						<a href="#">
 							<div class="cover">
							    <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
					        </div>
							<div class="detail">
 								<h2>肖申克的救赎</h3>
 								<p><span class='score'>9.6</span>分/<span class='collect'>1212264</span>收藏</p>
 								<p><span class='year'>1994</span>/<span class='type'>犯罪/剧情</span></p>
 								<p class='extra'>导演:<span class='directors'>弗兰克·德拉邦特</span></p>
 								<p class='extra'>主演: <span class="casts">蒂姆·罗宾斯、摩根·弗里曼、鲍勃·冈顿</span></p>
 							</div>
 					    </a>
 					</div>`
	 		var $node = $(tpl)
	 		$node.find('.cover img').attr('src',movie.subject.images.medium)
	 		$node.find('.detail h2').text(movie.subject.title)
	 		$node.find('.detail .score').text(movie.subject.rating.average)
	 		$node.find('.detail .collect').text(movie.subject.collect_count)
	 		$node.find('.detail .year').text(movie.subject.year)
	 		$node.find('.detail .type').text(movie.subject.genres.join('/'))
	 		$node.find('.detail .directors').text(function(){
	 			var directorsArr = []
	            movie.subject.directors.forEach(function(item){
	                  directorsArr.push(item.name)
	            })
            return directorsArr.join('、')
            })

	 	$node.find('.detail .casts').text(function(){
 			var castsArr = []
 			movie.subject.casts.forEach(function(item){
 				castsArr.push(item.name)
 			})
 			return castsArr.join('、')
 		})	
        _this.$container.append($node)
        })    
	}

}

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
        	console.log(_this.keyWord)

        })
	},
	start: function(){
		var _this = this
		this.getData(function(data){
			_this.render(data)
		})

	},
	getData: function(callback){
        var _this = this
        if(this.isLoading) return
        this.isLoading = true
        _this.$element.find('.loading').hide()

        $.ajax({
        	url:'https://api.douban.com//v2/movie/search',
        	type:'GET',
        	dataType: 'jsonp',
        	data: {
        		start: _this.index,
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
        	_this.isLoading = false
        	_this.$element.find('.loading').hide()
        })
	},
	render: function(data){
		var _this = this
		data.subjects.forEach(function(movie){
        	var tpl = `<div class="item">
 						<a href="#">
 							<div class="cover">
							    <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
					        </div>
							<div class="detail">
 								<h2>肖申克的救赎</h3>
 								<p><span class='score'>9.6</span>分/<span class='collect'>1212264</span>收藏</p>
 								<p><span class='year'>1994</span>/<span class='type'>犯罪/剧情</span></p>
 								<p class='extra'>导演:<span class='directors'>弗兰克·德拉邦特</span></p>
 								<p class='extra'>主演: <span class="casts">蒂姆·罗宾斯、摩根·弗里曼、鲍勃·冈顿</span></p>
 							</div>
 					    </a>
 					</div>`
	 		var $node = $(tpl)
	 		$node.find('.cover img').attr('src',movie.images.medium)
	 		$node.find('.detail h2').text(movie.title)
	 		$node.find('.detail .score').text(movie.rating.average)
	 		$node.find('.detail .collect').text(movie.collect_count)
	 		$node.find('.detail .year').text(movie.year)
	 		$node.find('.detail .type').text(movie.genres.join('/'))
	 		$node.find('.detail .directors').text(function(){
	 			var directorsArr = []
	            movie.directors.forEach(function(item){
	                  directorsArr.push(item.name)
	            })
            return directorsArr.join('、')
            })

	 	$node.find('.detail .casts').text(function(){
 			var castsArr = []
 			movie.casts.forEach(function(item){
 				castsArr.push(item.name)
 			})
 			return castsArr.join('、')
 		})	
        _this.$container.append($node)
        }) 

    }
}

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

app.init()