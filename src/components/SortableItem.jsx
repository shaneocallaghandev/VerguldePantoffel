import PropTypes from 'prop-types';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, image, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
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
      {onRemove && (
        <button
          type="button"
          className="image-remove-button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); onRemove(id); }}
          aria-label="Verwijder foto"
        >
          &times;
        </button>
      )}
    </li>
  );
};

SortableItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};

export default SortableItem;