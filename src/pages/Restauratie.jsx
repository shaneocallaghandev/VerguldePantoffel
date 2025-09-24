import "../assets/styles/pages/restauratie.css";
import restauratieImage from "../assets/images/image-4184760_0.jpg";

const Restauratie = () => {
  return (
    <div className="restauratie-container">
      <div className="restauratie-wood-background"></div>
      <div className="restauratie-overlay"></div>
      <div className="info-container">

      <div className="restauratie-to-contact-router">
        <a href="/contact" className="custom-button"> Contact</a>
      </div>

      <div className="text-container">
        <h2>Restauratie Services</h2>
        <p>
            Neem contact met ons op voor meer informatie over restauratie diensten.
        </p>
        <p>
          De restauratie van een object dat beschadigt is is altijd een uitdaging. Wat zal ik gebruiken voor de restauratie,origineel of een van de vele 
          toegevoegde mogelijkheden die er zijn door de ontwikkelingen van materialen en chemie.
          Ik geef de voorkeur aan origineel maar soms, gedwongen door budgetaire motieven, kies ik om een alternatief te gebruiken.
          Ik probeer altijd de originele uitstraling van het object te behouden.
          Elk object is uniek en vraagt om een specifieke aanpak.
          Ik bespreek graag de mogelijkheden met u.
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