# Eko AePS Gateway Javascript Library
Javascript library to easily integrate Eko's AePS Gateway solution into a website

[![GitHub issues](https://img.shields.io/github/issues/ekoindia/aeps-gateway-lib)](https://github.com/ekoindia/aeps-gateway-lib/issues)  [![npm (scoped)](https://img.shields.io/npm/v/@ekoindia/aeps-gateway-lib)](https://www.npmjs.com/package/@ekoindia/aeps-gateway-lib)  [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@ekoindia/aeps-gateway-lib)](https://github.com/ekoindia/aeps-gateway-lib)  ![dependencies](https://img.shields.io/badge/dependencies-0-green)  [![GitHub license](https://img.shields.io/github/license/ekoindia/aeps-gateway-lib)](https://github.com/ekoindia/aeps-gateway-lib/blob/master/LICENSE)
<a href="https://eko.in" target="_blank">![Eko.in](https://img.shields.io/badge/Develop%20with-Eko.in-brightgreen)</a>
<a href="https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fekoindia%2Faeps-gateway-lib" target="_blank"><img alt="Twitter" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fekoindia%2Faeps-gateway-lib"></a>
<a href="https://twitter.com/intent/follow?screen_name=ekospeaks" target="_blank">![Twitter Follow](https://img.shields.io/twitter/follow/ekospeaks?label=Follow&style=social)</a>
<a href="http://dsc.gg/ekodevs" target="_blank">![Discord Chat](https://img.shields.io/discord/1038006952573292574)</a>

---

## Installation

  `npm install -S @ekoindia/aeps-gateway-lib`

## Usage

### 1. Include Library
```html
<script src="node_modules/@ekoindia/aeps-gateway-lib.js"></script>
```

### 2. Setup AePS on page load
```html
<script>
const aeps = new EkoAEPSGateway();

// Configure your developer API details...
aeps.config({
	partner_name: "Example Company INC",
	initiator_logo_url: "https://example.com/my-logo.png",
	initiator_id: "9962981729",
	developer_key: "becbbce45f79c6f5109f848acd540567",
	secret_key: "y4aNr2cuSuaX2fCsfXMVopqvaZtx9MKHCcsF73fHxvc=",
	secret_key_timestamp: "1585999782835",
	user_code: "20810200",
	environment: "uat"
});

// Configure callback URL for transaction-confirmation and for getting final result...
aeps.setCallbackURL('https://example.com/aeps/callback');
</script>
```

### 3. Open AePS Popup whenever needed (ex: on a button click)
```javascript
aeps.open();
```

## Code Examples
1. [Basic Example](/example/basic_example.html)
