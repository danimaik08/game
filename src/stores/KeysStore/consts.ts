import { KeyChangeable, KeyReadonly } from './types';

export const READONLY: Readonly<Set<KeyReadonly>> = new Set<KeyReadonly>(['ENTER', 'ESCAPE', 'ARROWUP', 'ARROWDOWN']);
export const DEFAULT: Readonly<Record<KeyChangeable, string>> = {
  TOP: 'W',
  LEFT: 'A',
  BOTTOM: 'S',
  RIGHT: 'D',
  ATTACK: 'K',
  PAUSE: 'P',
};
export const PREFIX = 'KeysStore_b3b5190a-3564-4911-b2e8-16c78102a4b0_';
