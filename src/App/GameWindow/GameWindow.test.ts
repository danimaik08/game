import { screen } from '@testing-library/dom';

import BrowserAPI from '~/RenderAPI/BrowserAPI';

import GameWindow from '.';

describe('GameWindow tests', () => {
  test('root is in layout', () => {
    expect(screen.queryByTestId('root')).not.toBeInTheDocument();

    const gameWindow = new GameWindow(new BrowserAPI());

    gameWindow.render();

    expect(screen.getByTestId('root')).toBeInTheDocument();

    gameWindow.destroy();
  });

  test('game-window is in layout', () => {
    expect(screen.queryByTestId('game-window')).not.toBeInTheDocument();

    const gameWindow = new GameWindow(new BrowserAPI());

    gameWindow.render();

    expect(screen.getByTestId('game-window')).toBeInTheDocument();

    gameWindow.destroy();
  });
});
