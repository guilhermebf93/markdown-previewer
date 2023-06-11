import { useEffect, useState } from 'react';
import './App.css';
import { marked } from 'marked';
import text from './text.txt';

marked.use({
  breaks: true,
  headerIds: false,
  mangle: false
})

function Previewer(props) {

  return (
    <div id='preview' dangerouslySetInnerHTML={{__html: props.value}} />
  )
}

function App() {
  const [output, setOutput] = useState(null);
  const [defText, setDefText] = useState(null);


  useEffect(() => {
    fetch(text)
      .then(response => response.text())
      .then(text => {
        const defaultText = text;
        setDefText(defaultText);
        if (!output) {
          const defMarked = marked.parse(defText);
          setOutput(defMarked);
        };
      })
      .catch(() => setTimeout = 500);    
  })

  
  const handleChange = e => {
    let newInput = marked.parse(e.target.value);
    setOutput(newInput);
  }

  return (
    <>
      <div className='editor'>
        <label for='editor'>Editor</label>
        <textarea id='editor' name='editor' onChange={handleChange} defaultValue={defText} rows={'7'} ></textarea>
      </div>
      <div className='preview'>
        <label for='preview'>Preview</label>
        <Previewer value={output} />
      </div>
    </>
  );
}

export default App;
