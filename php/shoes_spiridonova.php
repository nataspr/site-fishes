<!DOCTYPE html>
<html>

<head>
    <title>PHP Forms</title>

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
        include './shoe_1.php';
    ?>
</body>

</html>