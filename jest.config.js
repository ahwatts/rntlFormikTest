module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/__tests__/Setup.ts'],
  testMatch: [
    // The defaults.
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',

    // Testing utilities / setup / teardown.
    '!**/__tests__/Setup.ts',
  ],
};
