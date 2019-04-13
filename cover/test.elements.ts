import {XY, Context, Point, Style, Order} from './sacred.types';
import { Forces } from './sacred.forces';
import * as E from './sacred.elements';

export function elements(ctx: Context) {
	const xy = {x: 100, y: 100, r: 40};
	const style1: Style = {...Style.solid2, fill: [1, 1, 1, 1]};
	const style2: Style = {...Style.dash1, fill: [1, 1, 1, 1]};

	const dxy = (dx, dy) => ({x: xy.x+100*dx, y: xy.y+100*dy, r: xy.r});
	let dx = 0, dy = 0;

	E.Circle(ctx, dxy(dx++, dy), style1);
	
	E.Cube(ctx, dxy(dx++, dy), style1, style2);
	
	E.EggOfLife(ctx, dxy(dx++, dy), style1);
	
	E.FlowerOfLife(ctx, dxy(dx++, dy), style1);
	
	E.FruitOfLife(ctx, dxy(dx++, dy), style1);
	
	E.MetatronsCube(ctx, dxy(dx++, dy), Style.solid05);
	
	E.Octahedron(ctx, dxy(dx++, dy), style1, style2);

	dx = 0;
	dy++;
	
	E.Polygon(ctx, dxy(dx++, dy), style1, 3);
	
	E.Polygon(ctx, dxy(dx++, dy), style1, 4);
	
	E.Polygon(ctx, dxy(dx++, dy), style1, 5);
	
	E.Polygon(ctx, dxy(dx++, dy), style1, 6);
	
	E.Polygon(ctx, dxy(dx++, dy), style1, 7);
	
	E.Polygon(ctx, dxy(dx++, dy), style1, 8);

	dx = 0;
	dy++;
	
	E.Polygram(ctx, dxy(dx++, dy), style1, 3);
	
	E.Polygram(ctx, dxy(dx++, dy), style1, 5);
	
	E.Polygram(ctx, dxy(dx++, dy), style1, 7);
	
	E.Polygram(ctx, dxy(dx++, dy), style1, 9);
	
	E.Polygram(ctx, dxy(dx++, dy), style1, 11);
	
	E.Polygram(ctx, dxy(dx++, dy), style1, 13);

	dx = 0;
	dy++;
	
//	E.SeedOfLife(ctx, dxy(dx++, dy), style1);
	
//	E.TreeOfLife(ctx, dxy(dx++, dy), style1);
	
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 0.3, 3);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 0.5, 3);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 1, 3);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 1.5, 3);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 2, 3);

	dx = 0;
	dy++;

	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 0.3, 8);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 0.5, 8);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 1, 8);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 1.5, 8);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 2, 8);

	dx = 0;
	dy++;

	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 0.3, 12);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 0.5, 12);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 1, 12);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 1.5, 12);
	E.Spirals(ctx, dxy(dx++, dy), Style.solid1, 2, 12);
}
