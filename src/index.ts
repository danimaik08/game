import '~/fonts/stylesheet.css';
import GameWindow from '~/GameWindow';
import getRenderAPI from '~/RenderAPI/getRenderAPI';

import GameObject from './GameObject';
import Point from './Point';
import Size from './Size';

const renderAPI = getRenderAPI();

const gameWindow = new GameWindow(renderAPI);

gameWindow.render();

const gameObject = new GameObject(new Point(10, 10), new Size(50, 50), 'red');

renderAPI.renderView(gameObject);
