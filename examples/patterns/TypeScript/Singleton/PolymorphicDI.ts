//	Singleton
//	GoF Creational

export namespace Singleton {
	export namespace Polymorphic {
		//	A more advanced and useful Singleton.
		//	It's still very single, but now it is polymorphic and has Dependency Injection.
		
		type CallCounterProvider = () => CallCounter;

		abstract class CallCounter {
			/////////////////////////////////////////
			//#region Singleton infrastructure part

			protected constructor() {}

			protected static instance: CallCounter;
			protected static instanceProvider: CallCounterProvider;

			public static new() {
				if (! CallCounter.instance) {
					if (! CallCounter.instanceProvider) {
						throw new Error('Please supply an instance provider via the `use()` method.');
					}

					CallCounter.instance = this.instanceProvider();
				}

				return CallCounter.instance;
			}

			public static use(p: CallCounterProvider) {
				CallCounter.instanceProvider = p;
			}

			public abstract countCalls();

			//#endregion
		}

		//#region Imlementations of the CallCounter

		class CallCounter_Ones extends CallCounter {
			private callCounter = 0;

			constructor() {
				super();
			}
		
			public countCalls() {
				return ++this.callCounter;
			}
		}

		class CallCounter_Tens extends CallCounter {
			private callCounter = 0;

			constructor() {
				super();
			}
		
			public countCalls() {
				return (this.callCounter += 10);
			}
		}

		const provideCallCounter_Ones = () => new CallCounter_Ones;
		const provideCallCounter_Tens = () => new CallCounter_Tens;

		//#endregion

		export function run() {
			CallCounter.use(provideCallCounter_Ones);

			let c1 = CallCounter.new();
			let c2 = CallCounter.new();

			CallCounter.use(provideCallCounter_Tens);

			let c3 = CallCounter.new();
			
			c1.countCalls();	//	1
			
			c2.countCalls();	//	2
			c2.countCalls();	//	3
			c2.countCalls();	//	4
			c2.countCalls();	//	5
			
			c3.countCalls();	//	10
			c3.countCalls();	//	20
		}
	}
}
