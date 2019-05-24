//	Policy / Strategy pattern
//	GoF behavioural

namespace Policy {
	///////////////////////////////////////////////////////////////////////////////////
	//	Start from defining interface for the behavior you want to isolate,
	//	as well as the context to place it into.
	//#region

	//	A [Policy] interface:
	interface IMessageTransport {
		post(message);
	}

	//	A [Context] is a piece os application logic we want to protect from changes
	//	related to certain behavior, that is now isolated in [Policies].
	class OrderExecutor {
		constructor(private transport: IMessageTransport) {}
		
		execute(orderData) {
			//	Executing the order.

			//	Notifying the account owner.
			this.transport.post(`The order #${orderData.id} has been executed.`);
		}
	}

	//#endregion
	
	///////////////////////////////////////////////////////////////////////////////////
	//	Specific behaviors now reside in [Policies], can be developed & tested independently,
	//	and are interchangeable within their [Context].
	//#region POLICIES

	//	A [Policy] implementation:
	class SMSTransport implements IMessageTransport {
		post(message) {
			//	SMS implementation
		}
	}
	
	//	An alternative [Policy] implementation:
	class EMailTransport implements IMessageTransport {
		post(message) {
			//	Email implementation
		}
	}

	//#endregion	
	
	///////////////////////////////////////////////////////////////////////////////////
	//	Witness the powers of low coupling, LSP & OCP.
	//#region USAGE

	let transports = {
		'sms': SMSTransport,
		'email': EMailTransport,
	};

	let upl = new OrderExecutor(new transports['sms']);
	upl.execute({ /*...*/ });

	//#endregion
}
