const img1 = "./../img/prints/leopard2.jpg";
const img2 = "./../img/prints/fox2.jpg";
const img3 = "./../img/prints/wolf2.jpg";
const img4 = "./../img/prints/bear2.jpg";

var footprintImages = [img1, img2, img3, img4];
var color = localStorage.getItem("mycolor");
var key = localStorage.getItem("mykey");
var countdown;
var curPlayerData = JSON.parse(localStorage.getItem(key));
var score = curPlayerData.score;
console.log(score);
// Обновляем переменную --color-current по выбору пользователя
document.documentElement.style.setProperty("--color-current", color);
// номер уровня и инструкция

document.addEventListener("DOMContentLoaded", function () {

    // Создаем элементы всплывающего окна
    var welcomePopup = document.createElement("div");
    welcomePopup.id = "welcomePopup";
    welcomePopup.classList.add("popup");

    var popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");

    var heading = document.createElement("h2");
    heading.textContent = "2 уровень!";
    heading.classList.add("title-2");

    var paragraph = document.createElement("p");
    paragraph.innerText = "Кликни по следу, соответствующему образцу";
    paragraph.classList.add("paragraph");

    // Добавляем элементы к всплывающему окну
    popupContent.appendChild(heading);
    popupContent.appendChild(paragraph);
    welcomePopup.appendChild(popupContent);

    // Добавляем всплывающее окно на страницу
    document.body.appendChild(welcomePopup);

    // Отображаем всплывающее окно
    welcomePopup.style.display = "flex";
    setTimeout(() => {
        closePopup(welcomePopup);
    }, 3000);
});

function closePopup(popup) {
    popup.parentNode.removeChild(popup);
}

setTimeout(() => {
    // Создаем элемент таймера
    var timerContainer = document.getElementById("timer-container");
    var timerSeconds = 20;

    // Обновляем таймер каждую секунду
    countdown = setInterval(function () {
        timerContainer.innerHTML = '<p class="title-2">ВРЕМЯ: ' + timerSeconds + ' сек</p>';
        // Уменьшаем значение таймера
        timerSeconds--;

        // Когда таймер достигнет 0, останавливаем таймер
        if (timerSeconds < 0) {
            clearInterval(countdown);
            timerContainer.innerHTML = '<p class="title-2">Время вышло!</p>';
            StopGame();
        }
    }, 1000);
}, 2000);

// остановка игры - время вышло
function StopGame() {
    // проигрыш - очки обнуляются
    curPlayerData.score = 0;
    localStorage.setItem(key, JSON.stringify(curPlayerData));
    //вывести окно проигрыша
    showBadResults();
}
// проигрышное окно
function showBadResults() {
    var popupBad = document.createElement("div");
    popupBad.classList.add("popup");

    var popupBadContent = document.createElement("div");
    popupBadContent.classList.add("popup-content");

    var titleBad = document.createElement("h2");
    titleBad.classList.add("title-2");
    titleBad.textContent = "Ваш результат: ";

    var scoreText = document.createElement("p");
    scoreText.classList.add("paragraph");
    scoreText.textContent = score;

    var badText = document.createElement("p");
    badText.classList.add("paragraph");
    badText.textContent = "К сожалению вы не прошли уровень(";

    var btnBadContent = document.createElement("div");
    btnBadContent.classList.add("buttons-content");

    var againButton = document.createElement("button");
    againButton.innerHTML = '<p class="paragraph">Еще раз!</p>';
    againButton.classList.add("button-end");
    againButton.addEventListener("click", function () {
        location.reload();
    });

    var restartButton = document.createElement("button");
    restartButton.innerHTML = '<p class="paragraph">Конец</p>';
    restartButton.classList.add("button-end");
    restartButton.addEventListener("click", function () {
        window.location.href = "./../index.html";
        // Обновляем переменную --color-current до стандартного
        document.documentElement.style.setProperty("--color-current", --color-standart);
        localStorage.setItem(mykey, "");
        localStorage.setItem(mycolor, "--color-standart");
    });

    popupBadContent.appendChild(titleBad);
    popupBadContent.appendChild(scoreText);
    btnBadContent.appendChild(againButton);
    btnBadContent.appendChild(restartButton);
    popupBadContent.appendChild(btnBadContent);
    popupBad.appendChild(popupBadContent);

    document.body.appendChild(popupBad);

    // Отображаем всплывающее окно
    popupBad.style.display = "flex";
}

