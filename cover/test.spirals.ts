import {XY, Context, Point, Style, Order} from './sacred.types';
import { Forces } from './sacred.forces';
import * as S from './sacred.symbols';

export function spirals(ctx: Context) {
	const xy = {x: 100, y: 100, r: 50};
	const style1: Style = {...Style.solid2, strokeWidth: 1.5, fill: [0.7, 0.8, 1, 1], _3D: true};
	const style2 = Style.dash1;

	const dxy = (dx, dy, r=1, o={x:0,y:0}) => ({x: o.x+xy.x+xy.r*2.5*dx*r, y: o.y+xy.y+xy.r*3*dy, r: xy.r});
	let dx = 0, dy = 0;

	S.Spiral_1(ctx, dxy(dx++, dy, 0.1), style1, 0.1);
	S.Spiral_1(ctx, dxy(dx++, dy, 0.2), style1, 0.2);
	S.Spiral_1(ctx, dxy(dx++, dy, 0.4), style1, 0.4);
	S.Spiral_1(ctx, dxy(dx++, dy, 0.5), style1, 0.5);
	S.Spiral_1(ctx, dxy(dx++, dy, 0.6), style1, 0.6);
	// S.Spiral_1(ctx, dxy(dx++, dy, 0.7), style1, 0.7);
	S.Spiral_1(ctx, dxy(dx++, dy, 0.8), style1, 0.8);
	S.Spiral_1(ctx, dxy(dx++, dy, 1.0), style1, 1.0);

	// dy++;
	let o = dxy(dx++, dy, 1.0);
	o.y = 0;
	dx = 0;

	S.Spiral_2(ctx, dxy(dx++, dy, 0.2, o), style1, 0.2);
	S.Spiral_2(ctx, dxy(dx++, dy, 0.3, o), style1, 0.3);
	S.Spiral_2(ctx, dxy(dx++, dy, 0.4, o), style1, 0.4);
	S.Spiral_2(ctx, dxy(dx++, dy, 0.5, o), style1, 0.5);
	S.Spiral_2(ctx, dxy(dx++, dy, 0.6, o), style1, 0.6);
	// S.Spiral_2(ctx, dxy(dx++, dy, 0.7, o), style1, 0.7);
	S.Spiral_2(ctx, dxy(dx++, dy, 0.8, o), style1, 0.8);
	S.Spiral_2(ctx, dxy(dx++, dy, 1.0, o), style1, 1.0);

	dx = 0;
	dy++;

	S.Cuboids_1(ctx, dxy(dx++, dy, 0.2), style1, 0.2);
	S.Cuboids_1(ctx, dxy(dx++, dy, 0.3), style1, 0.3);
	S.Cuboids_1(ctx, dxy(dx++, dy, 0.4), style1, 0.4);
	S.Cuboids_1(ctx, dxy(dx++, dy, 0.5), style1, 0.5);
	S.Cuboids_1(ctx, dxy(dx++, dy, 0.6), style1, 0.6);
	// S.Cuboids_1(ctx, dxy(dx++, dy, 0.7), style1, 0.7);
	S.Cuboids_1(ctx, dxy(dx++, dy, 0.8), style1, 0.8);
	S.Cuboids_1(ctx, dxy(dx++, dy, 1.0), style1, 1.0);

	dx = 0;
	dy++;

	S.Hexa_1(ctx, dxy(dx++, dy, 0.2), style1, 0.2);
	S.Hexa_1(ctx, dxy(dx++, dy, 0.3), style1, 0.3);
	S.Hexa_1(ctx, dxy(dx++, dy, 0.4), style1, 0.4);
	S.Hexa_1(ctx, dxy(dx++, dy, 0.5), style1, 0.5);
	S.Hexa_1(ctx, dxy(dx++, dy, 0.6), style1, 0.6);
	// S.Hexa_1(ctx, dxy(dx++, dy, 0.7), style1, 0.7);
	S.Hexa_1(ctx, dxy(dx++, dy, 0.8), style1, 0.8);
	S.Hexa_1(ctx, dxy(dx++, dy, 1.0), style1, 1.0);

//	dx = 0;
//	dy++;
	o = dxy(dx++, dy, 1.0);
	o.y = 0;
	dx = 0;
	
	S.Hexa_2(ctx, dxy(dx++, dy, 0.2, o), style1, 0.2);
	S.Hexa_2(ctx, dxy(dx++, dy, 0.3, o), style1, 0.3);
	S.Hexa_2(ctx, dxy(dx++, dy, 0.4, o), style1, 0.4);
	S.Hexa_2(ctx, dxy(dx++, dy, 0.5, o), style1, 0.5);
	S.Hexa_2(ctx, dxy(dx++, dy, 0.6, o), style1, 0.6);
//	S.Hexa_2(ctx, dxy(dx++, dy, 0.7, o), style1, 0.7);
	S.Hexa_2(ctx, dxy(dx++, dy, 0.8, o), style1, 0.8);
//	S.Hexa_2(ctx, dxy(dx++, dy, 0.9, o), style1, 0.9);
	S.Hexa_2(ctx, dxy(dx++, dy, 1.0, o), style1, 1.0);
	
	dx = 0;
	dy++;

	/* S.Hexa_3(ctx, dxy(dx++, dy), style1, 0.2);
	S.Hexa_3(ctx, dxy(dx++, dy), style1, 0.4);
	S.Hexa_3(ctx, dxy(dx++, dy), style1, 0.6);
	S.Hexa_3(ctx, dxy(dx++, dy), style1, 0.8);
	S.Hexa_3(ctx, dxy(dx++, dy), style1, 1.0); */

	// dx = 0;
	// dy++;

	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 0.2);
	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 0.3);
	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 0.4);
	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 0.5);
	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 0.6);
	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 0.8);
	S.EggOfComplexity(ctx, dxy(dx++, dy), style1, 1.0);

	dx = 0;
	dy++;
	
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 0.0);
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 0.2);
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 0.4);
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 0.6);
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 0.8);
	S.Sphere(ctx, dxy(dx++, dy), style1, 10, 1.0);

	o = dxy(dx++, dy, 1.0);
	o.y = 0;
	dx = 0;
	
	S.Sphere(ctx, dxy(dx++, dy, 1, o), style1, 5, 1);
	S.Sphere(ctx, dxy(dx++, dy, 1, o), style1, 6, 1);
	S.Sphere(ctx, dxy(dx++, dy, 1, o), style1, 10, 1);
	S.Sphere(ctx, dxy(dx++, dy, 1, o), style1, 11, 1);
	S.Sphere(ctx, dxy(dx++, dy, 1, o), style1, 12, 1);
	S.Sphere(ctx, dxy(dx++, dy, 1, o), style1, 13, 1);
	
	dx = 0;
	dy++;
	
	S.FruitOfPower(ctx, dxy(dx++, dy, 0.2), style1, 0.2);
	S.FruitOfPower(ctx, dxy(dx++, dy, 0.3), style1, 0.3);
	S.FruitOfPower(ctx, dxy(dx++, dy, 0.4), style1, 0.4);
	S.FruitOfPower(ctx, dxy(dx++, dy, 0.5), style1, 0.5);
	S.FruitOfPower(ctx, dxy(dx++, dy, 0.6), style1, 0.6);
	S.FruitOfPower(ctx, dxy(dx++, dy, 0.8), style1, 0.8);
	S.FruitOfPower(ctx, dxy(dx++, dy, 1.0), style1, 1.0);
}
