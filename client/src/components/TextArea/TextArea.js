import React, { useState, useCallback, useEffect } from "react"
import {Editor, EditorState, RichUtils } from "draft-js"
import axios from 'axios'
import Base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';

import {stateFromMarkdown} from 'draft-js-import-markdown';
import { stateToMarkdown } from "draft-js-export-markdown";
import BlockStyleControls from './StyleControls/BlockStyleControls.js'
import InlineStyleControls from './StyleControls/InlineStyleControls.js'


import './TextArea.css'

const TextArea = ({currentFile,setCurrentFile}) => {
  
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  
  const handleKeyCommand = useCallback((command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return "handled"
    }
    return "not-handled"
  })

  const handlePaste = (text) =>{
    try {
      let contentState = stateFromMarkdown(text);
      setEditorState(EditorState.createWithContent(contentState))
      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(()=>{
    if(currentFile){
      axios.get(`/api/file/?file=${currentFile}`)
        .then((res)=>{
          let file = res.data.encoded_file
          let contentState = stateFromMarkdown(atob(file));
          setEditorState(EditorState.createWithContent(contentState))
        })
    }
  },[currentFile])

  const _save = () =>{
    
    let content = Base64.stringify(utf8.parse(stateToMarkdown(editorState.getCurrentContent())));
    let data={
      path:currentFile,
      data:content
    }
    axios.post(`/api/file/`,data)
      .then(res=>{
          console.log(res.status)
      })
  }
  useEffect(() => {
    const interval = setInterval(() => {
      _save()
    }, 300000);

    return () => clearInterval(interval);
  }, [])

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
          handlePastedText={handlePaste}
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
