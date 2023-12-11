// находим элемент с конопкой nav-icon-btn
// и когда по нему кликают к нему добавить активный класс с изменениями для маленького экрана (найти по классу)

const navButton = document.querySelector('.nav-icon-btn');

// найти иконку
const navIcon = document.querySelector('.nav-icon');
// найти навигацию
const nav = document.querySelector('.header_top-row');

// обращаемся к кнопке и к навигации и по клику происходит функция добавления активного класса
navButton.onclick = function(){
    // к navIcon добавляет или убирает в зависимости от наличия класса (toggle)
    navIcon.classList.toggle('nav-icon--active');
    nav.classList.toggle('header_top-row--mobile');
    // добавить отстуствие скроллинга к body через класс no-scroll
    document.body.classList.toggle('no-scroll');
}


// Яндекс карты

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
	// Создание карты.
	var map = new ymaps.Map('map', {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [60.007465,30.373109],//координаты
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 16,
	});

	var myPlacemark = new ymaps.Placemark(//создание нового объекта
		[60.007465,30.373109], //координаты адреса метки
		{	},
		{ //описание метки
			iconLayout: 'default#image',
			iconImageHref: './img/map/location-pin.svg',
			iconImageSize: [40, 40],
			iconImageOffset: [-20, -40],//место, которым пин указывает на карту, иначе по умолчанию указывает верхней левой точкой. Это сдвиг для пина на низ
		}
	);
    // добавление геообъекта на карту
    map.geoObjects.add(myPlacemark);
    // map.controls.remove('geolocationControl'); // удаляем геолокацию
	// map.controls.remove('searchControl'); // удаляем поиск
	// map.controls.remove('trafficControl'); // удаляем контроль трафика
	// map.controls.remove('typeSelector'); // удаляем тип

	// // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	// // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
	// map.controls.remove('rulerControl'); // удаляем контрол правил
	// map.behaviors.disable(['scrollZoom']); // отключаем скролл карты 
}

// ОТПРАВЛЕНИЕ ФОРМЫ
// Находим форму по идентификатору
const form = document.getElementById("myForm");
const form2 = document.getElementById("myForm1");
// Добавляем обработчик события на отправку формы
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Предотвращаем отправку формы

  // Здесь можно добавить код для обработки отправки формы, например, отправку данных на сервер или вывод сообщения об успешной отправке.
  
  // Пример вывода сообщения
  alert("Форма отправлена успешно!");
  // Очистить поля ввода формы
  form.reset();
});
form2.addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы
  
    // Здесь можно добавить код для обработки отправки формы, например, отправку данных на сервер или вывод сообщения об успешной отправке.
    
    // Пример вывода сообщения
    alert("Форма отправлена успешно!");
    // Очистить поля ввода формы
    form2.reset();
  });