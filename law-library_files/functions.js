/**
 * Theme functions file
 *
 * Contains handlers for navigation, accessibility, header sizing
 * footer widgets and Featured Content slider
 *
 */
( function( $ ) {
	var body    = $( 'body' );

	// Enable menu toggle for small screens.
	$( function() {
		var nav = $( '.nav-menu' );
		if ( ! nav ) {
			return;
		}

		button = nav.find( '.menu-toggle' );
		if ( ! button ) {
			return;
		}

		// Hide button if menu is missing or empty.
		menu = nav.find( '.nav-menu' );
		if ( ! menu || ! menu.children().length ) {
			button.hide();
			return;
		}

		$( '.menu-toggle' ).on( 'click', function() {
			menu.slideToggle();
		} );
	} );

	// Primary navigation

	$(document).ready(function() {
		var header_container = $('.header-container'),
			menu = '.nav-menu';

		if ( ! menu ) {
			return;
		}

		$('.nav-menu .menu-item-has-children').each(function () {
			var t = $(this);
			var el = t.find('>.sub-menu, >.mega-menu');

			t.hover(function () {
				el.fadeIn(100);
			},
			function () {
				el.fadeOut(100);
			});
		});
	});

	$(document).ready(function(){
		$('.menu-button').click(function(){
			$('.nav-menu-mobile').show().animate({
				left: '0'
			}, 500);
			return false;
		});

		$('.nav-menu-mobile .menu-item').click(function(){
			$(this).children('.sub-menu').slideToggle();
		});
	});

	$('html').click(function(){
		if ($('.nav-menu-mobile').is(':visible')){
			$('.nav-menu-mobile').animate({left: '-100%'}, 500);
		}
	});

	$('.nav-menu-mobile').click(function(event){
		event.stopPropagation();
	});

	//Sticky Footer

	var $footer = $('.footer');
	var $page = $('#page');
	var $window = $(window);

	function resize(){
		var pageToWindowHeight = $window.height() - $footer.outerHeight() - $page.offset().top;

		$page.css('minHeight', $page.outerHeight() >= pageToWindowHeight ? 0 : pageToWindowHeight);
	}

	$(resize);
	$(window).resize(resize);
	gentleWatch($footer[0], 'offsetHeight', resize);

} )( jQuery );

jQuery(function($){
	var menu = $('.header-container .nav-menu');
	var caret = '<li class="menu-item nav-menu-toggle"><a href="#"><i class="fa fa-caret-square-o-down"></i></a></li>';

	menu.children('.menu-item').each(function(index){
		var _this = $(this);

		_this.attr('data-width', _this.outerWidth());
		if (!_this.hasClass('nav-menu-toggle')) {
			_this.attr('data-index', index);
		}
	});

	function visibleItems(){
		return menu.children('.menu-item');
	}

	function getMenuMaxWidth() {
		return $('.header-container').innerWidth() - 130 - $('.logo').outerWidth();
	}

	function getItemsWidth() {
		var itemsWidth = 0;
		visibleItems().each(function () {
			itemsWidth += $(this).outerWidth();
		});
		return itemsWidth;
	}

	function hideItems() {
		var mobile = $('.isMobile').is(':visible');

		if (mobile) {
			return;
		}

		var limit = 0;
		visibleItems().each(function(){
			limit += $(this).outerWidth();
			if ( (limit > getMenuMaxWidth()) && ($(this).attr('data-index'))) {
				$(this).appendTo('.nav-menu-hiddens');
			}
		});
	}

	function showItems(){
		var hiddenItems = $('.nav-menu-hiddens').children('.menu-item');
		var indexes = [];

		hiddenItems.each(function(){
			indexes.push($(this).attr('data-index'));
		});

		hiddenItems.each(function(){
			var min = Math.min.apply(null, indexes);
			if ($(this).attr('data-index') == min) {
				var thisWidth = parseInt($(this).attr('data-width'));
				if ( (getItemsWidth() + thisWidth) <= getMenuMaxWidth() ){
					$(this).appendTo(menu);
				}
			}
		});
	}

	function init(){
		if ( getItemsWidth() > getMenuMaxWidth() ) {
			hideItems();
		} else {
			showItems();
		}

		if($('.nav-menu-hiddens').children('.menu-item').length > 0){
			if (menu.find('.nav-menu-toggle').length == 0) {
				menu.append(caret);
			}
		} else {
			menu.find('.nav-menu-toggle').remove();
		}
	}

	$(document).on('click', '.nav-menu-toggle', function(e){
		e.preventDefault();

		if( $('.nav-menu-hiddens').is(':hidden') ) {
			$(this).find('i').removeClass('fa-caret-square-o-down').addClass('fa-caret-square-o-up');
			$('.nav-menu-hiddens').slideDown();
			return false;
		} else {
			$(this).find('i').removeClass('fa-caret-square-o-up').addClass('fa-caret-square-o-down');
			$('.nav-menu-hiddens').slideUp();
			return false;
		}
	});

	$(window).load(function(){
		init();
		menu.children('.menu-item').each(function(){
			$(this).css('visibility', 'visible');
		});
		$('.nav-menu-hiddens').children('.menu-item').children('.menu-item').each(function(){
			$(this).css('visibility', 'visible');
		});
	});

	$(window).resize(function(){
		init();
	});
});

