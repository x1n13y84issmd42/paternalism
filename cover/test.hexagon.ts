import {XY, Context, Point, Style, Order} from './sacred.types';
import { Forces } from './sacred.forces';
import * as S from './sacred.symbols';

export function hexagon(ctx: Context) {
	const xy = {x: 100, y: 100, r: 100};
	const style1: Style = {
		...Style.solid2,
		fill: [0.7, 0.8, 1, 1],
		stroke: [1, 0, 1, 1],
	};
	const style2 = Style.dash1;

	const dxy = (dx, dy) => ({x: xy.x+250*dx, y: xy.y+250*dy, r: xy.r});
	let dx = 0, dy = 0;

	S.Hexa_1(ctx, dxy(dx++, dy), style1, 0.2);
	S.Hexa_1(ctx, dxy(dx++, dy), style1, 0.4);
	S.Hexa_1(ctx, dxy(dx++, dy), style1, 0.6);
	S.Hexa_1(ctx, dxy(dx++, dy), style1, 0.8);
	S.Hexa_1(ctx, dxy(dx++, dy), style1, 1.0);

	dx = 0;
	dy++;
	
	S.Hexa_2(ctx, dxy(dx++, dy), style1, 0.2);
//	S.Hexa_2(ctx, dxy(dx++, dy), style1, 0.3);
	S.Hexa_2(ctx, dxy(dx++, dy), style1, 0.4);
//	S.Hexa_2(ctx, dxy(dx++, dy), style1, 0.5);
	S.Hexa_2(ctx, dxy(dx++, dy), style1, 0.6);
//	S.Hexa_2(ctx, dxy(dx++, dy), style1, 0.7);
	S.Hexa_2(ctx, dxy(dx++, dy), style1, 0.8);
//	S.Hexa_2(ctx, dxy(dx++, dy), style1, 0.9);
	S.Hexa_2(ctx, dxy(dx++, dy), style1, 1.0);
	
	dx = 0;
	dy++;

	S.Hexa_3(ctx, dxy(dx++, dy), style1, 0.2);
	S.Hexa_3(ctx, dxy(dx++, dy), style1, 0.4);
	S.Hexa_3(ctx, dxy(dx++, dy), style1, 0.6);
	S.Hexa_3(ctx, dxy(dx++, dy), style1, 0.8);
	S.Hexa_3(ctx, dxy(dx++, dy), style1, 1.0);
}
