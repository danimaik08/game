import GameObject from '.';

export type GameObjectStruct = Readonly<Omit<GameObject, 'move'>>;
