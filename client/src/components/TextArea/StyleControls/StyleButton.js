import React from 'react'

const StyleButton = (props) => {
  
  const handleToggle = () => {
    props.onToggle(props.style);
  };

  return (
    <button className={props.activeStyle.includes(props.style) ? "StyleButton StyleButton-Active" : "StyleButton"} onClick={handleToggle}>
        {props.label}
    </button>
  )
}

export default StyleButton
