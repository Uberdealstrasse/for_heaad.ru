// Заглушка для пустых ссылок

$('a').click(function() {
	if ($(this).attr('href') == '#') {
		return false;
	}
});

// Меню на телефоне

$('.open_menu, .bg_all, .hide_menu .blue_button').click(function() {
	$('.bg_all').toggleClass('bg_all_active');
	$('.hide_menu').toggleClass('hide_menu_active');
});

var returnMobileMenu = false;

$('.hide_menu li p').click(function() {

	if (returnMobileMenu) {
		return;
	} else {
		returnMobileMenu = true;
	}

	if ($('.mobile_menu_category_active').length > 0) {
		$('.mobile_menu_category_active div').animate({height: 'hide'}, 700, function() {
			$(this).closest('li').removeClass('mobile_menu_category_active');
			returnMobileMenu = false;
		});
	}

	if ($(this).closest('li').hasClass('mobile_menu_category_active')) {
		return;
	}

	$(this).closest('li').addClass('mobile_menu_category_active');

	$(this).next('div').animate({height: 'show'}, 700, function() {
		$(this).closest('li').addClass('mobile_menu_category_active');
		returnMobileMenu = false;
	});

});

// Открытие окон

function openWindow(name) {

	window.location = location.pathname + '#' + name;

	if ($('.windows .active_window').length > 0) {
		$('.windows .active_window').animate({opacity: 'hide'}, 300, function() {
			$('.' + name).animate({opacity: 'show'}, 300, function() {
				$('.windows .active_window').removeClass('active_window');
				$(this).addClass('active_window');
			});
		});
	} else {
		$('html, body').css({overflow: 'hidden'});
		$('.windows').animate({opacity: 'show'}, 300, function() {
			$('.' + name).animate({opacity: 'show'}, 300, function() {
				$(this).addClass('active_window');
			});
		});
	}

}

$('.windows .close').click(function() {
	$(this).closest('.active_window').animate({opacity: 'hide'}, 300, function() {
		$('.windows').animate({opacity: 'hide'}, 300, function() {
			$('.windows .active_window').removeClass('active_window');
			$('html, body').css({overflow: 'auto'});
		});
	});
});


// Маска телефона

$(document).ready(function() {
  $('.phone').inputmask("mask", {"mask": "+7 (999) 999-99-99"}); //specifying fn & options
});



// Слайдер

function createSliders() {

	$('.slider').each(function(i,elem) {

		$(this).find('li').css({display: 'none'});

		var cellWidth = $(this).find('li').outerWidth();
		var sliderWidth = $(this).find('ul').width();
		var cellsCount = $(this).find('li').length;

		var slidesVisible = Math.floor(sliderWidth / cellWidth);
		var slidesCount = Math.ceil(cellsCount / slidesVisible);

		$(this).attr('pos', 1);
		$(this).attr('visible', slidesVisible);
		$(this).attr('count', slidesCount);

		for (var i = 0;i < slidesVisible;i++) {
			$(this).find('li').eq(i).css({display: 'block'});
		}

	});

}

$(window).load(function() {

	createSliders();

	$('.slider').each(function(i,elem) {

		$(this).swipe({swipeRight:function(event, direction, distance, duration, fingerCount) {

			$(this).find('.prev').click();

		}});

		$(this).swipe({swipeLeft:function(event, direction, distance, duration, fingerCount) {

			$(this).find('.next').click();

		}});

	});

});

$(window).resize(function() {
	createSliders();
});

var sliderReturn = false;

$('.slider .prev').click(function() {

	if (sliderReturn) {
		return;
	} else {
		sliderReturn = true;
	}

	var slider = $(this).closest('.slider');

	var pos = slider.attr('pos');
	var visible = slider.attr('visible');
	var count = slider.attr('count');

	$(this).closest('.slider').animate({opacity: '0'}, 300, function() {

		slider.find('li').attr('style', '');

		var cellsCount = slider.find('li').length;

		if (pos == 1) {

			pos = count;
			slider.attr('pos', pos);

			for (var i = cellsCount;i > (cellsCount - visible);i--) {
				slider.find('li').eq(i - 1).css({display: 'block'});
			}

			$(this).animate({opacity: '1'}, 300, function() {
				sliderReturn = false;
			});

		} else if (pos == 2) {

			pos--;
			slider.attr('pos', pos);

			for (var i = 0;i < visible;i++) {
				slider.find('li').eq(i).css({display: 'block'});
			}

			$(this).animate({opacity: '1'}, 300, function() {
				sliderReturn = false;
			});

		} else {

			pos--;
			slider.attr('pos', pos);

			cellsCount = cellsCount - (visible * (count - pos));

			for (var i = cellsCount;i > (cellsCount - visible);i--) {
				slider.find('li').eq(i - 1).css({display: 'block'});
			}

			$(this).animate({opacity: '1'}, 300, function() {
				sliderReturn = false;
			});

		}

	});

});

