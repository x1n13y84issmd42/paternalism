import {XY, Style} from './sacred.types';
import {Polygon, Polygram} from './sacred.elements';

export function polygons(ctx: CanvasRenderingContext2D) {
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
			y: xy.y + 200,
			r: xy.r*1.2
		};

		let _style: Style = {
			...style,
			strokeDashFill: 1,
			strokeWidth: (i+1)/11*3
		};

		Style.config(ctx, _xy, _style);
		ctx.beginPath();
		Polygon(ctx, _xy, _style, 5 + i);
		ctx.closePath();
		ctx.stroke();
	}

	for (let i=0; i<10; i++) {
		let _xy: XY = {
			...xy,
			x: xy.x+i*xy.r*2.2,
			y: xy.y + 200,
			r: xy.r*1.3
		};

		let _style: Style = {
			...style,
			strokeDashFill: 1,
			strokeWidth: (1-(i+1)/11)*3
		};

		Style.config(ctx, _xy, _style);
		ctx.beginPath();
		Polygram(ctx, _xy, _style, 5 + i);
		ctx.closePath();
		ctx.stroke();
	}
}
