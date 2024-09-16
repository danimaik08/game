export type KeyChangeable = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT' | 'ATTACK' | 'PAUSE';
export type KeyReadonly = 'ENTER' | 'ESCAPE' | 'ARROWUP' | 'ARROWDOWN';

export type Key = KeyChangeable | KeyReadonly;
