function calculate() {
    const canalLength = parseInt(document.getElementById("canalLength").value);
    // введенное значение длины канавы
    const isMechanized = document.getElementById("mechanized").checked;
// проверка на галочку для механической бригады
    let workersNeeded;
    let type;

    if (isMechanized) {
        workersNeeded = Math.ceil(canalLength / 4);
        type = "Механизированная";
        // в механизированный каждый работник копает 4 м
        // 1,5 землекопа быть не может => округлить вверх, чтобы хватило землекопов
    } else {
        workersNeeded = Math.ceil(canalLength / 3);
        type = "Не механизированная";
        // в механизированный каждый работник копает 3 м
    }

    // окна с результатами
        if (confirm("Показать результат?")){
           
            alert("OK!");
            //присваиваем значения рассчетов
            document.getElementById("resultLength").textContent = canalLength;
            document.getElementById("resultType").textContent = type;
            document.getElementById("resultWorkers").textContent = workersNeeded;
            if (isMechanized) {
                document.getElementById("resultImage").src = "../img/diggers/землекоп2.png"; 
            } else {
                document.getElementById("resultImage").src = "../img/diggers/землекоп1.png"; 
            }
        
            document.getElementById("result").style.display = "block";
        }else{
            // сброс всех рассчетов и вывод отпуска бригады
            document.getElementById("resultLength").textContent = 0;
            document.getElementById("resultType").textContent = "";
            document.getElementById("resultWorkers").textContent = 0;
            alert("Бригада в отпуске");
            document.getElementById("resultImage").src = "../img/diggers/землекоп3.png";
        }   
    
}