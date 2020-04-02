/**
 *
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
	 * Configure...
	 *
	 * @param options An object with all options to set
	 * @example config({
	 * 			"developer_key": "becbbce45f79c6f5109f848acd540567",
	 * 			"secret_key": "dCUujUywtuu86CyoHkZZzBjLUAVC365e6PLaa4UYwqM=",
	 * 			"secret_key_timestamp": "1532582133692",
	 * 			"initiator_id": "9962981729",
	 * 			"user_code": "20810200",
	 * 			"initiator_logo_url": "https://files.eko.co.in/docs/logos/payment/dummy-partner-logo.png",
	 * 			"partner_name": "Payments INC",
	 * 			"language": "en"
	 * 		})
	 */
	config = (options) => {
		if (options) {
			this.config = Object.assign(this.config, options);
		}
	};



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
