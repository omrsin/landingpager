# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

#------------------------- Global Variables ------------------------#

# Selected Format Variables
@headerSelected  = @footerSelected = false
@sectionSelected = [false, false, false, false, false]

# Active Element Variables
@activeObject  = @activeSection = @activeText = null
@displayedMenu = @displayedSubmenu = null

# Box & Text Shadow Variables
boxShadowHorizontal = textShadowHorizontal = "0"
boxShadowVertical   = textShadowVertical 	 = "0"
boxShadowBlur 			= textShadowBlur 			 = "0"
boxShadowColor 			= textShadowColor 		 = "black"

#---------------------------- Functions ----------------------------#

# Submit Functions

@updateSubmitInfo = ->
	$('section, div').removeClass 'bordered top-bordered'
	$('.header-form input[name="html_string"]').val $('#main').html()

# Menu Functions
	
setPosition = (domObject, pageX, pageY) ->
	$(domObject).css 'left', "#{pageX}px"
	$(domObject).css 'top', "#{pageY}px"

setActiveObject = (element) ->
	@activeObject = element
	
setActiveSection = (element) ->
	@activeSection = element

setActiveText = (element) ->
	@activeText = element
	
setHeaderSelected = (isSelected) ->
	@headerSelected = isSelected
	
setSectionSelected = (index, isSelected) ->
	@sectionSelected[index] = isSelected
	
setFooterSelected = (isSelected) ->
	@footerSelected = isSelected
	
@showMenu = (domObject, e) ->
	e.stopPropagation()
	if @displayedMenu!=domObject
		$('.activeMenu').hide().removeClass 'activeMenu'
		@displayedMenu = domObject
	else
		@displayedMenu = ''
	$('.activeSubmenu').hide().removeClass 'activeSubmenu'
	$(domObject).toggle().toggleClass 'activeMenu'
	setPosition domObject, e.pageX, e.pageY
	
@showSubmenu = (domObject, style, value) ->
	offset = $(domObject).offset()
	width = parseInt $(domObject).parent().css('width')
	id = "##{style}-menu-#{value}"
	if displayedSubmenu!=id
		$('.activeSubmenu').hide().removeClass 'activeSubmenu'
		@displayedSubmenu = id
	else
		@displayedSubmenu=''
	$(id).css('left', "#{offset.left+width+5}px")
			 .css('top', "#{offset.top}px")
			 .toggle('fast')
			 .toggleClass('activeSubmenu')
			 
# DOM Manipulation Functions

@setStyle = (domObject, style, value) ->
  $(domObject).css style, value
  
@setSectionElementId = (sectionNumber, type) ->
	switch type
		when 'image'
			$("#section-#{sectionNumber} img").each (index) ->
				$(@).attr 'id', "content-image-#{sectionNumber}-#{index+1}"
		when 'text'
			$("#section-#{sectionNumber} .text").each (index) ->
				$(@).attr 'id', "content-text-#{sectionNumber}-#{index+1}"
				
# Shadow Function

updateShadow = (style, attribute, value) ->
	switch style
		when 'boxshadow'  then updateBoxShadow attribute, value
		when 'textshadow' then updateTextShadow attribute, value
 
# Box Shadow Functions

boxShadowValue = ->
	"#{@boxShadowHorizontal} #{@boxShadowVertical} #{@boxShadowBlur} #{@boxShadowColor}"

@updateBoxShadow = (attribute, value) ->
	setBoxShadowFromTarget()
	switch attribute
		when 'vertical' 	then @boxShadowVertical 	 = "#{value}px"
		when 'horizontal' then @boxShadowHorizontal  = "#{value}px"
		when 'blur' 			then @boxShadowBlur 			 = "#{value}px"
		when 'color' 			then @boxShadowColor 		   = value	
	setStyle @activeObject,'box-shadow', boxShadowValue()

setBoxShadowFromTarget = ->
	boxShadow = $(@activeObject).css 'box-shadow'
	boxShadowValues = ''
	if boxShadow == 'none'
		@boxShadowHorizontal = "0px"
		@boxShadowVertical 	 = "0px"
		@boxShadowBlur 			 = "0px"
		@boxShadowColor 		 = "black"	
	else 
		boxShadowValues = boxShadow.split(')')
		@boxShadowColor = "#{boxShadowValues[0]})"
		boxShadowValues = boxShadowValues[1].split(' ')
		@boxShadowHorizontal = boxShadowValues[1]
		@boxShadowVertical 	 = boxShadowValues[2]
		@boxShadowBlur 			 = boxShadowValues[3]
		
