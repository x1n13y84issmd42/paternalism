//	Singleton
//	GoF Creational

export namespace Singleton {
	export namespace Classic {
		//	The classic Singleton from The Book.
		//	Is really single, has no pooling, no DI, no polymorphism, has all the problems.
		
		class CallCounter {
			/////////////////////////////////////////
			//#region Singleton infrastructure part
		
			private constructor() {}
		
			private static instance: CallCounter;
		
			public static new() {
				if (! CallCounter.instance) {
					CallCounter.instance = new CallCounter();
				}
		
				return CallCounter.instance;
			}
		
			//#endregion
		
			/////////////////////////////////////////
			//#region Domain logic part
		
			private callCounter = 0;
		
			public countCalls() {
				return ++this.callCounter;
			}
		
			//#endregion
		}

		export function run() {
			let c1 = CallCounter.new();
			let c2 = CallCounter.new();
			let c3 = CallCounter.new();
			
			c1.countCalls();	//	1
			
			c2.countCalls();	//	2
			c2.countCalls();	//	3
			c2.countCalls();	//	4
			c2.countCalls();	//	5
			
			c3.countCalls();	//	6
			c3.countCalls();	//	7
		}
	}
}
