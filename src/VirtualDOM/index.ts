import GameObject from '~/structs/GameObject';
import { GameObjectStruct } from '~/structs/GameObject/types';

import { VirtualDOMChange, VirtualDOMGameObjectsMap } from './types';

export default class VirtualDOM {
  private static instance: VirtualDOM;
  private prevElementsMap: VirtualDOMGameObjectsMap;
  private nextElementsMap: VirtualDOMGameObjectsMap;

  constructor() {
    if (!VirtualDOM.instance) {
      this.prevElementsMap = {};
      this.nextElementsMap = {};
      VirtualDOM.instance = this;
    }

    return VirtualDOM.instance;
  }

  public addElement(element: GameObject): void {
    this.nextElementsMap[element.id] = element;
  }
  public prepareForNewFrame(): void {
    this.prevElementsMap = this.nextElementsMap;
    this.nextElementsMap = {};
  }
  public getChanges(): VirtualDOMChange[] {
    const allIds = this.getAllIdsFromMaps();
    const changes: VirtualDOMChange[] = [];

    allIds.forEach((id: GameObject['id']) => {
      const prevElement: GameObjectStruct | null =
        this.prevElementsMap[id] ?? null;

      const nextElement: GameObjectStruct | null =
        this.nextElementsMap[id] ?? null;

      if (!prevElement) {
        changes.push({
          gameObject: nextElement,
          action: 'mount',
        });
      } else if (!nextElement) {
        changes.push({
          gameObject: prevElement,
          action: 'unmount',
        });
      } else {
        changes.push({ gameObject: nextElement });
      }
    });

    return changes;
  }

  private getAllIdsFromMaps(): Set<GameObject['id']> {
    const allIdsSet = new Set<GameObject['id']>();

    for (const id in this.prevElementsMap) {
      allIdsSet.add(id);
    }

    for (const id in this.nextElementsMap) {
      allIdsSet.add(id);
    }

    return allIdsSet;
  }
}
