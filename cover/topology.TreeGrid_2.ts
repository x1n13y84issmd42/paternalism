import {XY, Context, Point, Style, Order} from './sacred.types';
import { Forces } from './sacred.forces';

export function TreeGrid_2(ctx: Context, order: Order) {
	let gridW = ctx.canvas.width;
	let gridH = ctx.canvas.height;
	let gridStepV = 100;
	let gridStepH =  gridStepV - gridStepV / 7;
	
	//	An Iterator function
	function* I() {
		let yI = 0;
		for (let y = 0; y < gridH; y += gridStepV) {
			let xI = 0;
			for (let x = 0; x < gridW; x += gridStepH) {

				//	Offsetting even columns
				let yOff = 0;
				if (xI % 2 === 0) {
					yOff = gridStepH/1.8;
				}
				
				yield {x, y};
			xI++;}

		yI++;}
	};

	//	Forces
	function ForceFields(p: Point): number[] {
		let fFocal = Forces.radial(p, {x: gridW / 2, y: gridH / 2}, gridW / 2);

		return [fFocal];
	}

	order(ctx, I, ForceFields);
}
