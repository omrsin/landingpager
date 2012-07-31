// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require bootstrap-colorpicker

var headerSelected = false;

function updateSubmitInfo () {
	$('section, div').removeClass('bordered top-bordered');
	$('.header-form input[name="html_string"]').val($('#main').html());
}

function setPosition(domObject, pageX, pageY) {
	$(domObject).css('left', (pageX)+"px");
	$(domObject).css('top', (pageY)+"px");
}

function showMenu(domObject, e){
	e.stopPropagation();
	$(domObject).toggle();
	setPosition(domObject, e.pageX, e.pageY);
}

$(document).ready(function(){
	$('#body').bind({
		click: function(){ showMenu('#body-menu', event); }
	});

	$('#header').bind({
		click: function(){ 
			if(!headerSelected)	{ showMenu('#header-menu', event); }
			else { showMenu('#style-menu', event); }
		}
	});
	
	$('[id|=header-option]').click(function(){
		$('#header').html($('#header-format-'+this.id.substring(this.id.length-1)).html());
		headerSelected = true;
		showMenu('#header-menu', event);
	});
	
	$('#style-menu #border-menu-primary').click(function(){
		$(this).toggleClass('multiple active');
		$('#border-menu-secondary').toggle("fast");
	});
	
	$('#border-option-position').click(function(){
		offset = $(this).offset();
		width = parseInt($(this).parent().css('width'));
		$('#border-menu-position').css('left', offset.left+width+5+'px')
															.css('top', offset.top+'px')
															.toggle('fast');
	});
	
	$('#border-option-style').click(function(){
		offset = $(this).offset();
		width = parseInt($(this).parent().css('width'));
		$('#border-menu-style').css('left', offset.left+width+5+'px')
															.css('top', offset.top+'px')
															.toggle('fast');
	});
	
	$('#border-option-width').click(function(){
		offset = $(this).offset();
		width = parseInt($(this).parent().css('width'));
		$('#border-menu-width').css('left', offset.left+width+5+'px')
															.css('top', offset.top+'px')
															.toggle('fast');
	});
	
	$('[id|=border-position]').click(function(){
		position = this.id.substring('border-position-'.length);
		$('#header').css('border-'+position, 'solid 5px black');
	});
	
	$('[id|=border-style]').click(function(){
		style = this.id.substring('border-style-'.length);
		$('#header').css('border-style', style);
	});
	
	$('[id|=border-width]').click(function(){
		width = this.id.substring('border-width-'.length);
		$('#header').css('border-width', width);
	});
});

$(document).ready(function(){
	$('#page-bg-colorpicker-input').colorpicker().on('changeColor', function(e){
		$('#body').css('background-color', e.color.toHex());
	});
	
	$('#header-bg-colorpicker-input').colorpicker().on('changeColor', function(e){
		$('#header').css('background-color', e.color.toHex());
	});
	
	$('#header-border-colorpicker-input').colorpicker().on('changeColor', function(e){
		$('#header').css('border-color', e.color.toHex());
	});
});
