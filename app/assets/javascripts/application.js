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
var displayedSubmenu;

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

function showSubmenu(domObject, style, value) {
	offset = $(domObject).offset();
	width = parseInt($(domObject).parent().css('width'));
	if(displayedSubmenu!='#'+style+'-menu-'+value){
		$('.activeSubmenu').hide().removeClass('activeSubmenu');
		displayedSubmenu = '#'+style+'-menu-'+value;
	}
	else {
		displayedSubmenu='';
	}
	$('#'+style+'-menu-'+value).css('left', offset.left+width+5+'px')
														 .css('top', offset.top+'px')
														 .toggle('fast')
														 .toggleClass('activeSubmenu');
}

function setStyle(domObject, object, style, value) {
	$(domObject).css(object+'-'+style, value);
}

$(document).ready(function(){
	$('#body').bind({
		click: function(){ showMenu('#body-menu', event); }
	});

	$('#header').bind({
		click: function(){ 
			if(!headerSelected)	{ showMenu('#header-menu', event); }
			else { showMenu('#menu-style', event); }
		}
	});
	
	$('[id|=header-option]').click(function(){
		$('#header').html($('#header-format-'+this.id.substring(this.id.length-1)).html());
		headerSelected = true;
		showMenu('#header-menu', event);
	});
	
	$('#menu-style #border-menu-primary').click(function(){
		$(this).toggleClass('multiple active');
		$('#border-menu-secondary').toggle("fast");
	});

	$('[id|=option]').click(function(){
		params = this.id.split('-');		
		showSubmenu($(this), params[1], params[2]);		
	});
	
	$('[id|=style]').click(function(){
		params = this.id.split('-');
		setStyle('#header', params[1], params[2], params[3]);		
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
