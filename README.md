# aeps-gateway-lib
Javascript library to easily integrate Eko's AePS Gateway solution into a website

[![GitHub issues](https://img.shields.io/github/issues/ekoindia/aeps-gateway-lib)](https://github.com/ekoindia/aeps-gateway-lib/issues)  [![npm (scoped)](https://img.shields.io/npm/v/@ekoindia/aeps-gateway-lib)](https://github.com/ekoindia/aeps-gateway-lib)  [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@ekoindia/aeps-gateway-lib)](https://github.com/ekoindia/aeps-gateway-lib)  [![GitHub license](https://img.shields.io/github/license/ekoindia/aeps-gateway-lib)](https://github.com/ekoindia/aeps-gateway-lib/blob/master/LICENSE)

---

## Installation

  `npm install -S @ekoindia/aeps-gateway-lib`

## Usage

### Include Library
```html
<script src="node_modules/@ekoindia/aeps-gateway-lib.js"></script>
```

### Setup AePS on page load
```html
<script>
var aeps = new EkoAEPSGateway.default();

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
</script>
```

### Open AePS Popup whenever needed (ex: ona button click)
```javascript
aeps.open();
```
