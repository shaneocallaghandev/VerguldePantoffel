import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Contact = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map("map").setView([51.81397, 4.66514], 13);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Add a marker
    L.marker([51.81397, 4.66514])
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
      {/* Contact Info */}
      <div className="contact-info">
        <h2>Contact</h2>
        <p>Restauratie Atelier De Vergulde Pantoffel</p>
        <p>Hugo Lammertse </p>
        <p>Voorstraat 300 3311CW Dordrecht</p>
        <p>06 50505956 / 06 8436542</p>
        <p>
          Bezichtiging en vrijblijvende offerte op afspraak. Voor vragen en
          opmerkingen kunt u ons bereiken via:
        </p>
        <p>hdllammertse@gmail.com</p>
      </div>

      {/* Map */}
      <div
        id="map"
        className="contact-map"
        style={{
          height: "400px",
          width: "100%",
          border: "1px solid #ccc",
        }}
      ></div>
    </div>
  );
};

export default Contact;