(function($){

	var mobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i);

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
				var fake = $('<span class="comaCombo"><u><b><s></s></b></u><span><em><i></i></em></span></span>');
				var label = fake.find('b');
				var opciones = fake.find('span');
				var lock = false;
				
				fake.insertAfter(select);
				
				var width = select.outerWidth() - fake.outerWidth() + label.outerWidth();
				
				if($.browser.opera) {
				
					width += 2;
				
				}
				
				label.width(width);
				
				select.hide();
				opciones.slideUp(0);
				
				fake
				.click(open)
				.mouseleave(close);
				
				load();
				
				function setLabel() {
				
					label.find('s').text(select.find('option:selected').text());
				
				}

				function load() {
				
					var html = '';
					
					select.children().each(function(){

						html += '<a href="#" rel="' + this.value + '">' + $(this).text() + '</a>';

					});
					
					opciones
					.find('i')
					.html(html)
					.find('a')
					.click(change);
					
					setLabel();
				
				}
				
				function open(event) {
				
					if(!lock) {
				
						opciones.slideDown(250);
						fake.css('z-index', z++);
						
						if(z >= settings.zMax) {
						
							z = settings.zMin;
						
						}
						
					}
				
				}
				
				function close(event) {
					
					if(!lock) {
					
						opciones.slideUp(250);
						
					}
				
				}
				
				function change(event) {
				
					event.preventDefault();
					$(this).blur();
					
					lock = true;
					
					select
					.val(this.rel)
					.change();
					
					setLabel();
					
					opciones.slideUp(250, function() {
					
						lock = false;
					
					});
				
				}
				
				var api = {
					update: function(a) {
					
						if(a != undefined) {
						
							if(a instanceof Array) {
							
								var html = '';
								var v;
								
								$.each(a, function(i) {
								
									html += '<option value="' + this.value + '">' + this.label + '</option>';
									
									if(this.selected) {
									
										v = this.value;
									
									}
								
								});
								
								select.html(html);
								select.val(v);
								load();
							
							} else {
							
								select.val(a);
								setLabel();
							
							}
						
						} else {
						
							load();
						
						}
					
					},
					remove: function() {
						
						select.show();
						select.removeData('comaCombo');
						fake.remove();
						
					}
				};
				
				select.data('comaCombo', api);

			});

			return this;
		
		}

	}

})(jQuery);