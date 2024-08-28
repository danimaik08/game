export default function addId(element: HTMLElement, id: string) {
  element.id = id;

  if (process.env.WITH_TESTS) {
    element.dataset.testid = id;
  }
}
