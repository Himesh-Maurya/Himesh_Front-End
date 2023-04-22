import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
       //onClickHandler should be call with anonymous function to prevent it
      // from being immediately called when the component is rendered.
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  //write selectedIndex at its correct position and initialize with null
const [selectedIndex,setSelectedIndex] = useState(null);


  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
    {/* we provide key to map to distinguish the elements from others */}
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          key={index}
          text={item.text}
          index={index}
          isSelected={selectedIndex===index}
          // as isSelected is boolean so make it boolean equilizing with index
        />
      ))}
    </ul>
  )
};
//error replace shapeOf with shape for proper syntax as shapeOf is not a function
//replace array with arrayOf
WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;