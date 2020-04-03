/**
 * Helper library to launch Eko's AePS gateway from a webpage
 *
 * @author Kumar Abhishek (https://github.com/manustays)
 */
class EkoAEPSGateway {

	constructor() {
		console.log("Library constructor loaded");
		this.config = {
			// "developer_key": "",
			// "secret_key": "",
			// "secret_key_timestamp": "",
			// "initiator_id": "",
			// "user_code": "",
			// "initiator_logo_url": "",
			// "partner_name": "",
			"language": "en"
		};
	}


	/**
	 * Configure API credentials and other options.
	 * API details at: https://developers.eko.in/docs/aeps-gateway
	 *
	 * @param {Object} options - An object with all options to set.
	 * @param {string} options.partner_name - Your company name to display in the AePS popup.
	 * @param {string} options.initiator_logo_url - Your company logo to display in the AePS popup
	 * @param {string} options.initiator_id - Your registered initiator-id.
	 * @param {string} options.developer_key - Your Eko API developer-key.
	 * @param {string} options.secret_key - Secret-key for security generated at your server.
	 * 		(see: https://developers.eko.in/docs/authentication)
	 * @param {string} options.secret_key_timestamp - Timestamp used to generate secret-key.
	 * @param {string} options.user_code - Unique code of your user/merchant availing AePS.
	 * 		This needs to be generated while onboarding users.
	 * 		(See: https://developers.eko.in/reference#activate-service)
	 * @param {string} [options.language="en"] - AePS popup interface language:
	 * 	- en: English (default)
	 * 	- hi: Hindi
	 * 	- mr: Marathi
	 * 	- gu: Gujarati
	 * 	- kn: Kannada
	 * 	- ta: Tamil
	 *
	 * @example
	 * EkoAEPSGateway.config({
	 * 		"partner_name": "Payments INC",
	 * 		"initiator_logo_url": "https://files.eko.co.in/docs/logos/payment/dummy-partner-logo.png",
	 * 		"initiator_id": "9962981729",
	 * 		"developer_key": "becbbce45f79c6f5109f848acd540567",
	 * 		"secret_key": "dCUujUywtuu86CyoHkZZzBjLUAVC365e6PLaa4UYwqM=",
	 * 		"secret_key_timestamp": "1532582133692",
	 * 		"user_code": "20810200"
	 * 	});
	 */
	config = (options) => {
		if (options) {
			this.config = Object.assign(this.config, options);
		}
	};


	/**
	 * Setup your server's callback URL for confirming transactions.
	 *  - It is essential for security.
	 *  - You can also handle the callback yourself in Javascript by
	 *    using _setCallbackFunction()_ (_not recommended_)
	 *
	 * @param {string} url - Your server URL to call for getting final transaction confirmation.
	 * @param {Object} [options] - Optional callback setting two properties: "parameters" and "headers" that we should set before calling your callback-URL.
	 * @param {Object[]} options.parameters - An array of parameters with values that we should add with the callback requets
	 * @param {Object[]} options.headers - An array of HTTP request headers that we should add with the callback requets
	 *
	 * @example
	 * EkoAEPSGateway.setCallbackURL("https://myserver.com/ekoaeps/confirm");
	 *
	 * @example
	 * EkoAEPSGateway.setCallbackURL("https://myserver.com/ekoaeps/confirm",
	 * 		{
	 * 			parameters: [
	 * 				{ "session_key": "gsRS56sj4$6sdn67sHGs8j" }
	 * 			]
	 * 		}
	 * 	);
	 *
	 * @example
	 * EkoAEPSGateway.setCallbackURL("https://myserver.com/ekoaeps/confirm",
	 * 		{
	 * 			headers: [
	 * 				{ "authorization": "Bearer gsRS56sj4$6sdn67sHGs8j" }
	 * 			]
	 * 		}
	 * 	);
	 */
	setCallbackURL = (url, options) => {

		// TODO
		return;
	};


	/**
	 * @callback confirmationCallback
	 * @param {Object} requestData
	 * @return {Object}
	 */

	/**
	 * Setup your Javascript callback function for confirming transactions.
	 *  - It is an _alternative_ to setCallbackURL()
	 * @see setCallbackURL - It is _**recommended to use setCallbackURL()**_ instead
	 *
	 * @param {confirmationCallback} callbackFunc The callback function to handle confirmation of the final AePS Transaction
	 */
	setCallbackFunction = (callbackFunc) => {

		// TODO
		return;
	};


	/**
	 * Open the AePS Gateway popup window
	 */
	open = () => {
		console.log("[EkoAEPSGateway] open");

		var url = 'https://stagegateway.eko.in/v2/aeps';
		var form = document.createElement("form");
		form.setAttribute('method', 'post');
		form.setAttribute('action', url);
		form.setAttribute('target', 'ekogateway');
		popup = window.open("", "ekogateway");

		for (const prop in this.config) {

			if (this.config.hasOwnProperty(prop)) {
				var input = document.createElement('input');
				input.type = 'hidden';
				input.name = prop;
				input.value = this.config[prop];
				form.appendChild(input);
			}

		}

		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
	};
}

export default EkoAEPSGateway;
