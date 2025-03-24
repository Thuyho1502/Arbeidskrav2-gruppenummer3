export default {
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest', // Transpile JS and JSX files with babel-jest
    },
    testEnvironment: 'jsdom', // Use jsdom as the test environment for simulating browser-like behavior
  };
  