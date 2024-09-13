import GameObject from '~/structs/GameObject';
import { GameObjectStruct } from '~/structs/GameObject/types';

import { VirtualDOMChange, VirtualDOMGameObjectsMap } from './types';

export default class VirtualDOM {
  private static instance: VirtualDOM;
  private prevElements: VirtualDOMGameObjectsMap;
  private nextElements: VirtualDOMGameObjectsMap;

  constructor() {
    if (!VirtualDOM.instance) {
      this.prevElements = {};
      this.nextElements = {};
      VirtualDOM.instance = this;
    }

    return VirtualDOM.instance;
  }

  public addElement(element: GameObjectStruct): void {
    this.nextElements[element.id] = element;
  }
  public prepareForNewFrame() {
    this.prevElements = {};
    this.cloneNextElementsIntoPrevElements();
    this.nextElements = {};
  }
  public getChanges(): VirtualDOMChange[] {
    const allIds = this.getAllIdsFromMaps();
    const changes: VirtualDOMChange[] = [];

    allIds.forEach((id: GameObjectStruct['id']) => {
      changes.push(this.getChangeForElementById(id));
    });

    return changes;
  }
  public destroy() {
    this.handleErrorsForDestroy();
    this.prevElements = null;
    this.nextElements = null;
    VirtualDOM.instance = null;
  }

  private cloneNextElementsIntoPrevElements(): void {
    for (const id in this.nextElements) {
      this.prevElements[id] = this.nextElements[id].clone();
    }
  }
  private handleErrorsForDestroy() {
    if (!process.env.IS_TEST_MODE) {
      throw new Error('VirtualDOM Error: called method "destroy" (which for tests only!) not in tests');
    }
  }
  private getAllIdsFromMaps(): Set<GameObject['id']> {
    const allIdsSet = new Set<GameObject['id']>();

    for (const id in this.prevElements) {
      allIdsSet.add(id);
    }

    for (const id in this.nextElements) {
      allIdsSet.add(id);
    }

    return allIdsSet;
  }
  private getChangeForElementById(id: GameObjectStruct['id']): VirtualDOMChange {
    const prevElement: GameObjectStruct | null = this.prevElements[id] ?? null;
    const nextElement: GameObjectStruct | null = this.nextElements[id] ?? null;

    if (!prevElement) {
      return {
        gameObject: nextElement,
        action: 'mount',
      };
    }
    if (!nextElement) {
      return {
        gameObject: prevElement,
        action: 'unmount',
      };
    }

    return {
      gameObject: nextElement,
      action: this.isElementUpdated(id) ? 'update' : 'not-a-change',
    };
  }
  private isElementUpdated(id: GameObjectStruct['id']): boolean {
    const prevElement: GameObjectStruct = this.prevElements[id];
    const nextElement: GameObjectStruct = this.nextElements[id];

    for (const key in prevElement) {
      const propKey = key as keyof typeof prevElement;

      if (prevElement[propKey].valueOf() !== nextElement[propKey].valueOf()) {
        return true;
      }
    }

    return false;
  }
}
