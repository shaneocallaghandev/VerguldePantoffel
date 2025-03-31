import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/styles/pages/Home.css";
import logo from "../assets/images/logo.png";
import image2 from "../assets/images/2.jpg";
import image4 from "../assets/images/4.jpg";
import image1 from "../assets/images/1.jpg";


const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home-container">
      <img src={logo} alt="Logo" className="logoTekst" />
      <h1>Welkom! </h1>

      <Carousel {...settings} className="home-carousel">
        <div>
        <img src={image1} alt="Impressie 1" />
        </div>
        <div>
        <img src={image2} alt="Impressie 2" />
        </div>
        <div>
        <img src={image4} alt="Impressie 4" />
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
