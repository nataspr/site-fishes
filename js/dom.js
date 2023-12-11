// функция выполниться, после создания структуры документа
document.addEventListener("DOMContentLoaded", function () {
    // начать тест по нажатию на кнопку Вопросы
    const startButton = document.getElementById('start_btn');
    startButton.addEventListener('click', startQuiz);

    // Кнопка для переключения вопросов
    const toggleButton = document.getElementById("toggle_btn");

    function startQuiz() {
        // Скрываем кнопку "Вопросы"
        startButton.style.display = "none";
        // массив объектов, в объекте 3 поля: question - строка с текстом вопроса, answers - массив строк ответов, correctAnswer - строка правильного ответа
        const questions = [
            // question: Текст вопроса.
            // answers: Массив строк, представляющих варианты ответов на вопрос.
            // correctAnswer: строка с правильным ответом
            { question: "1) Если человека назвали мордофиля, то это…", answers: ["Значит, что он тщеславный.", "Значит, что у него лицо как у хряка.", "Значит, что чумазый."], correctAnswer: "Значит, что он тщеславный.", explaination: "Ну зачем же вы так... В Этимологическом словаре русского языка Макса Фасмера поясняется, что мордофилей называют чванливого человека. Ну а «чванливый» — это высокомерный, тщеславный." },
            { question: "2) «Да этот Ярополк — фуфлыга!» Что не так с Ярополком?", answers: ["Он маленький и невзрачный.", "Он тот еще алкоголик.", "Он не держит свое слово."], correctAnswer: "Он маленький и невзрачный.", explaination: "Точно! Словарь Даля говорит, что фуфлыгой называют невзрачного малорослого человека. А еще так называют прыщи."},
            { question: "3) Если человека прозвали пятигузом, значит, он…", answers: ["Без гроша в кармане.", "Не держит слово.", "Изменяет жене"], correctAnswer: "Не держит слово.", explaination: "Может сесть сразу на пять стульев. Согласно Этимологическому словарю русского языка Макса Фасмера, пятигуз — это ненадежный, непостоянный человек."},
            { question: "4) Кто такой шлындра?", answers: ["Нытик.", "Обманщик.", "Бродяга."], correctAnswer: "Бродяга.", explaination:  "Да! В Словаре русского арго «шлындрать» означает бездельничать, шляться."}
        ];
    
        let currentQuestionIndex = 0;
        let correctAnswers = 0;
    
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                let temp = array[i]; //елемент массива i меняется с случайно выбранным элементом j (j от 0 до i) 
                array[i] = array[j];  
                array[j] = temp; 
            }
        }
        // Перемешиваем вопросы перед началом теста
        shuffleArray(questions);
        // Показываем вопросы
        displayQuestion();
        toggleButton.style.display="inline";
        function displayQuestion() {
            // взяли заготовленный на странице контейнер под вопросы и ответы
            const questionsContainer = document.getElementById("questions-container");
            // очистить контейнер перед новым вопросом и ответами
            questionsContainer.innerHTML = "";
            
            // создать новый контейнер для текста вопроса
            const questionElement = document.createElement("div");
            // добавить класс question для созданного элемента
            questionElement.className = "question";
            // вставит в HTML код тег p со значением переменной questions[currentQuestionIndex].question - текст вопроса
            const curQuizPartQuestion = questions[currentQuestionIndex].question;
            questionElement.innerHTML = `<p>${curQuizPartQuestion}</p>`;
            // добавляет элемент вопроса в контейнер вопросов как дочерний элемент
            questionsContainer.appendChild(questionElement);
            

            // создать новый контейнер для текста ответов
            const answersContainer = document.createElement("div");
            // добавить класс answers-container для созданного элемента
            answersContainer.className = "answers-container";
            

            // откопировать значения ответов questions[currentQuestionIndex].answers в новый массив
            // const answers = [...questions[currentQuestionIndex].answers];
            // перемешать ответы перед тестом
            shuffleArray(questions[currentQuestionIndex].answers);

            // для каждого варианта ответа
            (questions[currentQuestionIndex].answers).forEach((answer, index) => {
                // создать новый контейнер div для размещения
                const answerElement = document.createElement("div");
                // добавить каждому новому элементу класс
                answerElement.className = "answer";
                // добавить класс верный/нет ответ
                if (answer==questions[currentQuestionIndex].correctAnswer){
                    answerElement.classList.add("correct-answer");
                }
                else{
                    answerElement.classList.add("incorrect-answer");
                }
                // текстовое содержание контейнера - строка ответа
                answerElement.textContent = answer;
                // при наведении мыши анонимная функция вызовет функцию handleMouseOver от элемента ответа, на который навели мышь
                answerElement.addEventListener("mouseover", () => handleMouseOver(answerElement));
                // вызов функции handleMouseOut уменьшения при снятии мыши с элемента
                answerElement.addEventListener("mouseout", () => handleMouseOut(answerElement));
                // вызов функции анимации движения по клику на блок ответа
                // сначала анимация трансформации, потом показ правильного ответа
                answerElement.addEventListener("click", () => {
                    // Запустить анимацию
                    handleMouseClick(answerElement);
                
                    // Начать выполнение handleAnswerClick после завершения анимации
                    setTimeout(() => {
                        handleAnswerClick(index, questionElement);
                        
                    }, 900); //задержка на выполнение первой анимации
                });
                answersContainer.appendChild(answerElement);
            });
    
            questionsContainer.appendChild(answersContainer);
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
        // обработка клика мыши по контейнеру с ответом
        // движение из стороны в сторону
        function handleMouseClick(element){
            
            // сдвиг вправо
            element.style.transform = `translateX(25px)`;
            element.style.transition = "transform 0.3s";

            // После завершения анимации вправо, сдвиг влево
            setTimeout(() => {
                // сдвиг влево
                element.style.transform = `translateX(-25px)`;
                element.style.transition = "transform 0.3s";

                // После завершения анимации сбросить стили - возврат в исходное состояние
                setTimeout(() => {
                    element.style.transform = "translateX(0)";
                    element.style.transition = "transform 0.3s";
                }, 300); // Значение 300 миллисекунд соответствует времени анимации
            }, 300);
        }

        function handleAnswerClick(selectedIndex, questionElement) {
            // достать из массива текущий вопрос
            const currentQuestion = questions[currentQuestionIndex];
            // если строка выбранного индекса совпал с правильным ответом
            if (currentQuestion.answers[selectedIndex] === currentQuestion.correctAnswer) {
                // обработка правильного ответа
                handleCorrectAnswer(questionElement);
            } else {
                // обработка неправильного ответа
                handleIncorrectAnswer(questionElement);
            }
            // увеличение счетчика индекса вопросов
            currentQuestionIndex++;
            // если спросили еще не все вопросы
            if (currentQuestionIndex < questions.length) {
                // показать следующий вопрос
                // setTimeout(() => {
                //     displayQuestion(questions[currentQuestionIndex]);
                // }, 1000);
                setTimeout(() => {
                    toggleButton.addEventListener("click", function() {
                        toggleQuestions(questions[currentQuestionIndex]);
                    });
                }, 1000);
                
            } else {
                // показать результат
                setTimeout(() => {
                    displayResult();
                }, 4000);
            }
        }
        function toggleQuestions(massive) {
            // Вызов функции displayQuestion при нажатии на кнопку "Вопросы"
            displayQuestion(massive);
        }
        // обработка правильного ответа
        function handleCorrectAnswer(questionElement) {
            // счетчик для вывода статистики по правильным ответам
            correctAnswers++;
            // в контейнер с текстом вопроса добавляет маркер галочки
            questionElement.innerHTML += "&#10003;";
            //добавить класс для изменения цвета текста
            questionElement.classList.add("correct-answer-question");

           
           // анимация добавления пояснения к правильному ответу
            const answersContainer = document.querySelector(".correct-answer");
           
            answersContainer.innerHTML += `<p><code>${questions[currentQuestionIndex].explaination}</code></p>`;
            
            answersContainer.style.transition="transform 6s";
            answersContainer.style.transform= "scale(1.1)";
            // анимация перемещения неправильных ответов вниз
           const incorrectAnswersContainer = document.querySelectorAll(".incorrect-answer");
           incorrectAnswersContainer.forEach(answerElement => {
               answerElement.style.transition = "transform 6s";
               answerElement.style.transform = "translateY(2000px)"; // Уезжает вниз
           });

           // анимация перемещения правильных ответов вниз
           const correctAnswersContainer = document.querySelectorAll(".correct-answer");
           setTimeout(() => {
           correctAnswersContainer.forEach(answerElement => {
               answerElement.style.transition = "transform 6s";
               answerElement.style.transform = "translateY(2000px)"; // Уезжает вниз
           });
            }, 3000);
        }


        // обработка неправильного ответа
        function handleIncorrectAnswer(questionElement) {
            // в контейнер с текстом вопроса добавляет маркер крестика
            questionElement.innerHTML += "&#10007;";
            //добавить класс для изменения цвета текста
            questionElement.classList.add("incorrect-answer-question");
            
           // анимация перемещения неправильных ответов вниз
           const incorrectAnswersContainer = document.querySelectorAll(".incorrect-answer");
           incorrectAnswersContainer.forEach(answerElement => {
               answerElement.style.transition = "transform 4s";
               answerElement.style.transform = "translateY(2000px)"; // Уезжает вниз
           });

           // анимация перемещения правильных ответов вниз
           const correctAnswersContainer = document.querySelectorAll(".correct-answer");
           setTimeout(() => {
           correctAnswersContainer.forEach(answerElement => {
               answerElement.style.transition = "transform 4s";
               answerElement.style.transform = "translateY(2000px)"; // Уезжает вниз
           });
            }, 2000);
            
        }
    
        function displayResult() {
            //над данным элементом создать новый контейнер для результатов
            const targetContainer = document.getElementById("questions-container");
            // новый контейнер
            const resultContainer = document.createElement("div");
            resultContainer.id="result-container";
            // добавить элементы в контейнер результатов
            resultContainer.innerHTML = `<p>Правильных ответов: ${correctAnswers} из ${questions.length}</p>`;
            // вставить новый контейнер перед областью для динамического появления вопросов
            targetContainer.parentNode.insertBefore(resultContainer, targetContainer);
            resultContainer.style.display="inline";

            const endContainer = document.createElement("div");
            endContainer.id="end-container";
            endContainer.innerHTML = `<p><strong>Вопросы закончились</strong></p>`;
            targetContainer.parentNode.insertBefore(endContainer, targetContainer);
            endContainer.style.display="inline";
            targetContainer.innerHTML="";
            targetContainer.remove;
            toggleButton.style.display="none";

            // результирующая колонка с вопросами
            const correctAnswersContainer=document.getElementById("correctAnswers");
            // Добавляем колонку с контейнерами, содержащими вопросы
            const questionColumn = document.createElement("div");
            questionColumn.id = "question-column";
            // targetContainer.parentNode.insertBefore(questionColumn, targetContainer);
            correctAnswersContainer.appendChild(questionColumn);

            // Заполнить колонку вопросами
            questions.forEach((question, index) => {
                const questionContainer = document.createElement("div");
                questionContainer.className = "question-container";
                questionContainer.id="Q"+index;
                questionContainer.innerHTML = `<p>${index + 1}. ${question.question}</p>`;
                questionContainer.addEventListener("click", () => showCorrectAnswer(index));
                questionColumn.appendChild(questionContainer);
            });

            // Вторая колонка справа для ответов
            const answerColumn = document.createElement("div");
            answerColumn.id = "answer-column";
            // targetContainer.parentNode.insertBefore(answerColumn, questionColumn.nextSibling); // Вставляем после questionColumn
            correctAnswersContainer.appendChild(answerColumn);

            // заполнить вторую колонку ответами
            questions.forEach((question, index) => {
                const answerContainer = document.createElement("div");
                answerContainer.className = "answer-container";
                answerColumn.appendChild(answerContainer);
                
                // Отображение верного ответа
                const correctAnswer = document.createElement("div");
                correctAnswer.innerHTML = `<p>&nbsp;</p>`;
                answerContainer.appendChild(correctAnswer);
            });
            
        }
        // Функция для отображения правильного ответа
        function showCorrectAnswer(index) {
            
            // Очистить все ответы во второй колонке
            const answerContainers = document.querySelectorAll(".answer-container");
            answerContainers.forEach(container => (container.innerHTML = "<p>&nbsp;</p>"));
            //убрать подсветку
            const questionsContainers=document.querySelectorAll(".question-container");
            questionsContainers.forEach(container => container.classList.remove("correct-answer-question"));
            // Отобразить правильный ответ во второй колонке
            const answerContainer = answerContainers[index];
            const correctAnswer = questions[index].correctAnswer;
            answerContainer.innerHTML = `<p>Correct Answer: ${correctAnswer}</p>`;
            answerContainer.innerHTML += `<p><code>${questions[index].explaination}</code></p>`;

            // подсветка вопроса
            const currentQuestion = document.getElementById("Q"+index);
            currentQuestion.classList.add("correct-answer-question");
        }
        
    }

});
