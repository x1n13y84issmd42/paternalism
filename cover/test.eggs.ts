import {XY, Context, Point, Style, Order} from './sacred.types';
import { Forces } from './sacred.forces';
import * as S from './sacred.symbols';

export function eggs(ctx: Context) {
	const xy = {x: 200, y: 200, r: 100};
	const style1 = Style.solid2;
	const style2 = Style.dash1;

	const dxy = (dx, dy) => ({x: xy.x+250*dx, y: xy.y+250*dy, r: xy.r});
	let dx = 0, dy = 0;

	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 0.2);
	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 0.4);
	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 0.6);
	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 0.8);
	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 1.0);

	/* dx = 0;
	dy++;
	
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 0.0);
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 0.2);
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 0.4);
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 0.6);
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 0.8);
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 1.0); */

	dx = 0;
	dy++;
	
	S.Sphere(ctx, dxy(dx++, dy), style1, 5, 1);
	S.Sphere(ctx, dxy(dx++, dy), style1, 6, 1);
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 1);
	S.Sphere(ctx, dxy(dx++, dy), style1, 11, 1);
	S.Sphere(ctx, dxy(dx++, dy), style1, 12, 1);
	S.Sphere(ctx, dxy(dx++, dy), style1, 13, 1);
	
	dx = 0;
	dy++;
	
	S.FruitOfPower(ctx, dxy(dx++, dy), style1, 0.2);
	S.FruitOfPower(ctx, dxy(dx++, dy), style1, 0.4);
	S.FruitOfPower(ctx, dxy(dx++, dy), style1, 0.6);
	S.FruitOfPower(ctx, dxy(dx++, dy), style1, 0.8);
	S.FruitOfPower(ctx, dxy(dx++, dy), style1, 1.0);
}
