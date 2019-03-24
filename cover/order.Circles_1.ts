import { Context, Points, ForceFields, Style } from "./sacred.types";
import { Circle } from './sacred.elements';

export namespace Orders {
	export function Circles_1(ctx: Context, points: Points, forceFields: ForceFields) {
		let style: Style = {
			strokeDashWidth: 0.4,
			strokeDashFill: 0.4,
			strokeWidth: 5,
		};

		for (let p of points()) {
			let forces = forceFields(p);
			Circle(ctx, {...p, r: 35 * forces[0]}, {});
		}
	}
}
