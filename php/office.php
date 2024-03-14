<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AuquariumFish</title>
    <link rel="stylesheet" href="./../css/main.css">
</head>
<body>
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
        <!-- Заголовок сайта -->
        <div class="container">
            <h1 class="header_title">Аквариумные рыбки<br>
                Уход и разведение
                <!-- логотип css в уведличенном паддинге -->
                <div class="header_title_logo">
                    <div class="fon_my">
                        <div class="logo_my"><!--"холст для рисунка"-->
                           <!-- тело и хвост скалярии -->
                            <div class="scal_body">
                                <div class="tail"></div>
                                <div class="b2"></div>
                                <div class="b3"></div>
                           </div>
                           <!-- плавники-->
                           
                           <div class="lasta1"></div>
                           <div class="lasta2"></div>
                           <!-- полоски -->
                           <div class="stripe1"></div>
                           <div class="stripe2"></div>
                           <!-- глаз -->
                           <div class="eye"></div>
                           <!-- пузыри -->
                           <div class="buble1"></div>
                           <div class="buble2"></div>
                        </div>
                    </div>   
                </div>
                <!-- ссылка при нажатии на мышь на следующую часть страницы с плюсами -->
                <a href="#main">
                    <img src="./../img/header/mouse.svg" alt="scroll-mouse" class="header_title_icon">
                </a>
            </h1>
        </div>
        <!-- нижняя часть -->
        <div class="header_footer">
                <!-- ссылка на карту -->
                <!-- выравнивание текста иконки по правой стороне -->
                <div class="text-right">
                    <a href="#footer" class="info info--map">Политехническая ул. 29</a>
                </div>
                
              
                <!-- ссылка на телефон -->
                <a href="#footer" class="info info--tel">8 (812) 111-22-33</a>
        </div>
    </header>
    <main id="main">
        
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

</body>
</html>