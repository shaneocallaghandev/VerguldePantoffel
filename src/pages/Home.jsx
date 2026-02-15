import { useEffect, useState, useRef } from "react";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/styles/pages/home.css";
import image2 from "../assets/images/2.jpg";
import image4 from "../assets/images/4.jpg";
import image1 from "../assets/images/1.jpg";
import imageHistorie from "../assets/images/historie_0.jpg";
import welkomFoto from "../assets/images/welkomfoto_0.jpg";
import downArrow from "../assets/images/down-arrow.png";
import { fetchItems } from "../data";
import Skeleton from "react-loading-skeleton";


const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showArrow, setShowArrow] = useState(true);
  const infoContainerRef = useRef(null); 

  useEffect(() => {

    const images = [image1, image2, image4, welkomFoto];
    let loadedImages = 0;

    // Preload images
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          setLoading(false); // Set loading to false when all images are loaded
        }
      };
    });
    window.dispatchEvent(new Event("resize")); // Trigger a resize event to fix slick width issues

    // Prefetch items for the Verkoop page
    const prefetchItems = async () => {
      try {
        const items = await fetchItems(); // Fetch items from the database
        localStorage.setItem("items", JSON.stringify(items)); // Cache items in localStorage
      } catch (error) {
        console.error("Error prefetching items:", error);
      }
    };

    prefetchItems();

    // Handle scroll to show/hide arrow
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Hide arrow if scrolled past 150px
      if (scrollPosition > 150) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToInfo = () => {
    if (infoContainerRef.current) {
      infoContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <div className="home-container">
      <div className="wood-background"></div>

      <div className="carousel-container">
      <div className="welcome-text-box">
        <h2>Welkom bij De Vergulde Pantoffel -</h2>
        <p>Antiek & Brocante</p>
        <p>Gevestigd in het hart van historisch Dordrecht.</p>
      </div>

        {loading ? (
          <div className="home-carousel">
            <Skeleton height={400} />
          </div>
        ) : (
          <Carousel {...settings} className="home-carousel">
            <div>
              <img src={image1} alt="Impressie 1" loading="lazy" />
            </div>
            <div>
              <img src={image2} alt="Impressie 2" loading="lazy" />
            </div>
            <div>
              <img src={image4} alt="Impressie 4" loading="lazy" />
            </div>
          </Carousel>
        )}
      </div>

    {showArrow && (
      <div className="arrow-container" onClick={scrollToInfo}>
        <img src={downArrow} alt="Scroll down" className="scroll-arrow" />
      </div>
    )}

    <div className="info-container" ref={infoContainerRef}>
        <div className="info-text">
          <h3>Welkom..</h3>
        <p>
        op de website van De Vergulde Pantoffel. Al vijf en twintig jaar restaureer en verkoop ik antiek design en verlichting. Tevens heb ik in opdracht veel tafels gemaakt van kersen, noten of eikenhout.
        Voor alle (antiek) meubelrestauraties van fineer tot politoerschade kunt u in mijn atelier te Dordrecht terecht.
        Elk meubel wordt voor u persoonlijk in orde gemaakt en in uw interieur geplaatst waarbij eventuele specifieke aanpassingen aan de indeling uitvoerig met u besproken worden.
        </p>
        <p>
          Neem een kijkje in de winkel of neem contact op voor meer
          informatie over onze diensten.
        </p>
        </div>
        <div className="info-image-container">
        <img src={welkomFoto} alt="Welkom Foto" className="info-image" loading="lazy" />
        </div>
    </div>

    <div className="info-container">
      <div className="info-text">
        <h3>&apos;De Vergulde Pantoffel&apos;</h3>
        <p>
        Toen ik vijf en twintig jaar geleden mijn bedrijf startte zocht ik naar een naam die 
        beklijft en ook nog een associatie met mijn werk geeft. Denkend aan de &apos;antieke&apos; 
        meubelen, lampen, spiegels enz. die ik restaureer kwam ik tot de conclusie, dat het feitelijk voorwerpen 
        betreft die vroeger tot de basis van een gewoon middenklasse
        huishouden behoorden.
        Die &apos;pantoffels&apos; van vroeger noemen wij nu &apos;antiek&apos;. 
        De pantoffels van vroeger hebben door hun leeftijd en geschiedenis een &apos;gulden&apos;
         randje voor ons gekregen...      
        </p>
        <p>
          De Louis Philippe kasten die veelal uit de Mayenne in Midden-Frankrijk komen maakten vaak deel uit van de bruidsschat. 
          Deze bestond dan uit een linnenkast, een keukenbuffet met opbouw 
          (een zogenaamde &apos;Deux Corps&apos;) en een hoekbed met een nachtkastje waarin de piespot zat.
        </p>
      </div>
      <div className="info-image-container">
        <img src={imageHistorie} alt="Historie Foto" className="info-image" loading="lazy" />
      </div>
    </div>

    <div className ="home-to-verkoop-router">
      <p>Bekijk de collectie:</p>
      <a href="/verkoop" className="custom-button"> Verkoop</a>
    </div>

    </div>
  );
};

export default Home;
