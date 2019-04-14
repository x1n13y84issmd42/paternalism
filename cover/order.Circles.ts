import { Context, Points, ForceFields, Style, Point, XY } from "./sacred.types";
import { Circle, Cube, TreeOfLife } from './sacred.elements';
import { deg2rad, Color } from "./sacred.math";
import { Reducers } from "./sacred.forces";

export function Circles(ctx: Context, points: Points, forceFields: ForceFields) {
	for (let p of points()) {
		let forces = forceFields(p);
		Circle(ctx, {...p, r: 50 * forces[0]}, {});
	}
}

export function FastForceFields(ctx: Context, points: Points, forceFields: ForceFields) {
	let style = Style.def({});

	function field(s: Style, fldI: number) {
		Style.config(ctx, XY.def({x:0, y:0, r:1}), s);
		ctx.beginPath();
		for (let p of points()) {
			let ff = forceFields(p);
			let forces = [].concat(ff.minor, ff.major);
			let force = forces[fldI];
			
			let xy = {...p, r: 30 * force, s: 1};
			
			ctx.moveTo(xy.x + xy.r * xy.s, xy.y);
			ctx.arc(xy.x, xy.y, xy.r * xy.s, 0, deg2rad(360));
		}
		
		ctx.globalCompositeOperation = 'lighter';
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}

	let ff = forceFields({x:0, y:0});
	let fields = [].concat(ff.major, ff.minor);

	for (let fldI = 0; fldI < fields.length; fldI++) {
		field({...style, fill: Color.HSL2RGBA(fldI / fields.length, 1, 0.5)}, fldI);
	}
}
