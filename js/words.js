const zoneDrop = document.querySelector('.zone-drop');
const resultInput = document.querySelector('.result-input');
const showWords = document.querySelector('.zone-show');

//ассоциативный массив
var associativeMap = new Map();
// разобрать строку и заполнить массив
function crash() {

    associativeMap.clear();
    var inputString = document.getElementById('input-words').value;
    if (inputString.trim() === '') {
        // inputString пустая, не вызываем createInput
        return;
    }
    // Разбиение строки на слова и числа
    // var wordsAndNumbers = inputString.replace(/\s/g, '').split('-');
    var wordsAndNumbers = inputString.split('-');
    // Фильтрация и сортировка слов и чисел
    var words = wordsAndNumbers.filter(function (item) {
        // если значение не чисто то isNaN - true
        return isNaN(item);
    }).sort();

    var numbers = wordsAndNumbers.filter(function (item) {
        return !isNaN(item);
    }).sort(function (a, b) {
        return a - b;
    });
    // Добавление слов с ключами "a1", "a2", ...
    for (var i = 0; i < words.length; i++) {
        var key = 'a' + (i + 1);
        associativeMap.set(key, words[i]);
    }

    // Добавление чисел с ключами "n1", "n2", ...
    for (var j = 0; j < numbers.length; j++) {
        var key = 'n' + (j + 1);
        associativeMap.set(key, numbers[j]);
    }
    createInput(associativeMap);
}

function createInput(associativeArray) {
    // Создание HTML-блоков
    resultInput.innerHTML = '';
    zoneDrop.innerHTML = '';
    showWords.innerHTML = '';

    for (let [key, value] of associativeMap) {
        var block = document.createElement('div');
        block.textContent = key + ' ' + value;
        block.classList.add('blocks');
        // Устанавливаем ID равное ключу
        block.id = key;
        // Устанавливаем свойство draggable в true
        block.draggable = true;
        // Устанавливаем атрибут ondragstart
        block.setAttribute('ondragstart', 'drag(event)');
        resultInput.appendChild(block);
    }
    setEqualWidth();
}
// задать одинаковую ширину блокам
function setEqualWidth() {
    var blocks = document.querySelectorAll('.blocks');
    var maxWidth = 0;

    // Находим максимальную ширину блока
    blocks.forEach(function (block) {
        var width = block.offsetWidth;
        maxWidth = Math.max(maxWidth, width);
    });

    // Устанавливаем максимальную ширину для всех блоков
    blocks.forEach(function (block) {
        block.style.width = maxWidth + 'px';
    });
}

// ПЕРЕТАСКИВАНИЕ

// отмена стандартного поведения для зон перетаскивания
function allowDrop(event) {
    event.preventDefault();
}

// обработка перетаскивания - запомнить ид элемента
function drag(event) {
    event.dataTransfer.setData('id', event.target.id)
}

// обработчик событий для разрешения перетаскивания
zoneDrop.addEventListener('dragover', allowDrop);
zoneDrop.addEventListener('drop', drop);

resultInput.addEventListener('dragover', allowDrop);
resultInput.addEventListener('drop', drop);

function drop(event) {
    var showElem = document.querySelector('.zone-show');

    var draggedContent = event.dataTransfer.getData('id');
    var draggedElement = document.getElementById(draggedContent);

    // Проверяем, что элемент существует
    if (draggedElement) {

        // Используем elementFromPoint для определения элемента под указателем мыши
        // var targetElem = document.elementFromPoint(event.clientX, event.clientY);
        // контейнер куда поместить элемент
        var targetElem = event.target.closest('.zone-drop, .result-input');

        // Если targetElem - это нужный вам контейнер, добавляем элемент в него
        if (targetElem && (targetElem === zoneDrop || targetElem === resultInput)) {
            draggedElement.parentElement.removeChild(draggedElement);
            targetElem.appendChild(draggedElement);



            var key = draggedElement.id;
            // var existingPElem = document.getElementById(key);
            // Проверяем, является ли existingPElem дочерним элементом showElem
            // if (!showElem.contains(existingPElem)) {
            var divElem = document.createElement('div');
            var key2 = key + 'new';
            divElem.id = key2;
            divElem.textContent = associativeMap.get(key) + ' ';
            var elem2 = document.getElementById(key2);

            if (targetElem === zoneDrop) {
                // Устанавливаем новый класс для элемента, чтобы изменить стиль
                draggedElement.style.position = 'absolute';
                var elemHalfWidth = draggedElement.offsetWidth / 2;
                var elemHalfHeight = draggedElement.offsetHeight / 2;
                // разрешенная область добавления
                var rect_l = 0 + elemHalfWidth;
                var rect_t = 0 + elemHalfHeight;
                var rect_r = targetElem.clientWidth - elemHalfWidth - 5;
                var rect_b = targetElem.clientHeight - elemHalfHeight - 5;

                // дельты для коррекции
                var delX = 0;
                var delY = 0;
                // сдвиг по высоте в пределы области
                if (event.offsetY <= rect_t) {
                    delY = rect_t - event.offsetY;
                }
                if (event.offsetY >= rect_b) {
                    delY = rect_b - event.offsetY;
                }
                // сдвиг по ширине в пределы области
                if (event.offsetX <= rect_l) {
                    delX = rect_l - event.offsetX;
                }
                if (event.offsetX >= rect_r) {
                    delX = rect_r - event.offsetX;
                }

                var absX = event.pageX - elemHalfWidth + delX;
                var absY = event.pageY - elemHalfHeight + delY;
                draggedElement.style.left = absX + 'px';
                draggedElement.style.top = absY + 'px';

                // ОТОБРАЖЕНИЕ элементов

                if (!showElem.contains(elem2)) {
                    showElem.appendChild(divElem);
                }


            }
            if (targetElem === resultInput) {
                draggedElement.style.position = null;
                draggedElement.style.left = null;
                draggedElement.style.top = null;
                draggedElement.style.position = 'relative';

                // УДАЛЕНИЕ ОТОБРАЖЕНИЯ элементов
                // console.log('Удаляем элемент с id:', key2);
                showElem.removeChild(elem2);

            }
        }
    }

}
