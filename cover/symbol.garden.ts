import {XY, Style} from './sacred.types';
import {TreeOfLife, SeedOfLife, Polygon, EggOfLife, FlowerOfLife, FruitOfLife, MetatronsCube} from './sacred.elements';

export function garden(ctx: CanvasRenderingContext2D) {
	let xy: XY = {
		x: 200, y: 200,
		r: 50,
		a: 0,
		s: 1
	};

	let style: Style = {
		strokeDashWidth: 0.2,
		strokeDashFill: 0.5,
		strokeWidth: 2,
	};

	TreeOfLife(ctx, xy, style, 15);
	
	let xyEgg: XY = {
		x: 450, y: 250,
		r: 100,
		a: 0,
		s: 1
	};

	let styleEgg: Style = {
		strokeDashWidth: 0.2,
		strokeDashFill: 1,
		strokeWidth: 1,
	};
	
	SeedOfLife(ctx, xyEgg, styleEgg);
	FlowerOfLife(ctx, {y: xyEgg.y, x: xyEgg.x + 250, r: 75}, styleEgg);
	EggOfLife(ctx, {y: xyEgg.y, x: xyEgg.x + 550, r: 75, phase: 0.5}, styleEgg);
//	EggOfLife(ctx, {y: xyEgg.y, x: xyEgg.x + 850, r: 75, phase: 1}, styleEgg);
	FruitOfLife(ctx, {y: xyEgg.y, x: xyEgg.x + 850, r: 100}, styleEgg);
	MetatronsCube(ctx, {y: xyEgg.y, x: xyEgg.x + 1150, r: 100}, styleEgg);
}
