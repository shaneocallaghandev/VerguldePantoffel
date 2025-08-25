import PropTypes from 'prop-types';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, image }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="image-preview-item"
    >
      <img src={image} alt="Preview" className="sortable-image" />
    </li>
  );
};

// Add propTypes validation
SortableItem.propTypes = {
  id: PropTypes.string.isRequired, // Ensure 'id' is a required string
  image: PropTypes.string.isRequired, // Ensure 'image' is a required string
};

export default SortableItem;