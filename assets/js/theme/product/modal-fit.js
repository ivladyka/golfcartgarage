import $ from 'jquery';
import yswFA from './../make_model_year_filter';

export default class ModalProductFit {

    constructor(context) {

    	this.context = context;
    	this.init();
    }

    init() {

    	this.container = $(".make-modal-product-container");
    	this.showYourChoice();

    	this.container.removeClass('no-user-information item-fitting item-not-fitting');
    	this.container.addClass(this.hasUserInfo() ? ( this.isProductFitting() ? 'item-fitting' : 'item-not-fitting' ) : 'no-user-information'  );
    }

    hasUserInfo(){
		return yswFA.getCookie('ysw_fa_make') && yswFA.getCookie('ysw_fa_model') && yswFA.getCookie('ysw_fa_year');
    }

   	getProductValue(key, multiple){
		var values = [];
		for(var i in this.context.product_mf ){
			var field = this.context.product_mf[i];
			if( field.name === key ){
				values.push(field.value);
			}
		}
		return values.length == 1 ? values[0] : values;
	}

	getMake(){
		return this.getProductValue('make');
	}

	getModel(){
		return this.getProductValue('model');
		
	}

	getYears(){
		return this.getProductValue('year');    		
	}

    isProductFitting(){
		    	
    	function isMatching(match, cookie){

    		// console.log(match, cookie, yswFA.getCookie(cookie).toString());

    		if( Array.isArray(match) ){
    			return match.indexOf(yswFA.getCookie(cookie).toString()) !== -1;
    		}

		 	return match == yswFA.getCookie(cookie);
    	}

    	return isMatching(this.getMake(), 'ysw_fa_make') && isMatching(this.getModel(), 'ysw_fa_model') && isMatching(this.getYears(), 'ysw_fa_year');
    }

    showYourChoice(){
    	var yourchoice = this.container.find('.your-choice');

    	yswFA.getCookie('ysw_fa_make') && yourchoice.find('.make span').html( yswFA.getCookie('ysw_fa_make') );
    	yswFA.getCookie('ysw_fa_model') && yourchoice.find('.model span').html( yswFA.getCookie('ysw_fa_model') );
    	yswFA.getCookie('ysw_fa_year') && yourchoice.find('.year span').html( yswFA.getCookie('ysw_fa_year') );
    }
}
