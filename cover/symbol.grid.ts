import {XY, Style} from './sacred.types';
import {Circle} from './sacred.elements';

export function grid(ctx: CanvasRenderingContext2D) {
	let xy: XY = {
		x: 100, y: 100,
		r: 50,
		a: 0,
		s: 1
	};

	let style: Style = {
		strokeDashWidth: 0.4,
		strokeDashFill: 0.4,
		strokeWidth: 5,
	};

	let gridW = ctx.canvas.width;
	let gridH = ctx.canvas.height;
	let gridStep = 100;

	function focus(x: number, y: number, fX?: number, fY?: number) {
		fX = (fX === undefined) ? gridW / 2 : fX;
		fY = (fY === undefined) ? gridH / 2 : fY;
		let vX = fX - x;
		let vY = fY - y;

		return 1 - Math.min(1, Math.sqrt(vX*vX + vY*vY) / (gridW / 2));
	}
 
	for (let y = 0; y < gridH; y += gridStep) {
		let xI = 0;
		for (let x = 0; x < gridW; x += gridStep) {
			let f = focus(x, y);
			let yOff = 0;
			if (xI % 2 === 0) {
				yOff = gridStep/2;
			}
			let _xy = {x, y: y+yOff, r: 45, s: f};
			Style.config(ctx, _xy, style);
			ctx.beginPath();
			Circle(ctx, _xy, style);
			ctx.closePath();
			ctx.stroke();

			xI++;
		}
	}
	
}
