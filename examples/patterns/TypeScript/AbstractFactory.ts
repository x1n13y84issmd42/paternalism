//	Abstract Factory pattern
//	GoF creational

namespace AbstractFactory {
	///////////////////////////////////////////////////////////////////////////////////
	//	Start from defining the shape of your "product line" and requirements for their production,
	//	i.e. interfaces for [Products] and their [Factories].
	//#region

	//	[Product A] interface
	interface IMessageTransport {
		post(message);
	}
	
	//	[Product B] interface
	interface IMessageFormatter {
		format(err: Error): string;
	}
	
	//	[Factory] interface
	interface IMessagingServiceProvider {
		createFormatter(): IMessageFormatter;
		createTransport(): IMessageTransport;
	}

	//#endregion
	
	///////////////////////////////////////////////////////////////////////////////////
	//	A family of logically coupled or in another way related [Products] and a [Factory] to produce them.
	//#region SMS family

	//	An SMS-flavoured [Product A] implementation
	class SMSTransport implements IMessageTransport {
		post(message) {
			//	SMS implementation
		}
	}

	//	An SMS-flavoured [Product B] implementation
	class SMSFormatter implements IMessageFormatter {
		format(err: Error): string {
			return 'A short SMS text';
		}
	}

	//	A [Factory] to produce the SMS-flavoured [Products]
	class SMSProvider implements IMessagingServiceProvider {
		createFormatter(): IMessageFormatter {
			return new SMSFormatter;
		}
		
		createTransport(): IMessageTransport {
			return new SMSTransport;
		}
	}
	//#endregion

	///////////////////////////////////////////////////////////////////////////////////
	//	Another family of related [Products], email-flavoured this time, that belong to the same domain,
	//	implement the same interface but behave differently.
	//#region EMail family

	//	An alternative [Product A] email-flavoured implementation
	class EmailTransport implements IMessageTransport {
		post(message) {
			//	Email implementation
		}
	}

	//	An alternative [Product B] email-flavoured implementation
	class EmailFormatter implements IMessageFormatter {
		format(err: Error): string {
			return `A longer text for email, with <b>HTML</b> & attachments & stuff`;
		}
	}

	//	An email-flavoured [Factory] to produce the email-flavoured [Products]
	class EmailProvider implements IMessagingServiceProvider {
		createFormatter(): IMessageFormatter {
			return new EmailFormatter;
		}
		
		createTransport(): IMessageTransport {
			return new EmailTransport;
		}
	}
	//#endregion

	///////////////////////////////////////////////////////////////////////////////////
	//	[Context] is the piece of application logic we want to protect from
	//	changes related to the way we deliver notification messages.
	//#region
	class ErrorProcessor {
		constructor(private msgProvider: IMessagingServiceProvider) {}
		
		process(err: Error) {
			let formatter = this.msgProvider.createFormatter();
			let transport = this.msgProvider.createTransport();

			//	Some preprocessing...
			let message = formatter.format(err);
			transport.post(message);
			//	...as well as post one.
		}
	}
	//#endregion

	///////////////////////////////////////////////////////////////////////////////////
	//	Enjoy the results.
	//#region USAGE
	const providers = {
		'sms': SMSProvider,
		'email': EmailProvider,
	};

	try {
		throw new Error(`Report me!`);
	} catch (err) {
		new ErrorProcessor(new providers['sms']).process(err);
	}
	//#endregion
}
