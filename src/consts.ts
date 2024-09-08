import Point from '~/Point';
import Size from '~/Size';
import Speed from '~/Speed';

export const DEFAULT_FRAME_DURATION = 16;
export const GAME_WINDOW_WIDTH = 800;
export const GAME_WINDOW_HEIGHT = 600;

export const PLAYER_STATE_INITIAL_POINT = new Point(380, 500);
export const PLAYER_STATE_INITIAL_SIZE = new Size(34, 47);
export const PLAYER_STATE_INITIAL_SPEED = new Speed(0, 0);
export const PLAYER_STATE_MOVEMENT_SPEED = 2;
export const PLAYER_STATE_MIN_TOP = 350;

export const ENEMY_STATE_INITIAL_POINT = new Point(350, 50);
export const ENEMY_STATE_INITIAL_SIZE = new Size(100, 100);
export const ENEMY_STATE_INITIAL_SPEED = new Speed(4, 0);
export const ENEMY_LEFT_BORDER = 50;
export const ENEMY_RIGHT_BORDER = 50;

export const BULLET_SIZE = new Size(14, 14);
