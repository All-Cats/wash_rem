"use strict";

$(function () {
  // Параллакс 
  var rellax = new Rellax('.rellax'); // Табы в прайсе

  $('.price__header a').click(function (event) {
    event.preventDefault();
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    var tab = $(this).attr('href');
    $('.price__content').not(tab).css('display', 'none');
    $(tab).fadeIn();
  }); // Бренды

  var swiper = new Swiper('#js-carousel', {
    slidesPerView: 3,
    spaceBetween: 20,
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 0
    },
    allowTouchMove: false,
    breakpoints: {
      576: {
        slidesPerView: 5,
        spaceBetween: 30
      },
      768: {
        slidesPerView: 7,
        spaceBetween: 72
      } // 992: {
      // 	slidesPerView: 10,
      // 	spaceBetween: 72,
      // }

    }
  });
}); // 
// 
// 
// 
// Переменные

var headerTop = $('.header__row-wrapper');
var headerTopFixed = 'header__row-wrapper_fixed';
var menu = $('.header__mobile-menu');
var menuActive = 'header__mobile-menu_active';
var bodyOpenModalClass = 'popup_show'; // Функции для добавления классов для Body при открытии модалки и мобильного меню 

function bodyRemoveClass() {
  $('body').removeClass('window-padding');
  $(headerTop).removeClass('window-padding');
}

function bodyToggleClass() {
  $('body').toggleClass('window-padding');
  $(headerTop).toggleClass('window-padding');
} // 
// 
// 
// 
// Бургер


function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
}

$(window).resize(function () {
  if (!$('.popup').hasClass(bodyOpenModalClass) && $(window).width() > 991) {
    bodyRemoveClass();
    $('body').removeClass('no-scroll');
  }

  if ($(window).width() > 991) {
    $('.menu-link').removeClass('menu-link_active');
    $(menu).removeClass(menuActive);

    if ($('body').hasClass(bodyOpenModalClass)) {
      $('body').removeClass('no-scroll');
    }
  }
}); // Мобильное меню

var link = $('.menu-link');
$(link).on('click', function (e) {
  e.preventDefault();
  link.toggleClass('menu-link_active');
  $(menu).toggleClass(menuActive);
  $('body').toggleClass('no-scroll');

  if (!isMobile()) {
    bodyToggleClass();
  }
}); // 
// 
// 
// 
// Динамический адаптив

var da = new DynamicAdapt("max");
da.init(); // ie, safari

var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
var is_safari = navigator.userAgent.indexOf("Safari") > -1;
var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;

if (is_chrome && is_safari) {
  is_safari = false;
}

if (is_chrome && is_opera) {
  is_chrome = false;
}

if (is_safari) {
  var changeJpgToWebp = function changeJpgToWebp(item, type, attrribute) {
    var firstBg;

    if (attrribute == 'style') {
      firstBg = $(item).attr('style');
    } else {
      firstBg = $(item).attr('src');
    }

    var newBg = firstBg.replace('webp', type);
    console.log(newBg);

    if (attrribute == 'style') {
      $(item).attr('style', newBg);
    } else {
      $(item).attr('src', newBg);
    }
  };

  changeJpgToWebp($('.header__main'), 'jpg', 'style');
  changeJpgToWebp($('.discount'), 'jpg', 'style');
} // 
// 
// 
// 
// Фиксированное меню


$(function () {
  function fixedMenu() {
    if ($(window).width() > 991) {
      var s = $(window).scrollTop();

      if (s > 200) {
        $(headerTop).addClass(headerTopFixed);
      } else {
        $(headerTop).removeClass(headerTopFixed);
      }
    } else {
      $(headerTop).removeClass(headerTopFixed);
    }
  }

  fixedMenu();
  $(window).on('scroll', function () {
    fixedMenu();
  });
  $(window).resize(function () {
    fixedMenu();
  });
}); // 
// 
// 
// 
// Модалка

