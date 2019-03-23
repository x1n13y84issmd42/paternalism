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
};

export namespace Style {
	export function config(ctx: Context, xy: XY, style: Style) {
		xy = {
			s: 1,
			a: 0,
			phase: 0,
			...xy,
		};

		style = {
			strokeDashWidth: 1,
			strokeDashFill: 1,
			strokeOpacity: 1,
			strokeWidth: 1,
			...style,
		};

		ctx.strokeStyle = 'black';
		ctx.lineWidth = (style.strokeWidth * xy.s) || 0.01; // 0 doesn't work as a valid value

		var dash = xy.r * xy.s;
        var dashes = [
            dash * style.strokeDashWidth * style.strokeDashFill,
            dash * style.strokeDashWidth * (1 - style.strokeDashFill)
		];

		//	A fix for the tiniest gaps of [99, 1] and such
		if (dashes[1] / (xy.r*xy.s) <= 0.03) {
			dashes = [0, 1];
		}

        ctx.setLineDash(dashes);

		ctx.lineCap = 'round';
	}
}

export type Context = CanvasRenderingContext2D;

export function deg2rad(deg: number) {
	return deg * Math.PI / 180;
}

export type Point = {x: number, y: number};

export namespace Point {
	export function sub(p1: Point, p2: Point) {
		return {x: p1.x - p2.x, y: p1.y - p2.y};
	}

	export function add(p1: Point, p2: Point) {
		return {x: p1.x + p2.x, y: p1.y + p2.y};
	}
}
