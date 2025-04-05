// answers to questions
// const clickAnswer = () => {
//     $('.decor_questions_js_one').fadeOut(1000, function(){
//         $('.decor_questions_js_two').fadeIn(1000);
//     });
// };
// const clickAnswerOne = () => {
//     $('.decor_questions_js_two').fadeOut(1000, function(){
//         $('.decor_questions_js_three').fadeIn(1000);
//     });
// };
// const clickAnswerTwo = () => {
//     $('.decor_questions_js_three').fadeOut(1000, function(){
//         $('.decor_questions_js_four').fadeIn(1000);
//     });
// };

// // Visib block check
// const clickLastAnswer = () => {
//     $('#visib_main_product').fadeOut(1000, function(){
//         $('#visible_comments').fadeOut(0);
//         $('footer').fadeOut(0);
//         $('#visib_block_check').fadeIn(1000, function(){
//             setTimeout(() => $('.result_check_one').fadeIn(1000), 1000);
//             setTimeout(() => $('.result_check_two').fadeIn(1000), 2000);
//             setTimeout(() => $('.result_check_three').fadeIn(1000), 3000);
//             setTimeout(() => {
//                 $('#visib_block_check').fadeOut(1000, function(){
//                     $('#visib_section_prize').fadeIn(500);
//                     $('.overlay').fadeIn(500);
//                     $('#visib_modal_first').fadeIn(500);
//                 });
//             }, 4000);
//         });
//     });
// };

// Shared handler for navigating questions
const clickAnswer = (currentClass, nextClass) => {
    $(`.${currentClass}`).fadeOut(1000, function() {
        $(`.${nextClass}`).fadeIn(1000);
    });
};

// Last answer handler for showing final stage
const clickLastAnswer = () => {
    $('#visib_main_product').fadeOut(1000, function() {
        $('#visible_comments').fadeOut(0);
        $('#visible_faq').fadeOut(0);
        $('footer').fadeOut(0);
        $('#visib_block_check').fadeIn(1000, function() {
            setTimeout(() => $('.result_check_one').fadeIn(1000), 1000);
            setTimeout(() => $('.result_check_two').fadeIn(1000), 2000);
            setTimeout(() => $('.result_check_three').fadeIn(1000), 3000);
            setTimeout(() => {
                $('#visib_block_check').fadeOut(1000, function() {
                    $('#visib_section_prize').fadeIn(500);
                    $('.overlay').fadeIn(500);
                    $('#visib_modal_first').fadeIn(500);
                });
            }, 4000);
        });
    });
};


// Gift box
let emptyBoxClicked = false; // флаг для отслеживания клика по пустой коробке
let modalShown = false; // флаг для отслеживания появления модального окна

$('.element_box').on('click', function(event) {
    let targElem = $(event.target);

    if (!targElem.hasClass('box_cover')) {
        targElem = targElem.closest('.box_cover');
        if (targElem.length === 0) {
            targElem = $(this).find('.box_cover').first();
        }
    }

    if (!emptyBoxClicked && !targElem.hasClass('open_box')) {
        // если кликнули на закрытую коробку и нет других открытых коробок с призом
        targElem.addClass('open_box');
        $(this).find('.box_cover').addClass("open_box");
        emptyBoxClicked = true;
        
        setTimeout(() => {
            $('#visib_modal_second').fadeIn(600);
            modalShown = true;
        }, 1800);
    } else if (emptyBoxClicked && !modalShown) {
        // если кликнули на другую закрытую коробку, когда уже открыта пустая коробка, но модальное окно еще не появилось
        return;
    } else if (emptyBoxClicked && modalShown) {
        // если кликнули на другую закрытую коробку, когда уже открыта пустая коробка и модальное окно появилось
        let gift = $(this).find('.prize');
        let boxCover = $(this).find('.box_cover');
        
        if (!boxCover.hasClass('open_box')) {
            boxCover.addClass('open_box');
            gift.addClass('open_prize');
            setTimeout(() => {
                $('#fullscreen_prize_visib').fadeIn(1000); //открытие картинки с продуктом на весь экран, после коробочек
                $('.picture_after_boxes').addClass("active");//анимация прокручивания для картинки с продуктом

                setTimeout(() => {
                    $('#fullscreen_prize_visib').fadeOut(100);//скрыть показ картинки с продуктом перед модальным окном
                    $('#visib_modal_third').fadeIn(1000); //открытие последнего модального окна с призом
                }, 3000);                
            }, 2300);
            
            
            $('.element_box').off('click');
        }
    }
});


