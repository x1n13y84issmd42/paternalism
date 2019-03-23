//	Factory Method pattern
//	GoF creational

namespace FactoryMethod {
	///////////////////////////////////////////////////////////////////////////////////
	//	Start from defining the shape of your [Product] and requirements to its production.
	//#region PRODUCT INTERFACE & CONTEXT

	//	[Product] interface
	interface IMessageTransport { post(message); }

	//	[Context] is the piece of application logic we want to protect from
	//	changes related to the way we deliver notification messages.
	abstract class ErrorProcessor {
		constructor() {}
		
		process(err: Error) {
			//	Invocation of the [Factory Method]
			let transport = this.createTransport();

			//	...
			transport.post(err.message);
			//	...
		}

		//	The [Factory Method] itself, left to be implemented in subclasses.
		abstract createTransport(): IMessageTransport;
	}

	//#endregion
	
	///////////////////////////////////////////////////////////////////////////////////
	//	All SMS-related hassle is isolated from the rest of [Context] now.
	//#region

	//	A standard, sms-based [Product] kind
	class SMSTransport implements IMessageTransport {
		post(message) { /* SMS implementation */ }
	}
	
	//	An a corresponding [Factory Method] implementation
	class SMSErrorReporter extends ErrorProcessor {
		createTransport() { return new SMSTransport; }
	}

	//#endregion
	
	///////////////////////////////////////////////////////////////////////////////////
	//	In case one day we want to change our message delivery from SMS to whatever,
	//	the error processing logic itself, located in [Context], will suffer no casualties in process.
	//#region

	//	An alternative, email-based [Product] kind
	class EmailTransport implements IMessageTransport {
		post(message) { /* Email implementation */ }
	}	
	
	//	An a [Factory Method] produce email transports
	class EMailErrorReporter extends ErrorProcessor {
		createTransport() { return new EmailTransport; }
	}

	//#endregion

	///////////////////////////////////////////////////////////////////////////////////
	//	Enjoy the results.
	//#region USAGE

	try {
		throw new Error(`Report me!`);
	} catch (err) {
		new SMSErrorReporter().process(err);
	}

	//#endregion
}
