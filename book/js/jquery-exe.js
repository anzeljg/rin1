/**************************************************************************
 * eXeCute                                                                *
 * The cute way of eXe                                                    * 
 * Authors: Sandi Kelenc, Matej Kren, Tim Kos, Igor Pesek                 *
 * Licensed under LGPL                                                    *
 *                                                                        *
 * Copyright 2011                                                         *
 **************************************************************************/


var correct =0;
	var wrong = 0;
	$(function() {
		
	
	//Kazalo
	// ! Show/hide nav
	$(".topics").click(function() {
		var opened = $("#nav-tabbed").hasClass("open");
		console.log(opened);

		if ( ! opened) {
			$("#nav-tabbed").stop().animate({ left: 0 }, 200);
			$("#nav-tabbed").addClass("open");
			$("#nav-pages").stop().animate({ left: -257 }, 200);
			$("#nav-pages").removeClass("open");
		} else {
			$("#nav-tabbed").stop().animate({ left: -257 }, 200);
			$("#nav-tabbed").removeClass("open");
		}

		return false;
	});
	
		// ! Show/hide pages
	$(".pages").click(function() {
		var opened = $("#nav-pages").hasClass("open");
		console.log(opened);

		if ( ! opened) {
			$("#nav-pages").stop().animate({ left: 0 }, 200);
			$("#nav-pages").addClass("open");
			$("#nav-tabbed").stop().animate({ left: -257 }, 200);
			$("#nav-tabbed").removeClass("open");
		} else {
			$("#nav-pages").stop().animate({ left: -257 }, 200);
			$("#nav-pages").removeClass("open");
		}

		return false;
	});

	// ! Tabs
	$("#nav-tabbed .tabs a").click(function() {
		var $el = $(this);
		var $li = $el.closest("li");
		var ind = $("#nav-tabbed .tabs li").index($li);
		var $cn = $("#nav-tabbed .content nav:eq("+ind+")");

		// Mark
		$("#nav-tabbed .tabs li").not($li).removeClass("on");
		$li.addClass("on");

		// Show
		$("#nav-tabbed .content nav").not($cn).hide();
		$cn.show();

		return false;
	});
	$("#nav-tabbed .tabs li:eq(0)").addClass("on");
	$("#nav-tabbed .content nav:eq(0)").addClass("on");

	// ! TabsPages
	$("#nav-pages .tabs a").click(function() {
		var $el = $(this);
		var $li = $el.closest("li");
		var ind = $("#nav-pages .tabs li").index($li);
		var $cn = $("#nav-pages .content nav:eq("+ind+")");

		// MarkPages
		$("#nav-pages .tabs li").not($li).removeClass("on");
		$li.addClass("on");

		// ShowPages
		$("#nav-pages .content nav").not($cn).hide();
		$cn.show();

		return false;
	});
	$("#nav-pages .tabs li:eq(0)").addClass("on");
	$("#nav-pages .content nav:eq(0)").addClass("on");
			
			
});
	
	jQuery.fn.center = function () {
		this.css("position","absolute");
		//this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
		this.css("left", ( $("#main").width() - this.outerWidth() ) / 2+$(window).scrollLeft() + "px");
		// v urejanju se ne postavi tocno na sredino, pri exportu pa
		return this;
	}
	
	
	
