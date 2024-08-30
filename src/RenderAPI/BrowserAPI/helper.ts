import Point from '~/Point';
import Size from '~/Size';

export function addId(element: HTMLElement, id: string): void {
  element.id = id;

  if (process.env.WITH_TESTS) {
    element.dataset.testid = id;
  }
}

function convertToCSS(point: Point, size: Size): string {
  return `
  position: absolute;
  top: ${point.y};
  left: ${point.x};
  width: ${size.width};
  height: ${size.height};
  `;
}

export function setViewStyle(
  view: HTMLElement,
  point: Point,
  size: Size,
  style: string
): void {
  view.setAttribute('style', convertToCSS(point, size) + style);
}
