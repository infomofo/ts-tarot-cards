module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^openai$': '<rootDir>/__mocks__/openai.ts',
  },
};
