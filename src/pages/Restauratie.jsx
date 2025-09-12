import "../assets/styles/pages/restauratie.css";
import restauratieImage from "../assets/images/image-4184760_0.jpg";

const Restauratie = () => {
  return (
    <div className="restauratie-container">
      <div className="restauratie-wood-background"></div>
      <div className="restauratie-overlay"></div>
      <div className="info-container">
        <div className="text-container">
          <h2>Restauratie Services</h2>
          <p>
            Neem contact met ons op voor meer informatie over restauratie diensten.
          </p>
        </div>
        <img
        src={restauratieImage}
        alt="Restauratie voorbeeld"
        loading="lazy"
        className="restauratie-image"
       />
      </div>
    </div>
  );
};

export default Restauratie;