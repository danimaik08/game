import Point from '~/Point';
import Size from '~/Size';

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
