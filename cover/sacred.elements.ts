import {XY, Style, Context, Point, ForceFields} from './sacred.types';
import * as Generate from './sacred.generate';
import { deg2rad, Vector, Color, RGBA } from './sacred.math';

export function Circle(ctx: Context, xy: XY, style: Style) {
	xy = XY.def(xy);
	style = Style.def(style);

	let ops = Style.config(ctx, xy, style);
	ctx.beginPath();
	ctx.moveTo(xy.x + xy.r * xy.s, xy.y);
	ctx.arc(xy.x, xy.y, xy.r * xy.s, 0, deg2rad(360));
	ctx.closePath();
	ctx.stroke();
	ops.fill();
}

export function Line(ctx: Context, a: Point, b: Point, style: Style, scale = 1) {
	let xy = XY.def({...a, r: 1, s: 1});
	style = Style.def(style);
	xy.s = scale
	xy.r = Vector.length(Point.sub(a, b));

	Style.config(ctx, xy, style);
	ctx.beginPath();
	ctx.moveTo(a.x, a.y);
	ctx.lineTo(b.x, b.y);
	ctx.stroke();
	ctx.closePath();
}

export function Polygon(ctx: Context, xy: XY, style: Style, sides: number) {
	xy = XY.def(xy);
	style = Style.def(style);

	let ops = Style.config(ctx, xy, style);
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
	ops.fill();
}

//export function VesicaPiscis(ctx: Context, xy: XY, style: Style) {}

export function Polygram(ctx: Context, xy: XY, style: Style, sides: number, step = 2) {
	xy = XY.def(xy);
	style = Style.def(style);

	Style.config(ctx, xy, style);
	ctx.beginPath();

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

	ctx.closePath();
	ctx.stroke();
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

//export function DaysOfCreation(ctx: Context, xy: XY, style: Style) {}

export function EggOfLife(ctx: Context, xy: XY, style: Style, r?: number) {
	xy = XY.def(xy);
	style = Style.def(style);

	r = r || xy.r * xy.s * 0.75;

	let rescale =  xy.r / (xy.r + r);
	xy.s *= rescale;
	r *= rescale;

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
		Circle(ctx, {x: p.x, y:p.y, r: r}, style);
		// ctx.fillStyle = 'white';
		// ctx.fill();
	}
}

export function TreeOfLife(ctx: Context, xy: XY, style: Style, leafR = 10) {
	xy = XY.def(xy);
	style = Style.def(style);
	
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
	xy = XY.def(xy);
	style = Style.def(style);

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
	
	for (let pt of pts) {
		Circle(ctx, {...xy, x: pt.x, y:pt.y, r: r}, style);
	}
	
	ctx.globalCompositeOperation = gco;
}

export function FlowerOfLife(ctx: Context, xy: XY, style: Style, r?: number) {
	xy = XY.def(xy);
	style = Style.def(style);;

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
	
	for (let pt of pts) {
		Circle(ctx, {...xy, x: pt.x, y:pt.y, r: r}, style);
	}
}

export function FruitOfLife(ctx: Context, xy: XY, style: Style, style2?: Style, r?: number) {
	style2 = style2 || {...style, fill: style.fill ? Color.mul(style.fill as RGBA, 0.75) : false};

	xy = XY.def(xy);
	style = Style.def(style);

	r = r || xy.r / 4;
	let pts61 = Generate.polygon({...xy, r: xy.r/2}, 6);
	let pts62 = Generate.polygon(xy, 6);
	let ptC = Generate.center(pts61);
	
	for (let pt of pts61) {
		Circle(ctx, {...xy, x: pt.x, y:pt.y, r: r}, style2);
	}
	
	for (let pt of pts62) {
		Circle(ctx, {...xy, x: pt.x, y:pt.y, r: r}, style);
	}

	Circle(ctx, {...xy, x: ptC.x, y:ptC.y, r: r}, style);
}

export function MetatronsCube(ctx: Context, xy: XY, style: Style, r?: number) {
	xy = XY.def(xy);
	style = Style.def(style);

	r = r || xy.r / 4;
	let pts61 = Generate.polygon({...xy, r: xy.r/2}, 6);
	let pts62 = Generate.polygon(xy, 6);
	let ptC = Generate.center(pts61);
	let pts = [ptC].concat(pts61, pts62);

	for (let pt of pts) {
		Circle(ctx, {...xy, x: pt.x, y:pt.y, r: r}, {});
	}

	Style.config(ctx, xy, style);
	ctx.beginPath();

	for (let pt of pts) {
		ctx.moveTo(pt.x, pt.y);
		
		for (let i=0; i<pts.length; i++) {
			ctx.lineTo(pts[i].x, pts[i].y);
			ctx.moveTo(pt.x, pt.y);
		}
	}
	
	ctx.closePath();
	ctx.stroke();
}