// все события происходят после закрытия окна 3сек
setTimeout(() => {
    // Перемешиваем следы перед началом теста
    shuffleArray(footprintImages);
    // первый вопрос
    displayQuestion(footprintImages, 0);

    // перемешивание массива
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            let temp = array[i]; //елемент массива i меняется с случайно выбранным элементом j (j от 0 до i) 
            array[i] = array[j];
            array[j] = temp;
        }
    }
    // показ вопросов
    // Функция для отображения вопросов
    function displayQuestion(images, i) {
        if (i === images.length + 1) {
            endGame();
        }
        else {
            var centerContainer = document.querySelector(".center-container");
            var arrayContainer = document.querySelector(".array-container");
            // очистить контейнеры
            centerContainer.innerHTML = '';
            arrayContainer.innerHTML = '';

            // Отобразить образец следа в центральном контейнере
            var sampleImage = document.createElement("img");
            sampleImage.classList.add("centerImg");
            sampleImage.id = "sample-image";
            sampleImage.src = images[i];
            centerContainer.appendChild(sampleImage);

            // Отобразить массив следов в контейнере
            for (let j = 0; j < images.length; j++) {
                var answerElement = document.createElement("img");
                answerElement.className = "answerPicture";
                answerElement.src = images[j];
                answerElement.alt = "След " + (j + 1);
                // при наведении мыши вызвать функцию handleMouseOver
                answerElement.addEventListener("mouseover", createMouseOverHandler(answerElement));
                // при снятии мыши вызвать функцию handleMouseOut
                answerElement.addEventListener("mouseout", createMouseOutHandler(answerElement));

                // Применить случайный фильтр к изображению
                applyRandomFilter(answerElement);

                // Проверка ответа при клике
                answerElement.addEventListener("click", function () {
                    checkAnswer(j, i);
                });

                arrayContainer.appendChild(answerElement);
            }
        }
    }
    // Функция для применения случайного фильтра к изображению
    function applyRandomFilter(imgElement) {
        const filterIds = ["filter1", "filter2", "filter3", "filter4"];
        const randomFilterId = filterIds[Math.floor(Math.random() * filterIds.length)];
        imgElement.style.filter = "url(#" + randomFilterId + ")";
    }
    
    // Функция создания обработчика события для mouseover
    function createMouseOverHandler(element) {
        return function () {
            handleMouseOver(element);
        };
    }

    // Функция создания обработчика события для mouseout
    function createMouseOutHandler(element) {
        return function () {
            handleMouseOut(element);
        };
    }
    // при наведении мыши на некоторый элемент увеличение до 1.1 с длительностью 0.3s
    function handleMouseOver(element) {
        element.style.transform = "scale(1.1)";
        element.style.transition = "transform 0.3s";
    }
    // при отведении мыши на некоторый элемент уменьшится до прежних размеров с длительностью 0.3s
    function handleMouseOut(element) {
        element.style.transform = "scale(1)";
        element.style.transition = "transform 0.3s";
    }

    // Функция проверки ответа
    function checkAnswer(selectedIndex, correctIndex) {
        if (selectedIndex === correctIndex) {
            // Действия для правильного ответа
            score = score + 1;
        } else {
            // Действия для неправильного ответа
            score = score + 0;
        }
        //вызываем новый вопрос после завершения проверки ответа
        if (correctIndex == footprintImages.length - 1) {
            endGame();
        }
        else {
            var nextQuestionIndex = correctIndex + 1;
            displayQuestion(footprintImages, nextQuestionIndex);
        }
    }

    // остановка игры - кончились вопросы
    function endGame() {
        // сохранить результат игрока
        curPlayerData.score = score;
        localStorage.setItem(key, JSON.stringify(curPlayerData));
        // Останавливаем таймер
        clearInterval(countdown);
        // Показываем окно с результатами
        showResults();
    }

    // окно результатов
    function showResults() {
        var popup = document.createElement("div");
        popup.classList.add("popup");

        var popupContent = document.createElement("div");
        popupContent.classList.add("popup-content");

        var title = document.createElement("h2");
        title.classList.add("title-2");
        title.textContent = "Ваш результат: ";

        var scoreText = document.createElement("p");
        scoreText.classList.add("paragraph");
        scoreText.textContent = score;

        var btnContent = document.createElement("div");
        btnContent.classList.add("buttons-content");

        var nextLevelButton = document.createElement("button");
        nextLevelButton.innerHTML = '<p class="paragraph">Следующий уровень</p>';
        nextLevelButton.classList.add("button-end");
        nextLevelButton.addEventListener("click", function () {
            window.location.href = "./../html/footprintsSecond.html";
        });

        var restartButton = document.createElement("button");
        restartButton.innerHTML = '<p class="paragraph">Конец</p>';
        restartButton.classList.add("button-end");
        restartButton.addEventListener("click", function () {
            window.location.href = "./../index.html";
            // Обновляем переменную --color-current до стандартного
            document.documentElement.style.setProperty("--color-current", --color-standart);
            localStorage.setItem(mykey, "");
            localStorage.setItem(mycolor, "--color-standart");
        });

        popupContent.appendChild(title);
        popupContent.appendChild(scoreText);
        btnContent.appendChild(nextLevelButton);
        btnContent.appendChild(restartButton);
        popupContent.appendChild(btnContent);
        popup.appendChild(popupContent);

        document.body.appendChild(popup);

        // Отображаем всплывающее окно
        popup.style.display = "flex";
    }
}, 3000);