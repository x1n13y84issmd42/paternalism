//	Observer pattern
//	A variant with a dispatcher a events, a synchronous one.
//	GoF behavioural

namespace Observer {
	export namespace PubSub {
		///////////////////////////////////////////////////////////////////////////////////
		//	Start with infrastructure.
		//	This implementation of the pattern has a [Diapatcher] which is used
		//	as a base class for [Subject] types that emit events.
		//#region [Event] and [Dispatcher] types

		//	A Typescript chore, unrelated to the subject matter
		interface Newable<T> { new (...args: any[]): T; };

		//	A base class for [Events]
		class Event {
			get name() {return this.constructor.name;}
		}

		//	A [Dispatcher] aka [Emitter] implementation
		abstract class Emitter {
			private observers: {[k:string]:((e)=>void)[]} = {};
		
			emit<ET extends Event>(e: ET) {
				const observers = this.observers[e.name];
				if (observers) {
					for (let o of observers) {
						o(e);
					}
				}
			}

			on<ET extends Event>(evt: Newable<ET>, observer: (event: ET) => void) {
				if (!this.observers[evt.name]) {
					this.observers[evt.name] = [];
				}
				this.observers[evt.name].push(observer);
			}
		}

		//#endregion

		///////////////////////////////////////////////////////////////////////////////////
		//	Define your [Event] types and associated types where neccessary.
		//#region

		class User {name: string; email: string; profiles: UserProfile[] = []}
		class UserProfile {}
		class FBProfile extends UserProfile {}
		class InstaProfile extends UserProfile {}

		class UserCreated extends Event {
			constructor(public user: User, public creator: User) {super()}
		}
		
		class UserStorageAllocated extends Event {
			constructor(public user: User, public size: number) {super()}
		}
		
		class UserProfileLinked extends Event {
			constructor(public user: User, public profile: UserProfile) {super()}
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

		class UserController extends Emitter {
			create() {
				//	Create a user
				let user = new User;
				let me = new User;
				this.emit(new UserCreated(user, me));
				
				//	Allocate
				this.allocateStorage(user);

				//	Link social profiles
				user.profiles.push(new FBProfile());
				user.profiles.push(new InstaProfile());

				for (let profile of user.profiles) {
					this.emit(new UserProfileLinked(user, profile));
				}
			}

			private allocateStorage(user: User) {
				//	When you came pulling in here, did you notice the sign
				//	in front of my house that says "User Storage"?
				this.emit(new UserStorageAllocated(user, 1024 * 1024));
			}
		}

		const controller = new UserController();

		//#endregion

		///////////////////////////////////////////////////////////////////////////////////
		//	Setup your [Observers]
		//#region

		controller.on(UserCreated, (e: UserCreated) => {
			//	Send some mails maybe...
			console.log(`Sending a welcome e-mail to the new user ${e.user.name} (${e.user.email}), created by ${e.creator.name}.`);
		});

		controller.on(UserStorageAllocated, (e: UserStorageAllocated) => {
			//	Bonnie is not coming home and divorcing Jimmy, so the storage has been allocated this time.
		});

		controller.on(UserProfileLinked, (e: UserProfileLinked) => {
			//	Suggest inviting friends.
		});

		//#endregion

		///////////////////////////////////////////////////////////////////////////////////
		//	Execute the operation and enjoy the event hell unfolding.
		//	(This happens when [Observers] trigger other events, sometimes recursively).
		controller.create();
	}
}
