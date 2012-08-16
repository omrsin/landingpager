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

/* Selected Format Variables */
var headerSelected = false;
var sectionSelected = [false, false, false, false, false];
var footerSelected = false;

/* Active Element Variables */
var activeObject;
var activeSection;
var displayedSubmenu;
var displayedMenu;

/* Box Shadows Variables */
var boxShadowHorizontal = "0";
var boxShadowVertical = "0";
var boxShadowBlur = "0";
var boxShadowColor = "black";

/* Functions */

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
	if(displayedMenu!=domObject) {
		$('.activeMenu').hide().removeClass('activeMenu');		
		displayedMenu = domObject;
	}
	else {
		displayedMenu = '';
	}
	$('.activeSubmenu').hide().removeClass('activeSubmenu');
	$(domObject).toggle().toggleClass('activeMenu');
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

function boxShadowValue(){
	return boxShadowHorizontal+" "+boxShadowVertical+" "+boxShadowBlur+" "+boxShadowColor;
}

function updateBoxShadow(attribute, value){
	setBoxShadowFromTarget();
	if(attribute=='vertical'){ boxShadowVertical = value+"px"; }
	else if(attribute=='horizontal'){ boxShadowHorizontal = value+"px"; }
	else if(attribute=='blur'){ boxShadowBlur = value+"px"; }
	else if(attribute=='color'){ boxShadowColor = value; }
	setStyle(activeObject,'box','shadow', boxShadowValue());
}

function setBoxShadowFromTarget(){
	var boxShadow = $(activeObject).css('box-shadow');
	if(boxShadow=='none'){
		boxShadowHorizontal = "0px";
		boxShadowVertical = "0px";
		boxShadowBlur = "0px";
		boxShadowColor = "black";
	}
	else {
		var boxShadowValues = boxShadow.split(')');
		boxShadowColor = boxShadowValues[0]+')';
		boxShadowValues = boxShadowValues[1].split(' ');
		boxShadowHorizontal = boxShadowValues[1];
		boxShadowVertical = boxShadowValues[2];
		boxShadowBlur = boxShadowValues[3];
	}
}

$(document).ready(function(){
	$('#body').click(function(){ 
		showMenu('#body-menu', event);
		activeObject="#body";
	});

	$('#header').click(function(){ 
		if(!headerSelected)	{ showMenu('#header-menu', event); }
		else {
			activeObject="#header";
			showMenu('#menu-style-header', event); 
		}
	});
	
	$('[id|=section]').click(function(){
		activeSection = $(this);
		section = this.id.substring(this.id.length-1);
		if(!sectionSelected[section-1]){showMenu('#menu-format', event); }
		else {
			activeObject="#content";
			showMenu('#menu-style-sections', event);		  
		}
	});
	
	$('#footer-content').click(function(){
		if(!footerSelected) { showMenu('#footer-menu', event); }
		else {
			activeObject="#footer";
			showMenu('#menu-style-footer', event);
		}
	});
	
	$('#footer-bottom-line').click(function(){
		activeObject="#footer";
		showMenu('#menu-style-footer', event);
	});
	
	$('[id|=header-option]').click(function(){
		$('#header').html($('#header-format-'+this.id.substring(this.id.length-1)).html());
		headerSelected = true;
		showMenu('#header-menu', event);
	});
	
	$('[id|=format-option]').click(function(){
		params = this.id.split('-');
		$(activeSection).html($('#section-format-'+params[2]+'-'+params[4]).html());
		section = activeSection.attr('id').substring(activeSection.attr('id').length-1);
		sectionSelected[section-1] = true;
		showMenu('#format-menu', event);
	});
	
	$('[id|=footer-option]').click(function(){
		$('#footer-content').html($('#footer-format-'+this.id.substring(this.id.length-1)).html());
		footerSelected = true;
		showMenu('#footer-menu', event);
	});
	
	/* Menus Behavior */
	
	$('[id|=border-menu-primary]').click(function(){
		$(this).toggleClass('multiple active');
		section = $(this).data('section');
		$('#border-menu-secondary-'+section).toggle("fast");
		$('.activeSubmenu').hide().removeClass('activeSubmenu');
	});
	
	$('[id|=boxshadow-menu-primary]').click(function(){
		$(this).toggleClass('multiple active');
		section = $(this).data('section');
		$('#boxshadow-menu-secondary-'+section).toggle("fast");
		$('.activeSubmenu').hide().removeClass('activeSubmenu');
	});
	
	$('#menu-format #format-image-primary').click(function(){
		$('#format-text-primary').removeClass('active');
		$(this).toggleClass('active');
		showSubmenu($(this), "format", "image");
	});
	
	$('#menu-format #format-text-primary').click(function(){
		$('#format-image-primary').removeClass('active');
		$(this).toggleClass('active');
		showSubmenu($(this), "format", "text");
	});

	$('[id|=option]').click(function(){
		params = this.id.split('-');		
		showSubmenu($(this), params[1], params[2]);		
	});	
	
	/* Style Behavior */
	
	$('[id|=style]').click(function(){
		params = this.id.split('-');
		setStyle( activeObject, params[1], params[2], params[3]);		
	});
	
	$('.pixel-input').bind({
		keydown: function(e){
							 if ( e.keyCode == 38 ) {
								 event.preventDefault();
								 $(this).val(parseInt($(this).attr('value'))+1);
						 	 }
						 	 else if (e.keyCode == 40 ) {
								 event.preventDefault();
								 $(this).val(parseInt($(this).attr('value'))-1);
						 	 }
						 	 attribute = $(this).data('option');
							 value = $(this).val();
							 updateBoxShadow(attribute, value);
						 },
		keyup: function(){
					   attribute = $(this).data('option');
						 value = $(this).val();
					   updateBoxShadow(attribute, value);
		       }
   	});
});


/* Colorpickers */

$(document).ready(function(){
	$('#body-bg-colorpicker-input').colorpicker().on('changeColor', function(e){
		$('#body').css('background-color', e.color.toHex());
		$('#main').css('background-color', e.color.toHex());
		$('.header-form input[name="html_background"]').val(e.color.toHex());
	});
	
	$('[id$=bg-colorpicker-input]:not(#body-bg-colorpicker-input)').colorpicker().on('changeColor', function(e){
		$(activeObject).css('background-color', e.color.toHex());
	});
	
	$('[id$=border-colorpicker-input]').colorpicker().on('changeColor', function(e){
		$(activeObject).css('border-color', e.color.toHex());
	});
	
	$('[id$=boxshadow-colorpicker-input]').colorpicker().on('changeColor', function(e){
		updateBoxShadow("color", e.color.toHex());
	});
});
