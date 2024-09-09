import { GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT } from '~/consts';

const fontCSS = `
  font-family: 'Roboto';
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
`;

export const rootCSS = `
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  ${fontCSS}
`;

export const windowCSS = `
  width: ${GAME_WINDOW_WIDTH}px;
  height: ${GAME_WINDOW_HEIGHT}px;
  background: #bbf;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
`;
