import { PointSize } from '~/components/GameObject/GameObjectAPI';

export const hasCollusion = (obj1: PointSize, obj2: PointSize) => {
  const left1 = obj1.point.x;
  const right1 = obj1.point.x + obj1.size.width;

  const left2 = obj2.point.x;
  const right2 = obj2.point.x + obj2.size.width;

  if (
    (left1 >= left2 && left1 <= right2) ||
    (right1 >= left2 && right1 <= right2)
  ) {
    const top1 = obj1.point.y;
    const bottom1 = obj1.point.y + obj1.size.height;

    const top2 = obj2.point.y;
    const bottom2 = obj2.point.y + obj2.size.height;

    if (
      (top1 >= top2 && top1 <= bottom2) ||
      (bottom1 >= top2 && bottom1 <= bottom2)
    ) {
      return true;
    }
  }

  return false;
};
