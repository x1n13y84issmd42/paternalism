import {XY, Style} from './sacred.types';
import {Forces} from './sacred.forces';
import {Circle, Polygon} from './sacred.elements';
import * as Operations from './sacred.operations';

function lerp(a: number, b: number, c: number) {
	return a * (1 - c) + b * c;
}

export function TreeGrid(ctx: CanvasRenderingContext2D) {

	let style: Style = {
		strokeDashWidth: 0.4,
		strokeDashFill: 0.4,
		strokeWidth: 5,
	};

	let gridW = ctx.canvas.width;
	let gridH = ctx.canvas.height;
	let gridStepV = 100;
	let gridStepH =  gridStepV - gridStepV / 7;
	
	let yI = 0;
	for (let y = 0; y < gridH; y += gridStepV) {
		let xI = 0;
		for (let x = 0; x < gridW; x += gridStepH) {

			//	Offsetting even columns
			let yOff = 0;
			if (xI % 2 === 0) {
				yOff = gridStepH/1.8;
			}

			let f = Forces.radial({x, y}, {x: gridW / 2, y: gridH / 2}, gridW / 2);
			let theTree = Forces.treeOfLifeGrid({x: xI, y: yI}, gridW, gridH, gridStepH, gridStepV, false, true, true);
			let theStem = Forces.treeOfLifeGrid({x: xI, y: yI}, gridW, gridH, gridStepH, gridStepV, false, false, true);
			let theFruit = Forces.treeOfLifeGrid({x: xI, y: yI}, gridW, gridH, gridStepH, gridStepV, true, false, false);
			let theRest = false;
			let _xy = {x, y: y+yOff, r: 45, s: f};

			if (theTree) {
				style.strokeDashFill = 1;
				style.strokeWidth = 5;
			} else if (theFruit) {
				style.strokeDashFill = 1;
				style.strokeWidth = 5;
			} else if (theStem) {
				style.strokeDashFill = 1;
				style.strokeWidth = 8;
			} else {
				style.strokeDashFill = 0.4;
				style.strokeWidth = 5;
				theRest = true;			
			}

			if (theRest) {
				let maxSides = 40;
				function rndSides() {
					return Math.round(lerp(3, maxSides, f));
				}

				function rndPhase() {
					return lerp(Math.random() * maxSides, 0, Math.min(1, f * 1.7));
				}

				function rndScale(t: number) {
					return _xy.s * lerp(Math.random() * 2, t, Math.min(1, f * 1.7));
				}

				function rndDashFill() {
					return lerp(Math.random() * 0.5, 1, Math.min(1, f * 1.5));
				}
				
				Polygon(ctx, {..._xy, s: rndScale(1.2), phase: rndPhase()}, {strokeWidth: 2, strokeDashWidth: 2, strokeDashFill: rndDashFill()}, rndSides());
				Polygon(ctx, {..._xy, s: rndScale(0.8), phase: rndPhase()}, {strokeWidth: 2, strokeDashWidth: 2, strokeDashFill: rndDashFill()}, rndSides());
				Polygon(ctx, {..._xy, s: rndScale(0.4), phase: rndPhase()}, {strokeWidth: 2, strokeDashWidth: 2, strokeDashFill: rndDashFill()}, rndSides());
			} else {
				Circle(ctx, _xy, style);
			}

			if (theTree) {
				Operations.echo(ctx, Circle, 10, (prog: number) => {
					return {
						xy: {
							..._xy,
							s: _xy.s * prog
						},

						style: {
							...style,
							strokeWidth: 1,
						}
					};
				});
			}

			if (theFruit) {
				Operations.echo(ctx, Circle, 10, (prog: number) => {
					return {
						xy: {
							..._xy,
							s: _xy.s + (1 - prog) * 2
						},

						style: {
							...style,
							strokeWidth: prog
						}
					};
				});
			}

			xI++;
		}
		
		yI++;
	}
}
