# game

- Управление WASD, Атака - K, Пауза - P, остальное интуитивно
- настройки управления можно поменять в localStorage, для этого вставьте в консоль браузера
  `localStorage.setItem('KEY_TOP', YOUR_KEY);`
  `localStorage.setItem('KEY_LEFT', YOUR_KEY);`
  `localStorage.setItem('KEY_BOTTOM', YOUR_KEY);`
  `localStorage.setItem('KEY_RIGHT', YOUR_KEY);`
  `localStorage.setItem('KEY_ATTACK', YOUR_KEY);`
  `localStorage.setItem('KEY_PAUSE', YOUR_KEY);`

- Production: https://danimaik08.github.io/game/
- screen size 800x600
- only for desktop

## How to start application on localhost

1. npm install
2. npm start

## For testing

1. npm install
2. npm run test

## Custom RenderAPI

- There are two variants of RenderAPI `browser` and `fake`
- Default: `browser`
- You can change to by env variable `RENDER_API = fake`
- Also you can add your own RenderAPI by editing file `src/RenderAPI/getRenderAPI.ts`

### My Contacts

My email: maikovsky.danil@gmail.com
