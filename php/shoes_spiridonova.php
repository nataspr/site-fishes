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
            <option value="boots" <?php if(isset($_POST['shoes']) && $_POST['shoes'] == 'boots') echo 'selected'; ?> >Ботинки</option>
            <option value="lether" <?php if(isset($_POST['shoes']) && $_POST['shoes'] == 'lether') echo 'selected'; ?> >Резиновые сапоги</option>
            <option value="sandals" <?php if(isset($_POST['shoes']) && $_POST['shoes'] == 'sandals') echo 'selected'; ?> >Сандали</option>
        </select><br><br>

        <!-- Выбрать цвет радиокнопки -->
        <label>Цвет обуви:</label><br>
        <input type="radio" id="red" name="color" value="Красный" <?php if(isset($_POST['color']) && $_POST['color'] == 'Красный') echo 'checked'; ?> >
        <label for="red">Красный</label>
        <input type="radio" id="white" name="color" value="Белый" <?php if(isset($_POST['color']) && $_POST['color'] == 'Белый') echo 'checked'; ?> >
        <label for="white">Белый</label><br><br>

        <!-- Кнопки животного + отправка -->
        <input type="submit" name="animal" value="Паук">
        <input type="submit" name="animal" value="Утка">
        <input type="submit" name="animal" value="Собака">
    </form>

    <div class="output" style="border: solid black 2px; padding: 2px; margin: 2px; width:fit-content;">
    <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "GET") {
            if (isset($_POST['name'], $_POST['animal'], $_POST['shoes'], $_POST['color']) && $_POST['name']!="") {
                $name = $_REQUEST['name'];
                $animal = $_REQUEST['animal'];
                $color = $_REQUEST['color'];
                $shoes = $_REQUEST['shoes'];
    
                // Определяем количество пар обуви на картинку в зависимости от выбранного животного
                
                switch ($animal) {
                    case 'Паук':
                        // Подсчитываем количество пар обуви
                        $shoe_quantity = 4;
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
                    echo "<img src='$shoe_image' alt='shoes' width= 40% height = 40%>";
                }
                
            }
            else{
                echo "<p>Заполните форму, пожалуйста</p>";
            }
        }
        
    ?></div>
</body>

</html>