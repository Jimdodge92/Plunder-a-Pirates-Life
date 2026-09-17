// Sound Engine with custom MP3 support + automatic Web Audio synthesizer fallback
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Tries to play custom MP3 file(s) placed in public/sounds/.
  // If not found or playback is blocked, executes the synthesized fallback.
  playCustomAudio(candidates, fallbackFn) {
    if (this.muted) return;

    let idx = 0;
    const tryNext = () => {
      if (idx >= candidates.length) {
        if (fallbackFn) fallbackFn();
        return;
      }
      const path = candidates[idx++];
      const audio = new Audio(path);
      audio.volume = 1.0;

      const p = audio.play();
      if (p !== undefined) {
        p.catch(() => {
          tryNext();
        });
      }
    };

    tryNext();
  }

  // --- Cannon Blast ---
  playCannon() {
    this.playCustomAudio(
      ['./sounds/cannon.mp3', './sounds/Canon_Fire.mp3', './sounds/cannon_fire.mp3', './Canon_Fire.mp3'],
      () => this.synthCannon()
    );
  }

  synthCannon() {
    if (this.muted) return;
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);

    oscGain.gain.setValueAtTime(0.8, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);

    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 0.8);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1.0, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
  }

  // --- Wilhelm Scream (Plays for ALL Skirmishes) ---
  playWilhelm() {
    this.playCustomAudio(
      ['./sounds/wilhelm_scream.mp3', './sounds/wilhelm.mp3', './wilhelm_scream.mp3', './sounds/defeat.mp3'],
      () => this.synthWilhelm()
    );
  }

  playDefeat() {
    this.playWilhelm();
  }

  synthWilhelm() {
    if (this.muted) return;
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.7);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.75);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.8);
  }

  // --- Page Turn ---
  playPageTurn() {
    this.playCustomAudio(
      ['./sounds/page_turn.mp3', './sounds/pageturn.mp3', './sounds/paper.mp3'],
      () => this.synthPageTurn()
    );
  }

  synthPageTurn() {
    if (this.muted) return;
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const duration = 0.38;

    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut * 0.72) + (white * 0.28);
      lastOut = data[i];
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1200, now);
    bandpass.frequency.exponentialRampToValueAtTime(2600, now + 0.12);
    bandpass.frequency.exponentialRampToValueAtTime(650, now + duration);
    bandpass.Q.setValueAtTime(1.5, now);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(4200, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.04);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.14);
    gain.gain.linearRampToValueAtTime(0.38, now + 0.22);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noiseSource.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + duration);
  }

  // --- Booty / Coin Jingle ---
  playCoin() {
    this.playCustomAudio(
      ['./sounds/coin.mp3', './sounds/booty.mp3', './sounds/gold.mp3'],
      () => this.synthCoin()
    );
  }

  synthCoin() {
    if (this.muted) return;
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const freqs = [987.77, 1318.51, 1567.98, 2093.00];
    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + index * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  // --- Dice Rattle ---
  playDice() {
    this.playCustomAudio(
      ['./sounds/dice.mp3', './sounds/roll.mp3'],
      () => this.synthDice()
    );
  }

  synthDice() {
    if (this.muted) return;
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    for (let i = 0; i < 6; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const tapTime = now + (i * 0.07) + (Math.random() * 0.02);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220 + Math.random() * 180, tapTime);

      gain.gain.setValueAtTime(0.25, tapTime);
      gain.gain.exponentialRampToValueAtTime(0.01, tapTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(tapTime);
      osc.stop(tapTime + 0.06);
    }
  }

  // --- Compass Needle Ratchet Spin ---
  playSpin() {
    this.playCustomAudio(
      ['./sounds/spin.mp3', './sounds/tick.mp3'],
      () => this.synthSpin()
    );
  }

  synthSpin() {
    if (this.muted) return;
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(550, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }
}

export const sounds = new SoundEngine();