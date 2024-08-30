import BrowserAPI from './BrowserAPI';
import FakeAPI from './FakeAPI';
import RenderAPI, { RenderAPIType } from './index';

export default function getRenderAPI(): RenderAPI {
  const type: RenderAPIType =
    (process.env.RENDER_API as RenderAPIType) ?? 'browser';

  switch (type) {
    case 'browser':
      return new BrowserAPI();
    case 'fake':
      return new FakeAPI();
    default:
      throw new Error(`Invalid env RENDER_API: ${type}`);
  }
}
