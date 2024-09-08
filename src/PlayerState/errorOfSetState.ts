import { PlayerStateName } from './types';

export default function errorOfSetState(
  mustBePrev: PlayerStateName[],
  prev: PlayerStateName
) {
  if (!mustBePrev.includes(prev)) {
    throw new Error(
      `PlayerState Error: prev state now is ${prev}, must be ${mustBePrev.join()}`
    );
  }
}
