//	Factory Method pattern
//	GoF creational

namespace FactoryMethod {
	///////////////////////////////////////////////////////////////////////////////////
	//	Start from defining the shape of your [Product] and requirements to its production.
	//#region PRODUCT INTERFACE & CONTEXT

	//	[Product] interface
	interface IMessageTransport { post(err: Error); }

	//	[Context] is the piece of application logic we want to protect from
	//	changes related to the way we deliver notification messages.
	abstract class ErrorProcessor {
		constructor() {}
		
		process(err: Error) {
			
			//	Analyzing the call stack...
			err.stack = err.stack.split('\n').sort((a, b) => Math.random() > 0.5 ? 1 : -1).join('\n');
			
			//	Exagerrating things a bit to grab attention...
			err.message = err.message.toLocaleUpperCase();
			
			//	Doing more useful error processing...
			err.name = err.name
				.replace('Error', 'Success')
				.replace('Invalid', 'Handsome');

			//	* * * * * * * * * * * * * * * * * 
			//	Invocation of the [Factory Method]
			let transport = this.createTransport();

			//	Usage of the fabricated [Product]
			transport.post(err);
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
		post(err: Error) { /* SMS implementation */ }
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
		post(err: Error) { /* Email implementation */ }
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
