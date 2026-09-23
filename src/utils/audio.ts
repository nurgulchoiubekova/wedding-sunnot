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
