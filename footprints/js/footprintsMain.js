// Цвет по умолчанию
const defaultColor =  getComputedStyle(document.documentElement).getPropertyValue('--color-standart');
var notDdropFlag = 1;
document.addEventListener("DOMContentLoaded", function () {
    const img1 = "./img/prints/leopard1.png";
    const img2 = "./img/prints/leopard2.png";
    const img3 = "./img/prints/fox1.png";
    const img4 = "./img/prints/fox2.png";
    const img5 = "./img/prints/wolf1.png";
    const img6 = "./img/prints/wolf2.png";
    const img7 = "./img/prints/bear1.png";
    const img8 = "./img/prints/bear2.png";
    const footprintImages = [img1, img2, img3, img4, img5, img6, img7, img8];
    

    // Функция для создания следа
    function createFootprints(numFootprints) {
        for (let i = 0; i < numFootprints; i++) {
            createFootprint();
        }
    }
    // Функция для создания отдельного следа
    function createFootprint() {
        const footprint = document.createElement("img");
        footprint.src = footprintImages[Math.floor(Math.random() * footprintImages.length)];
        footprint.classList.add("footprint");
        const widthImg = 221;
        const heightImg = 249;
        // начальные координаты
        let initialLeft = Math.random() * window.innerWidth;
        let initialTop = Math.random() * window.innerHeight;

        // корректируем координаты, чтобы не выходить за границы экрана
        if (initialLeft + footprint.width > window.innerWidth) {
            initialLeft = window.innerWidth - widthImg;
        }
        if (initialTop + footprint.height > window.innerHeight) {
            initialTop = window.innerHeight - heightImg;
        }

        footprint.style.left = `${initialLeft}px`;
        footprint.style.top = `${initialTop}px`;

        document.body.appendChild(footprint);

        // анимация появления
        setTimeout(() => {
            footprint.style.opacity = "1";
            footprint.style.animation = "footprintAnimation 5s linear";
        }, 100);

        // таймер для удаления следа после завершения анимации
        setTimeout(() => {
            setTimeout(() => {
                footprint.remove();
            }, 100);
            createFootprint();
        }, 2000);
    }

    // функция для создания первого следа\следов
    createFootprints(5);

});

// окно инструкции
function showInstruction() {
    // Создаем элементы всплывающего окна
    var instructionPopup = document.createElement("div");
    instructionPopup.id = "instructionPopup";
    instructionPopup.classList.add("popup");

    var popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    var closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.innerHTML = "&times;";
    closeButton.onclick = function () {
        closePopup(instructionPopup);
    };

    var heading = document.createElement("h2");
    heading.textContent = "Игра Следы";
    heading.classList.add("title-2");

    var paragraph = document.createElement("p");
    paragraph.innerHTML = "Здравствуй, дорогой игрок! <br> Ты находишься в игре следы. Животные уже прячутся, оставляя свои отпечатки лап. А тебе предстоит " +
        "отыскать их. За каждый угаданный след зверя, ты получишь плюс 1 балл, если ошибешься минус 1 балл. И поторопись, каждая секунда важна. Не успеешь найти всех" +
        "зверей в срок - не пройдешь уровень...<br> Удачи!";
    paragraph.classList.add("paragraph");

    // Добавляем элементы к всплывающему окну
    popupContent.appendChild(closeButton);
    popupContent.appendChild(heading);
    popupContent.appendChild(paragraph);
    instructionPopup.appendChild(popupContent);

    // Добавляем всплывающее окно на страницу
    document.body.appendChild(instructionPopup);

    // Отображаем всплывающее окно
    instructionPopup.style.display = "flex";
}
const instructionBtn = document.getElementById('instructionBtn');
// вызвать событие по нажатию на кнопку
instructionBtn.addEventListener('click', showInstruction);

function closePopup(Popup) {
    // Закрываем всплывающее окно
    if (Popup) {
        // Удаляем всплывающее окно и его дочерние элементы
        Popup.parentNode.removeChild(Popup);
    }
}
// окно настроек
function showSettings() {
    // Создаем элементы всплывающего окна
    var settingsPopup = document.createElement("div");
    settingsPopup.id = "settingsPopup";
    settingsPopup.classList.add("popup");

    var popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    var closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.innerHTML = "&times;";
    closeButton.onclick = function () {
        closePopup(settingsPopup);
    };

    var headingSettings = document.createElement("h2");
    headingSettings.textContent = "Настройки";
    headingSettings.classList.add("title-2");

    var paragraphSettings = document.createElement("p");
    paragraphSettings.innerHTML = "Перетащите понравившийся вам цвет в большой прямоугольник";
    paragraphSettings.classList.add("paragraph");

    // контейнер с текущим цветом, туда можно перетаскивать элементы
    var mainRect = document.createElement("div");
    mainRect.classList.add("main-rect");
    mainRect.addEventListener('dragover', allowDrop);
    mainRect.addEventListener('drop', drop);

    // Создаем прямоугольники с цветами
    var colorRects = ["--color-standart", "--color-pink", "--color-green", "--color-blue"];
    var colorRectContainer = document.createElement("div");
    colorRectContainer.classList.add("colorRectContainer");

    colorRects.forEach(function (color) {
        var colorRect = document.createElement("div");
        colorRect.classList.add("color-rect");
        colorRect.style.backgroundColor = `var(${color})`;
        colorRect.setAttribute("draggable", "true");
        colorRect.addEventListener('dragstart', drag);
        colorRectContainer.appendChild(colorRect);
    });
    // Добавляем элементы к всплывающему окну
    popupContent.appendChild(closeButton);
    popupContent.appendChild(headingSettings);
    popupContent.appendChild(paragraphSettings);
    popupContent.appendChild(mainRect);
    settingsPopup.appendChild(popupContent);
    popupContent.appendChild(colorRectContainer);
    // Добавляем всплывающее окно на страницу
    document.body.appendChild(settingsPopup);

    // Отображаем всплывающее окно
    settingsPopup.style.display = "flex";
}
const settingsBtn = document.getElementById('settingsBtn');
// вызвать событие по нажатию на кнопку
settingsBtn.addEventListener('click', showSettings);
// Функция для обработки начала перетаскивания
function drag(ev) {
    ev.dataTransfer.setData("color", ev.target.style.backgroundColor);
}

