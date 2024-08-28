const envText = require('fs').readFileSync('.env', 'utf8');

const parsedEnv = envText.split('\n').reduce((acc: object, str: string) => {
  const [key, value] = str.split('=').map((item) => item.trim());

  return { ...acc, [key]: value };
}, {});

process.env = Object.assign(process.env, parsedEnv);
