//	Prototype pattern
//	GoF creational

namespace Prototype {
	///////////////////////////////////////////////////////////////////////////////////
	//	Start with infrastructure.
	
	interface Prototype<T> {
		clone(): T;
	}

	class Event implements Prototype<Event> {
		clone(): Event {
			return undefined;
		}
	}
}
