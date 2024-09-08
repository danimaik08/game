import { EnemyStateName } from './types';

export default function errorOfSetState(
  mustBePrev: EnemyStateName[],
  prev: EnemyStateName
) {
  if (!mustBePrev.includes(prev)) {
    throw new Error(
      `EnemyState Error: prev state now is ${prev}, must be ${mustBePrev.join()}`
    );
  }
}
