/**
 * Helper library to launch Eko's AePS gateway from a webpage
 *
 * @example
 *
 * <script type="javascript" src="../dist/aeps-gateway-lib.js" />
 *
 * EkoAEPSGateway.config({...});
 * EkoAEPSGateway.setCallbackURL({...});
 * EkoAEPSGateway.open();
 *
 *
 * @author Kumar Abhishek (https://github.com/manustays)
 */
export default class EkoAEPSGateway {

	/**
	 * Constructor
	 * @ignore
	 */
	constructor() {

		console.debug('Library constructor loaded:: ', { win: window, doc: document, body: document.body });

		/**
		 * AePS gateway URL list for multiple environment
		 * @readonly
		 * @private
		 * @ignore
		 */
		this._GATEWAY_URL_LIST = {
			local: 'http://localhost:3004/v2/aeps',
			development: 'https://stagegateway.eko.in/v2/aeps',
			production: 'https://gateway.eko.in/v2/aeps'
		};

		/**
		 * Array of Gateway origins
		 * @readonly
		 * @private
		 * @ignore
		 */
		this._GATEWAY_ORIGINS = [ 'http://localhost:3004', 'https://testgateway.eko.in', 'https://stagegateway.eko.in', 'https://gateway.eko.in' ];


		/**
		 * Internal configuration store.
		 * @private
		 * @ignore
		 */
		this._config = {
			// developer_key: '',
			// secret_key: '',
			// secret_key_timestamp: '',
			// initiator_id: '',
			// user_code: '',
			// initiator_logo_url: '',
			// partner_name: '',
			env: 'development',
			language: 'en'
		};


		/**
		 * Internal store for user's callback function for transaction confirmation.
		 * @private
		 * @ignore
		 */
		this._callbackUserFunc = null;


		/**
		 * Internal store for user's callback function for transaction final response.
		 * @private
		 * @ignore
		 */
		this._responseCallbackUserFunc = null;

		/**
		 * Internal store for handle to the popup window.
		 * @private
		 * @ignore
		 */
		this._popupWindow = null;

		window.addEventListener('message', this._confirmationCallback.bind(this));

	}


