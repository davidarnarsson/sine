/* @global window  */

const AudioContext = window.AudioContext || window.webkitAudioContext;



export default class Synth {
  constructor(oscillatorType) {
    this.attackTime = 0.5; 
    this.releaseTime = 2.75;
    this.maxGain = 0.75;
    this.oscillatorType = oscillatorType;
    this.audioContext = new AudioContext();
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.start(); 
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 0;
    this._playing = false;
    this._isUnlocked = false;
  }

  unlock() {
    if(this._isUnlocked)
      return;

    // create empty buffer and play it
    var buffer = this.audioContext.createBuffer(1, 1, 22050);
    var source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.noteOn(0);

    // by checking the play state after some time, we know if we're really unlocked
    setTimeout(() => {
      if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
        this._isUnlocked = true;
      }
    }, 0);

  }

  close() {
    this.audioContext.close();
  }

  get playing() {
    return this._playing; 
  }

  play(note) {
    if (!this._isUnlocked) this.unlock();
    
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