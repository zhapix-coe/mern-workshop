# Test Environment Setup for JEST Framework

### Install JEST
```
npm install --save-dev jest 

npm install jest --global
```

### Execute JEST
```
jest <file name>
```

***

## JEST Initialization

```
npm init jest@latest
```

The following questions will help Jest to create a suitable configuration for your project
```
✔ Would you like to use Typescript for the configuration file? … no
✔ Choose the test environment that will be used for testing › jsdom (browser-like)
✔ Do you want Jest to add coverage reports? … yes
✔ Which provider should be used to instrument code for coverage? › babel
✔ Automatically clear mock calls, instances, contexts and results before every test? … no
```

### Configuration file will be created at <root>/jest.config.ts

***


## Babel Configuration

```
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

Create a babel.config.js file and apply below configuration

```
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```
***

## Typescript
Typescript can be installed during development setup. Below steps could be useful to add JEST support for typescript
```
npm install typescript
npm install --save-dev ts-jest
npm install --save-dev @types/jest
```

Add to jest.config.ts (if type check required for test cases)

```
preset: "ts-jest"
```
```
npm i @babel/preset-typescript --save-dev
Add '@babel/preset-typescript', to babel config preset
```
***

## Install JSDOM

For DOM Testing
```
npm install jest-environment-jsdom --save-dev
```
***
## Mock Service Worker (MSW)
For Mocking of API service, use Mock Service Worker (MSW)
```
npm install msw@latest --save-dev
```
***

## Setup Tests
For global setup of test cases use below configuration in Jest config file

```
setupFilesAfterEnv: ['./setupTests.js']
```
***

## Code Coverage
To enable code coverage, applu below configuration in Jest config file
```
collectCoverage: true,
coverageDirectory: "coverage",
coverageThreshold: {
    global: {
      statements: 80, // minimum percentage of statements covered
      branches: 70,   // minimum percentage of branches covered
      functions: 80,  // minimum percentage of functions covered
      lines: 80,      // minimum percentage of lines covered
    },
  },
```

Run below command
```
jest --coverage=true|false
```

***



## React Testing Library

React Testing Library setup for DOM Testing

```
npm install --save-dev @testing-library/react
npm install @testing-library/user-event --save-dev
npm install @testing-library/jest-dom --save-dev
```
***

## Snapshot Testing
Use React Test Renderer or React Testing Library to create Serialized DOM structure for creating snapshot
```
 npm install react-test-renderer
```

Use below statement in test case to generate snapshot

```
expect().toMatchSnapshot()
```

***

# Resolve Test Environment between JSDOM and Node
Use below code to apply jest environment specic to a file and override global setting in Jest config file

```
/**
 * @jest-environment node
 */
```
***

