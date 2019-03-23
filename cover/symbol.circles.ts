import {XY, Style} from './sacred.types';
import {Circle} from './sacred.elements';

export function circles(ctx: CanvasRenderingContext2D) {
	let xy: XY = {
		x: 100, y: 100,
		r: 50,
		a: 0,
		s: 1
	};

	let style: Style = {
		strokeDashWidth: 0.3,
		strokeDashFill: 0.5,
		strokeWidth: 2,
	};

	for (let i=0; i<10; i++) {
		let _xy: XY = {
			...xy,
			x: xy.x+i*xy.r*2.2,
			y: xy.y
		};

		let _style: Style = {
			...style,
			strokeDashFill: i/10,
			strokeWidth: i/10*3
		};

		Style.config(ctx, _xy, _style);
		ctx.beginPath();
		Circle(ctx, _xy, _style);
		ctx.closePath();
		ctx.stroke();
	}
}
