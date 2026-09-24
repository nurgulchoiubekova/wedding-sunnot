// Wedding Audio Engine playing 'Султан Садыралиев - Эки жаш' background music

class WeddingAudioEngine {
  private ctx: AudioContext | null = null;
  private bgAudio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private onStateChangeCallbacks: Array<(playing: boolean) => void> = [];

  constructor() {
    this.initAudio();
  }

  private initAudio(): void {
    if (typeof window !== 'undefined') {
      this.bgAudio = new Audio('/eki-zhash.mp3');
      this.bgAudio.loop = true;
      this.bgAudio.volume = 0.7;

      this.bgAudio.addEventListener('ended', () => {
        if (!this.bgAudio?.loop) {
          this.isPlaying = false;
          this.notify();
        }
      });

      this.bgAudio.addEventListener('pause', () => {
        if (this.isPlaying) {
          this.isPlaying = false;
          this.notify();
        }
      });

      this.bgAudio.addEventListener('play', () => {
        if (!this.isPlaying) {
          this.isPlaying = true;
          this.notify();
        }
      });
    }
  }

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
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // 1. Soft tactile wax seal pop sound
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = 'sine';
      popOsc.frequency.setValueAtTime(160, ctx.currentTime);
      popOsc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
      popGain.gain.setValueAtTime(0.25, ctx.currentTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.start();
      popOsc.stop(ctx.currentTime + 0.1);

      // 2. Bright & cheerful festive arpeggiated golden chime cascade (D Major Pentatonic Fanfare)
      const notes = [
        { freq: 587.33, delay: 40, dur: 0.5, vol: 0.22 },  // D5 - Warm opening pluck
        { freq: 739.99, delay: 110, dur: 0.5, vol: 0.24 }, // F#5 - Joyful note
        { freq: 880.00, delay: 180, dur: 0.6, vol: 0.25 }, // A5 - Bright chime
        { freq: 1174.66, delay: 250, dur: 0.7, vol: 0.28 },// D6 - High sparkle
        { freq: 1479.98, delay: 330, dur: 0.9, vol: 0.30 },// F#6 - Crystal celebration shimmer
      ];

      notes.forEach(({ freq, delay, dur, vol }) => {
        setTimeout(() => {
          this.playPluck(freq, dur, vol);
        }, delay);
      });
    } catch (e) {
      console.warn('Envelope sound effect error:', e);
    }
  }

  public playCelebrationChord(): void {
    this.playPluck(523.25, 0.4, 0.2); // C5
    setTimeout(() => this.playPluck(659.25, 0.45, 0.22), 120); // E5
    setTimeout(() => this.playPluck(783.99, 0.55, 0.25), 240); // G5
    setTimeout(() => this.playPluck(1046.50, 0.8, 0.28), 360); // C6
  }

  public toggle(): boolean {
    if (!this.bgAudio) this.initAudio();
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public start(): void {
    if (!this.bgAudio) this.initAudio();
    if (this.bgAudio) {
      this.bgAudio.play().then(() => {
        this.isPlaying = true;
        this.notify();
      }).catch((err) => {
        console.warn('Autoplay prevented or audio play failed:', err);
      });
    }
  }

  public stop(): void {
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.isPlaying = false;
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

export const komuzAudio = new WeddingAudioEngine();
