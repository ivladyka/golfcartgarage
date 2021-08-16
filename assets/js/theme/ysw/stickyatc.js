import $ from 'jquery';

export default function stickyATC() {
	 const stickyATC = $('#stickyATC');
	 const add2cart = $('#form-action-addToCart')[0];
	 const  mobilewid = 800;
	 
	function isAboveViewport (elem) {
		var distance = elem.getBoundingClientRect();
		return distance.top < 0;
	};
	 
	 function manageClasses(){
		 var w =  $( window ).width();
		 if (w > mobilewid) {
				if (stickyATC.hasClass("mobile")){
					stickyATC.removeClass("mobile");
				}  
				stickyATC.addClass("desktop");
		 } else {
				if (stickyATC.hasClass("desktop")){
					stickyATC.removeClass("desktop");
				}  
				stickyATC.addClass("mobile");			 
		 }
	 }
	 manageClasses();
	 // hook events
	 
	 $( window ).scroll(function(){
		if (isAboveViewport(add2cart)) {
			stickyATC.addClass("sticky")
		}else {
			stickyATC.removeClass("sticky")
		}		 
	 });
	 
	 $("#stickyATC-addToCart").click(function(){   
        var carticon = '<i class="fa fa-shopping-cart" aria-hidden="true"></i>';     
		$("#stickyATC-addToCart").html(carticon+"Adding to Cart...");
        $('.productView-details form').submit(); 
		setTimeout(function() {
		$("#stickyATC-addToCart").html(carticon+"Add to Cart");},750);

		
		
		
     });	 
	 
	 $( window ).resize(function() {
		manageClasses();
	});
}
