import BulletsCollider from '~/BulletsCollider';
import BulletsStore from '~/BulletsStore';
import KeyboardController from '~/KeyboardController';
import Lifebar from '~/Lifebar';
import MovableObject from '~/MovableObject';
import VirtualDOM from '~/VirtualDOM';

export type PlayerStateName =
  | 'before-playing'
  | 'playing'
  | 'playing-after-damage'
  | 'before-dead'
  | 'dead';
