import { DEFAULT_FRAME_DURATION } from '~/consts';

export default class GameLoop {
  private static instance: GameLoop;
  private frameDuration: number;
  private lastFrameTime: number;

  constructor(frameDuration: number = DEFAULT_FRAME_DURATION) {
    if (!GameLoop.instance) {
      this.lastFrameTime = Date.now();
      this.frameDuration = frameDuration;
      GameLoop.instance = this;
    }

    return GameLoop.instance;
  }

  public start(fn: Function) {
    const loop = () => {
      const currentTime = Date.now();

      if (this.lastFrameTime + this.frameDuration <= currentTime) {
        this.lastFrameTime = currentTime;
        fn();
      }

      requestAnimationFrame(loop);
    };

    loop();
  }
}