# Text Shadow Functions

textShadowValue = ->
	"#{@textShadowHorizontal} #{@textShadowVertical} #{@textShadowBlur} #{@textShadowColor}"

@updateTextShadow = (attribute, value) ->
	setTextShadowFromTarget()
	switch attribute
		when 'vertical' 	then @textShadowVertical   = "#{value}px"
		when 'horizontal' then @textShadowHorizontal = "#{value}px"
		when 'blur' 			then @textShadowBlur 			 = "#{value}px"
		when 'color' 		  then @textShadowColor 		 = value
	setStyle @activeText,'text-shadow', textShadowValue()

setTextShadowFromTarget = ->
	textShadow = $(@activeText).css 'text-shadow'
	textShadowValues = ''
	if textShadow =='none'
		@textShadowHorizontal = "0px"
		@textShadowVertical 	= "0px"
		@textShadowBlur 			= "0px"
		@textShadowColor 			= "black"
	else
		textShadowValues = textShadow.split(')')
		@textShadowColor = "#{textShadowValues[0]})"
		textShadowValues = textShadowValues[1].split(' ')
		@textShadowHorizontal = textShadowValues[1]
		@textShadowVertical 	= textShadowValues[2]
		@textShadowBlur 			= textShadowValues[3]
		
#---------------------------- Listeners ----------------------------#

$ ->

# Element Behavior

	$('#body').click -> 
		showMenu '#body-menu', event
		setActiveObject "#body"

	$('#header').click ->
		if !headerSelected	
			showMenu '#header-menu', event
		else
			setActiveObject "#header"
			showMenu '#menu-style-header', event
			
	$('[id|=section]').click ->
		setActiveSection $(@)
		section = @.id.substring @.id.length-1
		if !sectionSelected[section-1] 
			showMenu '#menu-format', event
		else 
			setActiveObject "#content"
			showMenu '#menu-style-sections', event
			
	$('#footer-content').click ->
		if !footerSelected 
			showMenu '#footer-menu', event
		else
			setActiveObject "#footer"
			showMenu '#menu-style-footer', event
	
	$('#footer-bottom-line').click ->
		setActiveObject "#footer"
		showMenu '#menu-style-footer', event
		
# Content Behavior

	$('#header').on "click", '[id$=content-image]', (e) ->
		e.stopPropagation()
		setActiveObject @
		showMenu '#menu-style-header-image', e
		
	$('#header').on "click", '[id$=content-text] h1', (e) ->
		e.stopPropagation()
		setActiveObject $(@).parents '[id$=content-text]'
		setActiveText @;
		showMenu '#menu-style-header-text-h1', e
		
	$('#header').on "click", '[id$=content-text] li', (e) ->
		e.stopPropagation()
		setActiveObject $(@).parents '[id$=content-text]'
		setActiveText $(@).parents 'ul'
		showMenu '#menu-style-header-text-li', e
		
	$('[id|=section]').on "click", '[id|=content-image]', (e) ->
		e.stopPropagation()
		setActiveObject @
		section = $(@).attr('id').split('-')[2]
		image = $(@).attr('id').split('-')[3]
		showMenu "#menu-style-content-image-#{section}-#{image}", e
	
	$('[id|=section]').on "click", '[id|=content-text]', (e) ->
		e.stopPropagation()
		setActiveObject @
		setActiveText @
		section = $(@).attr('id').split('-')[2]
		text = $(@).attr('id').split('-')[3]
		showMenu "#menu-style-content-text-#{section}-#{text}", e
		
# Format Menus Behavior

	$('[id|=header-option]').click ->
		$('#header').html $("#header-format-#{@.id.substring(@.id.length-1)}").html()
		setHeaderSelected true
		showMenu '#header-menu', event
	
	$('[id|=format-option]').click ->
		params = @.id.split('-')
		id = activeSection.attr 'id'
		$(activeSection).html $("#section-format-#{params[2]}-#{params[4]}").html()
		section = id.substring id.length-1
		setSectionSelected section-1, true
		setSectionElementId section, params[2]
		showMenu '#format-menu', event
	
	$('[id|=footer-option]').click ->
		$('#footer-content').html $("#footer-format-#{@.id.substring(@.id.length-1)}").html()
		setFooterSelected true
		showMenu '#footer-menu', event
		
