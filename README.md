1-Explain what the simple List component does
List component renders the items array which is an array of object
which has a text as string .
Example:
items=[
   {
       "text":"Raj" 
   },
   {
    "text":"Pooja"
   }
]
Its gets items array via props.then it stores the selected item index in 
setSelectedIndex.
we are passing onClickHandler,text,index,isSelected to renders the item
of array with help of map on clicking the any item
its color changes to green and all others to red.

2-What problems / warnings are there with code?
1)Problem-shapeOf is not a function 
solution-we change the PropTypes.array to PropTypes.arrayOf and PropTypes.shapeOf to PropTypes.shape
2)Problem-onClickHandler directly render when we render component without clicking button
solution-onClickHandler should be call with anonymous function to prevent
 it from being immediately called when the component is rendered.
so we change onClick={onClickHandler(index)} to  onClick={() => onClickHandler(index)}
3)Problem-setSelectedIndex is not a function
solution-swap setSelectedIndex to selectedIndex, to make the variable name match the state it represents.
and intialize with null . 
so change  const [setSelectedIndex, selectedIndex] = useState() to const [selectedIndex,setSelectedIndex] = useState(null);
4)Problem-child in a list should have unique property
solution-provide key to map to distinguish the elements from others
like-  key={index}
5)Problem-isSelected expected to be boolean
solution-isSelected take boolean value to change the color so we have to make it boolean
so we change isSelected={selectedIndex} to isSelected={selectedIndex===index}

3-Please fix, optimize, and/or modify the component as much as you think is necessary.
Install the dependency prop-types in your reactjs app

IN List.js

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

In App.js

import List from "./List";
var items=[
  {
       "text":"Raj"
       
   },
   {
    "text":"Pooja"
    
}, {
  "text":"Deep"
  
}
]

function App() {
  return (
    <div className="App">
      <List items={items}/>
    </div>
  );
}

export default App;

