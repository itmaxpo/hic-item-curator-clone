<h1 align="center">
  <br>
<img alt="logo" width="100" src="https://user-images.githubusercontent.com/12096547/62462356-8026b880-b787-11e9-9996-3e2b25c73616.jpg" />
  <br>
    Item Curator
  <br>
</h1>

<h4 align="center">Tourlane’s item management tool. https://items.tlservers.com</h4>
<img width="1358" alt="Screenshot 2019-08-01 at 19 23 34" src="https://user-images.githubusercontent.com/12096547/62462454-bfeda000-b787-11e9-8e89-2977ca4f7b76.png">

## 🚀 Installation instructions

1. Make sure you are a member of the npm package `@tourlane/tourlane-ui`
2. Add  `//registry.npmjs.org/:_authToken={YOUR_NPM_TOKEN}` to `.npmrc` in your home directory
3. Run `npm install` (make sure port 3000 is not already in use)
4. Start the app with either `npm run start:staging` or `npm run start:production`

# Item Curator Structure

## Testing

### E2E tests

**Cypress** used to test application. Basically, E2E tests should cover user paths or user interaction with separate pages or functionalities. **E.g**: _I am as a user want to search for country and should be able to find it, then go to Edit page and edit it, then save it and see my changes_

### Unit tests

**Jest && Enzyme && Renderer** used for Unit testing. Basically, unit tests will cover basic components, that are used across the app. For Unit testing should be used 'Black box testing' means component should receive
some input and unit tests check the output. We are checking styling only if it changed by some conditions or properties (_State like Button - disabled we are not checking_). Should be used [Given-When-Then](https://martinfowler.com/bliki/GivenWhenThen.html) approach. And everything not covered by E2E. Should be covered:

- all components
- services
- smaller components in the <Custom>Page folder

## Entry point

The entry point of the whole app is an [src/index.js](https://github.com/tourlane/item-curator/blob/master/src/index.js)

```bash
├── cypress [Cypress E2E folder]
├── public [Static files]
├── pull_request_template.md [Template to generate message on PR]
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── components [Folder with all existing shared components]
│   │   ├── Component
│   │   │   ├── <Custom>Component.js
│   │   │   └── styles.js
│   │   │   └── index.js
│   ├── contexts [Folder with all existing global contexts]
│   │   └── <Custom>
│   │       └── <Custom>Context.js
│   ├── icons [Folder with all <icon>.svg files]
│   ├── index.css
│   ├── index.js [Entry point of the app]
│   ├── lib
│   ├── logo.svg
│   ├── pages
│   │   ├── Page [Page is a Route component]
│   │   │   ├── index.js
│   │   │   ├── styles.js
│   │   │   ├── state.js
│   │   │   ├── utils.js
│   │   │   ├── SpecificPageComponent1.js
│   │   │   ├── SpecificPageComponent1.js
│   ├── serviceWorker.js
│   ├── services
│   ├── styles
│   └── utils [Folder with global utils]
├── yarn.lock
├── package.json
├── .env.staging
├── .env.production
├── .eslintrc
├── .gitignore
├── .prettierrc
├── cypress.json
├── jsconfig.json
├── pull_request_template.md
└── README.md
```

## Tech stack

- `Cypress`: [E2E](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html)
- `Sentry`: [Error-tracking](https://sentry.io/organizations/tourlane/issues/?project=1511575)
- `Auth0`: [Authentication](https://manage.auth0.com/dashboard/eu/tourlane-staging)
- `Netlify`: [CI/CD](https://app.netlify.com/sites/lucid-fermi-29f426/overview)
- `Jest`: [Unit Testing](https://app.netlify.com/sites/lucid-fermi-29f426/overview)
- `Enzyme`: [Unit Testing Utility](https://airbnb.io/enzyme/docs/guides/jest.html)
- `Sinon`: [Assertion library](https://sinonjs.org/releases/latest/assertions/)
- `Jasmine`: [Cheatsheet](https://devhints.io/jasmine)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm build`

Builds the app for production

### `npm test`

Runs the unit tests

### `npm run e2e`

Runs E2E tests via [Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html)

### `npm run test:e2e`

Runs E2E tests in a `--headless` mode

### `npm run lint`

Runs the eslint checks

### `npm run commit`

Runs commit creation

### `npm run release`

Creates next release of the app

### `npm run start-server`

Runs a standalone Nodejs server to run E2E tests
