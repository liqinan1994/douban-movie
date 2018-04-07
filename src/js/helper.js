define(['jquery'],function($){
	var helper = {
		isToEnd: function($viewport,$content){
	       return $viewport.height() + $viewport.scrollTop() +10 >= $content.height()
		},
		createNode: function(movie){
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
		 		$node.find('a').attr('href',movie.alt)
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
	 		return $node
		}
	}
	return helper
})