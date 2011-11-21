(function($){

	$.fn.comaCombo = function(){
	
		var args = Array.prototype.slice.call(arguments);
	
		if(args.length > 0 && typeof(args[0]) == 'string') {
		
			var api = $(this).data('comaCombo');
			var method = args.shift();
			
			api[method](args[0]);
		
		} else {
	
			var settings = $.extend({
				autoWidth: false,
				zMin: 1,
				zMax: 100
			}, arguments[0]);
			
			var z = settings.zMin;

			this.each(function(){

				var select = $(this);
				var fake = $('<span class="comaCombo"><u><b><s></s></b></u></span>');
				var label = fake.find('b')
				var lock = false;
				
				fake.insertAfter(select);
				
				select.appendTo(fake);
				
				var width = select.outerWidth() - fake.outerWidth() + label.outerWidth();
				
				if($.browser.opera) {
				
					width += 2;
				
				}
				
				label.width(width);
				
				select
				.change(setLabel)
				.css({
					position: 'absolute',
					top: '1px',
					left: '3px',
					opacity: 0,
					zIndex: 1
				});
				
				setLabel();
				
				function setLabel() {
				
					label.find('s').text(select.find('option:selected').text());
				
				}

				var api = {
					update: function(a) {
					
						if(a != undefined) {
						
							var html = '';
							var v;
						
							if(a instanceof Array) {
								
								$.each(a, function(i) {
								
									html += '<option value="' + this.value + '">' + this.label + '</option>';
									
									if(this.selected) {
									
										v = this.value;
									
									}
								
								});
								
								select.html(html);
								select.val(v);
							} else if (a instanceof Object) {
								
								var selected = select.find(':selected').val();
								$.each(a, function(value, label) {
							
									html += '<option value="' + value + '">' + label + '</option>';
									
									if(selected == value) {
									
										v = value;
									
									}
								
								});
								
								select.html(html);
								select.val(v);
							} else {
							
								select.val(a);
								setLabel();
							
							}
						
						}
					
					},
					remove: function() {
						
						/*select.show();
						select.removeData('comaCombo');
						fake.remove();*/
						
					}
				};
				
				select.data('comaCombo', api);

			});

			return this;
		
		}

	}

})(jQuery);

$(function() {
	
	$('select').comaCombo();
	
});