import {XY, Context, Point, Style, Order} from './sacred.types';
import { Forces } from './sacred.forces';
import { TreeOfLife } from './sacred.elements';

export function CoverTree(ctx: Context, order: Order, t: number = 0) {
	let gridW = ctx.canvas.width;
	let gridH = ctx.canvas.height;
	let gridStepV = 42 * 1.5;
	let gridStepH = 42 * 1.5;
	
	//	An Iterator function - called by an Order function to generate Topology points.
	function* I() {
		let yI = 0;
		for (let y = 0; y < gridH; y += gridStepV) {
			for (let x = 0; x < gridW; x += gridStepH) {
				yield {x, y};
			}
		}
	};

	//	A force fields function
	function FFCover(p: Point) {

		let center = {x: gridW / 2.7, y: gridH / 2};
		let treeXY: XY = {...center, r: 250};
		let treeR = 400;

		let fFocal = Forces.radial(p, center, gridW / 1.5);
		let fFocalWave = Forces.radialWave(p, center, gridW / 1.5, 12, t) * 0.5 + 0.5;
		let fTree = Forces.treeOfLifeKernel(p, treeXY, treeR);

		let lineStrength = 1;
		let lineR = 200;
		lineR = (lineR/2) + Math.sin(t) * (lineR/2);
		let slope = center.x / center.y;
		let fLine1 = lineStrength * Forces.line(p, center, {x: 0, y: 0}, lineR);
		let fLine2 = lineStrength * Forces.line(p, center, {x: gridW, y: -(gridW - center.x) / slope}, lineR);
		let fLine3 = lineStrength * Forces.line(p, center, {x: 0, y: gridW / slope}, lineR);
		let fLine4 = lineStrength * Forces.line(p, center, {x: gridW, y: gridW / slope}, lineR);
		
		//	Two angle << lines on the right
		let fLine5 = lineStrength * Forces.line(p, Point.add(center, {x: 350, y: 0}), {x: gridW, y: -(gridW - center.x) / slope}, lineR);
		let fLine6 = lineStrength * Forces.line(p, Point.add(center, {x: 350, y: 0}), {x: gridW, y: gridW / slope}, lineR);

		let fLine7 = lineStrength * Forces.line(p, Point.add(center, {x: 700, y: 0}), {x: gridW, y: -(gridW - center.x) / slope}, lineR);
		let fLine8 = lineStrength * Forces.line(p, Point.add(center, {x: 700, y: 0}), {x: gridW, y: gridW / slope}, lineR);

		let fAngles = Math.min(0.8, (Math.max(fLine5, fLine6) * fFocal * 1.5) + (Math.max(fLine7, fLine8) * fFocal * 2));
		
		//	Horizonrtal line
		let fLineH = lineStrength * Forces.line(p, {x: 0, y: gridH/2}, {x: gridW, y: gridH/2}, 200 + Math.cos(t) * 200);

		return {
			major: [
			//	fTree,
				fFocal * fFocalWave,
			//	fFocal * fFocalWave,
			],
			
			minor: [
			//	fFocal / 2,
				Math.min(1, Math.max(fLine1, fLine2, fLine3, fLine4) * fFocal * 1.5),
				fLineH,
				fAngles,
			]
		};
	}

	order(ctx, I, FFCover);
}
