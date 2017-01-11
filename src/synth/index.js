/* @global window  */

const AudioContext = window.AudioContext || window.webkitAudioContext;
const lowNote = 261.63;
const highNote = 493.88;

export default class Synth {
  constructor(oscillatorType) {
    this.attackTime = 0.25; 
    this.releaseTime = 2.75;
    this.maxGain = 0.75;
    this.oscillatorType = oscillatorType;
    this.audioContext = new AudioContext();
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.start(); 
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 0;
    this._playing = false;
  }

  close() {
    this.audioContext.close();
  }

  get playing() {
    return this._playing; 
  }

  play(note) {
    const { audioContext, oscillator, gainNode } = this;
    const now = audioContext.currentTime;
    const gain = gainNode.gain;

    oscillator.type = this.oscillatorType;
    oscillator.frequency.setValueAtTime(note, now);
    
    gainNode.connect(audioContext.destination);
    oscillator.connect(gainNode);

    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.linearRampToValueAtTime(this.maxGain, now + this.attackTime);
    gain.linearRampToValueAtTime(0, now + this.attackTime + this.releaseTime);
    
    this._playing = true; 
  }

  stop() {
    const { oscillator,gainNode } = this; 
    oscillator.disconnect(gainNode);
  }
}