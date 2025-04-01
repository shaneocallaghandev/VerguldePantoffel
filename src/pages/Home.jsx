import { useEffect } from "react";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/styles/pages/Home.css";
import image2 from "../assets/images/2.jpg";
import image4 from "../assets/images/4.jpg";
import image1 from "../assets/images/1.jpg";
import welkomFoto from "../assets/images/welkomfoto_0.jpg";


const Home = () => {

  useEffect(() => {
    window.dispatchEvent(new Event("resize")); // Trigger a resize event to fix slick width issues
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home-container">
      <h1>Welkom! </h1>

      <Carousel {...settings} className="home-carousel">
        <div>
        <img src={image1} alt="Impressie 1" loading="lazy" />
        </div>
        <div>
        <img src={image2} alt="Impressie 2" />
        </div>
        <div>
        <img src={image4} alt="Impressie 4" />
        </div>
      </Carousel>
      <div className="info-container">
        <div className="info-text">
        <p>
          Welkom bij Vergulde Pantoffel! Wij zijn gespecialiseerd in de verkoop
          en restauratie van antieke meubels. Onze passie voor vakmanschap en
          oog voor detail maken ons uniek.
        </p>
        <p>
          Neem een kijkje in onze winkel of neem contact met ons op voor meer
          informatie over onze diensten.
        </p>
        </div>
        <div className="info-image">
        <img src={welkomFoto} alt="Over Ons" className="extra-image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
