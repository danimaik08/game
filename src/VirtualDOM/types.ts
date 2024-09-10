import { GameObjectStructure } from '~/structs/GameObject/types';

export interface VirtualDOMChange extends GameObjectStructure {
  action?: 'mount' | 'unmount';
}

export type VirtualDOMGameObjectsMap = Record<
  GameObjectStructure['id'],
  GameObjectStructure
>;
