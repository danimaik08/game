import Point from '~/structs/Point';
import Size from '~/structs/Size';

export interface PointSize {
  point: Point;
  size: Size;
}

export default interface GameObjectAPI extends PointSize {
  id: string;
  background: string;
  zIndex: number;
}

export type GameObjectId = GameObjectAPI['id'];
