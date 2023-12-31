const img1 = "./../img/prints/leopard2.svg";
const img2 = "./../img/prints/fox2.svg";
const img3 = "./../img/prints/wolf2.svg";
const img4 = "./../img/prints/bear2.svg";

const footprintImages = [img1, img2, img3, img4];
var index_answer = [0, 1, 2, 3];
var index_question = [0, 1, 2, 3];
var color = localStorage.getItem("mycolor");
var key = localStorage.getItem("mykey");
var countdown;
var curPlayerData = JSON.parse(localStorage.getItem(key));
var score = curPlayerData.score;
var newScore = 0;
var curQuestion;

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
    // проигрыш - очки остаются прежними
    curPlayerData.score = score;
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
        document.documentElement.style.setProperty("--color-current", --color - standart);
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
    // перемешивание массива
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            let temp = array[i]; //елемент массива i меняется с случайно выбранным элементом j (j от 0 до i) 
            array[i] = array[j];
            array[j] = temp;
        }
    }
    // Перемешиваем следы перед началом теста
    shuffleArray(index_question);
    curQuestion = 0;
    // показ вопросов
    displayQuestion(footprintImages, curQuestion, index_question);
    // Функция для отображения вопросов
    function displayQuestion(images, i) {
        if (curQuestion === images.length) {
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
            sampleImage.src = images[index_question[i]];
            centerContainer.appendChild(sampleImage);
            shuffleArray(index_answer);
            // Отобразить массив следов в контейнере
            for (let j = 0; j < images.length; j++) {
                var answerContainer = document.createElement("div");
                answerContainer.className = "answerPicture";

                // Create a container for the image
                var imageContainer = document.createElement("div");
                imageContainer.className = "imageContainer";

                var answerElement = document.createElement("img");
                answerElement.className = "answerPicture";
                answerElement.src = images[index_answer[j]];
                answerElement.alt = "След " + (j + 1);

                // Append the image to the image container
                imageContainer.appendChild(answerElement);

                // Append the image container to the answer container
                answerContainer.appendChild(imageContainer);

                // Clone the animated element and set its position
                var animateClone = document.getElementById("svg_bubble").cloneNode(true);
                animateClone.style.position = 'absolute';
                animateClone.style.top = '0';
                animateClone.style.left = '0';
                animateClone.style.zIndex = '1'; // Ensure the animation is on top

                // Append the animated element to the answer container
                answerContainer.appendChild(animateClone);

                // при наведении мыши вызвать функцию handleMouseOver
                answerContainer.addEventListener("mouseover", createMouseOverHandler(answerElement));
                // при снятии мыши вызвать функцию handleMouseOut
                answerContainer.addEventListener("mouseout", createMouseOutHandler(answerElement));

                // Проверка ответа при клике
                answerContainer.addEventListener("click", function () {
                    checkAnswer(index_answer[j], index_question[i], index_question);
                });
                answerContainer.appendChild(answerElement);
                answerContainer.appendChild(animateClone);
                arrayContainer.appendChild(answerContainer);
            }
        }
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
    function checkAnswer(selectedIndex, correctIndex, index_question) {
        if (selectedIndex === correctIndex) {
            // Действия для правильного ответа
            newScore = newScore + 1;
        } else {
            // Действия для неправильного ответа
            newScore = newScore - 1;
        }
        curQuestion = curQuestion + 1;
        displayQuestion(footprintImages, curQuestion, index_question);
    }

    // остановка игры - кончились вопросы
    function endGame() {
        // сохранить результат игрока
        curPlayerData.score = newScore + score;
        score = score + newScore;
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
            window.location.href = "./../html/footprintsThird.html";
        });

        var restartButton = document.createElement("button");
        restartButton.innerHTML = '<p class="paragraph">Конец</p>';
        restartButton.classList.add("button-end");
        restartButton.addEventListener("click", function () {
            window.location.href = "./../index.html";
            // Обновляем переменную --color-current до стандартного
            document.documentElement.style.setProperty("--color-current", --color - standart);
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