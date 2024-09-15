import GameObject from '~/structs/GameObject';

import { KeysViewType } from './types';

export default class KeysView {
  constructor(public readonly type: KeysViewType, public caption: GameObject, public place: GameObject) {}
}