$('.popup').on('shown.bs.modal', function () {
  $('body').addClass('no-scroll');

  if (!isMobile()) {
    $('body').addClass('window-padding');
    $(headerTop).addClass('window-padding');
    $('.popup').addClass(bodyOpenModalClass);
  }
});
$('.popup').on('hidden.bs.modal', function (e) {
  $('.popup').removeClass(bodyOpenModalClass);
  bodyRemoveClass();

  if (!$(menu).hasClass(menuActive)) {
    $('body').removeClass('no-scroll');
  }
});
$('.popup-thank__close').on('click', function () {
  $('.popup').modal('hide');
});
$('.breakage__item-price').on('click', function () {
  $('.modal-info').val($(this).parent().find('.breakage__item-title').text());
  $('.popup-call').modal('show');
}); // 
// 
// 
// 
// плавная прокрутка

$('.menu li a, .scroll').click(function () {
  var scroll_el = $(this).attr('href');

  if ($(scroll_el).length != 0) {
    $('html, body').animate({
      scrollTop: $(scroll_el).offset().top - +$(headerTop).innerHeight()
    }, 800);
    $(menu).removeClass(menuActive);
    $('.menu-link').removeClass('menu-link_active');
    bodyRemoveClass();
  } else {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
    $(menu).removeClass(menuActive);
    $('.menu-link').removeClass('menu-link_active');
    bodyRemoveClass();
  }

  $('body').removeClass('no-scroll');
  return false;
}); // 
// 
// 
// 
// 
// Подстановка даты

// var today = new Date();
// var dd = String(today.getDate() + 2).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0');
// var monthName;

// switch (mm) {
//   case '01':
//     monthName = 'января';
//     break;

//   case '02':
//     monthName = 'февраля';
//     break;

//   case '03':
//     monthName = 'марта';
//     break;

//   case '04':
//     monthName = 'апреля';
//     break;

//   case '05':
//     monthName = 'мая';
//     break;

//   case '06':
//     monthName = 'июня';
//     break;

//   case '07':
//     monthName = 'июля';
//     break;

//   case '08':
//     monthName = 'августа';
//     break;

//   case '09':
//     monthName = 'сентября';
//     break;

//   case '10':
//     monthName = 'октября';
//     break;

//   case '11':
//     monthName = 'ноября';
//     break;

//   case '12':
//     monthName = 'декабря';
//     break;

//   default:
//     break;
// }

// $('.discount__title .day').text(dd);
// $('.discount__title .month').text(monthName);
var day = new Date();
var nextDay = new Date(day);
var months = new Array();
months[0] = "&nbsp;января";
months[1] = "&nbsp;февраля";
months[2] = "&nbsp;марта";
months[3] = "&nbsp;апреля";
months[4] = "&nbsp;мая";
months[5] = "&nbsp;июня";
months[6] = "&nbsp;июля";
months[7] = "&nbsp;августа";
months[8] = "&nbsp;сентября";
months[9] = "&nbsp;октября";
months[10] = "&nbsp;ноября";
months[11] = "&nbsp;декабря";

nextDay.setDate(day.getDate() + 1);
var nextDayFull = nextDay.getDate() + months[nextDay.getMonth()];
$('.day').html(nextDayFull);

// $('.discount__title .day').text(nextDayFull);
// $('.discount__title .month').text(monthName);

// Форма-телефон валидация

 document.querySelectorAll('.phone-input').forEach(input => {
    input.addEventListener('input', function (e) {
        let value = input.value.replace(/\D/g, '');
        if (!value.startsWith("7")) value = "7" + value;
        value = value.slice(0, 12);
        const formattedValue = "+7-" + value.slice(1, 4) +
            (value.length > 4 ? "-" + value.slice(4, 7) : "") +
            (value.length > 7 ? "-" + value.slice(7, 9) : "") +
            (value.length > 9 ? "-" + value.slice(9, 11) : "");
        input.value = formattedValue;
    });
});
