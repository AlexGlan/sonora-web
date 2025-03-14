# Sonora Web App

Sonora is a web app for creating white noise and ambient sounds to help with focus, relaxation, or sleep. Using the Web Audio API, it lets you mix and adjust background sounds and audio collections to suit your needs.

I created this project because I find white noise and ambient sounds more effective than music for staying focused and productive. My goal is to make this experience as simple, customizable, and accessible as possible.

## Live Version

You can access the live version of the project [here](https://alexglan.github.io/sonora-web/).

## Running the Project Locally
*node.js 18+, npm 8+ required*

To run the project locally, follow these steps:
1. Fork this repo.
2. Clone and cd into the repo.
3. Install the dependencies:
```
npm install
```
4. Start the development server:
```
npm run dev
```
5. Follow the localhost link to view the app running locally in the browser.

## Running Tests

1. To run all tests:
```
npm test
```
2. To run a specific test file:
```
npm test path/to/test-file.test.*
```

3. To run tests with a web interface:
```
npm run test:ui
```
4. To run tests with coverage
```
npm run coverage
```
