import '~/index.css';

const root = document.getElementById('root');

const createGameBoard = (node: Element) => {
  const div = document.createElement('div');

  div.id = 'game-window';

  node.appendChild(div);
};

createGameBoard(root);
console.log(root);
