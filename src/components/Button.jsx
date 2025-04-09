import PropTypes from "prop-types";
import "./Button.css"; // Import the CSS file for styling

const Button = ({ children, onClick, type = "button", styleType = "primary", disabled = false }) => {
  return (
    <button
      className={`button ${styleType}`} // Apply the style type as a class
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired, // The button label or content
  onClick: PropTypes.func, // Function to handle button clicks
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Button type
  styleType: PropTypes.oneOf(["primary", "secondary", "danger"]), // Style type
  disabled: PropTypes.bool, // Whether the button is disabled
};

export default Button;