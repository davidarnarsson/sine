

export function getRandomColor() {
  return `hsl(${Math.round(Math.random() * 360)}, ${Math.round(Math.random() * 100)}%, ${Math.round(Math.random() * 100)}%)`;
}

            /*  C         D      E      F      G    A     B       C       D       E       F      G    A     B       C*/
const notes = [130.81, 146.83, 164.81, 174.61, 196, 220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25];

const twelfthRootOf2 = 1.059463094359; 

export const pentatonicScale = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24];
export const majorScale = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24];
export const minorScale = [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 20, 22, 24];

const names = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

function makeScaleObject(names, baseNote = 440.0) {
  names.reduce((obj, n, i) => obj[n] = calculateNote(baseNote, i))
}

export function calculateNote(baseNote = 440.0, halfSteps) {
  return baseNote * Math.pow(twelfthRootOf2, halfSteps);
}

export function getRandomNote(scale = notes) {  
  const idx = Math.floor(Math.random() * scale.length);
  return scale[idx];
} 
