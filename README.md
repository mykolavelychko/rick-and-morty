# General information

This simple React application allows users to explore data from the Rick and Morty
API.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

### `npm run generate`

Runs the GraphQL code generator to create TypeScript types from your GraphQL queries.

## Configuration

### Apollo Client

The Apollo Client is configured in [`src/apolloClient.ts`](src/apolloClient.ts).

### Routing

The application routing is handled by [`src/app/AppRouter.tsx`](src/app/AppRouter.tsx).

### Components

- Main application component: [`src/app/App.tsx`](src/app/App.tsx)
- Characters module: [`src/modules/characters/Characters.tsx`](src/modules/characters/Characters.tsx)
- Locations module: [`src/modules/locations/Locations.tsx`](src/modules/locations/Locations.tsx)
- Episodes module: [`src/modules/episodes/Episodes.tsx`](src/modules/episodes/Episodes.tsx)
- Not Found page: [`src/modules/NotFound.tsx`](src/modules/NotFound.tsx)

### Styling

Global styles are defined in [`src/index.css`](src/index.css) and additional styles in [`src/shared/styles.ts`](src/shared/styles.ts).

### Testing

Tests are configured in [`jest.config.js`](jest.config.js) and setup in [`src/setupTests.ts`](src/setupTests.ts).

## License

This project is licensed under the MIT License.