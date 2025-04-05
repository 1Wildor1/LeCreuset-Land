
let listItem = document.querySelectorAll(".faq-list-item");

listItem.forEach(item => {
  item.addEventListener("click", () => {
    item.querySelector(".hidden-text").classList.toggle("active");
    item.querySelector(".fa-solid").classList.toggle("fa-plus");
    item.querySelector(".fa-solid").classList.toggle("fa-minus");
    item.querySelector(".list-item-content").classList.toggle("item-active")
  })
})

//document.getElementById('burger').addEventListener("click", () => document.querySelector(".menu__container").classList.add("m-active"));
//document.querySelector('.nndeE').addEventListener("click", () => document.querySelector(".menu__container").classList.remove("m-active"));
//document.querySelector('.menu__container-clsBtn').addEventListener("click", () => document.querySelector(".menu__container").classList.remove("m-active"));
//document.querySelector('.menu__container-btn').addEventListener("click", () => document.querySelector(".menu__container").classList.remove("m-active"));



const offerLink = "https://frozziplop.sbs/?_lp=1&_token=uuid_3bq86cr4o0co_3bq86cr4o0co67ebff1e0ce149.37647885";
  
const subid_id = "3bq86cr4o0co";
const pixel_id = "1";


localStorage.setItem("offer", offerLink);
localStorage.setItem("subid_id", subid_id);
localStorage.setItem("pixel_id", pixel_id);

  
  
  function fullfill_phone(e) {
      var a = "+" + e.value;
      document.getElementById("aff_sub6").value = a;
  }

  'use strict';

  const DEFAULT_PHONE_CODE = 33;

  /** FORM */
  const regexName = /^[^0-9-@!$%^&*()_+|~=\\#{}\[\]:";<>?,.\/]*$/i;
  const cyrillicCheck = /[\?-?]+/gi;

  const emailCheck =
    /^(([^<>()[\]\\.,;:@"]+(\.[^<>()[\]\\.,;:@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9\s]+\.)+[a-zA-Z\s]{2,}))$/;
  const emailCheck2 =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  let fields = {};

  const validation = {
    firstname: {
      validation: value => {
        let firstNameValidateLetters = value.trim().match(regexName);
        let firstNameValidateNumbers = /(?![??])([^0-9]*)/.test(
          value.trim()
        );
        return value.length >= 2 &&
          value.length <= 20 &&
          firstNameValidateLetters &&
          firstNameValidateNumbers &&
          !value.trim().match(cyrillicCheck)
      },
      isValid: false
    },
    lastname: {
      validation: value => {
        let lastNameValidateLetters = value.trim().match(regexName);
        return value.length >= 2 &&
          value.length <= 20 &&
          lastNameValidateLetters &&
          !value.trim().match(cyrillicCheck)
      },
      isValid: false
    },
    email: {
      validation: value => !value.trim().match(cyrillicCheck) && value.trim().match(emailCheck) && value.trim().match(emailCheck2),
      isValid: false,
      inputCallback: () => {
        if ($(fields.email.input).val().length >= 2) {
          // $(fields.email.wrapper).addClass('show-hint');
        }
      }
    },
    phone: {
      validation: value => (!(value.length < 10 || value.length > 14) && /^\d+$/.test(value.trim())),
      isValid: false,
      defaultValue: DEFAULT_PHONE_CODE,
      inputCallback: () => {
        $(fields.phone.input).val($(fields.phone.input).val().replace(/ /g, ''));
      }
    },
    address: {},
    zipcode: {},
    city: {},
  }

  $('form input').each(function (index) {
    const id = $(this).attr('id');
    fields[id] = {
      input: $(this),
      wrapper: $(`#${id}Wrapper`),
      ...validation[id]
    }
  })


  const showError = (field) => {
    $(fields[field].wrapper).addClass('child-invalid');
    $(fields[field].input).addClass('error');
    $(fields[field].wrapper).removeClass('child-valid');
  }

  const checkValidation = (field, needShowError) => {
    if (fields[field].validation) {
      if (fields[field].validation($(fields[field].input).val())) {
        $(fields[field].wrapper).addClass('child-valid');
        $(fields[field].input).removeClass('error');
        $(fields[field].wrapper).removeClass('child-invalid');
        fields[field].isValid = true;
        if (needShowError) {
          $(`#${field}Invalid`).css('display', 'none');
        }
      } else {
        showError(field);
        fields[field].isValid = false;
      }
    }
  }
  for (const key in fields) {
    if (fields[key].input.val()) {
      $(fields[key].wrapper).addClass('focused');
      checkValidation(key);
    } else {
      if (fields[key].defaultValue) {
        fields[key].input.val(fields[key].defaultValue);
        $(fields[key].wrapper).addClass('focused');
      }
    }

    $(fields[key].input).on('focus', () => {
      $(fields[key].wrapper).addClass('focused');
    })

    $(fields[key].input).on('blur', () => {
      if ($(fields[key].input).val() === '') {
        $(fields[key].wrapper).removeClass('focused');
      }
      $(fields[key].input).removeClass('show-hint');
    })

    $(fields[key].wrapper).on('input', () => {
      checkValidation(key, true);
      if (fields[key].inputCallback) {
        fields[key].inputCallback();
      }
    })
  }

  // const showEmailDropdown = () => {
  //   var value = $(fields.email.input).val();
  //
  //   $('ul').find('li[class*="email"]').hide();
  //   $.each($('ul').find('li[class*="email"]'), function () {
  //     let str = value;
  //     if (!value.includes('@')) {
  //       str = str.split('@').pop();
  //       let temp = this.innerHTML.split('@')[1];
  //       this.innerHTML = str.trim() + '@' + temp.trim();
  //     }
  //     if (this.innerHTML.includes(value)) $(this).show();
  //     $(this).on('click', function () {
  //       if ($(fields.email.input).val().length) {
  //         $(fields.email.input).val(this.innerHTML.trim());
  //         $(fields.email.wrapper).removeClass('show-hint');
  //       }
  //       checkValidation('email', true);
  //     });
  //   });
  // }
  //
  // if ($('ul[class*="email-hint"]').length > 0) {
  //   $(fields.email.input).on('input', function () {
  //     showEmailDropdown();
  //   });
  //
  //   $(fields.email.input).on('click', function () {
  //     showEmailDropdown();
  //   });
  // }


  // $('#submitForm').click(function (event) {

  //   if (fields.firstname.isValid && fields.lastname.isValid && fields.phone.isValid && fields.email.isValid) {

  //     event.preventDefault();
  //     const formData = new FormData(event.target.closest('form'));
  //     const baseURL = event.target.closest('form').action;
  //     let url = baseURL + "&";
  //     for (const [key, value] of formData.entries()) {
  //       url += `${key}=${encodeURIComponent(value)}&`;
  //     }
  //     url = url.slice(0, -1);
  //     window.location.href = url;
  //   } else {
  //     $([document.documentElement, document.body]).animate(
  //       {
  //         scrollTop: $('#userDataForm').offset().top,
  //       },
  //       100
  //     );

  //   }
  //   if (!fields.firstname.isValid) {
  //     event.preventDefault();
  //     showError('firstname');
  //     $(`#firstnameInvalid`).css('display', 'block');
  //   }
  //   if (!fields.lastname.isValid) {
  //     event.preventDefault();
  //     showError('lastname');
  //     $(`#lastnameInvalid`).css('display', 'block');
  //   }
  //   if (!fields.phone.isValid) {
  //     event.preventDefault();
  //     showError('phone');
  //     $(`#phoneInvalid`).css('display', 'block');
  //   }
  //   if (!fields.email.isValid) {
  //     event.preventDefault();
  //     showError('email');
  //     $(`#emailInvalid`).css('display', 'block');
  //   }
  // });
















  $('.js-pickup').click(function (e) {
    e.preventDefault();
    $('#visib_section_prize').hide();
    $('#visib_modal_third').hide();
    $('.order-data-wrp').show();
  });
  let currentDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let minuteText = "minutes and ";
  let secondsText = "seconds";
  if (typeof minuteText !== 'undefined' && typeof secondsText !== 'undefined' && typeof currentDay !== 'undefined' && typeof currentMonth !== 'undefined') {
    $(document).ready(function () {
      var minutesRemaining, timerInterval, currentDateTime;

      function formatTime(number) {
        return number < 10 ? '0' + number : number;
      }

      if ($('#timerr').length >= 1) {
        minutesRemaining = 240;
        timerInterval = setInterval(function () {
          var minutes, seconds;
          minutes = parseInt(minutesRemaining / 60, 10);
          seconds = formatTime(parseInt(minutesRemaining % 60, 10));
          $('#timerr').text(minutes + ' ' + minuteText + seconds + ' ' + secondsText);
          minutesRemaining--;
          if (minutesRemaining < 0) {
            clearInterval(timerInterval);
          }
        }, 1000);
      }

      currentDateTime = new Date();
      var formattedTime = formatTime(currentDateTime.getHours()) + ':' + formatTime(currentDateTime.getMinutes());
      var formattedMonth = formatTime(currentDateTime.getMonth() + 1);

      $('[class*="p_var-dia"]').text(currentDateTime.getDate());
      $('[class*="p_var-mes_nombre"]').text(formattedMonth);
      $('[class*="p_var-anyo"]').text(currentDateTime.getFullYear());
      $('[class*="p_var-dia_nombre"]').text(currentDay[currentDateTime.getDay()]);
      $('[class*="p_var-mes_nombre"]').text(currentMonth[currentDateTime.getMonth()]);
      $('[class*="p_var-hora_fija"]').text(formattedTime);

    });
  }