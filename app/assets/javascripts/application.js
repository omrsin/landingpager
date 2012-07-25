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
	$('.header-form input[name="html_string"]').val($('.home').html());
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
		click: function(){ showMenu('#page-bg-colorpicker', event); }
	});

	$('#header').bind({
		click: function(){ 
			if(!headerSelected)	{ showMenu('#header-menu', event); }
			else { alert("Qué problema!"); }
		}
	});
	
	$('[id|=header-option]').click(function(){
		$('#header').html($('#header-format-'+this.id.substring(this.id.length-1)).html());
		headerSelected = true;
		showMenu('#header-menu', event);
	});	
});

$(document).ready(function(){
	$('#page-bg-colorpicker-input').colorpicker().on('changeColor', function(e){
		$('#body').css('background-color', e.color.toHex());
	});
});
