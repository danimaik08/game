import GameObjectAPI, {
  GameObjectId,
} from '~/components/GameObject/GameObjectAPI';

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

  public addElement(element: GameObjectAPI): void {
    this.nextElementsMap[element.id] = element;
  }

  private getAllIdsFromMaps(): Set<GameObjectId> {
    const allIdsSet = new Set<GameObjectId>();

    for (const id in this.prevElementsMap) {
      allIdsSet.add(id);
    }

    for (const id in this.nextElementsMap) {
      allIdsSet.add(id);
    }

    return allIdsSet;
  }

  public getChanges(): VirtualDOMChange[] {
    const allIds = this.getAllIdsFromMaps();
    const changes: VirtualDOMChange[] = [];

    allIds.forEach((id: GameObjectId) => {
      const prevElement: GameObjectAPI | null =
        this.prevElementsMap[id] ?? null;

      const nextElement: GameObjectAPI | null =
        this.nextElementsMap[id] ?? null;

      if (!prevElement) {
        changes.push({
          id: nextElement.id,
          point: nextElement.point,
          size: nextElement.size,
          background: nextElement.background,
          zIndex: nextElement.zIndex,
          action: 'mount',
        });
      } else if (!nextElement) {
        changes.push({
          id: prevElement.id,
          point: prevElement.point,
          size: prevElement.size,
          background: prevElement.background,
          zIndex: prevElement.zIndex,
          action: 'unmount',
        });
      } else {
        changes.push(nextElement);
      }
    });

    return changes;
  }

  public prepareForNewFrame(): void {
    this.prevElementsMap = this.nextElementsMap;
    this.nextElementsMap = {};
  }
}
