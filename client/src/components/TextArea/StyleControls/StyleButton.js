import React, {useState} from 'react'

const StyleButton = (props) => {
  const [isActive, setActive] = useState(props.active);

  const handleToggle = () => {
    setActive(!isActive);
    props.onToggle(props.style);
  };

  return (
    <button className={isActive ? "StyleButton StyleButton-Active" : "StyleButton"} onClick={handleToggle}>
        {props.label}
    </button>
  )
}

export default StyleButton
