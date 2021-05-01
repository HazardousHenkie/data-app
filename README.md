# website
https://vigilant-gates-137896.netlify.app/

# information
Trying to get better at testing React applications by actually implementing tests in a project.
The tests should fully cover this application (100% coverage) I did this to get a better feel on how to write tests for a lot of different situations but other applications, depending on the requirements, this might not be needed. I rule of thumb is to not test implementation details and it's good to think about the parts that are important to test and not to just test everything you can think if. Depending on the situation testing everything might make refactors hard and besides that, it costs a lot of time to fully test your application.

A note on testing:
e2e testing like cypress only tests the top layer (the actual website like an actual user) and checks if the app performs like expected. It doesn't test the underlying code so if something is wrong it might be hard to find the problem. Another drawback is that it's slow to run and brittle e.g. a simple className change can break your test.

A unit tests/integrations tests (like Jest/React-testing-library or Jest/Enzyme) tests your actual code so it's more precise and it becomes easy to pinpoint a problem if a test fails. It's more time consuming to write these tests and it doesn't test if the whole application works.

React-testing-library is a combination of unit tests and integrations tests.

Technologies used:

-   styled components + stylelint
-   typescript
-   eslint + prettier
-   husky + pre-commit
-   github actions
-   netlify function (AWS Lambda Functions)
-   Redux/React Hooks/React Context API

[![Netlify Status](https://api.netlify.com/api/v1/badges/711bd9bc-81f2-4484-8bec-ee69eae6d6cb/deploy-status)](https://app.netlify.com/sites/vigilant-gates-137896/deploys)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
