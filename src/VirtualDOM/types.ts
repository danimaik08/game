import { GameObjectStruct } from '~/structs/GameObject/types';

export interface VirtualDOMChange {
  gameObject: GameObjectStruct;
  action?: 'mount' | 'update' | 'unmount';
}

export type VirtualDOMGameObjectsMap = Record<
  GameObjectStruct['id'],
  GameObjectStruct
>;
