// import EkoAEPSGateway from '../src/aeps-gateway-lib';

var EkoAEPSGateway = require('../src/aeps-gateway-lib');

console.log(EkoAEPSGateway);

test('Runs without crashing', () => {

	new EkoAEPSGateway();
});
