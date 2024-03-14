<!DOCTYPE html>
<html lang="en">

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
            <div class="form-container">
                <h1 style="margin-left: 30px; margin-bottom: 30px;">Заказ мебели</h1>
                <div class="form-group" style="margin-left: 30px;">
                    <label for="surname">Фамилия:</label>
                    <input type="text" id="surname" name="surname">
                </div>
                <div class="form-group" style="margin-left: 30px;">
                    <label for="city">Город доставки:</label>
                    <select id="city" name="city">
                        <option value="city1">Город 1</option>
                        <option value="city2">Город 2</option>
                        <option value="city3">Город 3</option>
                    </select>
                </div>
                <div class="form-group" style="margin-left: 30px;">
                    <label for="delivery_date">Дата доставки:</label>
                    <input type="date" id="delivery_date" name="delivery_date">
                </div>
                <div class="form-group" style="margin-left: 30px;">
                    <label for="address">Адрес:</label>
                    <input type="text" id="address" name="address">
                </div>
                <div class="form-group">
                    <div style="display: flex;">
                        <div style="flex: 1;">
                            <label for="color">Выберите цвет мебели:</label><br>
                            <label><input name="color" type="radio" id="color1" value="Орех">Орех</label><br>
                            <label><input name="color" type="radio" id="color2" value="Дуб мореный">Дуб мореный</label><br>
                            <label><input name="color" type="radio" id="color3" value="Палисандр">Палисандр</label><br>
                            <label><input name="color" type="radio" id="color4" value="Эбеновое дерево">Эбеновое дерево</label><br>
                            <label><input name="color" type="radio" id="color5" value="Клен">Клен</label><br>
                            <label><input name="color" type="radio" id="color6" value="Лиственница">Лиственница</label><br>
                        </div>
                        <div style="flex: 1;">
                            <label for="furniture_items">Выберите предметы мебели:</label><br>
                            <label for="bench"><input type="checkbox" id="bench"> Банкетка</label><br>
                            <label for="bench"><input type="checkbox" id="bed"> Кровать</label><br>
                            <label for="bench"><input type="checkbox" id="dresser"> Комод</label><br>
                            <label for="bench"><input type="checkbox" id="closet"> Шкаф</label><br>
                            <label for="bench"><input type="checkbox" id="chair"> Стул</label><br>
                            <label for="bench"><input type="checkbox" id="table"> Стол</label><br>
                        </div>
                        <div style="flex: 1;">
                            <label for="quantity">Количество:</label><br>
                            <label><input type="number" id="quantity_1" name="quantity_1" min="0"></label>
                            <label><input type="number" id="quantity_2" name="quantity_2" min="0"></label>
                            <label><input type="number" id="quantity_3" name="quantity_3" min="0"></label>
                            <label><input type="number" id="quantity_4" name="quantity_4" min="0"></label>
                            <label><input type="number" id="quantity_5" name="quantity_5" min="0"></label>
                            <label><input type="number" id="quantity_6" name="quantity_6" min="0"></label>
                        </div>
                    </div>
                </div>
            </div>
            <?php


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