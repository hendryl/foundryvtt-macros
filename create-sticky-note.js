const content = `
  <div style="padding-bottom: 1rem;>
    <label for="message">Text: </label>
    <textarea id="create-sticky-note-input" style="width: 100%;" name="message"></textarea>
  </div>
`
;
async function createNote(message) {
  let maxWordLength = 0
  
  if (message.split(' ').length <= 2 && message.length < 16) {
    maxWordLength = message.length
  } else {
    maxWordLength = message.split(' ')
    .sort((a , b) => (a.length - b.length) * -1)[0]
    .length

    maxWordLength = maxWordLength < 8 ? 8 : maxWordLength;
  }

  const size = maxWordLength * 29.5

  const myDrawing = await canvas.scene.createEmbeddedDocuments("Drawing", [{
    type: CONST.DRAWING_TYPES.RECTANGLE,
    x: canvas.scene.width - size - 5,
    y: canvas.scene.height - size - 5,
    strokeWidth: 8,
    width: size,
    height: size,
    fillType: CONST.DRAWING_FILL_TYPES.SOLID,
    fillColor: '#fac800',
    fillAlpha: 1,
    text: message,
  }]);

  window.myDrawing = myDrawing

  ui.notifications.info(`Sticky Note Created!`)
}

const noteInputDialog = new Dialog({
  title: "Create Sticky Note",
  content: content,
  buttons: {
    button1: {
      label: "Cancel",
      callback: null,
      icon: `<i class="fas fa-times"></i>`
    },
    button2: {
      label: "Submit",
      callback: () => createNote(document.getElementById('create-sticky-note-input').value),
      icon: `<i class="fas fa-check"></i>`
    },
  }
}).render(true)

setTimeout(() => {
  document.getElementById('create-sticky-note-input').focus();
}, 0)
