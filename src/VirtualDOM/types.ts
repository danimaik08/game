import GameObjectAPI, { GameObjectId } from '~/GameObject/GameObjectAPI';

export interface VirtualDOMChange extends GameObjectAPI {
  action?: 'mount' | 'unmount';
}

export type VirtualDOMGameObjectsMap = Record<GameObjectId, GameObjectAPI>;
