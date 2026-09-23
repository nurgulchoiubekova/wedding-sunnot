// Authentic Kyrgyz Komuz Pluck & Melody Synthesizer using Web Audio API

class KomuzAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private noteIndex: number = 0;
  private onStateChangeCallbacks: Array<(playing: boolean) => void> = [];

  // Authentic Kyrgyz pentatonic folk melody sequence (reminiscent of 'Mash Botoi' & traditional kүү)
  private melody = [
    { note: 293.66, dur: 0.35 }, // D4
    { note: 329.63, dur: 0.35 }, // E4
    { note: 392.00, dur: 0.70 }, // G4
    { note: 440.00, dur: 0.35 }, // A4
    { note: 392.00, dur: 0.35 }, // G4
    { note: 587.33, dur: 0.85 }, // D5 (accent chime)
    { note: 523.25, dur: 0.40 }, // C5
    { note: 440.00, dur: 0.40 }, // A4
    { note: 392.00, dur: 0.45 }, // G4
    { note: 329.63, dur: 0.45 }, // E4
    { note: 293.66, dur: 1.10 }  // D4 (deep drone)
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playPluck(freq: number, duration: number = 0.4, gainLevel: number = 0.18): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Plucked string acoustic quality: triangle waveform + sine sub
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(freq * 0.5, ctx.currentTime);

      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      subOsc.start();
      osc.stop(ctx.currentTime + duration);
      subOsc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  public playWaxSealPop(): void {
    // Satisfying tactile pop + chime
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Deep thump
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);

      // Gilded sparkle chime
      setTimeout(() => this.playPluck(587.33, 0.45, 0.22), 60);
      setTimeout(() => this.playPluck(880.00, 0.55, 0.25), 180);
    } catch {
      // Ignore
    }
  }

  public playCelebrationChord(): void {
    this.playPluck(523.25, 0.4, 0.2); // C5
    setTimeout(() => this.playPluck(659.25, 0.45, 0.22), 120); // E5
    setTimeout(() => this.playPluck(783.99, 0.55, 0.25), 240); // G5
    setTimeout(() => this.playPluck(1046.50, 0.8, 0.28), 360); // C6
  }

  private scheduleNext(): void {
    if (!this.isPlaying) return;
    const item = this.melody[this.noteIndex];
    this.playPluck(item.note, item.dur, 0.16);
    this.noteIndex = (this.noteIndex + 1) % this.melody.length;
    this.timer = window.setTimeout(() => this.scheduleNext(), item.dur * 1000 + 170);
  }

  public toggle(): boolean {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.getContext();
      this.scheduleNext();
    } else {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
    this.notify();
    return this.isPlaying;
  }

  public start(): void {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.getContext();
      this.scheduleNext();
      this.notify();
    }
  }

  public stop(): void {
    if (this.isPlaying) {
      this.isPlaying = false;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.notify();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(cb: (playing: boolean) => void): () => void {
    this.onStateChangeCallbacks.push(cb);
    cb(this.isPlaying);
    return () => {
      this.onStateChangeCallbacks = this.onStateChangeCallbacks.filter((c) => c !== cb);
    };
  }

  private notify(): void {
    this.onStateChangeCallbacks.forEach((cb) => cb(this.isPlaying));
  }
}

export const komuzAudio = new KomuzAudioEngine();
