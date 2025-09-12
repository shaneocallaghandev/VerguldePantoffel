import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/styles/pages/contact.css"; 
import markerIcon2x from "../assets/images/marker-icon-2x.png";

const customIcon = L.icon({
  iconUrl: markerIcon2x, // or "/images/marker-icon-2x.png" if in public
  iconSize: [25, 41],    // adjust if needed
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: null,       // or add your own shadow if you want
});

const Contact = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([51.81397, 4.66514], 13);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Add a marker
    L.marker([51.81397, 4.66514], { icon: customIcon })
      .addTo(map)
      .bindPopup("Restauratie Atelier De Vergulde Pantoffel")
      .openPopup();

    // Cleanup function to remove the map instance
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="contact-container">
      <div className="contact-wood-background"></div>
      {/* Contact Info */}
      <div className="info-container">
        <div className="contact-info">
          <h2>Restauratie Atelier De Vergulde Pantoffel</h2>
          <p>Hugo Lammertse </p>
          <p>Voorstraat 300 3311CW Dordrecht</p>
          <p>06 50505956 / 078 8436542 </p>
          <p>
            Bezichtiging en vrijblijvende offerte op afspraak. Voor vragen en
            opmerkingen kunt u ons bereiken via:
          </p>
          <p><strong>hdllammertse@gmail.com</strong></p>
          <a href="https://maps.app.goo.gl/mWTTfRakxVViphqk9" target="_blank" rel="noopener noreferrer">
            Bekijk op Google Maps
          </a>
        </div>

        {/* Map */}
        <div
          id="map"
          className="contact-map"
        ></div>
      </div>
    </div>
  );
};

export default Contact;