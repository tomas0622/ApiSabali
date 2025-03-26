module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.spec.ts', '**/?(*.)+(spec|test).ts'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    }
};  