module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'jest-environment-jsdom',  // Explicitly set this
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/jest.mock.js',
  },
  

  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