function hideNavMenuHiddens(){
	jQuery('.nav-menu-toggle').find('i').removeClass('fa-caret-square-o-up').addClass('fa-caret-square-o-down');
	jQuery('.nav-menu-hiddens').slideUp();
}

jQuery(function($){

	var pageBody = $('body.page');
	var pageBuilderBlock = pageBody.find('.fw-page-builder-content');
	if (pageBuilderBlock.length === 0){
		$('article.page').addClass('fw-container');
	}
	else {
		pageBuilderBlock.siblings()
			.addClass('fw-container')
			.css({
				'marginLeft': 'auto',
				'marginRight': 'auto'
			});
	}

	var height = $('.header-container').height();

	function setLineHeight() {
		$('.nav-menu').children('.menu-item').each(function () {
			$(this).children('a').css('line-height', height + 'px');
		});
	}

	$(window).load(function(){
		setLineHeight();
	});

	$(window).resize(function(){
		setLineHeight();
	});
});


/**
 * Mega Menu
 */
jQuery(function ($) {
	$(document).ready(function(){
		$('.primary-navigation .mega-menu').each(function(){
			var rows = $(this).find('.mega-menu-row').length;
			$(this).css('width', 191 * rows);

		})
	});
});


// Rating Stars
jQuery(document).ready(function(){
	var $ = jQuery;
	//Rating stars
	jQuery('.wrap-rating.in-post .fa.fa-star').hover(
		function() {
			jQuery(this).addClass('over').prevAll().addClass('over');
		}
		, function() {
			jQuery(this).removeClass('over').prevAll().removeClass('over');
		}
	);

	jQuery('.wrap-rating.in-post .fa.fa-star').on('click', function() {
		var $this = jQuery(this),
			value = $this.data('vote');

		$this.parent().children('.fa.fa-star').removeClass('voted');
		$this.addClass('voted').prevAll().addClass('voted');
		$this.parents('.wrap-rating.in-post').find('input[type="hidden"]').val(value);
	});

	//Rating qTip
	jQuery('.wrap-rating.header.qtip-rating').each(function() { // Notice the .each() loop, discussed below
		jQuery(this).qtip({
			content: {
				text: jQuery(this).next('div') // Use the "div" element next to this for the content
			},
			style: {
				classes: 'rating-tip'
			},
			position: {
				my: 'top center',
				at: 'bottom center'
			}
		});
	});

	//Custom CheckBox & Select
	// Styled Select, CheckBox, RadioBox
	if(jQuery('.select-styled select').length > 0){
		jQuery('.select-styled select').selectize({
			create: true,
			sortField: 'text'
		});
	}
	if (jQuery(".input-styled").length) {
		jQuery(".input-styled input").customInput();
	}

	//Date Picker
	//Date picker for Bookings Form
	if(jQuery('.datepicker').length > 0){
		jQuery('.datepicker').datetimepicker({
			timepicker:false,
			format:'d.m.Y',
			closeOnDateSelect:true,
			minDate:0
		});
	}

	//Height tr end align radio
	jQuery('.field-table table tr').each(function(){
		var height_tr = $(this).outerHeight();
		$(this).find('.custom-radio').css('margin-top', height_tr/2-17);
	});
});

function calculate_columns() {
	var counter = 0;
	var widths = {
		'1-1' : 1,
		'3-4' : 0.75,
		'2-3' : 0.6,
		'1-2' : 0.5,
		'1-3' : 0.3,
		'1-4' : 0.25,
		'1-5' : 0.2
	};

	var columns = jQuery('*>*[class*="column-"]');
	columns.first().addClass('first');

	columns.each(function () {
		var klass = jQuery(this).attr('class').match(/column-[1-9]-[1-9]/g);
		var width = 0;

		if (klass != null) {
			klass = klass.shift().replace('column-', '');

			if (widths.hasOwnProperty(klass)) {
				width = widths[klass];
			}
		}

		if ( ( counter + width ) > 1) {
			jQuery(this).addClass('first');
			counter = 0;
		}

		counter += width;
	});
}
calculate_columns();
