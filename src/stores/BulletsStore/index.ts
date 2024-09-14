import Bullet from '~/components/Bullet';
import { GAME_WINDOW_HEIGHT, GAME_WINDOW_WIDTH } from '~/consts';

export default class BulletsStore {
  private static instance: BulletsStore;
  private innerBullets: Bullet[];

  constructor() {
    if (!BulletsStore.instance) {
      this.innerBullets = [];
      BulletsStore.instance = this;
    }

    return BulletsStore.instance;
  }

  public init() {
    this.innerBullets = [];
  }
  public removeBulletsOutsideScreen(): void {
    this.innerBullets = this.innerBullets.filter((bullet) => {
      if (bullet.point.x + bullet.size.width < 0) {
        return false;
      }
      if (bullet.point.x > GAME_WINDOW_WIDTH) {
        return false;
      }
      if (bullet.point.y + bullet.size.height < 0) {
        return false;
      }
      if (bullet.point.y > GAME_WINDOW_HEIGHT) {
        return false;
      }

      return true;
    });
  }

  public addElement(bullet: Bullet): void {
    this.innerBullets.push(bullet);
  }
  public removeElement(bullet: Bullet): void {
    this.innerBullets = this.innerBullets.filter((innerBullet) => innerBullet.id !== bullet.id);
  }

  get bullets(): Readonly<Bullet[]> {
    return this.innerBullets;
  }
}
