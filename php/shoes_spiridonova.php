<!DOCTYPE html>
<html>
    <head>
        <title>PHP Forms</title>
        <link rel="stylesheet" type="text/css" href="../css/shoes.css">
    </head>
    <body>
        <!-- разметка страницы -->
    <h2>1 вариант</h2>
    <form method="post" action="">
        <label for="name">Имя:</label>
        <input type="text" id="name" name="name">
        
        <!-- Ввести имя и выбрать ботинки -->
        <label for="shoes"> Обувь:</label>
        <select id="shoes" name="shoes">
            <option value="boots">Ботинки</option>
            <option value="lether">Резиновые сапоги</option>
            <option value="sandals">Сандали</option>
        </select><br><br>

        <!-- Выбрать цвет радиокнопки -->
        <label>Цвет обуви:</label><br>
        <input type="radio" id="red" name="color" value="Красный">
        <label for="red">Красный</label>
        <input type="radio" id="white" name="color" value="Белый">
        <label for="white">Белый</label><br><br>
        
        <!-- Кнопки животного + отправка -->
        <input type="submit" name="animal" value="Паук">
        <input type="submit" name="animal" value="Утка">
        <input type="submit" name="animal" value="Собака">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
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
                break;
        }

        // определить обувь и картинку для нее
        switch($shoes){
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
            echo "<img src='$shoe_image' alt='$shoes'>";
        }
    }
    ?>
</body>
</html>