/******************************
*  Document OnLoad event
*
*
********************************/	
$(document).ready(function() {
	
		
			// Store variables
			
			var accordion_head = $('.accordion > li > a'),
				accordion_body = $('.accordion li > .sub-menu');

			// Open the first tab on load

			// accordion_head.first().addClass('active').next().slideDown('normal');

			// Click function
			
			

			accordion_head.on('click', function(event) {

				// Disable header links
				
				event.preventDefault();

				// Show and hide the tabs on click

				if ($(this).attr('class') != 'active'){
					accordion_body.slideUp('normal');
					$(this).next().stop(true,true).slideToggle('normal');
					accordion_head.removeClass('active');
					$(this).addClass('active');
				}

			});	
			
			
			
	/*
	 * Tooltip v besedilu
	 * 
	 */		
	$('u:not(.clozeBlock u)').each(function() {	
		var text = $.trim($(this).html());
		if (text.substring(0,1)=='{' && text.substr(-1,1) == '}'){
			text = text.slice(1,-1);
			if (text.indexOf(';')>0){
				var razbitje = text.split(';');
				var insertText = '<a class="opisBesede" title="' + razbitje[1] +'">' + razbitje[0] + '</a>';
				$(this).replaceWith(insertText);
			}
		}
	});
	
	$( ".opisBesede" ).tooltip();		
	
	//konec tooltip
			
	
	
	/* 
	 *  Lightbox
	 *  */
	var seznamSlik = ["attachment.png","panel-amusements.png","stock-attach.png",
						"angle.png",
						"angles.png",
						"angles_over.png",
						"anglev.png",
						"anglev_over.png",
						"angle_bisector.png",
						"angle_bisector_over.png",
						"angle_over.png",
						"area.png",
						"area_over.png",
						"arrow.png",
						"arrow_over.png",
						"circle.png",
						"circle3.png",
						"circle3_over.png",
						"circler.png",
						"circler_over.png",
						"circle_over.png",
						"distance.png",
						"distance_over.png",
						"erase.png",
						"erase_over.png",
						"fixed_segment.png",
						"fixed_segment_over.png",
						"hline.png",
						"hline_over.png",
						"intersection.png",
						"intersection_over.png",
						"line.png",
						"line_over.png",
						"line_symmetry.png",
						"line_symmetry_over.png",
						"midpoint.png",
						"midpoint_over.png",
						"parallel.png",
						"parallel_over.png",
						"pencil.png",
						"pencil_over.png",
						"perpendicular.png",
						"perpendicular_over.png",
						"point.png",
						"point_over.png",
						"polygon.png",
						"polygon_over.png",
						"rpolygon.png",
						"rpolygon_over.png",
						"segment.png",
						"segment_over.png",
						"segment_symmetry.png",
						"segment_symmetry_over.png",
						"slider.png",
						"slider_over.png",
						"spacer.png",
						"symmetry.png",
						"symmetry_over.png",
						"translation.png",
						"translation_over.png",
						"triangle.png",
						"triangle_over.png",
						"vector.png",
						"vector_over.png"
					];
	
	$('img:not(.interaktivnaNaloga img)').each(function(){
			if(!$(this).parent().hasClass('gallery-items-group')){
			    var src=$(this).attr("src");
			    var iPosevnica = src.lastIndexOf("/");
			    if(iPosevnica!=-1)
			    	var src2 = src.substr(iPosevnica+1,src.length-iPosevnica-1);
			    else 
			    	src2=src;
				if(seznamSlik.indexOf(src2)==-1){
			    	var title=$(this).attr("title");
			    	if(title==null){   title="";   }
			    	$(this).wrap('<a href='+src+' rel="lightbox" title="'+title+'"></a>');
			    }
			};
  	});
	
	
	//Galerija
	$('.gallery-items').css({ 'height': parseInt($('.gallery-items img:eq(0)').attr('height'), 10) + 10 });
	$('.gallery-items-prev').fadeOut(0);

	$('.gallery-items img').on('click', function () {
		var fullImgSrc = $(this).attr('data-fullimg');
		var fullImg = $(this).parents('.gallery').find('.gallery-preview img');
		fullImg.fadeOut('200', function () {
			fullImg.attr('src',  fullImgSrc);
			fullImg.fadeIn(200);
		});
		var caption = $(this).attr("alt").split("<>")[1];
		var title = caption;
		var podpis = $(this).parents('.gallery').find('.besediloObSliki');
		if (caption.length > 50){
			caption = caption.slice(0,50) + " ...";
		}
		podpis.html(caption);
		podpis.attr("title",title);
		
		$('.gallery-items .active').removeClass('active');
		$(this).addClass('active');
	});

	$('.gallery-items-next').on('click', function () {
		var $group = $(this).parent('.gallery-items').find('.gallery-items-group-active');
		if ($group.next('.gallery-items-group').length > 0) {
			$group.css({
				'position': 'absolute',
				'top': 0,
				'left': '30px'
				})
				.animate({
					'left': -400
				}, 600)
				.removeClass('gallery-items-group-active');

			$group.next()
				.css({
					'position': 'absolute',
					'top': 0,
					'left': '400px'
				})
				.addClass('gallery-items-group-active')
				.animate({
					'left': 30
				}, 600);

			if ($group.next().next('.gallery-items-group').length === 0) {
				$(this).fadeOut(100);
			} else {
				$(this).fadeIn(100);
			}
			$(this).next('.gallery-items-prev').fadeIn(100);
		}
	});

	$('.gallery-items-prev').on('click', function () {
		var $group = $(this).parent('.gallery-items').find('.gallery-items-group-active');
		if ($group.prev('.gallery-items-group').length > 0) {
			$group.css({
				'position': 'absolute',
				'top': 0,
				'left': '30px'
				})
				.animate({
					'left': 400
				}, 600)
				.removeClass('gallery-items-group-active');

			$group.prev()
				.css({
					'position': 'absolute',
					'top': 0,
					'left': '-400px'
				})
				.addClass('gallery-items-group-active')
				.animate({
					'left': 30
				}, 600);

			if ($group.prev().prev('.gallery-items-group').length === 0) {
				$(this).fadeOut(100);
			} else {
				$(this).fadeIn(100);
			}
			$(this).prev('.gallery-items-next').fadeIn(100);
		}
	});
	
	
	/* dropdown menu  */
	
	$(".account").click(function(){
		var X=$(this).attr('id');

		if(X==1){
			$(".submenu").hide();
			$(this).attr('id', '0');	
		}
		else{
			$(".submenu").show();
			$(this).attr('id', '1');
		}
				
	});

			//Mouseup textarea false
	$(".submenu").mouseup(function(){
		return false
	});
	$(".account").mouseup(function(){
		return false
	});

	//Textarea without editing.
	$(document).mouseup(function(){
		$(".submenu").hide();
		$(".account").attr('id', '');
	});
	
	/*/dropdown menu */
	
	
	
	$('img').not(".help,.submit, .info, .capNone, .slides_container").each(function(index) {
		if ($(this).length){
			if (this.alt !==""){
				var txt = $(this).attr("alt");
				if (txt.length > 0) {
					$wrapper = $('<div class="img-caption" />').css('width',$(this).width);
					if (this.align === "right"){
						$wrapper.css('float','right');
						$(this).removeAttr('align');
					}
					if (this.align === "left"){
						$wrapper.css('float','left');
						$(this).removeAttr('align');
					}
					if (this.hspace !== ""){
						$wrapper.css('margin-left',this.hspace);
						$wrapper.css('margin-right',this.hspace);
						$(this).removeAttr('hspace');
						
					}
					if (this.vspace !== ""){
						$wrapper.css('margin-top',this.hspace);
						$wrapper.css('margin-bottom',this.hspace);
						$(this).removeAttr('vspace');
						
					}
					
					$(this).wrap($wrapper).after('<p class="caption">' + $(this).attr("alt") + '</p>');
				}
			}
		}
	});
	 
});

