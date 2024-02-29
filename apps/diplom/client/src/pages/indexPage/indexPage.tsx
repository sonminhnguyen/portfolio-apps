import React, { Fragment } from 'react';
import {
  // Navbar,
  Container,
  Row
  //  Nav
} from 'rsuite';
import mainLogo from '../../../public/assets/img/main-logo.png';
import panel4 from '../../../public/assets/img/panel4.jpg';
// import {Row as ReactRow} from 'react-bootstrap/Row';
import { Container as ReactContainer } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { HashLink } from 'react-router-hash-link';
// import '../../../public/assets/css/bootstrap.min.css';
// import '../../../public/assets/css/styles.css?v=1.2';
// import '../../../public/assets/css/queries.css?v=1.2';
// import '../../../public/assets/css/flexslider.css';
// import '../../../public/assets/css/animate.css';

// import '../../../public/assets/js/bootstrap.min.js';
// import '../../../public/assets/js/jquery.flexslider.js';
// import '../../../public/assets/js/scripts.js';
// import "../../../public/assets/js/modernizr.js";
// import "../../../public/assets/js/waypoints.min.js";
// declare module 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js';

const IndexPage = () => {
  return (
    <Fragment>
      <header>
        {/* <Navbar
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                marginBottom: '21px'
              }}
            >
              <Nav
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 'auto'
                }}
              >
                <Nav.Menu>
                  <Nav.Item>
                    <HashLink to="#about" style={{ color: '#4d4959' }}>
                      ПРО КНИТУ
                    </HashLink>
                  </Nav.Item>
                  <span style={{ margin: '10px' }}>.</span>
                  <Nav.Item>
                    <HashLink to="#contact" style={{ color: '#4d4959' }}>
                      КОНТАКТ
                    </HashLink>{' '}
                  </Nav.Item>
                  <span style={{ margin: '10px' }}>.</span>
                  <Nav.Item style={{ height: 'auto' }}>
                    <HashLink to="#work" style={{ color: '#4d4959' }}>
                      <img src={mainLogo} />
                    </HashLink>
                  </Nav.Item>
                  <span style={{ margin: '10px' }}>.</span>
                  <Nav.Item>
                    <HashLink to="#work" style={{ color: '#4d4959' }}>
                      ДЕЯТЕЛЬНОСТЬ
                    </HashLink>
                  </Nav.Item>
                  <span style={{ margin: '10px' }}>.</span>
                </Nav.Menu>
                <Nav.Item>
                  <HashLink to="sign-in" style={{ color: '#4d4959' }}>
                    ВХОД
                  </HashLink>
                </Nav.Item>
              </Nav>
            </Navbar> */}
        <Navbar
          bg="light"
          expand="lg"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto'
          }}
        >
          <ReactContainer style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Navbar.Brand
              href="/"
              style={{ height: 'auto', marginTop: '10px', marginLeft: '10px ' }}
            >
              <img src={mainLogo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                className="me-auto"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 'auto'
                }}
              >
                <Nav.Link as={HashLink} to="#about" style={{ color: '#4d4959' }}>
                  ПРО КНИТУ
                </Nav.Link>
                <span style={{ margin: '20px' }}>.</span>
                <Nav.Link as={HashLink} to="#work" style={{ color: '#4d4959' }}>
                  ДЕЯТЕЛЬНОСТЬ
                </Nav.Link>
                <span style={{ margin: '20px' }}>.</span>
                <Nav.Link as={HashLink} to="#contact" style={{ color: '#4d4959' }}>
                  КОНТАКТ
                </Nav.Link>
                <span style={{ margin: '20px' }}>.</span>
                <Nav.Link as={HashLink} to="sign-in" style={{ color: '#4d4959' }}>
                  ВХОД
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </ReactContainer>
        </Navbar>
        <Container>
          <img src={panel4} />
        </Container>
      </header>
      <Container id="about">
        <Row style={{ maxWidth: '80%', margin: 'auto', marginBottom: '50px' }}>
          {/* <Row style={{ maxWidth: '80%', margin: 'auto', marginBottom: '50px' }}> */}
          <h1 className="chain" style={{ margin: '30px' }}>
            ИСТОРИЯ КНИТУ
          </h1>
          <p className="text-intro">
            «Казань — местность, где химическая промышленность в России имеет первостепенное
            значение и кроме того, производства прядильно-ткацкое и мукомольное в Казани и близ ее
            сообщают ей характер важного промышленного центра, в котором вполне справедливо учредить
            промышленное училище». (Из доклада министра народного просвещения на заседании
            Государственного Совета 26 июня 1889 г.)
          </p>
          <p className="text-intro">
            Казанский национальный исследовательский технологический университет берет свое начало с
            Казанского соединенного промышленного училища. 14 (26) июня 1890 года император
            Александр III повелел создать в Казани соединенное среднее химико-технологическое
            училище и низшее техническое училище с механической, химической и строительной
            специальностями. Для строительства училища был выделен земельный участок на Арском поле.
            Кроме учебного корпуса (ныне корпус Б), были сооружены и оборудованы технико-химические,
            столярные и слесарно-механические мастерские, газовый завод, собственная электростанция,
            жилой корпус для преподавателей и сотрудников (корпус О).
          </p>
          <p className="text-intro">
            10 сентября 1897 года состоялось торжественное открытие Казанского промышленного
            училища. Училище готовило мастеров-практиков и было оснащено полузаводским и заводским
            оборудованием для производства соды, сульфата натрия, соляной кислоты, сухой перегонки
            дерева, железного и медного купороса, квасцов, мыловарения и клееварения. Казанское
            промышленное училище дало 17 выпусков, подготовив 1145 специалистов. Постановлением
            отдела вузов Наркомпроса РСФСР от 2 апреля 1919 года Казанское промышленное училище
            преобразуется в Казанский политехнический институт. Этот институт стал первым высшим
            учебным заведением инженерного профиля в Татарстане.
          </p>
        </Row>
      </Container>
      <Container id="work">
        <Row>
          <div className="col-md-8 section-1 nopadding" id="work">
            {/* <div className="logo-1 wp1"></div> */}
          </div>
          <div className="col-md-4 section-text nopadding">
            <div className="wp4">
              <h2 className="frame" style={{ height: 'auto' }}>
                УНИВЕРСИТЕТ СЕГОДНЯ
              </h2>
              <p>
                В составе КНИТУ 12 учебных и научно-исследовательских институтов (в том числе
                Проектный институт «Союзхимпромпроект», Казанский НИИ каучуков специального
                назначения «Спецкаучук»). В 2014 году открыто представительство КНИТУ во Вьетнаме
                (г. Вьетчи).
              </p>
              <div className="thin-sep"></div>
            </div>
            <div className="small-featured-img seat-red">
              <div className="arrow"></div>
            </div>
          </div>
        </Row>
        <Row>
          <div className="col-md-4 section-text nopadding">
            <div className="wp5">
              <h2 className="mech">Образовательная деятельность</h2>
              <p>
                Сегодня КНИТУ - это крупнейший в Российской Федерации образовательный центр
                химико-технологического профиля – лидер в области подготовки высококвалифицированных
                инженерных кадров по направлению «Химическая технология». Здесь реализуется более
                378 образовательных программ высшего, среднего и дополнительного образования. В вузе
                обучается более 25 000 студентов и аспирантов из России и зарубежных стран.
              </p>
              <div className="thin-sep"></div>
            </div>
            <div className="small-featured-img seat-black">
              <div className="arrow"></div>
            </div>
          </div>
          <div className="col-md-8 section-2 nopadding"></div>
        </Row>
      </Container>
      <Container>
        <Row>
          <div className="col-md-4 section-3"></div>
          <div className="col-md-4 section-text nopadding">
            <div className="wp6">
              <h2 className="front-frame">КНИТУ в рейтингах</h2>
              <p>
                По версии одного из наиболее влиятельных глобальных рейтингов университетов (QS
                University Rankings: BRICS 2015), КНИТУ занимает 151-160 место среди вузов стран
                БРИКС. В 2017 году проект «Социальный навигатор» международного информационного
                агентства «Россия сегодня» составил национальный рейтинг востребованности вузов в
                РФ. КНИТУ в числе лидеров: у нас 12 место среди инженерных университетов страны и
                самая высокая позиция по сравнению с другими вузами региона.
              </p>
              <div className="thin-sep"></div>
            </div>
            <div className="small-featured-img frame-red">
              <div className="arrow"></div>
            </div>
          </div>
          <div className="col-md-4 section-4"></div>
        </Row>
      </Container>
      <section className="flex-container" style={{ margin: 'auto', width: '80%' }}>
        <Container>
          <Row>
            <div className="col-md-12">
              <div className="flexslider">
                <ul className="slides">
                  <li>
                    <div className="img">
                      <img src="public/assets/img/slide1.png" alt="Leather Seats" />
                      <div className="overlay">
                        <a href="http://google.com/" className="expand"></a>
                        <a className="close-overlay hidden">x</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="img">
                      <img src="public/assets/img/slide2.png" alt="Leather Seats" />
                      <div className="overlay">
                        <a href="http://google.com/" className="expand"></a>
                        <a className="close-overlay hidden">x</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="img">
                      <img src="public/assets/img/slide3.png" alt="Leather Seats" />
                      <div className="overlay">
                        <a href="http://google.com/" className="expand"></a>
                        <a className="close-overlay hidden">x</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Row>
        </Container>
      </section>
      <Container id="shop">
        <Row>
          <div id="effect" className="effects clearfix">
            <div className="col-md-4 left nopadding">
              <div className="left-box-1">
                <div className="img">
                  <img src="public/assets/img/bot1.jpg" alt="Leather Seats" />
                  <div className="overlay">
                    <a href="http://google.com/" className="expand">
                      leather seats
                    </a>
                    <a className="close-overlay hidden">x</a>
                  </div>
                </div>
              </div>
              <div className="left-box-2 box">
                <div className="img">
                  <img src="public/assets/img/bot2.jpg" alt="Custom Seats" />
                  <div className="overlay">
                    <a href="#" className="expand">
                      custom seats
                    </a>
                    <a className="close-overlay hidden">x</a>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="left-box-btm box">
                <div className="img">
                  <img src="public/assets/img/bot3.jpg" alt="Limited Edition" />
                  <div className="overlay">
                    <a href="#" className="expand">
                      limited edition
                    </a>
                    <a className="close-overlay hidden">x</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mid nopadding">
              <div className="mid-box-1 box">
                <div className="img">
                  <img src="public/assets/img/bot4.jpg" alt="Shop Bags" />
                  <div className="overlay">
                    <a href="#" className="expand">
                      shop bags
                    </a>
                    <a className="close-overlay hidden">x</a>
                  </div>
                </div>
              </div>
              <div className="mid-box-2 box">
                <div className="img">
                  <img src="public/assets/img/bot10.jpg" alt="Shop Bikes" />
                  <div className="overlay">
                    <a href="#" className="expand">
                      shop bikes
                    </a>
                    <a className="close-overlay hidden">x</a>
                  </div>
                </div>
              </div>
              {/* <div className="clearfix"></div> */}
            </div>
            <div className="col-md-4 right nopadding">
              <div className="right-box-1 box">
                <div className="img">
                  <img src="public/assets/img/bot6.jpg" alt="Shop Now" />
                  <div className="overlay">
                    <a href="#" className="expand">
                      shop now
                    </a>
                    <a className="close-overlay hidden">x</a>
                  </div>
                </div>
              </div>
              <div className="right-box-2 box">
                <div className="img">
                  <img src="public/assets/img/bot7.jpg" alt="Shop Seats" />
                  <div className="overlay">
                    <a href="#" className="expand">
                      shop seats
                    </a>
                    <a className="close-overlay hidden">x</a>
                  </div>
                </div>
              </div>
              <div className="right-box-3 box">
                <div className="img">
                  <img src="public/assets/img/bot8.jpg" alt="Shop Accessories" />
                  <div className="overlay">
                    <a href="#" className="expand">
                      shop accessories
                    </a>
                    <a className="close-overlay hidden">x</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
      <section className="discover">
        <Container>
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <a href="https://www.kstu.ru/index.jsp" className="shop-btn">
                Исследовать университет
              </a>
            </div>
          </div>
        </Container>
      </section>
      <section className="sign_up">
        <Container>
          <Row>
            <div className="col-md-6 col-md-offset-3 sign-up">
              <h2 className="logo-header">Оставить электронную почту!</h2>
              <form name="signup-form">
                <input
                  className="signup-input"
                  type="email"
                  name="email_address"
                  defaultValue=""
                  placeholder="enter your email..."
                  title="Please enter a valid email address."
                  required
                />
                <button type="submit" className="submit-btn">
                  Отправлять
                </button>
              </form>
            </div>
          </Row>
        </Container>
      </section>

      <footer id="contact" data-name="contact">
        <Container>
          <Row>
            <div className="col-md-4 footer-leftcol">
              <p>
                <span className="bold-16p">Татарстан </span>
                42015,г. Казань, ул. К.Маркса, 68 <a href="#">KRNTU@mail.ru</a>
              </p>
            </div>
            <div className="col-md-4 footer-midcol">
              <div className="clearfix"></div>
            </div>
            <div className="col-md-4 footer-rightcol">
              {/* <p>
                Designed by{' Son Nguyen '}
                <a href="#">
                  <img src="public/assets/img/yebo-icon.png" alt="Yebo Logo" />
                </a>
              </p> */}
              <p className="nopadding">
                Developed by <a href="https://vk.com/wolfmsqg">Son Nguyen</a>
              </p>
            </div>
          </Row>
        </Container>
      </footer>
    </Fragment>
  );
};

export default IndexPage;
