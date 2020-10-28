/*array of note names*/
const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
/*initialising the tone synth*/
const synth = new Tone.Synth().toDestination();

/*setting the number of octaves to be 3.
then adding the major and minor keys for each octave*/
function octaveSlider(value) {
  document.getElementById('piano').innerHTML = "";
  document.getElementById('octaveValue').innerHTML = value;
  let currentOctave = parseInt(value);
  let newKeys = "";

  for (let octave = currentOctave; octave < currentOctave + 3; octave++) {
    for (let i = 0; i < notes.length; i++) {
      let hasSharp = true;
      let note = notes[i];
      if (note == 'E' || note == 'B') {
        hasSharp = false;
      }
      newKeys += `<div class='majorKey'
      data-note='${note + (octave)}'>`;
      if (hasSharp) {
        newKeys += `<div class='minorKey'
        data-note='${note + '#' + (octave)}'>
        <h6 class="keyName ">${note + '#' + (octave)}</h6>
        </div>`;
      }
      newKeys += `<h6 class="keyName">${note + (octave)}</h6></div>`;
    }
  }
  document.getElementById('piano').innerHTML = newKeys;
  addingListeners();
}

function addingListeners() {
  const majorKeyElem = document.querySelectorAll('.majorKey');
  const minorKeyElem = document.querySelectorAll('.minorKey');
  
  /*triggering the note for mousepress*/
  majorKeyElem.forEach(item => {
    item.addEventListener('mousedown', event => {
      let note = item.dataset.note;
      synth.triggerAttack(note, '16n');
      item.style.background = '#ccc';
      item.lastChild.style.background = '#ccc';
    })
  })
  
  /*releasing the note when the mouse leaves*/
  majorKeyElem.forEach(item => {
    item.addEventListener('mouseup', event => {
      let note = item.dataset.note;
      synth.triggerRelease();
      item.style.background = 'white';
      item.lastChild.style.background = 'white';
    })
  })
  
  /*triggering the note for mousepress*/
  minorKeyElem.forEach(item => {
    item.addEventListener('mousedown', event => {
      let note = item.dataset.note;
      synth.triggerAttack(note, '16n');
      event.stopPropagation();
      item.style.background = 'black';
    })
  })
  
  /*releasing the note when the mouse leaves*/
  minorKeyElem.forEach(item => {
    item.addEventListener('mouseup', event => {
      let note = item.dataset.note;
      synth.triggerRelease();
      event.stopPropagation();
      item.style.background = '#333';
    })
  })
  
  /*getting the key pressed through the keyboard.
    S  D    G   H  J 
  Z  X  C  V  B  N  M 
  this is what an octave should look like*/
  
  let pressedKey = "";
  document.addEventListener("keypress", event => {
    switch (event.key) {
      case "z":
      case "Z":
        pressedKey = "C4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "#ccc";
        document.querySelector(`[data-note=${pressedKey}]`).lastChild.style.background = '#ccc';
        break;
      case "s":
      case "S":
        pressedKey = "C#4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "black";
        break;
      case "x":
      case "X":
        pressedKey = "D4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "#ccc";
        document.querySelector(`[data-note=${pressedKey}]`).lastChild.style.background = '#ccc';
        break;
      case "d":
      case "D":
        pressedKey = "D#4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "black";
        break;
      case "c":
      case "C":
        pressedKey = "E4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "#ccc";
        document.querySelector(`[data-note=${pressedKey}]`).lastChild.style.background = '#ccc';
        break;
      case "v":
      case "V":
        pressedKey = "F4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "#ccc";
        document.querySelector(`[data-note=${pressedKey}]`).lastChild.style.background = '#ccc';
        break;
      case "g":
      case "G":
        pressedKey = "F#4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "black";
        break;
      case "b":
      case "B":
        pressedKey = "G4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "#ccc";
        document.querySelector(`[data-note=${pressedKey}]`).lastChild.style.background = '#ccc';
        break;
      case "h":
      case "H":
        pressedKey = "G#4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "black";
        break;
      case "n":
      case "N":
        pressedKey = "A4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "#ccc";
        document.querySelector(`[data-note=${pressedKey}]`).lastChild.style.background = '#ccc';
        break;
      case "j":
      case "J":
        pressedKey = "A#4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "black";
        break;
      case "m":
      case "M":
        pressedKey = "B4";
        document.querySelector(`[data-note=${pressedKey}]`).style.background = "#ccc";
        document.querySelector(`[data-note=${pressedKey}]`).lastChild.style.background = '#ccc';
        break;
    }
  
    /*triggering the corresponding sound when the correct key is pressed*/
    if (["z", "Z", "s", "S", "x", "X", "d", "D", "c", "C", "v", "V", "g", "G", "b", "B", "h", "H", "n", "N", "j", "J", "m", "M"]
      .includes(event.key)) {
      synth.triggerAttack(pressedKey, '16n');
    }
  })
}

/*releasing the sound when key is not pressed anymore*/
document.addEventListener("keyup", event => {
  synth.triggerRelease();
})

