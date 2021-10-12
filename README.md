# Halcyon
[![CI](https://github.com/ssw555tm012021Fall/halcyon/actions/workflows/main.yml/badge.svg)](https://github.com/ssw555tm012021Fall/halcyon/actions/workflows/main.yml)
[![Build Status](https://app.travis-ci.com/ssw555tm012021Fall/halcyon.svg?branch=main)](https://app.travis-ci.com/ssw555tm012021Fall/halcyon)

## Description
Project for class SSW - 555. The project Halcyon is a health application app that will enable employees to book meditation rooms and use in app features like meditation sounds and guided meditations.

This repository is only the front-end code for the application, the back-end code is hosted in [Halcyon Api](https://github.com/ssw555tm012021Fall/halcyon-api).

## Installation 
This application is built using `vitejs.dev` and it creates at stand alone static website that can be hosted anywhere a web server runs.

To run this application on your local machine you need to install [NodeJS](https://nodejs.org/en/), version 14.15.x or higher, and you also need to install [yarn](https://yarnpkg.com/).

Then just run to install the dependencies and run the development server in port `5000`:
```
yarn
yarn dev
```

## Testing
For testing we are using [Jest](https://jestjs.io/) and we test the integration with the api, to run the test run:
```
yarn test
```

and if you want to see the test coverage run 
```
yarn coverage
```

## CI/CD
We are using [Github Actions](https://github.com/actions) and [TravisCI](https://www.travis-ci.com/) for Continuous integrations and we are using [Vercel](https://vercel.com/) for hosting and Continuous Delivery

## Documentation
We have written a backend specification for the api using the [OpenApi Specification](https://swagger.io/specification/) in the [OpenApi.yml](./OpenApi.yml) file.

## Structure
The code is written using `.jsx` for the react components and get's compile to regular `.js` by vite, all the react specific is inside the `src` directory.

The entry point for the application is the `index.html` which is used as a template to generate the final structure.

Inside the `src` there are 5 main directories:
- `components`: Which stores reusable components
- `hooks`: Which store custom react hooks
- `pages`: Which describe the views that the user see
- `services`: Which contains custom classes for certain functionalites, like api calls
- `utils`: Which stores specific reusable functions 

