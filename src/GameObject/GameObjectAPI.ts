import Point from '~/Point';
import Size from '~/Size';

export default interface GameObjectAPI {
  id: string;
  point: Point;
  size: Size;
  background: string;
  zIndex: number;
}
