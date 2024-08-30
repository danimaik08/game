import { screen } from '@testing-library/dom';

import GameWindow from '~/GameWindow';
import getRenderAPI from '~/RenderAPI/getRenderAPI';

describe('GameWindow tests', () => {
  test('root is in layout', () => {
    expect(screen.queryByTestId('root')).not.toBeInTheDocument();

    const gameWindow = new GameWindow(getRenderAPI());

    expect(screen.getByTestId('root')).toBeInTheDocument();

    gameWindow.destroy();
  });

  test('game-window is in layout', () => {
    expect(screen.queryByTestId('game-window')).not.toBeInTheDocument();

    const gameWindow = new GameWindow(getRenderAPI());

    expect(screen.getByTestId('game-window')).toBeInTheDocument();

    gameWindow.destroy();
  });
});
