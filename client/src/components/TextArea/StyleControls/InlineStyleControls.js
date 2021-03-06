import React from 'react'
import StyleButton from './StyleButton.js'

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const buttons = INLINE_STYLES.map((type)=>
    <StyleButton
      key={type.label}
      activeStyle={currentStyle.toString()}
      label={type.label}
      onToggle={props.onToggle}
      style={type.style}
    />
  )
  return (
    < >
      {buttons}
    </>
  );
};


export default InlineStyleControls