	/**
	 * @private
	 * @ignore
	 * Internal callback function for communicating with the popup window
	 * @param {*} e Window message event
	 */
	_confirmationCallback(e) {

		if (this._callbackUserFunc &&
			e &&
			this._GATEWAY_ORIGINS.indexOf(e.origin) >= 0 &&
			e.data &&
			e.data.eko_gateway_response && e.data.eko_gateway_response.action === 'debit-hook') {
			this._callbackUserFunc(e.data.eko_gateway_response);
		}

		if (this._responseCallbackUserFunc &&
			e &&
			this._GATEWAY_ORIGINS.indexOf(e.origin) >= 0 &&
			e.data && e.data.eko_gateway_response &&
			e.data.eko_gateway_response.action === 'response') {
			this._responseCallbackUserFunc(e.data.eko_gateway_response);
		}

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
	 * @param {string} options.env - Envoirnment = "development" _(default)_ or "production"
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
	 * 		"user_code": "20810200",
	 * 		"env": "production"
	 * 	});
	 */
	config(options) {
		if (options) {
			this._config = Object.assign(this._config, options);
		}
	}


	/**
	 * Setup your server's callback URL for confirming transactions.
	 *  - It is essential for security.
	 *  - You can also handle the callback yourself in Javascript by
	 *    using _setConfirmationCallbackFunction()_ (_not recommended_)
	 *
	 * @param {string} url - Your server URL to call for getting final transaction confirmation.
	 * @param {Object} [options] - Optional callback setting two properties: "parameters" and "headers" that we should set before calling your callback-URL.
	 * @param {Object[]} options.parameters - An array of parameters with values that we should add with the callback requets
	 * @param {Object[]} options.headers - An array of HTTP request headers that we should add with the callback requets
	 *
	 * @example
	 * // Simple callback with no extra parameters or headers:
	 * EkoAEPSGateway.setCallbackURL("https://myserver.com/ekoaeps/confirm");
	 *
	 * @example
	 * // Callback with extra body parameter "session_key":
	 * EkoAEPSGateway.setCallbackURL("https://myserver.com/ekoaeps/confirm",
	 * 		{
	 * 			parameters: { "session_key": "gsRS56sj4$6sdn67sHGs8j" }
	 * 		}
	 * 	);
	 *
	 * @example
	 * EkoAEPSGateway.setCallbackURL("https://myserver.com/ekoaeps/confirm",
	 * 		{
	 * 			headers: { "authorization": "Bearer gsRS56sj4$6sdn67sHGs8j" }
	 * 		}
	 * 	);
	 */
	setCallbackURL(url, options) {

		if (url) {
			/* eslint camelcase: "off" */
			this._config.callback_url = url;

			if (options && options.parameters && typeof options.parameters === 'object') {
				this._config.callback_url_custom_params = JSON.stringify(options.parameters);
			}

			if (options && options.headers && typeof options.headers === 'object') {
				this._config.callback_url_custom_headers = JSON.stringify(options.headers);
			}
		}
	}


	/**
	 * @callback confirmationCallback
	 * @param {Object} requestData
	 * @return {Object}
	 * @todo Document callback request and returned response
	 */

	/**
	 * Setup your Javascript callback function for confirming transactions.
	 *  - It is an _alternative_ to setCallbackURL()
	 * @see setCallbackURL - It is _**recommended to use setCallbackURL()**_ instead
	 * @returns {Boolean} - Returns true when callbackFunc is set else returns false
	 * @param {confirmationCallback} callbackFunc The callback function to handle confirmation of the final AePS Transaction
	 */
	setConfirmationCallbackFunction(callbackFunc) {	

		if (callbackFunc) {

			if (this._config.callback_url) {
				console.error('Failed to set confirm callback function with callBack URL');
			} else {
				this._callbackUserFunc = callbackFunc;
				return true;
			}
		}

		return false;

	}


	/**
	 * Setup your Javascript callback function for getting final response of transactions.
	 *  - It is an _alternative_ to setCallbackURL()
	 * @see setCallbackURL - It is _**recommended to use setCallbackURL()**_ instead
	 * @returns {Boolean} - Returns true when callbackFunc is set else returns false
	 * @param {confirmationCallback} callbackFunc The callback function to handle confirmation of the final AePS Transaction
	 */
	setResponseCallbackFunction(callbackFunc) {

		if (callbackFunc) {
			this._responseCallbackUserFunc = callbackFunc;
			return true;
		}
		return false;
	}


	/**
	 * If using the confirmation callback function (with _setConfirmationCallbackFunction()_),
	 * use this function to send the transaction confirmation back to AePS Gateway.
	 *
	 * @param {Object} data Confirmation details
	 * @param {string} data.secret_key - Secret-key for security generated at your server.
	 * 		(see https://developers.eko.in/docs/authentication)
	 * @param {string} data.secret_key_timestamp - Timestamp used to generate the secret-key
	 * @param {string} data.request_hash - (See https://developers.eko.in/docs/authentication)
	 * @param {string} [data.client_ref_id] Optional unique ID for this transaction.
	 */
	confirmTransaction(data) {

		const response_data = data || {};
		response_data.action = 'go';
		response_data.allow = true;
		if (this._popupWindow) {
			this._popupWindow.postMessage({ eko_gateway_request : response_data }, '*');
		}
	}


	/**
	 * If using the confirmation callback function (with _setConfirmationCallbackFunction()_),
	 * 	use this function to send the transaction confirmation back to AePS Gateway.
	 *
	 * @param {string} message Reason for rejection to show on the AePS popup window.
	 */
	rejectTransaction(message) {

		const data = {
			action: 'go',
			allow: false,
			message: message || ''
		};

		if (this._popupWindow) {
			this._popupWindow.postMessage(data, '*');
		}
	}


	/**
	 * Open the AePS Gateway popup window
	 */
	open() {
		console.debug('[EkoAEPSGateway] opening popup');

		let url = '';

		if (this._config.env && this._GATEWAY_URL_LIST[this._config.env]) {
			url = this._GATEWAY_URL_LIST[this._config.env];
		} else {
			url = this._GATEWAY_URL_LIST.development;
		}

		let form = document.createElement('form');
		form.setAttribute('method', 'post');
		form.setAttribute('action', url);
		form.setAttribute('target', 'ekogateway');
		this._popupWindow = window.open('', 'ekogateway');

		for (const prop in this._config) {
			if (Object.prototype.hasOwnProperty.call(this._config, prop)) {
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = prop;
				input.value = this._config[prop];
				form.appendChild(input);
			}
		}

		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
		
	}
}
