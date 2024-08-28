import { screen } from '@testing-library/dom';

import GameWindow from '~/GameWindow';

describe('GameWindow tests', () => {
  beforeEach(() => {
    GameWindow.destroy();
  });

  test('root is in html', () => {
    expect(screen.queryByTestId('root')).not.toBeInTheDocument();

    new GameWindow();

    expect(screen.getByTestId('root')).toBeInTheDocument();
  });

  test('game-window is in html', () => {
    expect(screen.queryByTestId('game-window')).not.toBeInTheDocument();

    new GameWindow();

    expect(screen.getByTestId('game-window')).toBeInTheDocument();
  });
});
