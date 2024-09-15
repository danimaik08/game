import Point from '~/structs/Point';
import Size from '~/structs/Size';
import Speed from '~/structs/Speed';

export const DEFAULT_DEBOUNCE = 300;
export const PAUSE_DELAY = 50;
export const DEFAULT_FRAME_DURATION = 33;
export const GAME_WINDOW_WIDTH = 800;
export const GAME_WINDOW_HEIGHT = 600;

export const PLAYER_INITIAL_POINT = new Point(380, 500);
export const PLAYER_INITIAL_SIZE = new Size(34, 47);
export const PLAYER_INITIAL_SPEED = new Speed(0, 0);
export const PLAYER_MOVEMENT_SPEED = 4;
export const PLAYER_MIN_TOP = 350;
export const PLAYER_ATTACK_DELAY = 500;
export const PLAYER_AFTER_DAMAGE_DURATION = 3000;

export const ENEMY_INITIAL_POINT = new Point(350, 50);
export const ENEMY_INITIAL_SIZE = new Size(100, 100);
export const ENEMY_INITIAL_SPEED = new Speed(4, 0);
export const ENEMY_LEFT_BORDER = 50;
export const ENEMY_RIGHT_BORDER = 50;
export const ENEMY_RECEIVING_DAMAGE = 10;
export const ENEMY_ATTACK_DELAY = 200;
export const ENEMY_AFTER_DAMAGE_DURATION = 500;

export const PLAYER_MAX_HEALTH = 3;
export const ENEMY_MAX_HEALTH = 400;

export const LIFEBAR_HEIGHT = 29;
export const LIFEBAR_COLOR = '#009';
export const LIFEBAR_ENEMY_EMPTY_HEALTH_COLOR = '#000';
export const LIFEBAR_ENEMY_FULL_HEALTH_COLOR = '#f00';

export const PLAYER_HEALTH_ICON_SIZE = new Size(30, 27);

export const BULLET_SIZE = new Size(14, 14);
