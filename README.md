# Item Curator Structure

### Entry point

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

* `Cypress`: [E2E](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html)
* `Sentry`: [Error-tracking](https://sentry.io/organizations/tourlane/issues/?project=1511575)
* `Auth0`: [Authentication](https://manage.auth0.com/dashboard/eu/tourlane-staging)
* `Netlify`: [CI/CD](https://app.netlify.com/sites/lucid-fermi-29f426/overview)

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
