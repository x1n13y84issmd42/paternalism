import {XY, Style, Context, deg2rad, Point} from './sacred.types';
import {Generate} from './sacred.generate';

export function Circle(ctx: Context, xy: XY, style: Style) {
	Style.config(ctx, xy, style);
	ctx.beginPath();
	ctx.moveTo(xy.x + xy.r * xy.s, xy.y);
	ctx.arc(xy.x, xy.y, xy.r * xy.s, 0, deg2rad(360));
	ctx.closePath();
	ctx.stroke();
}

export function Polygon(ctx: Context, xy: XY, style: Style, sides: number) {
	Style.config(ctx, xy, style);
	ctx.beginPath();

	let points = Generate.polygon(xy, sides);
	let start = points.shift();
	ctx.moveTo(start.x, start.y);

	for (let p of points) {
		ctx.lineTo(p.x, p.y);
	}

	ctx.lineTo(start.x, start.y);

	ctx.closePath();
	ctx.stroke();
}

export function VesicaPiscis(ctx: Context, xy: XY, style: Style) {}

export function Polygram(ctx: Context, xy: XY, style: Style, sides: number, step = 2) {
	let points = Generate.polygon(xy, sides);
	let start = points[0];
	ctx.moveTo(start.x, start.y);

	let points_length = points.length;
	let edges = 0;
	let pi = 0;

	let p = points[pi];
	ctx.moveTo(p.x, p.y);

	while (edges < sides) {
		p = points[pi];
		ctx.lineTo(p.x, p.y);

		pi += step;
		if (pi >= points_length) {
			pi -= points_length;
		}

		edges++;
	}

	ctx.lineTo(start.x, start.y);
}

export function Dots(ctx: Context, points: Point[], r: number) {
	ctx.closePath();
	const xy: XY = {
		s: 1,
		x: 0,
		y: 0,
		a: 0,
		r: r
	};
	
	for (let p of points) {
		ctx.beginPath();
		Circle(ctx, {...xy, x:p.x, y:p.y}, {});
		ctx.closePath();
		ctx.fillStyle = 'black';
		ctx.fill();
	}
}

export function DaysOfCreation(ctx: Context, xy: XY, style: Style) {}

export function EggOfLife(ctx: Context, xy: XY, style: Style, r?: number) {
	r = r || xy.r * 0.75;
	let points = Generate.polygon(xy, 6);
	points = [
		points[0],
		points[2],
		points[4],
		points[1],
		points[3],
		points[5],
	];
	points = points.concat(Generate.center(points));

	for (let p of points) {
		Style.config(ctx, xy, style);
		ctx.beginPath();
		Circle(ctx, {x: p.x, y:p.y, r: r}, {});
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = 'white';
		ctx.fill();
	}
}

export function TreeOfLife(ctx: Context, xy: XY, style: Style, leafR = 10) {
	let points = Generate.treeOfLife(xy);
	let ptFruit = points[points.length - 1];
	Dots(ctx, points.slice(0, points.length - 1), leafR);

	Style.config(ctx, xy, style);
	ctx.beginPath();
	Circle(ctx, {...xy, x: ptFruit.x, y:ptFruit.y, r: leafR}, {});
	ctx.closePath();
	ctx.stroke();
}

export function SeedOfLife(ctx: Context, xy: XY, style: Style, r?: number) {
	r = r || xy.r / 2;
	let pts61 = Generate.polygon({...xy, r: xy.r/2}, 6);
	let pts62 = Generate.polygon(xy, 6);
	let pts62mid: Point[] = [];
	for (let pI=0; pI<pts62.length; pI++) {
		let p1 = pts62[pI];
		let p2 = pts62[(pI + 1) < pts62.length ? (pI + 1) : 0];
		pts62mid.push({x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2});
	}
	let ptC = Generate.center(pts61);
	let pts = [ptC].concat(pts61, pts62, pts62mid);
	
	Style.config(ctx, xy, style);

	ctx.beginPath();
	Circle(ctx, xy, style);
	ctx.fillStyle = 'white';
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	let gco = ctx.globalCompositeOperation;
	ctx.globalCompositeOperation = 'source-atop';
	ctx.beginPath();
	
	for (let pt of pts) {
		Circle(ctx, {...xy, x: pt.x, y:pt.y, r: r}, {});
	}
	
	ctx.closePath();
	ctx.stroke();
	
	ctx.globalCompositeOperation = gco;
}

export function FlowerOfLife(ctx: Context, xy: XY, style: Style, r?: number) {
	r = r || xy.r / 2;
	let pts61 = Generate.polygon({...xy, r: xy.r/2}, 6);
	let pts62 = Generate.polygon(xy, 6);
	let pts62mid: Point[] = [];
	for (let pI=0; pI<pts62.length; pI++) {
		let p1 = pts62[pI];
		let p2 = pts62[(pI + 1) < pts62.length ? (pI + 1) : 0];
		pts62mid.push({x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2});
	}
	let ptC = Generate.center(pts61);
	let pts = [ptC].concat(pts61, pts62, pts62mid);
	
	Style.config(ctx, xy, style);
	ctx.beginPath();
	
	for (let pt of pts) {
		Circle(ctx, {...xy, x: pt.x, y:pt.y, r: r}, {});
	}
	
	ctx.closePath();
	ctx.stroke();
}

export function FruitOfLife(ctx: Context, xy: XY, style: Style, r?: number) {
	r = r || xy.r / 4;
	let pts61 = Generate.polygon({...xy, r: xy.r/2}, 6);
	let pts62 = Generate.polygon(xy, 6);
	let ptC = Generate.center(pts61);
	let pts = [ptC].concat(pts61, pts62);
	
	Style.config(ctx, xy, style);
	ctx.beginPath();
	
	for (let pt of pts) {
		Circle(ctx, {...xy, x: pt.x, y:pt.y, r: r}, {});
	}
	
	ctx.closePath();
	ctx.stroke();
}

export function MetatronsCube(ctx: Context, xy: XY, style: Style, r?: number) {
	r = r || xy.r / 4;
	let pts61 = Generate.polygon({...xy, r: xy.r/2}, 6);
	let pts62 = Generate.polygon(xy, 6);
	let ptC = Generate.center(pts61);
	let pts = [ptC].concat(pts61, pts62);
	
	Style.config(ctx, xy, style);
	ctx.beginPath();

	for (let pt of pts) {
		ctx.moveTo(pt.x, pt.y);
		Circle(ctx, {...xy, x: pt.x, y:pt.y, r: r}, {});
		
		for (let i=0; i<pts.length; i++) {
			ctx.lineTo(pts[i].x, pts[i].y);
			ctx.moveTo(pt.x, pt.y);
		}
	}
	
	ctx.closePath();
	ctx.stroke();
}