//modal  window
$('.close_modal').on('click', function(){
    $('#visib_modal_first').fadeOut(600);
});
$('.close_second').on('click', function(){
    $('#visib_modal_second').fadeOut(600);
});
$('#open_policy').on('click', function(){
    $('.wrapp_overlay').fadeIn(300);
})
$('#close_policy').on('click', function(){
    $('.wrapp_overlay').fadeOut(300);
})

//FAQ
//Open FAQ
$('.faq_icon_open').on('click', function(){
    $('#bg_faq_color').fadeIn(300);
    $('.faq_icon_open').fadeOut();
})
//Close FAQ
$('.close_faq_icon').on('click', function(){
    $('#bg_faq_color').fadeOut(300);
    $('.faq_icon_open').fadeIn();
})
//поведение faq
$('.faq_header').on('click', function(){
    var clickedHeader = $(this);
    var clickedText = clickedHeader.next('.faq_text');

    // Закрыть все остальные блоки, кроме текущего
    $('.faq_header').not(clickedHeader).removeClass('active focus_accordion');
    $('.faq_text').not(clickedText).slideUp();

    // Переключить состояние текущего блока
    clickedHeader.toggleClass('active').toggleClass('focus_accordion');
    clickedText.slideToggle();
});
//timer
// Create Countdown
var Countdown = {
  
    // Backbone-like structure
    $el: $('.countdown'),
    
    // Params
    countdown_interval: null,
    total_seconds     : 0,
    
    // Initialize the countdown  
    init: function() {
      
      // DOM
          this.$ = {
          hours  : this.$el.find('.bloc-time.hours .figure'),
          minutes: this.$el.find('.bloc-time.min .figure'),
          seconds: this.$el.find('.bloc-time.sec .figure')
         };
  
      // Init countdown values
      this.values = {
            hours  : this.$.hours.parent().attr('data-init-value'),
          minutes: this.$.minutes.parent().attr('data-init-value'),
          seconds: this.$.seconds.parent().attr('data-init-value'),
      };
      
      // Initialize total seconds
      this.total_seconds = this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;
  
      // Animate countdown to the end 
      this.count();    
    },
    
    count: function() {
      
      var that    = this,
          $hour_1 = this.$.hours.eq(0),
          $hour_2 = this.$.hours.eq(1),
          $min_1  = this.$.minutes.eq(0),
          $min_2  = this.$.minutes.eq(1),
          $sec_1  = this.$.seconds.eq(0),
          $sec_2  = this.$.seconds.eq(1);
      
          this.countdown_interval = setInterval(function() {
  
          if(that.total_seconds > 0) {
  
              --that.values.seconds;              
  
              if(that.values.minutes >= 0 && that.values.seconds < 0) {
  
                  that.values.seconds = 59;
                  --that.values.minutes;
              }
  
              if(that.values.hours >= 0 && that.values.minutes < 0) {
  
                  that.values.minutes = 59;
                  --that.values.hours;
              }
  
              // Update DOM values
              // Hours
              that.checkHour(that.values.hours, $hour_1, $hour_2);
  
              // Minutes
              that.checkHour(that.values.minutes, $min_1, $min_2);
  
              // Seconds
              that.checkHour(that.values.seconds, $sec_1, $sec_2);
  
              --that.total_seconds;
          }
          else {
              clearInterval(that.countdown_interval);
          }
      }, 1000);    
    },
    
    animateFigure: function($el, value) {
      
       var that         = this,
               $top         = $el.find('.top'),
           $bottom      = $el.find('.bottom'),
           $back_top    = $el.find('.top-back'),
           $back_bottom = $el.find('.bottom-back');
  
      // Before we begin, change the back value
      $back_top.find('span').html(value);
  
      // Also change the back bottom value
      $back_bottom.find('span').html(value);
  
      // Then animate
      TweenMax.to($top, 0.8, {
          rotationX           : '-180deg',
          transformPerspective: 300,
            ease                : Quart.easeOut,
          onComplete          : function() {
  
              $top.html(value);
  
              $bottom.html(value);
  
              TweenMax.set($top, { rotationX: 0 });
          }
      });
  
      TweenMax.to($back_top, 0.8, { 
          rotationX           : 0,
          transformPerspective: 300,
            ease                : Quart.easeOut, 
          clearProps          : 'all' 
      });    
    },
    
    checkHour: function(value, $el_1, $el_2) {
      
      var val_1       = value.toString().charAt(0),
          val_2       = value.toString().charAt(1),
          fig_1_value = $el_1.find('.top').html(),
          fig_2_value = $el_2.find('.top').html();
  
      if(value >= 10) {
  
          // Animate only if the figure has changed
          if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
          if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
      }
      else {
  
          // If we are under 10, replace first figure with 0
          if(fig_1_value !== '0') this.animateFigure($el_1, 0);
          if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
      }    
    }
  };
  
  // Let's go !
  Countdown.init();
