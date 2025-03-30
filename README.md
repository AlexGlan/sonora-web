<div align="center">
  <img alt="Lotus icon" src="https://em-content.zobj.net/source/whatsapp/390/lotus_1fab7.png" width="80" />
</div>
<h1 align="center">Sonora Web App</h1>

Sonora is a web app for creating white noise and ambient sounds to help with focus, relaxation, or sleep. Using the Web Audio API, it lets you mix and adjust background sounds and audio collections to suit your needs.

I created this project because I find white noise and ambient sounds more effective than music for staying focused and productive. My goal is to make this experience as simple, customizable, and accessible as possible.

## Live Version

You can access the live version of the project [here](https://alexglan.github.io/sonora-web/).

## Development
*node.js v18+, npm 8+ required*

1. Fork this repo.
2. Clone and cd into the repo.

### Build and Run

#### Running Locally

To run the project locally:

```
npm install  # Install dependencies
npm run dev  # Start development server
```
Follow the localhost link to view the app running locally in the browser.

#### Build for Production

To prepare the project for production:
1. Build the project:
```
npm run build
```
2. The production-ready files will be available in the `/dist` folder.

### Running Tests

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

## License
* [GNU GPL v3](LICENSE)
* [Lotus Icon](https://emojipedia.org/whatsapp/2.24.2.76/lotus)
* [Audio Tracks](https://alexglan.github.io/sonora-web/#/about)
