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

	function* I_off() {
		for (let y = 0; y < gridH; y += gridStepV) {
			let xI = 0;
			for (let x = 0; x < gridW; x += gridStepH) {

				//	Offsetting even columns vertically
				let yOff = 0;
				if (xI % 2 === 0) {
					yOff = gridStepH/1.8;
				}
				
				yield {x, y: y+yOff};
			xI++;}
		}
	};

	//	A force fields function
	function FFCover(p: Point) {

		let center = {x: gridW / 2.7, y: gridH / 2};
		let treeXY: XY = {...center, r: 250};
		let treeR = 400;

		let fFocal = Forces.radial(p, center, gridW / 1.5);
		let fFocalWave = Forces.radialWave(p, center, gridW / 1.5, 12, t) * 0.5 + 0.5;
		fFocalWave = Math.min(1, fFocalWave * 2);
		let fTree = Forces.treeOfLifeKernel(p, treeXY, treeR);

		let lineStrength = 1;
		let lineR = 200;
		lineR = (lineR/2) + Math.sin(t) * (lineR/2);
		let slope = center.x / center.y;
		// let fLine1 = lineStrength * Forces.line(p, center, {x: 0, y: 0}, lineR);
		// let fLine2 = lineStrength * Forces.line(p, center, {x: 0, y: gridW / slope}, lineR);

		//	The angle > line on the left
		let fLine1 = Forces.line(p, Point.add(center, {x: 0, y: 0}), Point.add(center, {x: 0 - gridH/1.8, y: -gridH/2}), lineR * 0.75);
		let fLine2 = Forces.line(p, Point.add(center, {x: 0, y: 0}), Point.add(center, {x: 0 - gridH/1.8, y: gridH/2}), lineR * 0.75);
		
		//	Three angle <<< lines on the right
		let fLine3 = Forces.line(p, Point.add(center, {x: 0, y: 0}), Point.add(center, {x: 0 + gridH/1.8, y: -gridH/2}), lineR * 0.75);
		let fLine4 = Forces.line(p, Point.add(center, {x: 0, y: 0}), Point.add(center, {x: 0 + gridH/1.8, y: gridH/2}), lineR * 0.75);

		let fLine5 = Forces.line(p, Point.add(center, {x: 400, y: 0}), Point.add(center, {x: 400 + gridH/1.8, y: -gridH/2}), lineR * 0.75);
		let fLine6 = Forces.line(p, Point.add(center, {x: 400, y: 0}), Point.add(center, {x: 400 + gridH/1.8, y: gridH/2}), lineR * 0.75);

		let fLine7 = Forces.line(p, Point.add(center, {x: 800, y: 0}), Point.add(center, {x: 800 + gridH/1.8, y: -gridH/2}), lineR * 0.75);
		let fLine8 = Forces.line(p, Point.add(center, {x: 800, y: 0}), Point.add(center, {x: 800 + gridH/1.8, y: gridH/2}), lineR * 0.75);

		let fAngles = Math.min(0.8, 
			+ (fLine3 + fLine4) * fFocal
			+ (fLine5 + fLine6) * fFocal * 1.25
			+ (fLine7 + fLine8) * fFocal * 1.5
		);
		
		//	Horizonrtal line
		let fLineH = lineStrength * Forces.line(p, {x: 0, y: gridH/2}, {x: gridW, y: gridH/2}, 200 + Math.cos(t) * 200);

		return {
			major: [
			//	fTree,
				fFocal,
				fFocal * fFocalWave,
			],
			
			minor: [
			//	fFocal / 2,
				Math.min(0.8, Math.max(fLine1, fLine2) * fFocal * 1.5),
				Math.min(0.8, fLineH * fFocal * 2),
				fAngles,
			]
		};
	}

	order(ctx, I_off, FFCover);
}