export function Cube(ctx: Context, xy: XY, style: Style, backStyle?: Style) {
	xy = XY.def(xy);
	style = Style.def(style);

	backStyle = backStyle || {
		...style,
		strokeDashWidth: 0.2,
		strokeDashFill: 0.5,
		strokeWidth: style.strokeWidth / 2,
	};

	let frontStyle: Style = {
		...style,
	//	fill: false,
	};

	let pts6 = Generate.polygon(xy, 6);
	let center = Generate.center(pts6);

	//	Back edges
	let ops = Style.config(ctx, xy, backStyle);
	ctx.beginPath();
		ctx.moveTo(pts6[0].x, pts6[0].y);
		ctx.lineTo(center.x, center.y);
		ctx.moveTo(pts6[2].x, pts6[2].y);
		ctx.lineTo(center.x, center.y);
		ctx.moveTo(pts6[4].x, pts6[4].y);
		ctx.lineTo(center.x, center.y);
		ctx.moveTo(pts6[1].x, pts6[1].y);
		ctx.lineTo(center.x, center.y);
	ctx.closePath();
	ops.stroke();

	//	Front fill
	if (frontStyle.fill) {
		let fillTop = Color.mul(frontStyle.fill, 1);
		let fillR = Color.mul(frontStyle.fill, 0.85);
		let fillL = Color.mul(frontStyle.fill, 0.7);

		if (! frontStyle._3D) {
			fillTop = fillR = fillL = frontStyle.fill;
		}

		let ops = Style.config(ctx, xy, {
			strokeWidth: 0,
			fill: fillTop,
		});
		
		ctx.beginPath();
		ctx.moveTo(pts6[0].x, pts6[0].y);
		ctx.lineTo(pts6[1].x, pts6[1].y);
		ctx.lineTo(center.x, center.y);
		ctx.lineTo(pts6[5].x, pts6[5].y);
		ctx.closePath();
		ops.fill();
		
		ops = Style.config(ctx, xy, {
			strokeWidth: 0,
			fill: fillR,
		});

		ctx.beginPath();
		ctx.moveTo(pts6[1].x, pts6[1].y);
		ctx.lineTo(pts6[2].x, pts6[2].y);
		ctx.lineTo(pts6[3].x, pts6[3].y);
		ctx.lineTo(center.x, center.y);
		ctx.closePath();
		ops.fill();

		ops = Style.config(ctx, xy, {
			strokeWidth: 0,
			fill: fillL,
		});

		ctx.beginPath();
		ctx.moveTo(pts6[5].x, pts6[5].y);
		ctx.lineTo(center.x, center.y);
		ctx.lineTo(pts6[3].x, pts6[3].y);
		ctx.lineTo(pts6[4].x, pts6[4].y);
		ctx.closePath();
		ops.fill();
	}

	//	Outline & front edges
	ops = Style.config(ctx, xy, frontStyle);
	ctx.beginPath();
		ctx.moveTo(pts6[1].x, pts6[1].y);
		ctx.lineTo(center.x, center.y);
		ctx.moveTo(pts6[3].x, pts6[3].y);
		ctx.lineTo(center.x, center.y);
		ctx.moveTo(pts6[5].x, pts6[5].y);
		ctx.lineTo(center.x, center.y);
	ctx.closePath();
	ops.stroke();

	ctx.beginPath();
		let start = pts6.shift();
		ctx.moveTo(start.x, start.y);

		for (let p of pts6) {
			ctx.lineTo(p.x, p.y);
		}

		ctx.lineTo(start.x, start.y);
	ctx.closePath();
	ops.stroke();
}

export function Octahedron(ctx: Context, xy: XY, style: Style, backStyle?: Style) {
	xy = XY.def(xy);
	style = Style.def(style);
	backStyle = backStyle || {
		strokeDashWidth: 0.2,
		strokeDashFill: 0.5,
		strokeWidth: style.strokeDashWidth / 2,
	};

	Polygon(ctx, xy, style, 6);
	Polygon(ctx, xy, style, 3);
	Polygon(ctx, {...xy, phase: 0.5}, backStyle, 3);
}

export function ForceLine(ctx: Context, xy: XY, w: number, h: number, style: Style, ffields: ForceFields, forceLevel: number) {
	//TODO: render a line where force level is as specified.

	let sampleR = 10;

	for (let y = xy.y - w/2; y < xy.y + w/2; y += sampleR) {
		for (let x = xy.y - w/2; x < xy.y + w/2; x += sampleR) {
			//TODO: that circle |/—\ sampling algo
		}
	}
}

export function Spirals(ctx: Context, xy: XY, style: Style, twists: number, spirals: number) {
	xy = XY.def(xy);
	style = Style.def(style);
	Style.config(ctx, xy, style);

	const segmentsPerTwist = Math.max(15, xy.r * xy.s / 100 * 50);	//	30 segments for every 100 pixels of radius (at scale 1)
	const aStep = 360 / segmentsPerTwist;
	const numSteps = segmentsPerTwist * twists;
	
	for (let sI = 0; sI < spirals; sI++) {
		let aOffset = 360 / spirals * sI - 90;
		aOffset += (xy.phase || 0) * 360 / spirals;

		let sr = 0;

		ctx.beginPath();
		ctx.moveTo(xy.x, xy.y);

		for (let ssI = 0; ssI <= numSteps; ssI++) {
			let aScale = 1;//Math.abs(1 - sr);	//TODO:	This must be an attempt to dynamicall change resolution of spiral twists
			let x = xy.x + Math.cos(deg2rad(aOffset + ssI * aStep * aScale)) * xy.r * sr * xy.s;
			let y = xy.y + Math.sin(deg2rad(aOffset + ssI * aStep * aScale)) * xy.r * sr * xy.s;

			ctx.lineTo(x, y);

			sr += 1 / numSteps;
		}

		ctx.stroke();
		ctx.closePath();
	}
}