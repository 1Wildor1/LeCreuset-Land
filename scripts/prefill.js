  let showPrefill = function(){
    let main = document.getElementById("main");
    let secondMain = document.querySelector(".secondMain")
    main.style.display = "none";
    secondMain.style.display = "block"
  }


  setTimeout(() => {
  let selectedFlag = document.querySelector(".iti__selected-flag");
  let countrys = document.querySelectorAll(".iti__country");
  let phone = document.getElementById("phone");


  if (selectedFlag) {
    countrys.forEach((e) => {
      e.setAttribute("onclick", "changePhone(this)");
    });
    let titleValue = selectedFlag.getAttribute("title");
    let parts = titleValue.split("+");
    phone.value = parts[1]
  }
}, 1000);


let changePhone = (e) => {
  let phone = document.getElementById("phone");
  phone.value = Number(e.dataset.dialCode)
}





document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('phone');
  const iti = window.intlTelInput(phoneInput, {
    initialCountry: 'auto',
    geoIpLookup: callback => {
      fetch('https://ipinfo.io?token=85b43fdea7483a')
        .then(response => response.json())
        .then(data => callback(data.country))
        .catch(() => callback('us'));
    },
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
  });

  document.getElementById('userDataForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const secondName = form.second_name.value;
    const email = form.email.value;
    const phone = iti.getNumber(); // Получаем телефон с префиксом (например, +79991234567)
    const address = form.address.value;
    const zip = form.zip.value;
    const city = form.city.value;
    const country = form.country.value;
    const origin = form.origin.value;

    const leadData = { name, secondName, email, phone, address, zip, city, country, origin };
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbz5Pj2KIdhukt4llahmwmvbzgEMCGnOBkFHIH0AFPj7Lh3ibhplhPObAWAbQGpZDMY/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
        // mode: 'no-cors'
      });
      const result = await response.json();
      if (result.result !== 'success') {
        throw new Error('Ошибка записи в Google Sheets');
      }
    } catch (error) {
      console.error('Ошибка записи в Google Sheets:', error);
      return;
    }

    const trackingLink = `https://{trackingdomain}/click/?sub9=${encodeURIComponent(name)}&sub10=${encodeURIComponent(secondName)}&sub11=${encodeURIComponent(email)}&sub12=${encodeURIComponent(phone)}&sub13=${encodeURIComponent(address)}&sub14=${encodeURIComponent(zip)}&sub15=${encodeURIComponent(city)}&sub16=${encodeURIComponent(country)}`;
    window.location.href = trackingLink;
  });
});



async function populateCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    // Сортируем страны по названию
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    const select = document.createElement('select');
    select.name = 'country';
    select.id = 'country';

    // Создаем и добавляем опции для каждой страны
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.cca2; // Двухбуквенный код страны
      option.textContent = country.name.common; // Название страны
      select.appendChild(option);
    });

    document.getElementById('countryDropdown').appendChild(select);
  } catch (error) {
    console.error('Ошибка при получении списка стран:', error);
  }
}

// Вызываем функцию для заполнения списка при загрузке страницы
window.onload = populateCountries;



function validationInp(e) {
  const validationRules = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    name: /^[A-Za-zА-Яа-яЁё\s'-]{2,}$/,
    secondName: /^[A-Za-zА-Яа-яЁё\s'-]{2,}$/,
    phone: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/,
    address: /^.{5,}$/,
    zip: /^[0-9A-Za-z\-\s]{3,10}$/,
    city: /^[A-Za-zА-Яа-яЁё\s'-]{2,}$/
  };

  const field = e;
  const fieldType = field.name || field.id;

  
  const regex = validationRules[fieldType];

  if (regex && !regex.test(field.value.trim())) {
    field.classList.remove("valid");
    field.classList.add("notValid");
  } else {
    field.classList.remove("notValid");
    field.classList.add("valid");
  }
}

