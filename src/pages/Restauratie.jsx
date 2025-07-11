import "../assets/styles/pages/restauratie.css";
import restauratieImage from "../assets/images/image-4184760_0.jpg";

const Restauratie = () => {
  return (
    <div className="main-container">
      <div className="text-container">
        <h2>Restauratie Services</h2>
        <p>
          Neem contact met op voor meer informatie over restauratie diensten.
        </p>
      </div>
      <img
        src={restauratieImage}
        alt="Restauratie voorbeeld"
      />
    </div>
  );
};

export default Restauratie;