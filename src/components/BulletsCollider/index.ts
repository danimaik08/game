import { BulletType } from '~/components/Bullet/types';
import BulletsStore from '~/components/BulletsStore';
import GameObject from '~/structs/GameObject';

import * as Helper from './helper';

export default class BulletsCollider {
  private bulletsStore: BulletsStore;

  constructor(private target: GameObject, private bulletType: BulletType) {
    this.bulletsStore = new BulletsStore();
  }

  public tryToCollide(actionWhenCollide: () => void) {
    this.bulletsStore.bullets.forEach((bullet) => {
      if (this.bulletType !== bullet.type) {
        return;
      }

      if (Helper.hasCollusion(bullet, this.target)) {
        actionWhenCollide();
        this.bulletsStore.removeElement(bullet);
      }
    });
  }
}
