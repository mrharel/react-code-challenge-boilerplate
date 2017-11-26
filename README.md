# react-code-challenge-boilerplate
Boilerplate for a react code challenge for interviews

Since companies started to send coding challenge as a measure to examine cadidates for front-end developers, I found myself
createing over and over some boilerplate project, and decided to create it as an open source repo to be used for future
code challenges, and share it with others. 

## Stack
- `Express` server to server the app, with some placeholder for API 
- `Webpack` to bundle the client code, this is being done on the server side. 
- `React` & `Redux` on the front end 
- `styled-components` for styling the app. 
- `jest` for unit testing
- `eslint` for linting the code. 

## Runnning
`npm i && npm start` and then open `http://localhost:8080`

## Server
Using express, the server is doing the followings:
- Running the webpack 
- Serving static file in the `static` folder, there is a demo static file at `http://localhost:8080/static/react-logo.png`
- API endpoint placeholder. there is a demo API at `http://localhost:8080/api/version`

## Client
The client start point is at `src/client/app/index.js` where the react and redux is created and initialized.

In case you need to fetch data from a server there is the `src/client/api` which exports the `apiCall` method. 
