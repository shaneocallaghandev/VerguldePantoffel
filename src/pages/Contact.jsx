import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/styles/pages/contact.css";
import markerIcon2x from "../assets/images/marker-icon-2x.png";
import emailjs from "@emailjs/browser";

const customIcon = L.icon({
  iconUrl: markerIcon2x, // or "/images/marker-icon-2x.png" if in public
  iconSize: [25, 41],    // adjust if needed
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: null,       // or add your own shadow if you want
});

const Contact = () => {
  const location = useLocation();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (location.state?.prefilledMessage) {
      setFormData(prev => ({
        ...prev,
        message: location.state.prefilledMessage
      }));

      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.state]);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: "hdllammertse@gmail.com"
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Email send error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Contact Form */}
      <div className="contact-form-container" ref={formRef}>
        <h2>Stuur ons een bericht</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Naam *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefoon</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Bericht *</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? "Versturen..." : "Verstuur"}
          </button>

          {submitStatus === "success" && (
            <p className="success-message">Bericht succesvol verzonden!</p>
          )}
          {submitStatus === "error" && (
            <p className="error-message">Er is iets misgegaan. Probeer het opnieuw.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;