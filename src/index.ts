import '~/fonts/stylesheet.css';
import GameWindow from '~/GameWindow';
import getRenderAPI from '~/RenderAPI/getRenderAPI';

const renderAPI = getRenderAPI();

const gameWindow = new GameWindow(renderAPI);

gameWindow.render();
