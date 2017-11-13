(function() {
	//This part is the piechart
	$('.chart').waypoint(function(){
		$(this).easyPieChart({
		barColor: 'rgba(66, 68, 69, 1)',
		trackColor: 'rgba(215, 219, 221, 0.6)',
		lineWidth: 10,
		animate: 1000,
		size: 100,
		onStep: function(from, to, percent) {
					$(this.el).find('.percent').text(Math.round(percent));
				}
			});
		}, {
			triggerOnce: true,
			offset: 'bottom-in-view'
	});
	//ToScroll
	$('a[href^="#"]').on('click', function() {
		$('body').animate({
			scrollTop: $(this.hash).offset().top}, 1000
		);
		return true;
	});
	//Change the color of scroll bar
	$(window).on('load scroll resize', onScreen);
	function onScreen() {
		$('.section').each(function() {
			var windowScroll = $(document).scrollTop();
			var navHeight = $('nav_ul').height();
			var $this = $(this);
			if((windowScroll + navHeight >= $this.offset().top) &&
				(windowScroll + navHeight) <= $this.offset().top + $this.height()) {
				$('.nav_a_' + $this.attr('id')).css('color', 'orange');
			} else {
				$('.nav_a_' + $this.attr('id')).css('color', 'white');
			}
		});
	}
})();