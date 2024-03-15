<!DOCTYPE html>
<html lang="en">
<?php
require '../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\{Font, Border, Alignment};
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AuquariumFish</title>

    <link rel="stylesheet" href="./../css/office.css">
</head>

<body>
    <layout class="layout">


        <header class="header" id="header">
            <!-- логотип + навигация -->
            <div class="header_top">
                <div class="container">
                    <!-- верхний ряд -->
                    <div class="header_top-row">
                        <a href="#footer">
                            <img src="./../img/logo.svg" alt="AquaFish">
                        </a>
                        <!--чтобы было скрытие в моб версии  -->
                        <div class="header_nav">
                            <nav class="nav">
                                <ul class="nav_list">
                                    <li><a href="./../index.html">Главная</a></li>
                                    <li><a href="./soderzanie.html">Содержание</a></li>
                                    <li><a href="./catalog.html">Каталог рыб</a></li>
                                    <li><a href="./aquariums.html">Аквариумы</a></li>
                                    <li><a href="./contacts.html">Контакты</a></li>
                                </ul>
                            </nav>
                        </div>
                        <!-- кнопка с навигацией для моб, на десктопе - скрыта -->
                        <div class="header_nav-btn">
                            <button class="nav-icon-btn">
                                <div class="nav-icon"></div>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </header>
        <main id="main">
            <!-- объявить переменные для сохранения значений при отправке формы -->
            <?php
            $surname = isset($_POST['surname']) ? $_POST['surname'] : '';
            $city = isset($_POST['city']) ? $_POST['city'] : '';
            $delivery_date = isset($_POST['delivery_date']) ? $_POST['delivery_date'] : '';
            $address = isset($_POST['address']) ? $_POST['address'] : '';
            $quantity = isset($_POST['quantity']) ? $_POST['quantity'] : '';

            $furniture = isset($_POST['furniture']) ? $_POST['furniture'] : array(); // получаем выбранные предметы мебели
            $quantities = isset($_POST['quantity']) ? $_POST['quantity'] : array(); // получаем введенные значения количества

            // Функция для проверки, было ли выбрано определенное предмет мебели
            function isChecked($value, $furniture)
            {
                return in_array($value, (array)$furniture) ? 'checked' : '';
            }
            ?>

            <form enctype="multipart/form-data" method="post" action="office.php">
                <div class="form-container">
                    <h1 style="margin-left: 30px; margin-bottom: 30px;">Заказ мебели</h1>
                    <!-- текстовое поле имя -->
                    <div class="form-group" style="margin-left: 30px;">
                        <label for="surname">Фамилия:</label>
                        <input type="text" id="surname" name="surname" value="<?php echo $surname; ?>">
                    </div>
                    <!-- выпадающий список - город -->
                    <div class="form-group" style="margin-left: 30px;">
                        <label for="city">Город доставки:</label>
                        <select id="city" name="city">
                            <option value="Санкт-Петербург" <?php if ($city == 'Санкт-Петербург') echo 'selected'; ?>>Санкт-Петербург</option>
                            <option value="Пермь" <?php if ($city == 'Пермь') echo 'selected'; ?>>Пермь</option>
                            <option value="Казань" <?php if ($city == 'Казань') echo 'selected'; ?>>Казань</option>
                            <option value="Нижний Новгород" <?php if ($city == 'Нижний Новгород') echo 'selected'; ?>>Нижний Новгород</option>
                            <option value="Омутнинск" <?php if ($city == 'Омутнинск') echo 'selected'; ?>>Омутнинск</option>
                        </select>
                    </div>
                    <!-- выбор даты -->
                    <div class="form-group" style="margin-left: 30px;">
                        <label for="delivery_date">Дата доставки:</label>
                        <input type="date" id="delivery_date" name="delivery_date" value="<?php echo $delivery_date; ?>">
                    </div>
                    <!-- текстовое поле - адрес -->
                    <div class="form-group" style="margin-left: 30px;">
                        <label for="address">Адрес:</label>
                        <input type="text" id="address" name="address" value="<?php echo $address; ?>">
                    </div>
                    <!-- три колонки -->
                    <div class="form-group">
                        <div style="display: flex;">
                            <!-- выбор цвета - один выбор -->
                            <div style="flex: 1;">
                                <label for="color">Выберите цвет мебели:</label><br>
                                <label><input name="color" type="radio" id="color1" value="Орех" <?php if (isset($_POST['color']) && $_POST['color'] == 'Орех') echo 'checked'; ?>>Орех</label><br>
                                <label><input name="color" type="radio" id="color2" value="Дуб мореный" <?php if (isset($_POST['color']) && $_POST['color'] == 'Дуб мореный') echo 'checked'; ?>>Дуб мореный</label><br>
                                <label><input name="color" type="radio" id="color3" value="Палисандр" <?php if (isset($_POST['color']) && $_POST['color'] == 'Палисандр') echo 'checked'; ?>>Палисандр</label><br>
                                <label><input name="color" type="radio" id="color4" value="Эбеновое дерево" <?php if (isset($_POST['color']) && $_POST['color'] == 'Эбеновое дерево') echo 'checked'; ?>>Эбеновое дерево</label><br>
                                <label><input name="color" type="radio" id="color5" value="Клен" <?php if (isset($_POST['color']) && $_POST['color'] == 'Клен') echo 'checked'; ?>>Клен</label><br>
                                <label><input name="color" type="radio" id="color6" value="Лиственница" <?php if (isset($_POST['color']) && $_POST['color'] == 'Лиственница') echo 'checked'; ?>>Лиственница</label><br>
                            </div>
                            <!-- выбор мебели - множественный выбор -->
                            <div style="flex: 1;">
                                <label for="furniture_items">Выберите предметы мебели:</label><br>
                                <label for="bench"><input name="furniture[]" type="checkbox" value="Банкетка" <?php echo isChecked('Банкетка', $furniture); ?>> Банкетка</label><br>
                                <label for="bench"><input name="furniture[]" type="checkbox" value="Кровать" <?php echo isChecked('Кровать', $furniture); ?>> Кровать</label><br>
                                <label for="bench"><input name="furniture[]" type="checkbox" value="Комод" <?php echo isChecked('Комод', $furniture); ?>> Комод</label><br>
                                <label for="bench"><input name="furniture[]" type="checkbox" value="Шкаф" <?php echo isChecked('Шкаф', $furniture); ?>> Шкаф</label><br>
                                <label for="bench"><input name="furniture[]" type="checkbox" value="Стул" <?php echo isChecked('Стул', $furniture); ?>> Стул</label><br>
                                <label for="bench"><input name="furniture[]" type="checkbox" value="Стол" <?php echo isChecked('Стол', $furniture); ?>> Стол</label><br>
                            </div>
                            <!-- выбор количества - ввод числа - минимально 0 -->
                            <div style="flex: 1;">
                                <label for="quantity">Количество:</label><br>
                                <label><input type="number" id="quantity_1" name="quantity[]" min="0" value="<?php echo isset($quantities[0]) ? $quantities[0] : ''; ?>"></label>
                                <label><input type="number" id="quantity_2" name="quantity[]" min="0" value="<?php echo isset($quantities[1]) ? $quantities[1] : ''; ?>"></label>
                                <label><input type="number" id="quantity_3" name="quantity[]" min="0" value="<?php echo isset($quantities[2]) ? $quantities[2] : ''; ?>"></label>
                                <label><input type="number" id="quantity_4" name="quantity[]" min="0" value="<?php echo isset($quantities[3]) ? $quantities[3] : ''; ?>"></label>
                                <label><input type="number" id="quantity_5" name="quantity[]" min="0" value="<?php echo isset($quantities[4]) ? $quantities[4] : ''; ?>"></label>
                                <label><input type="number" id="quantity_6" name="quantity[]" min="0" value="<?php echo isset($quantities[5]) ? $quantities[5] : ''; ?>"></label>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="MAX_FILE_SIZE" value="30000" />
                    <!-- выбор файла с ценами - передача на обработку -->
                    <div class="form-group" style="margin-left: 30px;">
                        <label for="file">Выберите файл с ценами: <input type="file" id="file" name="file" accept=".txt"></label>

                    </div>
                    <!-- отправка формы -->
                    <div style="margin-left: 30px; margin-top: 20px;">
                        <button type="submit">Оформить заказ</button>
                    </div>
                </div>

            </form>
            <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                if (isset($_POST['surname'], $_POST['city'], $_POST['delivery_date'], $_POST['address'], $_POST['color'], $_POST['furniture'], $_POST['quantity']) && $_POST['surname'] != "" && $_POST['address'] != "") {
                    // полученные значения из формы
                    $surname = $_REQUEST['surname'];
                    $city = $_REQUEST['city'];
                    $date = $_REQUEST['delivery_date'];
                    $address = $_REQUEST['address'];
                    $color = $_REQUEST['color'];

                    // Проверка и обработка данных мебели и количества мебели
                    // Формирование массива $furniture
                    $furniture = $_POST['furniture'];

                    // Извлечение числовых значений из массива $quantities
                    $quantities = array_values($_POST['quantity']);
                    $quantities = array_map('intval', $quantities);

                    // Оставить только ненулевые значения в массиве $quantities
                    $non_zero_quantities = array_filter($quantities, function ($quantity) {
                        return $quantity > 0;
                    });
                    // Массив $non_zero_quantities содержит только ненулевые значения, но его индексы начинаются с 0
                    //преобразовать ключи, чтобы они начинались с 0
                    $non_zero_quantities = array_values($non_zero_quantities);

                    // Обработка значений мебели и количества мебели
                    $furniture_quantities = array();
                    foreach ($furniture as $key => $value) {
                        if (isset($non_zero_quantities[$key])) {
                            $furniture_quantities[$value] = $non_zero_quantities[$key];
                        }
                    }

                    // print_r($furniture);
                    // print_r($non_zero_quantities);
                    // print_r($furniture_quantities);

                    // обработка файла
                    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
                        // Путь к временному файлу, куда загружен файл
                        $temp_file = $_FILES['file']['tmp_name'];

                        // Читаем содержимое файла
                        $file_contents = file_get_contents($temp_file);

                        // обработка файла с ценами
                        // Разбиваем содержимое файла на строки
                        $file_lines = explode("\n", $file_contents);

                        // Инициализируем массив для цен
                        $prices = array();

                        // Пропускаем первую строку и обрабатываем остальные
                        for ($i = 1; $i < count($file_lines); $i++) {
                            // Разбиваем строку на элементы (мебель и цену)
                            $line_parts = explode(" ", $file_lines[$i]);

                            // Получаем название мебели
                            $furniture_name = $line_parts[0];

                            // Получаем цену мебели
                            $price = intval($line_parts[1]); // Преобразуем цену в целое число

                            // Проверяем, есть ли выбранная мебель в массиве $furniture
                            if (in_array(strtolower($furniture_name), array_map('strtolower', $furniture))) {
                                // Если мебель выбрана, добавляем цену в массив $prices
                                $prices[$furniture_name] = $price;
                            }
                        }

                        // взять из другого файла значение наценки
                        // Путь к файлу
                        $overprice_path = '../files/overprice.txt';

                        // Открыть файл для чтения
                        $overprice_handle = fopen($overprice_path, 'r');
                        // Читаем содержимое файла
                        $overprice_content = fread($overprice_handle, filesize($overprice_path));
                        $color_price = null;
                        // разбить файл на строки
                        $lines = explode("\n", $overprice_content);
                        // обработка файла с наценкой
                        foreach ($lines as $line) {
                            // Разбиваем строку на части по разделителю " - "
                            $parts = explode(" - ", $line);

                            // Проверяем, содержит ли строка две части (название и цену)
                            if (count($parts) === 2) {
                                // Получаем название цвета и его цену
                                $color_name = trim($parts[0]);
                                $price = trim($parts[1]);

                                // Если название цвета совпадает с выбранным цветом, сохраняем цену
                                if ($color_name === $color) {
                                    $color_price = floatval($price);
                                    break; // Прерываем цикл, так как цена уже найдена
                                }
                            }
                        }
                        // print($color_price);
                        // Закрыть файл
                        fclose($overprice_handle);

                        $new_prices = array(); //с пересчетом цен с учитыванием цвета

                        // пересчет цен на мебель с учетом цвета
                        foreach ($prices as $furniture_name => $price) {
                            if (isset($furniture_quantities[$furniture_name])) {
                                $new_prices[$furniture_name] = $price * $color_price; // Добавление нового элемента в массив
                            }
                        }
                        // подсчет суммы заказа
                        $total_sum = 0;
                        foreach ($new_prices as $furniture_name => $price) {
                            // Умножаем цену каждого предмета на количество этого предмета
                            $total_sum += $price * floatval($furniture_quantities[$furniture_name]);
                        }
                        echo "Стоимость всего заказа: ";
                        print($total_sum);
                        $random_number = rand (1000,9999); //для накладной
                        // обработка в эксель файл
                        //Создаем экземпляр класса электронной таблицы
                        $spreadsheet = new Spreadsheet();
                        //Получаем текущий активный лист
                        $sheet = $spreadsheet->getActiveSheet();

                        //С помощью класса Drawing можно осуществлять вставку картинок
                        $drawing = new Drawing();
                        //Указываем путь до картинки, которая должна быть расположена
                        $drawing->setPath('../img/furniture/shtrih.jpg');
                        //Указываем ячейку в которой разместим изображение
                        $drawing->setCoordinates('D1');
                        //Передаем объект текущего листа
                        $drawing->setWorksheet($sheet);
                        // увеличить высоту 1 строки
                        $sheet->getRowDimension(1)->setRowHeight(65);
                        // увеличить высоту 2 строки
                        $sheet->getRowDimension(2)->setRowHeight(30);
                        // изменить ширину ячеек
                        $sheet->getColumnDimension('A')->setWidth(10);
                        $sheet->getColumnDimension('B')->setWidth(50);
                        $sheet->getColumnDimension('C')->setWidth(30);
                        $sheet->getColumnDimension('D')->setWidth(10);
                        $sheet->getColumnDimension('E')->setWidth(10);
                        $sheet->getColumnDimension('F')->setWidth(10);
                        // объединить ячейки для 2,3 и 4 строки
                        $sheet->mergeCells('A2:F2');
                        $sheet->mergeCells('A3:F3');
                        $sheet->mergeCells('A4:F4');
                        // жирный и выравнивание по центру у навания
                        $sheet->getStyle('A2')->applyFromArray([
                            'font' => [
                                'name' => 'Arial',
                                'bold' => true,
                                'size' => 16
                            ],
                            'alignment' => [
                                'horizontal' => Alignment::HORIZONTAL_CENTER,
                                'vertical' => Alignment::VERTICAL_CENTER,
                                'wrapText' => true,
                            ]
                        ]);
                        // добавить название накладной
                        $sheet->setCellValue('A2', 'Накладная №'. $random_number);
                        // строка 3
                        $sheet->getStyle('A3')->applyFromArray([
                            'font' => [
                                'name' => 'Arial',
                                'bold' => false
                            ],
                            'alignment' => [
                                'horizontal' => Alignment::HORIZONTAL_CENTER,
                                'vertical' => Alignment::VERTICAL_CENTER,
                                'wrapText' => true,
                            ]
                        ]);
                        $sheet->setCellValue('A3', 'Адрес получения заказа: '. $city. " ".$address);
                        // строка 4
                        $sheet->getStyle('A4')->applyFromArray([
                            'font' => [
                                'name' => 'Arial',
                                'bold' => false
                            ],
                            'alignment' => [
                                'horizontal' => Alignment::HORIZONTAL_CENTER,
                                'vertical' => Alignment::VERTICAL_CENTER,
                                'wrapText' => true,
                            ]
                        ]);
                        $sheet->setCellValue('A4', 'Дата получения заказа: '. $date);
                        // добавить штрих
                        $writer = new Xlsx($spreadsheet);

                        // ТАБЛИЦА с 6 строки

                        // сохранение документа
                        $title="Документ_на_выдачу_" . $random_number;
                        $writer->save("../upload/{$title}.xlsx");
                    } else {
                        echo "Файл не загружен";
                    }
                } else {
                    echo "Файл не был выбран или не заполнены поля формы";
                }
            }


            ?>
        </main>
        <footer class="footer">
            <div class="container">
                <div class="footer_grid">
                    <div class="footer_logo">
                        <a href="#header">
                            <img src="./../img/logo.svg" alt="AquaFish" id="footer">
                        </a>
                    </div>
                    <div class="footer_nav">
                        <nav>
                            <ul class="footer_nav-list">
                                <li><a href="./footprintsMain.html">Следы</a></li>
                                <li><a href="./soderzanie.html">Содержание</a></li>
                                <li><a href="./catalog.html">Каталог рыб</a></li>
                                <li><a href="./aquariums.html">Аквариумы</a></li>
                                <li><a href="./contacts.html">Контакты</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div class="footer_nav">
                        <nav>
                            <ul class="footer_nav-list">
                                <li><a href="./content.html">Контент</a></li>
                                <li><a href="./diggers.html">Землекопы</a></li>
                                <li><a href="./initials.html">Логотип</a></li>
                                <li><a href="./domTest.html">DOM-test</a></li>
                                <li><a href="./words.html">Перетаскивание</a></li>
                                <!-- <li><a href="#!">Услуги ветеринара</a></li>
                            <li><a href="#!">Программа лояльности</a></li> -->
                            </ul>
                        </nav>
                    </div>
                    <div class="footer_address">

                        <ul class="footer_nav-list">
                            <li>Адрес: Политехническая ул. 29</li>
                            <li><a href="tel:+78121112233">Телефон: 8 (812) 111-22-33</a></li>
                            <li>Отдел продаж: 10:00 - 20:00</li>
                            <li>E-mail: <a href="mailto:aaa@fishes.ru" class="email">aaa@fishes.ru</a></li>
                        </ul>
                        <ul class="footer_socials">
                            <li><a href="#!"><img src="./../img/socials/youtube.svg"></a></li>
                            <li><a href="#!"><img src="./../img/socials/vk.svg"></a></li>
                            <li><a href="#!"><img src="./../img/socials/facebook.svg"></a></li>
                        </ul>

                    </div>
                </div>
            </div>
        </footer>
    </layout>
</body>

</html>