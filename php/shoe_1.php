if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
        if (isset($_POST['name'], $_POST['animal'], $_POST['shoes'], $_POST['color'])) {
            $name = $_REQUEST['name'];
            $animal = $_REQUEST['animal'];
            $color = $_REQUEST['color'];
            $shoes = $_REQUEST['shoes'];

            // Определяем количество пар обуви на картинку в зависимости от выбранного животного
            $animal_image = "";
            switch ($animal) {
                case 'Паук':
                    // Подсчитываем количество пар обуви
                    $shoe_quantity = 8;
                    break;
                case 'Утка':
                    // Подсчитываем количество пар обуви
                    $shoe_quantity = 1;
                    break;
                case 'Собака':
                    // Подсчитываем количество пар обуви
                    $shoe_quantity = 2;
                    break;
                default:
                    $shoe_quantity = 0;
                    break;
            }

            // определить обувь и картинку для нее
            switch ($shoes) {
                case 'boots':
                    $shoe_image = "./../img/shoes/shoes3.png";
                    break;
                case 'lether':
                    $shoe_image = "./../img/shoes/shoes2.png";
                    break;
                case 'sandals':
                    $shoe_image = "./../img/shoes/shoes1.png";
                    break;
                default:
                    $shoe_image = "";
                    break;
            }

            // Выводим информацию
            echo "<h2>Результат:</h2>";
            echo "<p>Имя: $name</p>";
            echo "<p>Животное: $animal</p>";
            echo "<p>Цвет обуви: $color</p>";
            echo "<p>Количество пар обуви: $shoe_quantity</p>";

            // Выводим изображение
            if ($shoe_image !== "") {
                echo "<img src='$shoe_image' alt='shoes'>";
            }
        }
        else{
            echo "<p>Заполните форму, пожалуйста</p>";
        }
    }