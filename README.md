# game

- Production: https://danimaik08.github.io/game/
- screen size 800x600
- only for desktop

## How to start application on localhost

1. npm install
2. npm start

## For testing

1. npm install
2. add in .env (root directory) this text: `WITH_TESTS = true`
3. npm run test

## Custom RenderAPI

- There are two variants of RenderAPI `browser` and `fake`
- Default: `browser`
- You can change to by env variable `RENDER_API = fake`
- Also you can add your own RenderAPI by editing file `src/RenderAPI/getRenderAPI.ts`

### My Contacts

My email: maikovsky.danil@gmail.com
