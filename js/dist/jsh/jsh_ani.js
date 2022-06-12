// need JQuery
function JshAni(arrEl, option) {
	this.element = arrEl;
	this.option = option;

	// 해당 화면에 나오면 그때 실행
	scrollShow = false;
	if(this.option.scrollShow) {
		scrollShow = true;
	}

	if(scrollShow) {
		this.setScrollActive();
		this.removeScrollActive();
		var _this = this;
		
		$(window).scroll(function(){
			_this.setScrollActive();
			_this.removeScrollActive();
		});
	} else {
		this.setActive();
	}
}


JshAni.prototype.setActive = function(){

	$(this.element).each(function(index, item){
		var $item = $(item);

		if(!$item.data("delay")) {
			$(item).addClass("active");	
		} else {
			var delay = $item.data("delay");
			setTimeout(function() {
				$(item).addClass("active");	
			}, delay);
		}
	});

};

JshAni.prototype.removeActive = function(){
	$(this.element).each(function(index, item){
		var $item = $(item);
		$(item).removeClass("active");	
	});
};


JshAni.prototype.setScrollActive = function(){

	$(this.element).each(function(index, item){
		var $item = $(item);

		var $windowHeight = $(window).height();
		if($(window).scrollTop()+($windowHeight/1.2) >= $item.offset().top){
			if(!$item.data("delay")) {
				$(item).addClass("active");	
			} else {
				var delay = $item.data("delay");
				setTimeout(function() {
					$(item).addClass("active");	
				}, delay);
			}
		} 
		

	});

}

JshAni.prototype.removeScrollActive = function(){

	$(this.element).each(function(index, item){
		var $item = $(item);
		if(scrollShow) {
			var $windowHeight = $(window).height();

			// 일반 스크롤
			if($(document).height() != $(window).scrollTop() + $windowHeight ) {
				if($(window).scrollTop()+($windowHeight/1.2) < $item.offset().top){
					
					if(!$item.data("delay")) {
						$(item).removeClass("active");	
					} else {
						var delay = $item.data("delay");
						setTimeout(function() {
							$(item).removeClass("active");	
						}, delay);
					}
				}
			} else {
				// 스크롤이 제일 아래에 왔을 때
				if(!$item.data("delay")) {
					$(item).addClass("active");	
				} else {
					var delay = $item.data("delay");
					setTimeout(function() {
						$(item).addClass("active");	
					}, delay);
				}
			}
		}

	});

}