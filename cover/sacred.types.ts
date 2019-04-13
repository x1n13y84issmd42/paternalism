export type XY = {
	x: number,
	y: number,
	r: number,	//	Radius
	a?: number,	//	Orientation angle in deg
	s?: number,	//	Scale 0..1

	//	An element-specific setting. Mostly controls initial orientation of figures
	//	when they are generated.
	phase?: number,
};

export type Style = {
	strokeDashWidth?: number;	//	Width of a dash + width of a blank space, 0..1 relative to XY.r
	strokeDashFill?: number;	//	How filled the dash should be, 0..1, relative to strokeDashWidth
	strokeWidth?: number;
	strokeOpacity?: number;
	fill?: [number, number, number, number] | false;	//	RGBA 0..1
	stroke?: [number, number, number, number] | false;	//	RGBA 0..1
	_3D?: boolean;
};

export namespace XY {
	export function def(xy: XY) {
		return {
			s: 1,
			a: 0,
			phase: 0,
			...xy,
		};
	}
}

export namespace Style {
	export function def(style: Style) {
		return {
			strokeDashWidth: 1,
			strokeDashFill: 1,
			strokeOpacity: 1,
			strokeWidth: 1,
			...style,
		};
	}

	export function config(ctx: Context, xy: XY, style: Style) {
		xy = XY.def(xy);
		style = Style.def(style);

		let ops = {
			fill: () => {},
			stroke: () => {
				ctx.stroke();
			},
		};

		ctx.strokeStyle = 'black';

		if (style.strokeWidth) {
			ctx.lineWidth = (style.strokeWidth * xy.s); // 0 doesn't work as a valid value
		} else {
			ops.stroke = () => {
				// ctx.stroke();
			};
			
		}

		var dash = xy.r * xy.s;
        var dashes = [
            dash * style.strokeDashWidth * style.strokeDashFill,
            dash * style.strokeDashWidth * (1 - style.strokeDashFill)
		];

		//	A fix for the tiniest gaps of [99, 1] and such
		if (dashes[1] / (xy.r*xy.s) <= 0.03) {
			dashes = [];
		}

		ctx.setLineDash(dashes);

		if (style.stroke) {
			let f = style.stroke;
			f = [
				f[0] * 255,
				f[1] * 255,
				f[2] * 255,
				f[3]
			];

			ctx.strokeStyle = `rgba(${f.join(',')})`;
			ops.stroke = () => {
				ctx.stroke();
			};
		}
		
		if (style.fill) {
			let f = style.fill;
			f = [
				f[0] * 255,
				f[1] * 255,
				f[2] * 255,
				f[3]
			];

			ctx.fillStyle = `rgba(${f.join(',')})`;
			ops.fill = () => {
				ctx.fill();
			};
		}

		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';

		// ctx.shadowBlur = 10;
		// ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';

		// ctx.globalCompositeOperation = 'multiply';
		ctx.globalCompositeOperation = 'lighter';

		return ops;
	}

	//	Some default styles
	export const solid05: Style = {
		strokeDashWidth: 0.3,
		strokeDashFill: 1,
		strokeWidth: 0.5,
	};

	export const solid1: Style = {
		strokeDashWidth: 0.3,
		strokeDashFill: 1,
		strokeWidth: 1,
	};

	export const solid2: Style = {
		strokeDashWidth: 0.3,
		strokeDashFill: 1,
		strokeWidth: 2,
	};

	export const dash1: Style = {
		strokeDashWidth: 0.3,
		strokeDashFill: 0.5,
		strokeWidth: 1,
	};

	export const dash101: Style = {
		strokeDashWidth: 0.1,
		strokeDashFill: 0.5,
		strokeWidth: 1,
	};
}

export type Context = CanvasRenderingContext2D;

export type Point = {x: number, y: number};

export namespace Point {
	export function sub(p1: Point, p2: Point) {
		return {x: p1.x - p2.x, y: p1.y - p2.y};
	}

	export function add(p1: Point, p2: Point) {
		return {x: p1.x + p2.x, y: p1.y + p2.y};
	}
}

/**
 * For efficiency reasons and encouraging of good coding practices
 * Topologies are supposed to use generators for their Point fields.
 */
export type Points = () => IterableIterator<Point>;

/**
 * Symbols are complex shapes made of Elements.
 */
export type Symbol = (ctx: Context, xy: XY, style: Style, forceFields: number[]) => void

/**
 * Forces are another vital part of Topologies.
 * They are 0..1 values that provided by Topologies to the
 * supplied Orders and allow to modify certain properties or theirs.
 * 
 * Forces influence the final composition considerably, so it is recommended
 * for a Topology developer/designer to order their forces so the most
 * important composition-wise forces are at the beginning of the list
 * and the least important ones are at the end.
 * 
 * For example, if there is a center piece to your Topology which is
 * defined by a force field, put that force the very first in list.
 * The Order developer would just follow the same convention and use it for
 * some comples Symbols.
 */
export type StructuredForceFields = {
	major: number[],
	minor: number[],
};

export type ForceFields = (p: Point) => StructuredForceFields;

/**
 * Topology is a top-level structure that defines
 * the "template" of some composition, by providing access to Points and Force
 * for the Orders.
 */
export type Topology = (ctx: Context, order: Order) => void;

/**
 * Orders exist on Topologies and define how those are filled and with what.
 */
export type Order = (ctx: Context, points: Points, forces: ForceFields) => void;