// Функция для разрешения события перетаскивания
function allowDrop(ev) {
    ev.preventDefault();
}

// Функция для обработки события окончания перетаскивания
function drop(ev) {
    allowDrop(ev);
    var color = ev.dataTransfer.getData("color");
    localStorage.setItem("mycolor", color);
    ev.target.style.backgroundColor = color;
    notDdropFlag = 0;
    // Обновляем переменную --color-current
    document.documentElement.style.setProperty("--color-current", color);
}

// обработка ввода имени
function start() {
    var beginContainer = document.querySelector(".beginContainer");
    var nameInput = document.getElementById("nameInput");
    if (!beginContainer) {
        var beginContainer = document.createElement("div");
        beginContainer.classList.add("beginContainer");

        var beginBtn = document.createElement("button");
        beginBtn.innerText = "Начать";
        // beginContainer.appendChild(beginBtn);
        var link = document.createElement("a");
        link.href = "./html/footprintsFirst.html";
        link.appendChild(beginBtn);
        beginContainer.appendChild(link);
        var centerContainer = document.querySelector(".center-container");
        centerContainer.appendChild(beginContainer);

        beginBtn.onclick = function () {
            saveData();
        };
    }
    if (nameInput.value.trim() === '') {
        // при остутствии текста ввода - кнопка исчезнет
        beginContainer.parentNode.removeChild(beginContainer);
    }
}

const nameInput = document.getElementById('nameInput');
// вызвать событие по нажатию на кнопку
nameInput.addEventListener('input', start);

function saveData() {
    // никнейм игрока
    var playerName = document.getElementById("nameInput").value;

    // нет пустых никнеймов (их нет, т к с ними не нажать на кнопку)
    if (playerName.trim() !== '') {
        // генерация уникального ключа
        var key = 'player_' + new Date().getTime();
        localStorage.setItem("mykey", key);
        // объект игрок с данными (0 - результат по умолчанию)
        var playerData = {
            name: playerName,
            score: 0
        };

        // преобразовать объект в строку
        var playerDataString = JSON.stringify(playerData);

        // сохранить строку в локальное хранилище
        localStorage.setItem(key, playerDataString);
        if (notDdropFlag){
            localStorage.setItem("mycolor", defaultColor);
        }
    } else {
        alert('Пожалуйста, введите имя');
    }
}

// окно рейтинга
function showRating() {
    // Создаем элементы всплывающего окна
    var ratingPopup = document.createElement("div");
    ratingPopup.id = "ratingPopup";
    ratingPopup.classList.add("popup");

    var popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    var closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.innerHTML = "&times;";
    closeButton.onclick = function () {
        closePopup(ratingPopup);
    };

    var headingRating = document.createElement("h2");
    headingRating.textContent = "Рейтинг";
    headingRating.classList.add("title-2");

    var paragraph = document.createElement("p");
    paragraph.innerHTML = "10 лучших игроков!";
    paragraph.classList.add("paragraph");

    popupContent.appendChild(closeButton);
    popupContent.appendChild(headingRating);
    popupContent.appendChild(paragraph);
    ratingPopup.appendChild(popupContent);

    // всплывающее окно на страницу
    document.body.appendChild(ratingPopup);
    // отобразить окно
    ratingPopup.style.display = "flex";

    // данные из Local Storage
    var allData = [];

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        if (key.startsWith('player')) {
            // распарсить значение как JSON
            try {
                var playerData = JSON.parse(value);
                allData.push({ key: key, value: playerData });
            } catch (error) {
                // Если не удалось распарсить, добавить в массив как строку
                allData.push({ key: key, value: value });
            }
        }

    }
    // сортировка данных по убыванию
    allData.sort((a, b) => {
        return b.value.score - a.value.score;
    });
    // Вывод первых 10 элементов или меньшего количества, если элементов меньше 10
    var numberOfElementsToShow = Math.min(10, allData.length);

    for (var i = 0; i < numberOfElementsToShow; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = `${allData[i].value.name}: ${allData[i].value.score}`;
        listItem.classList.add("paragraph");
        popupContent.appendChild(listItem);
    }
}
const ratingBtn = document.getElementById('ratingBtn');
// вызвать событие по нажатию на кнопку
ratingBtn.addEventListener('click', showRating);

// кнопка Заново
function resetPage() {
    // Установить переменную --color-current в --color-standart
    document.documentElement.style.setProperty('--color-current', 'var(--color-standart)');

    // Очистить ввод
    var nameInput = document.getElementById('nameInput');
    if (nameInput) {
        nameInput.value = '';
    }

    // Убрать кнопку "Начать"
    var beginContainer = document.querySelector('.beginContainer');
    if (beginContainer) {
        beginContainer.parentNode.removeChild(beginContainer);
    }
}
const resetBtn = document.getElementById('resetBtn');
// вызвать событие по нажатию на кнопку
resetBtn.addEventListener('click', resetPage);