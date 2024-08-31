import '~/fonts/stylesheet.css';
import getRenderAPI from '~/RenderAPI/getRenderAPI';
import App from '~/App';

const renderAPI = getRenderAPI();

const app = new App(renderAPI);

app.start();