$('.slider .next').click(function() {

	if (sliderReturn) {
		return;
	} else {
		sliderReturn = true;
	}

	var slider = $(this).closest('.slider');

	var pos = slider.attr('pos');
	var visible = slider.attr('visible');
	var count = slider.attr('count');

	$(this).closest('.slider').animate({opacity: '0'}, 300, function() {

		slider.find('li').attr('style', '');

		if (pos == count) {

			pos = 1;
			slider.attr('pos', pos);

			for (var i = 0;i < visible;i++) {
				slider.find('li').eq(i).css({display: 'block'});
			}

			$(this).animate({opacity: '1'}, 300, function() {
				sliderReturn = false;
			});

			return;	

		}

		if (pos < count) {

			var lastVisibleCell = +visible * +pos;

			pos++;
			slider.attr('pos', pos);

			if (pos == count) {

				var cellsCount = slider.find('li').length;

				for (var i = cellsCount;i > (cellsCount - visible);i--) {
					slider.find('li').eq(i - 1).css({display: 'block'});
				}

			} else {

				for (var i = lastVisibleCell;i < (lastVisibleCell + +visible);i++) {
					slider.find('li').eq(i).css({display: 'block'});
				}

			}

			$(this).animate({opacity: '1'}, 300, function() {
				sliderReturn = false;
			});

		}
	});

});

// Свайп следеров

ourClientsVisibleCells = 0;

function ourClietsSliderCreate() {

	if (window.innerWidth > 1250) {
		ourClientsVisibleCells = 21;
	} else if (window.innerWidth > 999) {
		ourClientsVisibleCells = 15;
	} else if (window.innerWidth > 940) {
		ourClientsVisibleCells = 12;
	} else if (window.innerWidth > 760) {
		ourClientsVisibleCells = 9;
	} else {
		ourClientsVisibleCells = 6;
	}

	$('.our_clients_slider li').css({display: 'none'});

	var cellsCount = $('.our_clients_slider li').length;

	if (cellsCount < (ourClientsVisibleCells + 1)) {
		$('.our_clients_slider .prev, .our_clients_slider .next').css({display: 'none'});
	} else {
		$('.our_clients_slider .prev, .our_clients_slider .next').css({display: 'block'});
	}

	var sliderWidth = $('.our_clients_slider').width();
	var width = $('.our_clients_slider li').outerWidth();
	var lineVisible = Math.floor(sliderWidth / width);
	var slideVisible = lineVisible * 3;
	var slidesCount = Math.ceil(cellsCount / slideVisible);

	$('.our_clients_slider').attr('pos', 1);
	$('.our_clients_slider').attr('slidesCount', slidesCount);
	$('.our_clients_slider').attr('cellsInSlide', slideVisible);

	for (var i = 0;i < ourClientsVisibleCells;i++) {
		$('.our_clients_slider li').eq(i).css({display: 'block'});
	}

}

$(window).load(function() {

	ourClietsSliderCreate();

});

$(window).resize(function() {

	ourClietsSliderCreate();

});

$('.our_clients_slider .next').click(function() {

	var pos = $('.our_clients_slider').attr('pos');
	var slidesCount = $('.our_clients_slider').attr('slidesCount');
	var cellsInSlide = $('.our_clients_slider').attr('cellsInSlide');

	pos++;

	ourClientsNewSlide(pos, slidesCount, cellsInSlide);

});

$('.our_clients_slider .prev').click(function() {

	var pos = $('.our_clients_slider').attr('pos');
	var slidesCount = $('.our_clients_slider').attr('slidesCount');
	var cellsInSlide = $('.our_clients_slider').attr('cellsInSlide');

	if (pos == 1) {
		pos = slidesCount;
	} else {
		pos--;
	}

	ourClientsNewSlide(pos, slidesCount, cellsInSlide);

});

function ourClientsNewSlide(pos, slidesCount, cellsInSlide) {

	$('.our_clients_slider ul').animate({opacity: '0'}, 300, function() {

		$('.our_clients_slider ul li').css({display: 'none'});

		if (pos == slidesCount) {

			pos = slidesCount;

			var prevCells = $('.our_clients_slider ul li').length;

			for (var i = (prevCells - cellsInSlide);i < prevCells;i++) {
				$('.our_clients_slider ul li').eq(i).css({display: 'block'});
			}

		} else if (pos < slidesCount) {

			var prevCells = cellsInSlide * pos;

			for (var i = (prevCells - cellsInSlide);i < prevCells;i++) {
				$('.our_clients_slider ul li').eq(i).css({display: 'block'});
			}

		} else if (pos > slidesCount) {

			pos = 1;

			var prevCells = cellsInSlide;

			for (var i = (prevCells - cellsInSlide);i < prevCells;i++) {
				$('.our_clients_slider ul li').eq(i).css({display: 'block'});
			}

		}

		$('.our_clients_slider').attr('pos', pos);

		$(this).animate({opacity: '1'}, 300);

	});

}


