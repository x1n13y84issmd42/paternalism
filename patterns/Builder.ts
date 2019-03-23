//	Builder pattern
//	A variant that builds composite data structures.
//	GoF creational

namespace Builder {
	///////////////////////////////////////////////////////////////////////////////////
	//	Start from defining you [Composite] structure
	//	[Composites] represent "part-whole" hierarchies
	//	and insists that both leaf and composite nodes have the same interface
	//#region

	class LeafNode {
		style: any;
	}

	class Node extends LeafNode {
		constructor(private children: Node[] = []){
			super();
		}

		append(n: Node) {
			this.children.push(n);
		}
	}

	class TextNode extends Node {
		constructor(private text: string) {
			super([]);
		}
	}

	class BoldNode extends Node {}

	class ItalicNode extends Node {}

	class ULNode extends Node {}

	class LINode extends Node {}

	//#endregion
	
	///////////////////////////////////////////////////////////////////////////////////
	//	Define the main steps of your construction process as a [Builder] interface.
	interface IHTMLBuilder {
		bold(text: string): Node;
		italic(text: string): Node;
		list(items: string[]): Node;
	}

	///////////////////////////////////////////////////////////////////////////////////
	//	Implement the [Builder] itself.
	//	Since this [Builder] builds [Composites], you can have multiple [Builders]
	//	which would differ by the resulting structure they create.
	class BoringHTMLBuilder implements IHTMLBuilder {
		bold(text: string): Node {
			return new BoldNode([new TextNode(text)])
		}
		
		italic(text: string): Node {
			return new ItalicNode([new TextNode(text)]);
		}

		list(items: string[]): Node {
			return new ULNode(items.map(i => new LINode([new TextNode(i)])));
		}
	}

	///////////////////////////////////////////////////////////////////////////////////
	//	An alternative [Builder] produces a slightly different [Composite] object.
	//#region Extra node type & and a new [Builder]

	//	Some eye protection may be recommended.
	class BlinkNode extends Node {
		constructor(private freq: number, children: Node[]) {
			super(children);
		}
	}

	class EpilepsyInducer extends BoringHTMLBuilder {
		constructor(private freq: number) {
			super();
		}
	
		bold(text: string): Node {
			return new BlinkNode(this.freq, [super.bold(text)]);
		}
		
		italic(text: string): Node {
			return new BlinkNode(this.freq, [super.italic(text)]);
		}
		
		list(items: string[]): Node {
			return new BlinkNode(this.freq, [super.list(items)]);
		}
	}

	//#endregion

	///////////////////////////////////////////////////////////////////////////////////
	//	On to the construction site!
	//	BTW, the part of code that commands the [Builder] is called [Director].
	//#region USAGE

	let userHasEpilepsy = true;
	let builder = userHasEpilepsy ? new EpilepsyInducer(55) : new BoringHTMLBuilder();
	//	Some kind of source data the [Director] can make sense of and pass to the [Builder].
	let elements: {type: 'b'|'i'|'ul', text: string}[] = [ /* ... */ ];
	
	let root = new Node;

	//	Remember, This is neither a tree structure example, nor an HTML one...
	for (let e of elements) {
		switch (e.type) {
			case 'b':
			root.append(builder.bold(e.text));
			break;

			case 'i':
			root.append(builder.italic(e.text));
			break;

			case 'ul':
			root.append(builder.list(e.text.split(',')));
			break;
		}
	}

	//#endregion
}
