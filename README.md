# game

- Управление WASD, Атака - K, остальное интуитивно
- настройки управления можно поменять в localStorage
  `KEY_TOP: 'W'`
  `KEY_LEFT: 'A'`
  `KEY_BOTTOM: 'S'`
  `KEY_RIGHT: 'D'`
  `KEY_ATTACK: 'K'`

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
