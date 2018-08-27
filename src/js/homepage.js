//Add OnepageNav / Sidebar
function onePageFixedNav() {
    if($('body').length){
      // Add scrollspy to 
      $('body').scrollspy({target: ".theme-main-header", offset: 70});   

      // Add smooth scrolling on all links inside the one-page-menu
      $(".one-page-menu li a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 1000, function(){
       
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        }  // End if
      });
      $("#t12").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 1000, function(){
       
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        }  // End if
      });
    }
}


jQuery(document).on('ready', function() {
	(function ($) {
     onePageFixedNav();
     $('.tp-leftarrow.tparrows.hermes').css("visibility","hidden");
     $('.tp-rightarrow.tparrows.hermes').css("visibility","hidden")
  })(jQuery);
});
