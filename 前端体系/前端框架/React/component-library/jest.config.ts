/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  // test文件匹配
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/__test__/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  setupFiles: [
    '@testing-library/react/dont-cleanup-after-each'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest/setupJestDom.ts'
  ],
  testEnvironment: 'jsdom',
  moduleFileExtensions: [
    'ts', 'tsx', 'js', 'jsx'
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss|less)$': 'identity-obj-proxy',
    '\\.svg$': 'identity-obj-proxy',
    // webpack  or  vite 等编译工具中涉及到的别名识别
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ["@swc/jest"],
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules/(?!(antd)/)[/\\\\].+\\.(js|jsx|ts|tsx)$',
  ]
};
