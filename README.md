# aeps-gateway-lib
Javascript library to easily integrate Eko's AePS Gateway solution into a website

[![GitHub issues](https://img.shields.io/github/issues/ekoindia/aeps-gateway-lib)](https://github.com/ekoindia/aeps-gateway-lib/issues)  [![npm (scoped)](https://img.shields.io/npm/v/@ekoindia/aeps-gateway-lib)](https://github.com/ekoindia/aeps-gateway-lib)  [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@ekoindia/aeps-gateway-lib)](https://github.com/ekoindia/aeps-gateway-lib)  [![GitHub license](https://img.shields.io/github/license/ekoindia/aeps-gateway-lib)](https://github.com/ekoindia/aeps-gateway-lib/blob/master/LICENSE)
<a href="https://twitter.com/intent/follow?screen_name=ekospeaks">
        <img src="https://img.shields.io/twitter/follow/ekospeaks?style=social&logo=twitter"
            alt="follow on Twitter"></a>

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
var aeps = new EkoAEPSGateway();

// Configure your developer API details...
aeps.config({
	"partner_name": "Example Company INC",
	"initiator_logo_url": "https://example.com/my-logo.png",
	"initiator_id": "9962981729",
	"developer_key": "becbbce45f79c6f5109f848acd540567",
	"secret_key": "y4aNr2cuSuaX2fCsfXMVopqvaZtx9MKHCcsF73fHxvc=",
	"secret_key_timestamp": "1585999782835",
	"user_code": "20810200",
	"env": "development"
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
1. [Basic Example](https://github.com/ekoindia/aeps-gateway-lib/blob/master/example/basic_example.html)
