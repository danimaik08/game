import BrowserAPI from './BrowserAPI';
import FakeAPI from './FakeAPI';
import { RenderAPIType } from './index';

const ENV_RENDER_API = process.env.RENDER_API;

export default function getRenderAPI() {
  const type: RenderAPIType = (ENV_RENDER_API as RenderAPIType) ?? 'browser';

  switch (type) {
    case 'browser':
      return new BrowserAPI();
    case 'fake':
      return new FakeAPI();
    default:
      throw new Error(`Invalid env RENDER_API: ${type}`);
  }
}
