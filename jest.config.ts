import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Works after installing jest-environment-jsdom
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next/image$': '<rootDir>/__mocks__/next/image.tsx', // Mock next/image
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // Ensure jest-dom matchers are available
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx', // or 'react-jsxdev' for dev mode
        },
      },
    ],
  },
};

export default config;