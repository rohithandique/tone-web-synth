const notes = ['C','D','E','F','G','A','B'];
const synth = new Tone.Synth().toDestination();


let keys = "";
for(let octave=0; octave<2; octave++) {
  for(let i=0; i<notes.length; i++) {
    let hasSharp = true;
    let note = notes[i];
    if(note=='E'||note=='B') {
      hasSharp = false;
    }
    keys += `<div class='majorKey' onmousedown='noteDown(this, false)' 
    onmouseup='noteUp(this, false)' onmouseleave='noteUp(this, false)'
    data-note='${note + (octave+4)}'>`;
    if(hasSharp) {
      keys += `<div class='minorKey' onmousedown='noteDown(this, true)' 
      onmouseup='noteUp(this, true)' onmouseleave='noteUp(this, true)'
      data-note='${note + '#' + (octave+4)}'></div>`;
    }
    keys += `</div>`;
  }
}

document.getElementById('piano').innerHTML = keys;

function noteUp(elem, isSharp) {
  synth.triggerRelease();
  elem.style.background = isSharp ? '#333' : 'white';
}

function noteDown(elem, isSharp) {
  let note = elem.dataset.note;
  elem.style.background = isSharp ? 'black' : '#ccc';
  if(isSharp) {
    synth.triggerAttack(note, "16n");
    event.stopPropagation();
  }
  else {
    synth.triggerAttack(note, "16n");
  }
}