import { Context, Points, ForceFields, Style } from "./sacred.types";
import { Circle, Cube, TreeOfLife } from './sacred.elements';

export namespace Orders {
	export function Circles_1(ctx: Context, points: Points, forceFields: ForceFields) {
		for (let p of points()) {
			let forces = forceFields(p);
			Cube(ctx, {...p, r: 50 * forces[0]}, {});
		}
	}
}
