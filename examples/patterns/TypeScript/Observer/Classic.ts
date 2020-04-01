//	Observer pattern
//	A Classic variant from The Book, extended with support of multiple event types.
//	GoF behavioural

namespace Observer {
	export namespace Classic {
		///////////////////////////////////////////////////////////////////////////////////
		//	Start with infrastructure.
		//	This implementation of the pattern has a [Diapatcher] which is used
		//	as a base class for [Subject] types that emit events.
		//#region

		interface IObserver {
			update();
		}

		//	A base class for [Observers] that want to keep a reference to their subject.
		abstract class Observer<ST extends Subject> implements IObserver {
			constructor(protected subject: ST) {}

			abstract update();
		}

		//	A base class for [Subjects]. Implements subscription and notification logic.
		abstract class Subject {
			private observers: IObserver[] = [];
		
			notify() {
				for (let o of this.observers) {
					o.update();
				}
			}

			subscribe(observer: IObserver) {
				this.observers.push(observer);
			}
		}

		//#endregion

		///////////////////////////////////////////////////////////////////////////////////
		//	The [Subject] — a class which usually represents some kind of process or operation
		//	and reports outside upon completion of certain step or when certain events happen.
		//	This way [Subject] is decoupled from the code that handles those events,
		//	OCP & SRP are resprected.
		//	NB: all this makes sense only for those parts of logic that aren't required immediately
		//	to achieve the [Subject]'s goals and justify it's existence.
		//#region

		//	Some mock types.
		class User {}

		//	The [Subject] itself.
		class UserController extends Subject {
			private createdUser: User;

			create() {
				//	Create a user
				this.createdUser = new User();
				this.notify();
			}
		}

		const controller = new UserController();

		//#endregion

		///////////////////////////////////////////////////////////////////////////////////
		//	Setup your [Observers]
		//#region

		class WelcomeUser extends Observer<UserController> {
			update() {
				//	Send a welcome email to this.subject.createdUser
			}
		}

		class AnalyzeProfile extends Observer<UserController> {
			update() {
				//	Build an interest profile from the data in this.subject.createdUser
			}
		}

		class InviteFriends extends Observer<UserController> {
			update() {
				//	Suggest inviting friends.
				//	If no friends were found - create some!
				
				//	This is how you trigger chain reactions with mindless applications of the pattern.
				this.subject.create();
			}
		}

		//	Attach them to the [Subject]
		controller.subscribe(new WelcomeUser(controller));
		controller.subscribe(new AnalyzeProfile(controller));
		controller.subscribe(new InviteFriends(controller));

		//#endregion

		///////////////////////////////////////////////////////////////////////////////////
		//	Execute the operation and enjoy the event hell unfolding.
		//	(This happens when [Observers] trigger other events, sometimes recursively).

		controller.create();
	}
}