# Style Menus Behavior

	$('[id|=border-menu-primary]').click ->
		$(@).toggleClass 'multiple active'
		section = $(@).data 'section'
		$("#border-menu-secondary-#{section}").toggle "fast"
		$('.activeSubmenu').hide().removeClass 'activeSubmenu'
	
	$('[id|=boxshadow-menu-primary]').click ->
		$(@).toggleClass 'multiple active'
		section = $(@).data 'section'
		$("#boxshadow-menu-secondary-#{section}").toggle "fast"
		$('.activeSubmenu').hide().removeClass 'activeSubmenu'
		
	$('[id|=font-menu-primary]').click ->
		$(@).toggleClass 'multiple active'
		section = $(@).data 'section'
		$("#font-menu-secondary-#{section}").toggle "fast"
		$('.activeSubmenu').hide().removeClass 'activeSubmenu'
	
	$('[id|=textshadow-menu-primary]').click ->
		$(@).toggleClass 'multiple active'
		section = $(@).data 'section'
		$("#textshadow-menu-secondary-#{section}").toggle "fast"
		$('.activeSubmenu').hide().removeClass 'activeSubmenu'

# Submenus Behavior
		
	$('#menu-format #format-image-primary').click ->
		$('#format-text-primary').removeClass 'active'
		$(@).toggleClass 'active'
		showSubmenu $(@), "format", "image"
	
	$('#menu-format #format-text-primary').click ->
		$('#format-image-primary').removeClass 'active'
		$(@).toggleClass 'active'
		showSubmenu $(@), "format", "text"

	$('[id|=option]').click ->
		params = @.id.split('-')
		showSubmenu $(@), params[1], params[2]
	
# Style Behavior

	$('[id|=style]').click ->
		params = @.id.split('-')
		setStyle activeObject, "#{params[1]}-#{params[2]}", params[3]
	
	$('[id|=text-style]').click ->
		params = this.id.split('-')
		if params[params.length-1]!='normal'
			setStyle activeText, "#{params[2]}-#{params[3]}", params[4]
		else
			setStyle activeText,'font-weight','normal'
			setStyle activeText,'font-style','normal'
			
	$('.pixel-input').on		
		keydown: (e) ->
			style = $(@).attr('id').split('-')[1]
			if e.keyCode == 38
				e.preventDefault()
				$(@).val parseInt($(@).attr('value'))+1
			else if e.keyCode == 40
				e.preventDefault()
				$(@).val parseInt($(@).attr('value'))-1
			attribute = $(@).data 'option'
			value = $(@).val()
			updateShadow style, attribute, value
		keyup: ->
			style = $(@).attr('id').split('-')[1]
			attribute = $(@).data 'option'
			value = $(@).val()
			updateShadow style, attribute, value

# Colorpickers

	$('#body-bg-colorpicker-input').colorpicker().on 'changeColor', (e) ->
		$('#body').css 'background-color', e.color.toHex()
		$('#main').css 'background-color', e.color.toHex()
		$('.header-form input[name="html_background"]').val e.color.toHex()
		
	$('[id$=bg-colorpicker-input]:not(#body-bg-colorpicker-input)').colorpicker().on 'changeColor', (e) ->
		$(activeObject).css 'background-color', e.color.toHex()
		
	$('[id$=border-colorpicker-input]').colorpicker().on 'changeColor', (e) ->
		$(activeObject).css 'border-color', e.color.toHex()
	
	$('[id$=boxshadow-colorpicker-input]').colorpicker().on 'changeColor', (e) ->
		updateBoxShadow "color", e.color.toHex()
	
	$('[id$=font-colorpicker-input]').colorpicker().on 'changeColor', (e) ->
		$(activeText).css 'color', e.color.toHex()
	
	$('[id$=textshadow-colorpicker-input]').colorpicker().on 'changeColor', (e) ->
		updateTextShadow "color", e.color.toHex()
		
