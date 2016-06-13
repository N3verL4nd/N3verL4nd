/*
 * Simple Fade 1.0 - jQuery plugin
 *
 * Copyright (c) 2011 Lunardi Loris - Italy
 *
 * Site: http://ajoin.it
 * e-mail: l.lunardi@ajoin.it
 *
 */
var window_loaded = false;

(function($){
		  
	$.fn.simpleFade = function(options) {
		var opts = $.extend({},$.fn.simpleFade.defaults,options);
		//operazioni preliminari
		
		T_obj_class = 'simpleFade_'+Math.floor(Math.random()*10000);
		$(this).addClass(T_obj_class);
		
		var n_box = $('.'+T_obj_class+' .elSlide').size();
		
		$('.'+T_obj_class+' .elSlide').hide();
		
		if(opts.random){
			partenza = findRand(n_box,null);
		}else{
			partenza = opts.start;
		}
		
		
		$('.'+T_obj_class+' .elSlide:nth-child('+partenza+')').show();

		if(n_box>1){
			runFade (T_obj_class,opts.start);
		}

		var cssObj_B = {'position' : 'relative'}
		$('.'+T_obj_class).css(cssObj_B);

		var cssObj_E = {'position' : 'absolute', 'top' : 0, 'left': 0}
		$('.'+T_obj_class+' .elSlide').css(cssObj_E);
		
		function runFade(T_obj_class,show){
			t = setTimeout(function() {
				$('.'+T_obj_class+' .elSlide').fadeOut(opts.velocita);
				$('.'+T_obj_class+' .elSlide:nth-child('+show+')').fadeIn(opts.velocita,function(){
					if((show != n_box)||(!opts.goout)){
						runFade (T_obj_class,show);
					}else{
						closeFade (T_obj_class);
					}
				});
			}, opts.timeout); 
			
			if(opts.random){
				show = findRand(n_box,show);
			}else if(show == n_box){
				if(opts.restart){
					show = opts.restart_to;
				}else{
					clearTimeout(t);
					g = setTimeout(function(){opts.callback()},opts.velocita);
				}
			}else{
				show++;
			}
		}

		function closeFade(T_obj_class){
			c = setTimeout(function() {
				g = setTimeout(function(){opts.callback()},opts.velocita);	
				$('.'+T_obj_class+' .elSlide').fadeOut(opts.velocita);
			}, opts.timeout);
		}
		
		//tira fuori un valore random in un intervallo diverso da quello che in input
		function findRand(inter,in_val){
			var n_random=Math.floor(Math.random()*(inter))+1;
			if(n_random!=in_val){
				return n_random;
			}else{
				return findRand(inter,in_val);
			}
		}
		//Fine raccolta funzioni
	}
	
	$.fn.simpleFade.defaults = {
		//impostazioni di default
		start : 1,
		restart : true,
		goout : false,
		restart_to : 1,
		velocita : 1500,
		timeout : 7000,
		random : false,
		callback : function(){}
	
	};
	
})(jQuery);