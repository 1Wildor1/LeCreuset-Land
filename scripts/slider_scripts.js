$(document).ready(function () {
    //Слайдер с продуктом
    $(".main-roduct-slider-for").on("init", function (event, slick) {
      $(this).css("visibility", "visible");
    });
    if ($(".main-roduct-slider-for").length > 0) {
      $(".main-roduct-slider-for").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        arrows: true,
        dots: false,
        infinite: true,
        fade: true,
        swipe: true,
        // asNavFor: ".main-product-slider-nav",
      });
    }
  
    // $(".main-product-slider-nav").on("init", function (event, slick) {
    //   $(this).css("visibility", "visible");
    // });
    // if ($(".main-product-slider-nav").length > 0) {
    //   $(".main-product-slider-nav").slick({
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     speed: 500,
    //     arrows: false,
    //     dots: false,
    //     infinite: true,
    //     fade: false,
    //     swipe: true,
    //     swipeToSlide: true,
    //     focusOnSelect: true,
    //     asNavFor: ".main-roduct-slider-for",
    //   });
    // }
  });
  