function toogleGui(idElt, idHide){
	// editor je prikazan, potrebno je samo umakniti mce kontrolo
	if ($("#" + idElt.id).hasClass("izbran")) {
		tinyMCE.execCommand('mceRemoveControl', false, idElt.id);
		$("#"+idHide.id).val(idElt.id);
		$("#"+idElt.id).removeClass();
		$("#"+idElt.id).addClass("neizbran editOff");
		//alert($("#"+idHide.id).val());
		$("#gb"+idElt.id).val("Prikazi urejevalnik");
	}
	// editor ni prikazan, sedaj ga vkljuèimo nazaj 
	else if ($("#" + idElt.id).hasClass("editOff")) {
		$("#"+idElt.id).addClass("izbran");
		tinyMCE.execCommand('mceAddControl', true, idElt.id);
		tinyMCE.execCommand('mceFocus', true, idElt.id);
		$("#"+idElt.id).removeClass("editOff");
		$("#"+idHide.id).val(idElt.id);
		$("#gb"+idElt.id).val("Skrij urejevalnik");
		//alert($("#"+idHide.id).val());
	}
	// editor še ni prikazan, vseeno prikazemo 
	else {
		var id2 = idElt.id.replace("text","div");
		$("#" + id2).hide();
		$("#"+idElt.id).addClass("editOff");
		$("#"+idElt.id).show();
		$("#gb"+idElt.id).val("Prikazi urejevalnik");
		$("#"+idHide.id).val(idElt.id);
		//alert($("#"+idHide.id).val());
	}
	
}