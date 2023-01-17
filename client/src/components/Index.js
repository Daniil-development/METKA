import React from 'react';
import {useLocation, useHistory} from 'react-router-dom'
import AccountMenu from "./AccountMenu";
import {
    accountBlockClose,
    blockClose,
    blockOpen,
    colorRed,
    colorWhite,
    INDEX_ROUTE,
    LOGIN_ROUTE
} from "../utils/consts";


const Index = () => {
    const location = useLocation();
    const history = useHistory();

    const navLinkClick = () => {
        let navButton = document.querySelector('#nav-button');
        let navList = document.querySelector('#nav-list');

        if (navList.classList.contains(blockOpen)) {
            navList.classList.replace(blockOpen, blockClose);
            navButton.classList.replace(colorRed, colorWhite);
        }
    }

    return (
        <div>
            <header>
                <nav>
                    <button id="nav-button" className="color-white"><i className="fa fa-navicon fa-2x" onClick={() => {
                        let navButton = document.querySelector('#nav-button');
                        let navList = document.querySelector('#nav-list');
                        let accountMenu = document.querySelector('#account-menu');

                        if (navList.classList.contains(blockOpen)) {
                            navList.classList.replace(blockOpen, blockClose);
                            navButton.classList.replace(colorRed, colorWhite);
                        }
                        else {
                            navList.classList.replace(blockClose, blockOpen);
                            navButton.classList.replace(colorWhite, colorRed);

                            accountMenu.classList.replace(blockOpen, accountBlockClose);
                            navButton.classList.replace(colorRed, colorWhite);
                        }
                    }}></i></button>
                    <ul id="nav-list" className="block-close">
                        <li><a href="#about" onClick={navLinkClick}>О нас</a></li>
                        <li><a href="#portfolio" onClick={navLinkClick}>Потрфолио</a></li>
                        <li><a href="#stages" onClick={navLinkClick}>Этапы работы</a></li>
                        <li><a href="#team" onClick={navLinkClick}>Команда</a></li>
                        <li><a href="#contacts" onClick={navLinkClick}>Контакты</a></li>

                    </ul>
                </nav>

                <a id="logo-block" href="#">
                    <div id="logo-block_logo"></div>
                    <div id="logo-block_name">МЕТКА</div>
                </a>

                <a id="account-button" className="color-white" onClick={() => {
                    if (location.pathname === INDEX_ROUTE) {
                        history.push(LOGIN_ROUTE);
                    }

                    let navButton = document.querySelector('#nav-button');
                    let navList = document.querySelector('#nav-list');
                    let accountMenu = document.querySelector('#account-menu');

                    if (accountMenu.classList.contains(blockOpen)) {
                        accountMenu.classList.replace(blockOpen, accountBlockClose);
                        navButton.classList.replace(colorRed, colorWhite);
                    } else {
                        accountMenu.classList.replace(accountBlockClose, blockOpen);
                        navButton.classList.replace(colorWhite, colorRed);

                        navList.classList.replace(blockOpen, blockClose);
                        navButton.classList.replace(colorRed, colorWhite);
                    }
                }}><i className="fa fa-user-circle fa-2x"></i></a>

                <AccountMenu />


            </header>

            <article id="main">
                <div className="container">
                    <div className="main-left">
                        <h1 className="main_title">Лучшие в рейтинге цены и качества</h1>
                        <p className="main_subtitle">От разработки эскиза к безупречной татуировке</p>
                        <p className="main_subsubtitle">При заказе от 100р</p>
                    </div>
                    <div className="main-right">

                    </div>
                </div>
            </article>

            <article id="about">
                <div className="container">
                    <h2 className="text_title">Почему выбирают нас</h2>
                    <p className="text_subtitle">Все услуги нашей студии оказываются профессионалами и с помощью современного
                        оборудования</p>

                    <div className="advantages">
                        <div className="advantage advantage_image1">
                            <p className="advantage_number">более 500</p>
                            <p className="advantage_description">татуировок сделали наши мастера</p>
                        </div>
                        <div className="advantage advantage_image2">
                            <p className="advantage_number">6</p>
                            <p className="advantage_description">мастеров высочайшего уровня</p>
                        </div>
                        <div className="advantage advantage_image3">
                            <p className="advantage_number">100%</p>
                            <p className="advantage_description">стерильность помещения и оборудования</p>
                        </div>
                    </div>
                </div>
            </article>

            <article id="portfolio">
                <div className="container">
                    <h2 className="text_title">Наши работы</h2>
                    <p className="text_subtitle">Главная цель мастера - передать не только картинку,
                        но и задумку, особенности и эмоции человека.</p>

                    <div className="images">
                        <img id="portfolio_image1" className="image" src="./img/works/work1.jpg" alt="Работа 1"/>
                            <img id="portfolio_image2" className="image" src="../img/works/work2.jpg" alt="Работа 2"/>
                                <img id="portfolio_image3" className="image" src="../img/works/work3.jpg" alt="Работа 3"/>
                                    <img id="portfolio_image4" className="image" src="../img/works/work4.jpg" alt="Работа 4"/>
                    </div>

                    <a id="instagram-button" href="https://www.instagram.com/ginseng.strip.2002/" target="_blank">
                        <span>Наш Instagram </span>
                        <div className="right-chevron">
                            <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                        </div>
                    </a>
                </div>
            </article>

            <article id="stages">
                <div className="container">
                    <h2 className="text_title">Как мы работаем</h2>

                    <div className="stages">
                        <div className="stage">
                            <div className="stage-number">
                                <span>1</span>
                            </div>
                            <h3 className="stage_title">Заявка на сайте или по телефону</h3>
                            <p className="stage_description">Мы воплотим любую вашу идею татуировки в жизнь.<br/>
                                Оставьте заявку и мы перезвоним вам в течение 15 минут.</p>
                        </div>

                        <div className="stage">
                            <div className="stage-number">
                                <span>2</span>
                            </div>
                            <h3 className="stage_title">Разработка уникального эскиза</h3>
                            <p className="stage_description">Далее мастер приступает к созданию индивидуального эскиза
                                татуировки
                                по вашей задумке и утверждает его с вами.</p>
                        </div>

                        <div className="stage">
                            <div className="stage-number">
                                <span>3</span>
                            </div>
                            <h3 className="stage_title">Сеанс татуировки и итоговая оплата</h3>
                            <p className="stage_description">В стерильной студии и с использованием лучшего
                                оборудования вы получаете качественную татуировку.</p>
                        </div>
                    </div>
                </div>
            </article>

            <article id="team">
                <div className="container">
                    <h2 className="text_title">Наша команда</h2>
                    <p className="text_subtitle">Искусство предполагает чувства за творчеством, а татуировка несет эти чувства
                        через всю жизнь.
                        Именно поэтому татуировку можно назвать искусством в его чистом виде.</p>

                    <div className="workers">
                        <div className="worker">
                            <img id="worker_image1" className="image" src="../img/team/max.jpg" alt="Максим Хорламов"/>
                                <h3 className="worker_title">Максим Хорламов</h3>
                                <p className="worker_description">Макс специализируется на татуировках в стиле реализм,
                                    качественно
                                    и быстро исполняя масштабные работы.</p>
                        </div>

                        <div className="worker">
                            <img id="worker_image2" className="image" src="../img/team/peter.jpg" alt="Пётр Герасимов"/>
                                <h3 className="worker_title">Пётр Герасимов</h3>
                                <p className="worker_description">Основная масса работ Петра - это татуировки в стиле
                                    black&gray,
                                    а также графика и кавер-ап в реализме.</p>
                        </div>

                        <div className="worker">
                            <img id="worker_image3" className="image" src="../img/team/anna.jpg" alt="Анна Ильина"/>
                                <h3 className="worker_title">Анна Ильина</h3>
                                <p className="worker_description">Анна - специалист пирсинга и микродермала, имеющий медицинское
                                    образование
                                    и 3 года успешного опыта работы. </p>
                        </div>
                    </div>
                </div>
            </article>

            <article id="contacts">
                <div className="container">
                    <div className="contacts">
                        <div className="contact">
                            <h3 className="contact-title">О нас</h3>
                            <p className="contact-description">Общество с ограниченной ответственностью "Метка тату салон".<br/>
                                УНП: 000000000.<br/>
                                Регистрационный номер в торговом реестре РБ: 000000.<br/>
                                Дата регистрации: 24 ноября 2018 г.
                            </p>
                        </div>

                        <div className="contact">
                            <h3 className="contact-title">График работы</h3>
                            <p className="contact-description">Мы работаем для вас<br/>
                                с 12:00 до 22:00<br/>
                                без выходных.<br/>
                                Адрес салона: </p><address>г. Минск, ул. Якуба Коласа, 22/1</address>
                        </div>

                        <div className="contact">
                            <h3 className="contact-title">Контакты</h3>
                            <p className="contact-description">Звоните:<br/>
                                <a href="tel:+375333727438">
                                    <i className="fa fa-phone"></i> +375-33-372-74-38</a>
                            </p>
                            <p className="contact-description">Пишите:<br/>
                                <a href="tel:+375333727438">
                                    <i className="fab fa-viber"></i> <i className="fab fa-telegram"></i> +375-33-372-74-38</a>
                            </p>
                        </div>

                        <div className="contact">
                            <h3 className="contact-title">Социальные сети</h3>
                            <p className="contact-description social-networks">
                                <a href="https://www.instagram.com/ginseng.strip.2002/" target="_blank"><i
                                    className="fab fa-instagram"></i> </a>
                                <a href="https://vk.com/kakashka.incorporated/" target="_blank"><i
                                    className="fab fa-vk"></i> </a>
                                <a href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube"></i></a>
                            </p>
                        </div>
                    </div>
                </div>
            </article>

            <footer>
                <a href="#" className="footer-text">Метка тату салон</a>
                <p className="footer-text">© 2018</p>
            </footer>

        </div>
);
};

export default Index;