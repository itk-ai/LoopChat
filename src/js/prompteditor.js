import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-yaml';
import yamlWorkerUrl from "file-loader!ace-builds/src-noconflict/worker-yaml";
ace.config.setModuleUrl("ace/mode/yaml_worker", yamlWorkerUrl)

if (document.getElementById("prompteditor") != null) {

  const promptFile = './prompt.yaml';

  // Create an instance of the editor
  const editor = ace.edit('editor', {
    useWorker: true,
    mode: 'ace/mode/yaml',
    showPrintMargin: false,
  });
  
  let editorActive = false;
  let editorAnnotations = [];
  
  // Load contents from file
  function loadPromptContents() {
    fetch(promptFile)
      .then((res) => res.text())
      .then((data) => (editor.setValue(data, -1)))
      .catch((e) => console.error(e));
  }
  
  // Save contents to file
  function savePromptContents() {
    // Get the current content of the editor
    const editorContent = editor.getValue();
  
    // Send a PUT request to save the content to prompt.yaml
    fetch(promptFile, {
      method: 'PUT',
      headers: { 'Content-Type': 'text/plain' },
      body: editorContent
    })
    .then(response => response.ok)
    .catch(error => console.error('Error saving file:', error));
  
    // Show saved message when done saving
    document.getElementById('changesSaved').classList.remove('hidden');
  }
  
  // Editor undo
  function undoPromptContents() {
    editor.undo();
  }
  
  // Editor redo
  function redoPromptContents() {
    editor.redo();
  }
  
  // Show messages
  function removeHidden(message) {
    document.getElementById(message).classList.remove('hidden');
  }
  
  // Hide messages
  function addHidden(message) {
    document.getElementById(message).classList.add('hidden');
  }
    
  console.log("Editor active: " + editorActive);
  // Listen for when editor becomes active
  editor.on('focus', function() {
    editorActive = true;
    console.log("Editor active: " + editorActive);
  });
  
  // Listen for changes
  editor.session.on('tokenizerUpdate', function() {
    editorAnnotations = editor.getSession().getAnnotations()
    
    if (editorActive) { 
      // Listen for worker errors
      if (editorAnnotations.length != 0) {
        // Show error message
        removeHidden('messageEditorHasErrors');
        addHidden('btnSave');
        addHidden('messageUnsavedChanges');
      } else {
        // Show save message and save button
        addHidden('messageEditorHasErrors');
        removeHidden('btnSave');
        removeHidden('messageUnsavedChanges');
      }
    }
  });
  
  document.getElementById('btnSave').addEventListener('click', () => {
    // Hide message and save button on save
    addHidden('btnSave');
    addHidden('messageUnsavedChanges');
  
    savePromptContents();
  });
  
  document.getElementById('btnUndo').addEventListener('click', () => {
    // Undo the last change in the editor
    undoPromptContents();
  });
  
  document.getElementById('btnRedo').addEventListener('click', () => {
    // Redo the last change in the editor
    redoPromptContents();
  });
  
  
  // Maximize editor
  document.getElementById('btnMaximize').addEventListener('click', () => {
    document.getElementById('editorWrapper').classList.remove('relative');
    addHidden('btnMaximize');
    removeHidden('btnMinimize');
    document.getElementById('toolsWrapper').classList.add('fixed');
    document.getElementById('btnSave').classList.add('fixed');
  });
  
  // Minimize editor
  document.getElementById('btnMinimize').addEventListener('click', () => {
    document.getElementById('editorWrapper').classList.add('relative');
    removeHidden('btnMaximize');
    addHidden('btnMinimize');
    document.getElementById('toolsWrapper').classList.remove('fixed');
    document.getElementById('btnSave').classList.remove('fixed');
  });
  
  loadPromptContents();
  

}