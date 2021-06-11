import React, { useState, useEffect } from "react"
import {Editor, EditorState, RichUtils,Modifier, getDefaultKeyBinding, KeyBindingUtil} from "draft-js"
import axios from 'axios'
import Base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';

import {stateFromMarkdown} from 'draft-js-import-markdown';
import { stateToMarkdown } from "draft-js-export-markdown";

import BlockStyleControls from './StyleControls/BlockStyleControls.js'
import InlineStyleControls from './StyleControls/InlineStyleControls.js'
import BlankPage from './BlankPage'

import './TextArea.css'

const TextArea = ({currentFile,setCurrentFile}) => {
  
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  
  const myKeyBindingFn = (e) => {
    if (e.keyCode === 83 /* `S` key */ && KeyBindingUtil.hasCommandModifier(e)) {
      return 'myeditor-save';
    }
    return getDefaultKeyBinding(e);
  }

  const handleKeyCommand = (command, editorState) => {
    if(command ==='myeditor-save'){
      _save()
      return "handled"
    }
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return "handled"
    }
    return "not-handled"
  }

  const handlePaste = (text) =>{
    try {
      const pastedBlocks = stateFromMarkdown(text.replaceAll('\n','\n\n')).blockMap;
      const newState = Modifier.replaceWithFragment(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          pastedBlocks,
      );
      const newEditorState = EditorState.push(editorState, newState, "insert-fragment");
      setEditorState(newEditorState)
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
          let contentState = stateFromMarkdown(utf8.stringify(Base64.parse(file)));
          setEditorState(EditorState.createWithContent(contentState))
        })
    }
  },[currentFile])

  const _save = () => {
    if(currentFile){
      let content = Base64.stringify(utf8.parse(stateToMarkdown(editorState.getCurrentContent())));
      let data={
        path:currentFile,
        data:content
      }
      axios.post(`/api/file/`,data)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      _save()
    }, 300000);

    return () => clearInterval(interval);
  })

  const _toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState,blockType))
  }
  
  const _toggleInlineStyle = (blockType) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState,blockType))
  }
  
  function getBlockStyle(block) {
      switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
  }

  const __onChange = (state) =>{
    //_save()
    setEditorState(state)
  }
  
  return (
    <div className="text-area">
      <div className='Controls-Container'>
        <div>
        <BlockStyleControls
          editorState={editorState}
          onToggle={_toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={_toggleInlineStyle}
        />
        </div>
      </div>
      <div className='editor-container'>
        {currentFile ? <Editor
          handlePastedText={handlePaste}
          textAlignment='left'
          blockStyleFn={getBlockStyle}
          editorState={editorState} 
          keyBindingFn={myKeyBindingFn}
          handleKeyCommand={handleKeyCommand} 
          onChange={__onChange}
        /> :
        <BlankPage/>}
      </div>
    </div>
  );
}

export default TextArea
