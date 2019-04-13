import { Context, Points, ForceFields, Style } from "./sacred.types";
import { Circle, Cube, TreeOfLife } from './sacred.elements';
import { deg2rad } from "./sacred.math";
import { Reducers } from "./sacred.forces";

export function Circles(ctx: Context, points: Points, forceFields: ForceFields) {
	for (let p of points()) {
		let forces = forceFields(p);
		Circle(ctx, {...p, r: 50 * forces[0]}, {});
	}
}

export function FastForceFields(ctx: Context, points: Points, forceFields: ForceFields) {
	let style = Style.def({});

	ctx.fillStyle = 'black';

	ctx.beginPath();
	for (let p of points()) {
		let f = Reducers.max(forceFields(p));
		
		let xy = {...p, r: 10 * f.minor, s: 1};
		Style.config(ctx, xy, style);

		ctx.moveTo(xy.x + xy.r * xy.s, xy.y);
		ctx.arc(xy.x, xy.y, xy.r * xy.s, 0, deg2rad(360));
	}
	
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
}
