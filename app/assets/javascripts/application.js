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

/* Active Element Variables */
var activeObject;
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
		$('.activeSubmenu').hide().removeClass('activeSubmenu');
		displayedMenu = domObject;
	}
	else {
		displayedMenu = '';
	}
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
	return boxShadowHorizontal+"px "+boxShadowVertical+"px "+boxShadowBlur+"px "+boxShadowColor;
}

function updateBoxShadow(attribute, value){
	if(attribute=='vertical'){ boxShadowVertical = value; }
	else if(attribute=='horizontal'){ boxShadowHorizontal = value; }
	else if(attribute=='blur'){ boxShadowBlur = value; }
	setStyle(activeObject,'box','shadow', boxShadowValue());
}


$(document).ready(function(){
	$('#body').bind({
		click: function(){ showMenu('#body-menu', event);
											 activeObject="#body"; }
	});

	$('#header').bind({
		click: function(){ 
			if(!headerSelected)	{ showMenu('#header-menu', event); }
			else { 
				showMenu('#menu-style', event);
				activeObject="#header"; 
			}
		}
	});
	
	$('[id|=section]').click(function(){
		showMenu('#menu-style', event);
    activeObject="#content"; 		
	});
	
	$('#footer').click(function(){
		showMenu('#menu-style', event);
    activeObject="#footer"; 		
	});
	
	$('[id|=header-option]').click(function(){
		$('#header').html($('#header-format-'+this.id.substring(this.id.length-1)).html());
		headerSelected = true;
		showMenu('#header-menu', event);
	});
	
	/* Menus Behavior */
	
	$('#menu-style #border-menu-primary').click(function(){
		$(this).toggleClass('multiple active');
		$('#border-menu-secondary').toggle("fast");
	});
	
	$('#menu-style #boxshadow-menu-primary').click(function(){
		$(this).toggleClass('multiple active');
		$('#boxshadow-menu-secondary').toggle("fast");
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
	$('#page-bg-colorpicker-input').colorpicker().on('changeColor', function(e){
		$('#body').css('background-color', e.color.toHex());
	});
	
	$('#header-bg-colorpicker-input').colorpicker().on('changeColor', function(e){
		$(activeObject).css('background-color', e.color.toHex());
	});
	
	$('#header-border-colorpicker-input').colorpicker().on('changeColor', function(e){
		$(activeObject).css('border-color', e.color.toHex());
	});
	
	$('#header-boxshadow-colorpicker-input').colorpicker().on('changeColor', function(e){
		boxShadowColor = e.color.toHex();
		setStyle(activeObject, "box", "shadow", boxShadowValue());
	});
});
