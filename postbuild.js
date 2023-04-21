const fs = require('fs');
const path = require('path');

const assetManifest = require('./build/asset-manifest.json');

const mainJs = assetManifest['main.js'];
const mainCss = assetManifest['main.css'];

const serviceWorkerPath = path.join(__dirname, 'build', 'service-worker.js');
const serviceWorkerContent = fs.readFileSync(serviceWorkerPath, 'utf-8');

const updatedServiceWorkerContent = serviceWorkerContent
  .replace('__MAIN_JS__', mainJs)
  .replace('__MAIN_CSS__', mainCss);

fs.writeFileSync(serviceWorkerPath, updatedServiceWorkerContent);