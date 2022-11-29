<h1 align="center">
  <br>
<img alt="logo" width="100" src="https://user-images.githubusercontent.com/12096547/62462356-8026b880-b787-11e9-9996-3e2b25c73616.jpg" />
  <br>
    Item Curator
  <br>
</h1>

<h4 align="center">Tourlane’s item management tool. https://items.tlservers.com</h4>
<img width="1358" alt="Screenshot 2019-08-01 at 19 23 34" src="https://user-images.githubusercontent.com/12096547/67196604-69454900-f3fb-11e9-84e1-244d859accf4.png">

## 🚀 Installation instructions

1. Make sure you are a member of the npm package `@tourlane/tourlane-ui`
2. Add `//registry.npmjs.org/:_authToken={YOUR_NPM_TOKEN}` to `.npmrc` in your home directory
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
│   ├── App.tsx
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

## Q&A

**1. What is received from BE?**

For the communication between FE & BE used [ElasticSearch](https://www.elastic.co/). When we receive an item from BE, we are actually receiving array of fields. BE returns fields on-demand, so developer should provide array of all required fields. Currently, we use the array `fieldsToSelect` for all fields for all different item types for simplicity of usage. E.g.:

```
fields: [
  {field_name: "active_destination", content_type: "boolean", content: true, locale: null,…}
  {field_name: "original_name", content_type: "string", content: "Western Cape", locale: null,…}
  {field_name: "admin_level", content_type: "integer", content: 4, locale: null, source: "osm",…}
  {field_name: "original_name", content_type: "string", content: "Western Cape", locale: null,…}
  {field_name: "name", content_type: "string", content: "Westkap", locale: "de-DE", source: "osm",…}
  {field_name: "name", content_type: "string", content: "Cap occidental", locale: "fr-FR", source: "osm",…}
  {field_name: "name", content_type: "string", content: "Westkape", locale: "en-GB",…}
  {field_name: "active_destination", content_type: "boolean", content: false, locale: null,…}
],
item_type: "admin_area"
parent_uuid: "c44b8127-1529-4df0-ad52-bc084f5df7ee"
primary_item_uuid: null
uuid: "55e3bb6d-14cc-4e37-ae1c-173813f8e4c1"
```

There are a lot of repeated fields (e.g. 3 `name` fields for this response). This is happening, because fields can have different `locale` and `source` properties. `locale` - for different languages, `source` - for priority checks. Here is the priority list:

```
# Function name is getFieldBySourcePriority()
const sourcePriorityOrder = [SOURCE, WETU, SUPPLY, GIATA]
```

**2. How is the response transformed into a FE instance? And backwards?**

There is a separate file called `itemParser`. This file is responsible for handling back'n'forth transformation of item entity.
For easier future use were created 4 different mappings:

- `itemSameFields` is array of fields, that are the same for all existent item types, but can exist separately for different `locale`
- `itemSameFieldsNoLocale` is array of fields, that are the same for all existent item types
- `itemSpecificFieldsNoLocale` is array of fields, that are different for different item types
- `itemSpecificFields` is array of fields, that are different for different item types, but can exist separately for different `locale`

_BE -> FE_: There is one main function responsible for parsing item to the FE-friendly way named `parseItemByType`. This function is operating with item and locale. In the `ItemLayout` file there is a locale switcher. Every time user switch the locale (language), this function would be called and recreate the item object. It is always generate the same fields like `id` and `type`, but more interesting are these functions: `getItemSameFieldsNoLocale`, `getItemSameFields`, `getItemSpecificFieldsNoLocale`, `getItemSpecificFields`, `getItemDescriptionInspiration`.

These functions are operating with the 4 mappings shown above and also `getItemDescriptionInspiration`, that is allowing Item Curator to retreive `WETU` description inspirations (suggestions)

_FE -> BE_: For the backwards transformation we use `transformToSupplyItem`. This function is basically receiving all fields provided in the item for specific `item_type` and generated the same `fields` we received from BE in the beginning using functions: `setItemSameFieldsNoLocale`, `setItemSameFields`, `setItemSpecificFieldsNoLocale`, `setItemSpecificFields`

**3. Which are the most important files and what are they doing?**

1. `Item` - route index file, that is responsible for identifying `item_type`, current `locale`, fetch all necessary information, fetch additionalInfo and also store the result. Parent of `ItemLayout` and `OfferVisualisation`. Is `smart` component.
2. `itemParser` - responsible for handling back'n'forth transformation of item entity, also storing all field names
3. `ItemLayout` - responsible for render item page layout with required fields, render provided tab contents and breadcrumbs.
   Responsible for changing: _Title_, _Suppliers_, _Language_. Is `kinda_dumb` component.
4. `OfferVisualisation` - responsible for rendering fields and inputs for specific type. Is `dumb` component.
5. `contentApi` - API communication and stores `fieldsToSelect`.

**4. How to add a new field to a specific type of item?**

Every time FE send GET request like this:
`https://partners.tlservers.com/content/items/55e3bb6d-14cc-4e37-ae1c-173813f8e4c1?selected_fields=description,safety,currency,transport,cuisine,climate,dress,additional_info,name,iso_code,active_destination,health,electricity,entry_requirements,transport,admin_level,address,geolocation,original_name,front_desk_phone,accommodation_category,blacklisted,ranking`, it is required to provide all fields, that FE expect after this `?selected_fields=`.

It is okay with the current structure, but what if we need to add a new field for all or a specific item type? Let's try to figure this out! Our task is to add a new field called `taco` for the `accommodation`. Here is step-by-step guide on how to do it painlessly!

1. Go to `itemParser` and add your field constant: `export const FIELD_ACCOMM_TACO = 'taco'`
2. Go to `contentApi` and add `FIELD_ACCOMM_TACO` into the `fieldsToSelect` array.
   This will guarantee, that you will receive this field from BE once you store it.

3. In `itemParser` you need to figure out in which of 4 mappings you should add your field. Let's say taco is translatable. It means it should be part of `itemSpecificFields` - it is item specific and locale dependent. Find `[ACCOMMODATION_ITEM_TYPE]` key and add your value to the array. This is needed to render it only for accommodations, but not other types.
4. Create a separate `TACO_COMPONENT` inside `componentsRenderingMap`. This will render proper view for your new field.
5. Go to `Item/utils` and figure out what is the order of your component in `componentsBasedOnType`. Let's add it in `ACCOMMODATION_ITEM_TYPE` after `ROOMS_COMPONENT_NAME`.
6. Boom! In 5 simple steps you will find your `taco` rendered where it should, properly received and stored for accommodation.

**5. How to copy/paste similar fields from one item type to another?**

Out task is to copy/paste all country information into area. There are only 2 steps to make sure it will work!

1. Go to `itemParser`, then `itemSpecificFields`. Copy whole array in `COUNTRY_ITEM_TYPE` and paste it into `AREA_ITEM_TYPE`.
   With this step you will tell Item Curator that `Area` also can work with these fields.
2. Go to `Item/utils` and copy from `componentsBasedOnType` key `COUNTRY_ITEM_TYPE` `INFORMATION_COMPONENT_NAME` and paste
   it into `AREA_ITEM_TYPE`. These will render all the UI responsible for rendering/sttoring neccessary fields.

**6. How is OfferVisualisation rendered?**

`OfferVisualisation` is responsible for rendering required components for each item type. E.g.: for country there are 3 components
`[DESCRIPTION_COMPONENT_NAME, IMAGES_COMPONENT_NAME, INFORMATION_COMPONENT_NAME]`. Order matters! They are stored in `Item/utils` from `componentsBasedOnType` by key `COUNTRY_ITEM_TYPE`.
Inside `OfferVisualisation` there is `componentsRenderingMap` that represents actual components with UI.

**7. What is updateable and not updateable in item?**

This is item object in transformed way (function `parseItemByType`):

```
{
    id: item.uuid,
    parentId: item.parent_uuid,
    type: item.item_type,
    original_name: originalName,
    language,
    rooms: [],
    polygon: [],
    allImages: [],
    visibleImages: [],
    geolocation: geolocation
      ? {
          lat: +geolocation.lat,
          lng: +geolocation.lon
        }
      : null,
    ...getItemSameFieldsNoLocale(item),           // fields here would be updated
    ...getItemSameFields(item, language),         // fields here would be updated
    ...getItemSpecificFieldsNoLocale(item),       // fields here would be updated
    ...getItemSpecificFields(item, language),     // fields here would be updated
    description: get(getDescription(item, language), 'content'),
    descriptionInspiration: getItemDescriptionInspiration(item, language),
    locales: getItemLocales(item)
  }
```

These objects `itemSameFields`, `itemSameFieldsNoLocale`, `itemSpecificFieldsNoLocale`, `itemSpecificFields` are responsible for specific updatable fields. Everything that is here - would be sent to BE. If there was a field that must be updated and now is not - move it to item from any of the objects shown before.

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
