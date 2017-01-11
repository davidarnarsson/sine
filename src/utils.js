

export function getRandomColor() {
  return `hsl(${Math.round(Math.random() * 360)}, ${Math.round(Math.random() * 100)}%, ${Math.round(Math.random() * 100)}%)`;
}


const notes = [130.81, 146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25];


export function getRandomNote() {
  return notes[Math.min(notes.length - 1, Math.round(Math.random() * notes.length))];
} 
