# Asset Management

Asset management frontend. Project of THU *Software Engineering* course.

[Backend Repo](https://github.com/zhanghx0905/AssetManagementBackend)

The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Reference: https://gitlab.secoder.net/example/reactjs-example

## Usage

    docker build -t something .
	docker run --rm something

### Structure

* __nginx__ Default configuration for [nginx](http://nginx.org/en/docs/beginners_guide.html).
* __src__ Frontend with [React](https://reactjs.org/tutorial/tutorial.html).
* __**/*.test.js__ Test suite with [jest](https://jestjs.io/docs/en/getting-started.html).
* __.eslintrc.json__ Code style configuration with [eslint](https://eslint.org/docs/user-guide/configuring).
* __package.json__ Package manager with `npm`. `package.json` coantains plugin configurations.

### Tools

* `npm start` Run the frontend in development mode.
* `npm run build` Builds the frontend for production to the `build` folder.
* `npm test` Test frontend.
* `npm run lint` Check code style.

## Deployment

https://asset-management-frontend-goodnight.app.secoder.net/#/login

## Others

This project is transferred from THU [gitlab](https://gitlab.secoder.net/GoodNight/asset-management-frontend).


