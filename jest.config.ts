/** @type {import('ts-jest').JestConfigWithTsJest} **/
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/jest.env.setup.ts',
  ],
};
