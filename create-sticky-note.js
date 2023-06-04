const content = `
  <div style="padding-bottom: 1rem;>
    <form>
        <label for="message">Text: </label>
        <input id="create-sticky-note-input" style="height: 2rem; width: 100%;" name="message">
    </form>
  </div>
`

// Callback to create note
async function createNote(message) {
  let maxWordLength = 0
  
  // logic to calculate proper square size based on text length (not perfect!)
  if (message.split(' ').length <= 2 && message.length < 16) {
    maxWordLength = message.length
  } else {
    maxWordLength = message.split(' ')
    .sort((a , b) => (a.length - b.length) * -1)[0]
    .length

    // Make sure text should be around 10 lines
    while (Math.round(message.length / maxWordLength) > 10) {
        maxWordLength = maxWordLength + 0.5;
    }
  }

  // 29.5 is good width for Signika font
  const size = maxWordLength * 29.5

  // make the drawing
  const myDrawing = await canvas.scene.createEmbeddedDocuments("Drawing", [{
    type: CONST.DRAWING_TYPES.RECTANGLE,
    strokeWidth: 8,
    fillType: CONST.DRAWING_FILL_TYPES.SOLID,
    fillColor: '#fac800',
    fillAlpha: 1,
    text: message,
    // width == height to make a square
    width: size,
    height: size,
    // put in bottom right of scene
    x: canvas.scene.width - size - 5,
    y: canvas.scene.height - size - 5,
  }]);

  ui.notifications.info(`Sticky Note Created!`)
}

// Create and render the dialog box
const noteInputDialog = new Dialog({
  title: 'Create Sticky Note',
  content: content,
  buttons: {
    cancel: {
      label: 'Cancel',
      callback: null,
      icon: `<i class="fas fa-times"></i>`
    },
    submit: {
      label: 'Submit',
      callback: () => createNote(document.getElementById('create-sticky-note-input').value),
      icon: `<i class="fas fa-check"></i>`
    },
  },
  default: 'submit'
}).render(true)

// Wait until render is done to focus on the textfield
setTimeout(() => {
  document.getElementById('create-sticky-note-input').focus();
}, 0)
