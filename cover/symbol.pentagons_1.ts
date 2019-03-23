import {XY, Style} from './sacred.types';
import {Polygon, Polygram, Dots} from './sacred.elements';
import {Generate} from './sacred.generate';

export function pentagons_1(ctx: CanvasRenderingContext2D) {
	let bigPentaXY = {
		x: 600, y: 600,
		r: 100,
		a: 0,
		s: 1
	};

	let frame = Generate.polygon({
		x: bigPentaXY.x, y: bigPentaXY.y,
		r: bigPentaXY.r,
		a: 0,
		s: 1
	}, 5);

	let bigPentaStyle = {
		strokeDashWidth: 0.1,
		strokeDashFill: 0.5,
		strokeWidth: 1,
	};

	Style.config(ctx, bigPentaXY, bigPentaStyle);
	ctx.beginPath();
	Polygon(ctx, bigPentaXY, bigPentaStyle, 5);
	ctx.closePath();
	ctx.stroke();

	const numOuterPolygons = 10;
	const outerPolygonOffset = 0.1;
	const outerPolygonFade = 0.03;
	for (let i=0; i<numOuterPolygons; i++) {
		let xy: XY = {
			...bigPentaXY,
			r: bigPentaXY.r * (1+(i*outerPolygonOffset))
		};

		let strokeDashWidth = (i === 0) ? 1 : bigPentaStyle.strokeDashWidth;
		let strokeDashFill = (i === 0) ? 1 : bigPentaStyle.strokeDashFill;
		let strokeWidth = (i === 0) ? 1 : 0.3 - i*outerPolygonFade;

		let style: Style = {
			...bigPentaStyle,
			strokeWidth,
			strokeDashWidth,
			strokeDashFill,
		};

		Style.config(ctx, xy, style);
		ctx.beginPath();
		Polygon(ctx, xy, style, 5);
		ctx.closePath();
		ctx.stroke();
	}

	const numInnerStars = 5;
	const innerStarOffset = 0.1;
	const innerStarStrokeFade = 0.3;
	for (let i=0; i<numInnerStars; i++) {
		let xy: XY = {
			...bigPentaXY,
			r: bigPentaXY.r * (1-(i*innerStarOffset))
		};

		let strokeDashWidth = (i === 0) ? 1 : bigPentaStyle.strokeDashWidth;
		let strokeDashFill = (i === 0) ? 1 : bigPentaStyle.strokeDashFill;

		let style: Style = {
			...bigPentaStyle,
			strokeWidth: bigPentaStyle.strokeWidth * (1-(i*innerStarStrokeFade)),
			strokeDashWidth: strokeDashWidth,
			strokeDashFill: strokeDashFill,
		};

		Style.config(ctx, xy, style);
		ctx.beginPath();
		Polygram(ctx, xy, style, 5);
		ctx.closePath();
		ctx.stroke();
	}

	
	for (let p of frame) {
		let pentaXY = {
			x: p.x, y: p.y,
			r: 30,
			a: 0,
			s: 1
		};

		let pentaStyle1 = {
			strokeDashWidth: 1,
			strokeDashFill: 1,
			strokeWidth: 1
		};

		let pentaStyle2 = {
			strokeDashWidth: 0.3,
			strokeDashFill: 0.5,
			strokeWidth: 1
		};

		Style.config(ctx, pentaXY, pentaStyle1);
		ctx.beginPath();
		Polygon(ctx, pentaXY, pentaStyle1, 5);
		ctx.closePath();
		ctx.stroke();


		pentaXY.r = 25;

		Style.config(ctx, pentaXY, pentaStyle2);
		ctx.beginPath();
		Polygon(ctx, pentaXY, pentaStyle2, 5);
		ctx.closePath();
		ctx.stroke();
	}

	Dots(ctx, frame, 10);
	
	Dots(ctx, Generate.polygon({
		x: bigPentaXY.x, y: bigPentaXY.y,
		r: bigPentaXY.r,
		a: 0,
		s: 1
	}, 5), 10);
}
