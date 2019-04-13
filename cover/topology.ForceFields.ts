import {XY, Context, Point, Style, Order} from './sacred.types';
import { Forces } from './sacred.forces';
import { TreeOfLife } from './sacred.elements';

export function ForceFields(ctx: Context, order: Order) {
	let gridW = ctx.canvas.width;
	let gridH = ctx.canvas.height;
	let gridStepV = 20;
	let gridStepH =  20;
	
	//	An Iterator function - called by an Order function to generate Topology points.
	function* I() {
		let yI = 0;
		for (let y = 0; y < gridH; y += gridStepV) {
			for (let x = 0; x < gridW; x += gridStepH) {	
				yield {x, y};
			}
		}
	};

	function FF(p: Point) {

		let treeXY: XY = {x: 370, y: 300, r: 150};
		let treeR = 100;
		let fFocal = Forces.radial(p, {x: gridW / 1.5, y: gridH / 2}, gridW / 1.5);
		let fFocalWave = Forces.radialWave(p, {x: gridW / 1.5, y: gridH / 2}, gridW / 1.5, 12) * 0.5 + 0.5;
		let fTree = Forces.treeOfLifeKernel(p, treeXY, treeR);
		let fLine = Forces.line(p, {x: 400, y: 400}, {x: 800, y: 200}, 400);

		return {
			major: [
				fTree,
			],
			minor: [
				fFocal,
				fFocalWave,
				fLine,
			]
		};
	}

	function FFCover(p: Point) {

		let center = {x: gridW / 2.7, y: gridH / 2};
		let treeXY: XY = {...center, r: 250};
		let treeR = 400;

		let fFocal = Forces.radial(p, center, gridW / 1.5);
		let fFocalWave = Forces.radialWave(p, center, gridW / 1.5, 12) * 0.5 + 0.5;
		let fTree = Forces.treeOfLifeKernel(p, treeXY, treeR);

		let lineStrength = 0.7;
		let lineR = 200;
		let slope = center.x / center.y;
		let fLine1 = lineStrength * Forces.line(p, center, {x: 0, y: 0}, lineR);
		let fLine2 = lineStrength * Forces.line(p, center, {x: gridW, y: -(gridW - center.x) / slope}, lineR);
		let fLine3 = lineStrength * Forces.line(p, center, {x: 0, y: gridW / slope}, lineR);
		let fLine4 = lineStrength * Forces.line(p, center, {x: gridW, y: gridW / slope}, lineR);

		return {
			major: [
				fTree,
				fFocal * fFocalWave,
			],

			minor: [
				fLine1,
				fLine2,
				fLine3,
				fLine4,
			]
		};
	}

	order(ctx, I, FFCover);
}
