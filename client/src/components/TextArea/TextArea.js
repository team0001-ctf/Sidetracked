import React, { useState, useCallback } from "react"

import {Editor, EditorState, RichUtils } from "draft-js"
import BlockStyleControls from './StyleControls/BlockStyleControls.js'
import InlineStyleControls from './StyleControls/InlineStyleControls.js'

import { stateToMarkdown } from "draft-js-export-markdown";

import './TextArea.css'

const TextArea = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  
  const handleKeyCommand = useCallback((command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return "handled"
    }
    return "not-handled"
  })

  const _save = () =>{
    console.log(stateToMarkdown(editorState.getCurrentContent())
  )}

  const _toggleBlockType = useCallback((blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState,blockType))
  })
  
  const _toggleInlineStyle = useCallback((blockType) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState,blockType))
  })
  
  function getBlockStyle(block) {
      switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
  }

  return (
    <div id="TextArea">
      <div id="TextArea-Container">
        <div className='Controls-Container'>
          <div id='Controls-Container-Inner'>
            <BlockStyleControls
              editorState={editorState}
              onToggle={_toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={_toggleInlineStyle}
            />
          </div>
          <div className="Vertical-Divider"></div>
        </div>
        <Editor
          textAlignment='left'
          blockStyleFn={getBlockStyle}
          editorState={editorState} 
          handleKeyCommand={handleKeyCommand} 
          onChange={setEditorState}
        />
      </div>
      <button id='save' onClick={_save}>Save</button>
    </div>
  );
}

export default TextArea
