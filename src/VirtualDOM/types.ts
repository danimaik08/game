import { GameObjectStruct } from '~/structs/GameObject/types';

export interface VirtualDOMChange extends GameObjectStruct {
  action?: 'mount' | 'unmount';
}

export type VirtualDOMGameObjectsMap = Record<
  GameObjectStruct['id'],
  GameObjectStruct
>;
