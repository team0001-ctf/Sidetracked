import React, { useState } from "react"

import TextArea from '../TextArea/TextArea.js'
import NodeExplorer from '../NodeExplorer/NodeExplorer.js'

function Editor() {
  var [currentFile, setCurrentFile] = useState('')
  return (
    <React.Fragment>
    <NodeExplorer 
        currentFile={currentFile}
        setCurrentFile={setCurrentFile}
    />
    <TextArea
      currentFile={currentFile}
    />
    </React.Fragment>
  );
}

export default Editor;
