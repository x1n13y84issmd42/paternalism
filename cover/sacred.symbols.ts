import {Context, XY, Style} from './sacred.types';
import * as E from './sacred.elements';
import * as G from './sacred.generate';
import {fn, deg2rad, Color, RGBA, lerp} from './sacred.math';


export function Hexa_1(ctx: Context, xy: XY, style: Style, f: number) {
	let style1: Style = {...style, fill: false};
	let style3 = {
		...style,
		fill: false as false,
		strokeWidth: style.strokeWidth / 2,
		strokeDashWidth: 0.2,
		strokeDashFill: 0.5
	};

	xy.s = f;

	//	Two small circles in the center
	// E.Circle(ctx, {...xy, r: xy.r/6}, style1)
	// E.Circle(ctx, {...xy, r: xy.r/4}, style1)

	//	Smaller polygons in vertices of the bigger one
	let polyXY = {...xy, r: xy.r/1.2};
	let polyPoints = G.polygon({...polyXY, s: f}, 6);

	//	Solid and dashed polygons change places as force changes
	let smRFn = Math.abs(Math.cos((f) * Math.PI));
	let smR = polyXY.r/3 * f;
	let smRV = 2;
	let smPolyR1 = smR + smRFn * smR/smRV;

	for (let pp of polyPoints) {
		E.Polygon(ctx, {...pp, r: smPolyR1, s: f}, {...style3, fill: style.fill}, 6)
	}

	//	Cross lines
	let polyOutwardsPoints = G.outwards(polyPoints, smPolyR1 * f);

	for (let p of polyOutwardsPoints) {
		E.Line(ctx, xy, p, {...style3, strokeDashWidth: 0.1, strokeDashFill: 0.3} as Style, f);
	}
}

export function Hexa_1_1(ctx: Context, xy: XY, style: Style, f: number) {
	let style1 = Style.solid1;
	let style2 = Style.solid2;
	let style3 = Style.dash1;

	xy.s = f;

	//	Two small circles in the center
	E.Circle(ctx, {...xy, r: xy.r/6}, style1)
	E.Circle(ctx, {...xy, r: xy.r/4}, style1)

	//	Two big solid polygons
	let polyXY = {...xy, r: xy.r/1.2, s: fn.scale(f, 0.3)};
	E.Polygon(ctx, polyXY, style1, 6)
	E.Polygon(ctx, {...polyXY, r: xy.r/1.4}, style1, 6)

	//	Smaller polygons in vertices of the bigger one
	let polyPoints = G.polygon({...polyXY, s: f}, 6);
	let smPolyR1 = polyXY.r/2;
	let smPolyR2 = polyXY.r/2 - 10*f;

	for (let pp of polyPoints) {
		E.Polygon(ctx, {...pp, r: smPolyR1, s: f}, style1, 6)
		E.Polygon(ctx, {...pp, r: smPolyR2, s: f}, style3, 6)
	}

	let polyOutwardsPoints = G.outwards(polyPoints, smPolyR1 * f);
//	E.Dots(ctx, polyOutwardsPoints, 4 * f * xy.s);

	for (let p of polyOutwardsPoints) {
		E.Line(ctx, xy, p, {...style3, strokeDashWidth: 0.1, strokeDashFill: 0.3}, f);
	}
}

export function EggOfComplexity(ctx: Context, xy: XY, style: Style, f: number) {
	xy.s = f;
	let eggXY = {...xy};
	let eggStyle: Style = {
		...style,
		fill: false,
		strokeDashWidth: 0.1,
		strokeDashFill: f
	};

	let polyStyle: Style = {...style, fill: false, strokeWidth: style.strokeWidth / 2 * f, strokeDashWidth: 0.1, strokeDashFill: 0.2};

	E.EggOfLife(ctx, eggXY, eggStyle);

	let eggPoints = G.polygon(eggXY, 6);
//	E.Dots(ctx, eggPoints, 8 * f);
	
	E.Polygon(ctx, {...eggPoints[0], s: f, r: xy.r * 0.6, phase: 0.5 * f}, polyStyle, 3);
	E.Polygon(ctx, {...eggPoints[2], s: f, r: xy.r * 0.6, phase: 0.5 * f}, polyStyle, 3);
	E.Polygon(ctx, {...eggPoints[4], s: f, r: xy.r * 0.6, phase: 0.5 * f}, polyStyle, 3);
	
	E.Polygon(ctx, {...eggPoints[1], s: f, r: xy.r * 0.4, phase: 1 * f}, polyStyle, 3);
	E.Polygon(ctx, {...eggPoints[3], s: f, r: xy.r * 0.4, phase: 1 * f}, polyStyle, 3);
	E.Polygon(ctx, {...eggPoints[5], s: f, r: xy.r * 0.4, phase: 1 * f}, polyStyle, 3);

	let outwardDots = G.outwards(G.polygon({...eggXY, phase: 0.5}, 6), eggXY.r * 0.5 * f);
	let lineStyle: Style = {
		...style,
		fill: false,
		strokeWidth: style.strokeWidth / 2,
		strokeDashWidth: 0.05,
		strokeDashFill: 0.2,
	};

	E.Line(ctx, outwardDots[0], outwardDots[3], lineStyle);
	E.Line(ctx, outwardDots[1], outwardDots[4], lineStyle);
	E.Line(ctx, outwardDots[2], outwardDots[5], lineStyle);

	/* E.Spirals(
		ctx,
		{
			...eggXY,
			phase: 0.5,
			r: eggXY.r * f
		}, {
			...style2,
			strokeWidth: Math.min(1.5, 2 * f),
		//	strokeDashFill: 1 - 0.7 * f,
		//	strokeDashWidth: 0.1,
		},
		0.5 * f,
		6
	); */
}

export function EggOfComplexity_Superchaotic(ctx: Context, xy: XY, style: Style, f: number, chaosThreshold = 0.75) {
	xy.s = f;
	let chaos = 0;

	if (f < chaosThreshold) {
		chaos = (chaosThreshold - f) / chaosThreshold;
	}

	let eggXY = {...xy, phase: chaos * -2, r: xy.r * (1+(4*chaos))};
	let eggStyle: Style = {
		...style,
		fill: false,
		strokeDashWidth: 0.1,
		strokeDashFill: f
	};

	let polyStyle: Style = {...style, fill: false, strokeWidth: style.strokeWidth / 2, strokeDashWidth: 0.3, strokeDashFill: 0.5};

	E.EggOfLife(ctx, eggXY, eggStyle, xy.r*xy.s*0.75*(1-chaos));

	let eggPoints = G.polygon({...eggXY, r: xy.r * (1 + (4 * chaos))}, 6);
//	E.Dots(ctx, eggPoints, 8 * f);
	
	E.Polygon(ctx, {...eggPoints[0], s: f, r: xy.r * 0.6, phase: 0.5 * f}, polyStyle, 3);
	E.Polygon(ctx, {...eggPoints[2], s: f, r: xy.r * 0.6, phase: 0.5 * f}, polyStyle, 3);
	E.Polygon(ctx, {...eggPoints[4], s: f, r: xy.r * 0.6, phase: 0.5 * f}, polyStyle, 3);
	
	E.Polygon(ctx, {...eggPoints[1], s: f, r: xy.r * 0.4, phase: 1 * f}, polyStyle, 3);
	E.Polygon(ctx, {...eggPoints[3], s: f, r: xy.r * 0.4, phase: 1 * f}, polyStyle, 3);
	E.Polygon(ctx, {...eggPoints[5], s: f, r: xy.r * 0.4, phase: 1 * f}, polyStyle, 3);

	let outwardDots = G.outwards(G.polygon({...eggXY, phase: 0.5}, 6), eggXY.r * 0.5 * f);
	let lineStyle: Style = {
		...style,
		fill: false,
		strokeWidth: style.strokeWidth / 2,
		strokeDashWidth: 0.05,
		strokeDashFill: 0.2,
	};

	E.Line(ctx, outwardDots[0], outwardDots[3], lineStyle);
	E.Line(ctx, outwardDots[1], outwardDots[4], lineStyle);
	E.Line(ctx, outwardDots[2], outwardDots[5], lineStyle);

	/* E.Spirals(
		ctx,
		{
			...eggXY,
			phase: 0.5,
			r: eggXY.r * f
		}, {
			...style2,
			strokeWidth: Math.min(1.5, 2 * f),
		//	strokeDashFill: 1 - 0.7 * f,
		//	strokeDashWidth: 0.1,
		},
		0.5 * f,
		6
	); */
}

export function Hexa_2(ctx: Context, xy: XY, style: Style, f: number) {
	xy.s = f;
	xy.phase = (1-f)*2;

	let fSin = fn.f101(f);

	let style1 = {...style, fill: false as false};

	let style3: Style = {
		...style,
		fill: false,
		strokeWidth: style.strokeWidth / 2,
		strokeDashWidth: 0.1,
		strokeDashFill: 0.3,
	};
	
	let style2: Style = {
		...style1,
		fill: false,
		strokeWidth: style1.strokeWidth / 2
	};
	
	let polyR = xy.r/2;
	let polyRD = xy.r/3;
	let polyXY1 = {...xy, r: polyR + polyRD};
	let polyXY2 = {...xy, r: polyR};
	
	//	The inner, filled one
	E.Polygon(ctx, polyXY2, style2, 6);
	E.Cube(ctx, polyXY2, style);
	E.Circle(ctx, polyXY2, style3);

	//	The outer
	E.Polygon(ctx, polyXY1, style1, 6);
	
	let polyMidpoints2 = G.midpoints(G.polygon(polyXY2, 6));
	
	let virtualPolyXY = {...polyXY1, r: polyXY1.r + polyXY1.r * (1-f), phase: polyXY2.phase-0.5};
	let virtualPolyPoints = G.polygon(virtualPolyXY, 6);
	let virtualPolyMidPoints = G.midpoints(virtualPolyPoints);
	E.Polygon(ctx, virtualPolyXY, style3, 6);
	
	for (let mpI=0; mpI<virtualPolyMidPoints.length; mpI++) {
		E.Line(ctx, polyMidpoints2[mpI], virtualPolyMidPoints[mpI], style3);
		E.Line(ctx, virtualPolyMidPoints[mpI], polyMidpoints2[mpI-1] || polyMidpoints2[polyMidpoints2.length-1], style3);
	}
}

export function Hexa_2_Chaotic(ctx: Context, xy: XY, style: Style, f: number) {
	xy.s = f;
	xy.phase = (1-f)*2;

	let chaos = 0;
	let fc = 1;
	let chaosThreshold = 0.95;

	if (f < chaosThreshold) {
		chaos = (chaosThreshold - f) / chaosThreshold;
		fc = 1 - (chaosThreshold - f)
	}

	let style1 = {...style, fill: false as false};

	let style3: Style = {
		...style,
		fill: false,
		strokeWidth: style.strokeWidth / 2,
		strokeDashWidth: 0.1,
		strokeDashFill: 0.3,
	};
	
	let style2: Style = {
		...style1,
		fill: false,
		strokeWidth: style1.strokeWidth / 2
	};
	
	let polyR = xy.r/2;
	let polyRD = xy.r/3;
	let polyXY1 = {...xy, r: polyR + polyRD};
	let polyXY2 = {...xy, r: polyR};
	
	//	The inner, filled one
	E.Polygon(ctx, polyXY2, style2, 6);
	E.Cube(ctx, polyXY2, style);
	E.Circle(ctx, polyXY2, style3);

	//	The outer
	E.Polygon(ctx, polyXY1, style1, 6);
	
	let polyMidpoints2 = G.midpoints(G.polygon(polyXY2, 6));
	
	let virtualPolyXY = {...polyXY1, r: polyXY1.r * (1+(4*chaos)), phase: polyXY2.phase-0.5};
	let virtualPolyPoints = G.polygon(virtualPolyXY, 6);
	let virtualPolyMidPoints = G.midpoints(virtualPolyPoints);
	E.Polygon(ctx, virtualPolyXY, style3, 6);
	
	for (let mpI=0; mpI<virtualPolyMidPoints.length; mpI++) {
		E.Line(ctx, polyMidpoints2[mpI], virtualPolyMidPoints[mpI], style3);
		E.Line(ctx, virtualPolyMidPoints[mpI], polyMidpoints2[mpI-1] || polyMidpoints2[polyMidpoints2.length-1], style3);
	}
}

export function Hexa_2_1(ctx: Context, xy: XY, style: Style, f: number) {
	xy.s = f;
	let fSin = Math.sin(f) * 0.5 + 0.5;
	let fCos = Math.cos(f) * 0.5 + 0.5;

	let style1 = Style.solid2;
	let style2 = Style.solid1;
	let style3 = Style.dash101;

	E.Circle(ctx, xy, style3);
	E.Circle(ctx, {...xy, r: xy.r/10}, style1);
	E.Dots(ctx, [xy], 5 * f);
	
	let polyXY1 = {...xy, phase: 0.5};
	let polyXY2 = {...xy, r: xy.r  * 0.6, phase: 0.5, s: fSin};
	
	E.Polygon(ctx, polyXY1, style1, 6);
	E.Polygon(ctx, polyXY2, style1, 6);
	E.Circle(ctx, polyXY2, style3);

	let polyMidpoints2 = G.midpoints(G.polygon(polyXY2, 6));
	for (let p of polyMidpoints2) {
		E.Line(ctx, p, xy, style2)
	}

	let virtualPolyXY = {...xy, s: fSin * f};
	let virtualPolyPoints = G.polygon(virtualPolyXY, 6);
	let virtualPolyMidPoints = G.midpoints(virtualPolyPoints);
	E.Polygon(ctx, virtualPolyXY, style2, 6);

	for (let mpI=0; mpI<virtualPolyMidPoints.length; mpI++) {
		E.Line(ctx, polyMidpoints2[mpI], virtualPolyMidPoints[mpI], style2);
		E.Line(ctx, virtualPolyMidPoints[mpI], polyMidpoints2[mpI-1] || polyMidpoints2[polyMidpoints2.length-1], style2);
	}
}

export function Sphere(ctx: Context, xy: XY, style: Style, layers: number, f: number) {
	xy = XY.def(xy);
	style = Style.def(style);
	
	let layerY = xy.y - xy.r;
	let perspective = true;
	let rp = 0.2

	if (f === 0) {
		f = 0.0001;
	}

	function backSide(y: number, rx: number, ry: number) {
		let a2 = 0;
		let a1 = deg2rad(360 - 180 * (f));
		let cw = false;

		let backStyle = {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, strokeWidth: style.strokeWidth * 0.5};

		if (y < xy.y && perspective) {
			cw = true;
			a2 = 0;
			a1 = deg2rad(180 * f);
		}
		
		let ops = Style.config(ctx, xy, backStyle);
		ctx.beginPath();

		ctx.ellipse(xy.x, y, rx, xy.r*0.1*ry, 0, a1, a2, cw);
	
		ctx.stroke();
		ops.fill();
		ctx.closePath();
	}

	function frontSide(y: number, rx: number, ry: number) {
		let a1 = 0;
		let a2 = deg2rad(180 * f);
		let cw = false;
		
		if (y < xy.y && perspective) {
			cw = true;
			a1 = 0;
			a2 = deg2rad(360 - 180 * f);
		}
		
		let ops = Style.config(ctx, xy, style);
		ctx.beginPath();

		ctx.ellipse(xy.x, y, rx, xy.r*rp*ry, 0, a1, a2, cw);
	
		ctx.stroke();
		ops.fill();
		ctx.closePath();
	}

	let topLayers = Math.floor(layers / 2);
	let bottomLayers = layers - topLayers;
	
	for (let lI = 0; lI < topLayers; lI++) {
		
		let rx = Math.sin(lI/layers*Math.PI) * xy.r;
		let y = layerY + (1 - Math.cos(lI / layers * Math.PI)) * xy.r;
		let ry = perspective ? Math.abs(Math.cos(lI/layers*Math.PI)) : 1;

		if (rx < 1) {
			continue;
		}
		
		frontSide(y, rx, ry);
		backSide(y, rx, ry);
	}

	for (let lI = bottomLayers; lI >= 0; lI--) {
		
		let lI1 = lI + topLayers;
		let rx = Math.sin(lI1/layers*Math.PI) * xy.r;
		let y = layerY + (1 - Math.cos(lI1 / layers * Math.PI)) * xy.r;
		let ry = perspective ? Math.abs(Math.cos(lI1/layers*Math.PI)) : 1;

		if (rx < 1) {
			continue;
		}
		
		backSide(y, rx, ry);
		frontSide(y, rx, ry);
	}

	// E.Circle(ctx, xy, style);
}

export function Hexa_3(ctx: Context, xy: XY, style: Style, f: number) {
	let style1 = {...style, fill: false as false,};

	let strokeD = 0.5;
	let strokeDF = 0.5;

	let style2 = {
		...style,
		fill: false as false,
		strokeWidth: style.strokeWidth / 2,
		strokeDashWidth: 0.1,
		strokeDashFill: strokeDF + fn.f010(f) * strokeD
	};

	let style3 = {
		...style,
		fill: false as false,
		strokeDashWidth: 0.08,
		strokeDashFill: 0.5,
		strokeWidth: 1
	};

	let circleStyle = {
		...style2,
		fill: style.fill,
	};

	xy.s = f;

	let polyXY = {...xy};
	E.Polygon(ctx, polyXY, style1, 6);
	E.Polygon(ctx, {...polyXY, phase: 0.5}, style3, 6);

	E.Polygon(ctx, {...polyXY, phase: 0.25}, style2, 3);
	E.Polygon(ctx, {...polyXY, phase: 0.75}, style2, 3);

	let polyPts = G.polygon(polyXY, 6);
	let circlePts = G.outwards(polyPts, xy.r*xy.s*-0.425);

	for (let p of circlePts) {
		E.Circle(ctx, {...p, r: xy.r/6, s:xy.s}, circleStyle);
	}
}

export function FruitOfPower(ctx: Context, xy: XY, style: Style, f: number) {
	let fruitStyle: Style = {...style/* , fill: [1, 1, 1, 1] */};
	let fruitStyle2: Style = {...style, fill: fruitStyle.fill ? Color.mul(fruitStyle.fill as RGBA, 0.75) : false};

	let circleStyle = {
		...style,
		fill: false,
		strokeWidth: style.strokeWidth / 2,
	};

	xy.s = f;

	let fruitXY = {...xy};
	
	let numCircles = 5;
	let circleBeltW = 0.4;
	
	for (let cI=0; cI<numCircles; cI++) {
		let q = (1 - (cI / numCircles * circleBeltW));
		E.Circle(ctx, {...xy, s: xy.s * q}, {...circleStyle, strokeWidth: circleStyle.strokeWidth * q, strokeDashFill: 1} as Style);
	}
	
	let triXY = {...xy, r: xy.r/2 + fn.f010(f) * xy.r/2};
	let triStyle: Style = {...style, fill: false, strokeWidth: style.strokeWidth/2};
	E.Polygon(ctx, triXY, triStyle, 3);
	E.Polygon(ctx, {...triXY, phase: 0.5}, triStyle, 3);
	
	E.Polygon(ctx, {...triXY, r: xy.r, phase: 0.5}, triStyle, 3);
	E.FruitOfLife(ctx, fruitXY, fruitStyle);
	
}

export function FruitOfSimplicity(ctx: Context, xy: XY, style: Style, f: number) {
	let fruitStyle = {...style};

	xy.s = f;

	let fruitXY = {...xy};
	E.FruitOfLife(ctx, fruitXY, fruitStyle, undefined, xy.r/4*f);
}

export function FruitOfSimplicity_Chaotic(ctx: Context, xy: XY, style: Style, f: number) {
	let fruitStyle = {...style};

	xy.s = f;

	let chaos = 1;
	let fc = 1;
	let chaosThreshold = 0.75;

	if (f < chaosThreshold) {
		chaos = (chaosThreshold - f) / chaosThreshold;
		fc = 1 - (chaosThreshold - f)
	}

	let fruitXY = {...xy, phase: 4 * chaos};
	E.FruitOfLife(ctx, fruitXY, fruitStyle, undefined, xy.r/4*f);
}

export function Spiral_1(ctx: Context, xy: XY, style: Style, f: number) {
	xy = XY.def(xy);
	style = Style.def(style);
	xy.s = f;

	let spiralStyle: Style = {...style};
	let spiralXY: XY = {...xy};
	let sphereStyle: Style = {...style};
	let sphereXY: XY = {...xy, r: xy.r * 0.1};

	let numTwists = 1;
	let numSpirals = Math.max(3, Math.round(7 * f));

	E.Spirals(ctx, spiralXY, spiralStyle, numTwists, numSpirals);
	
	let polyPts = G.polygon({...spiralXY}, numSpirals);
	
	for (let pt of polyPts) {
		E.Circle(ctx, {...sphereXY, ...pt}, sphereStyle);
	}
	
	// E.Circle(ctx, {...xy, r: sphereXY.r * 2}, sphereStyle);
}

export function Spiral_1_Chaotic(ctx: Context, xy: XY, style: Style, f: number) {
	xy = XY.def(xy);
	style = Style.def(style);
	xy.s = f;

	let chaos = 1;
	let fc = 1;
	let chaosThreshold = 0.0;

	if (f < chaosThreshold) {
		chaos = 1 + (chaosThreshold - f) / chaosThreshold;
		fc = 1 - (chaosThreshold - f)
	}

	let spiralStyle: Style = {...style};
	let spiralXY: XY = {...xy, r: xy.r};
	let sphereStyle: Style = {...style};
	let sphereXY: XY = {...xy, r: xy.r * 0.1};

	let numTwists = 1 * f;
	let numSpirals = Math.max(3, Math.round(5 * f));

	E.Spirals(ctx, spiralXY, spiralStyle, numTwists, numSpirals);
	
	let polyPts = G.polygon({...spiralXY, r: spiralXY.r * chaos, phase: 0.5 + 0.5 * f}, numSpirals);
	
	for (let pt of polyPts) {
		E.Circle(ctx, {...sphereXY, ...pt}, sphereStyle);
	}
	
	// E.Circle(ctx, {...xy, r: sphereXY.r * 2}, sphereStyle);
}

export function Spiral_2(ctx: Context, xy: XY, style: Style, f: number) {
	xy = XY.def(xy);
	style = Style.def(style);
	xy.s = f;

	let spiralStyle: Style = {
		...style,
		strokeDashWidth: 0.2,
		strokeDashFill: f,
	};
	
	let spiralXY: XY = {...xy};
	let polyXY: XY = {...xy, phase: 0.5};
	let polyStyle: Style = {
		...style,
		fill: false,
		// strokeDashWidth: 0.2,
		// strokeDashFill: (1-f),
	};
	let sphereStyle: Style = {...style};
	let sphereXY: XY = {...xy, r: xy.r * 0.1};

	let numTwists = 1;
	let numSpirals = 3;

	E.Spirals(ctx, spiralXY, spiralStyle, numTwists, numSpirals);
	E.Polygon(ctx, polyXY, polyStyle, numSpirals);
	
	let polyPts = G.polygon(spiralXY, numSpirals);
	
	for (let pt of polyPts) {
		E.Circle(ctx, {...sphereXY, ...pt}, sphereStyle);
	}
	
	// E.Circle(ctx, {...xy, r: sphereXY.r * 2}, sphereStyle);
}

export function Spiral_2_Chaotic(ctx: Context, xy: XY, style: Style, f: number) {
	xy = XY.def(xy);
	style = Style.def(style);
	xy.s = f;

	let spiralStyle: Style = {
		...style,
		strokeDashWidth: 0.2,
		strokeDashFill: f,
	};

	let chaos = 1;
	let chaosThreshold = 0.85;

	if (f < chaosThreshold) {
		chaos = 2 * (1 - (chaosThreshold - f) / chaosThreshold);
	}
	
	let spiralXY: XY = {...xy, r: lerp(xy.r, xy.r*2, 1-f)};
	let polyXY: XY = {...xy, phase: 0.5 * chaos};
	let polyStyle: Style = {
		...style,
		fill: false,
		// strokeDashWidth: 0.2,
		// strokeDashFill: (1-f),
	};
	let sphereStyle: Style = {...style};
	let sphereXY: XY = {...xy, r: xy.r * 0.1};

	let numTwists = 1;
	let numSpirals = 3;

	E.Spirals(ctx, spiralXY, spiralStyle, numTwists * f, numSpirals);
	E.Polygon(ctx, polyXY, polyStyle, numSpirals);
	
	let polyPts = G.polygon({...spiralXY, phase: -2 * chaos}, numSpirals);
	
	for (let pt of polyPts) {
		E.Circle(ctx, {...sphereXY, ...pt}, sphereStyle);
	}
	
	// E.Circle(ctx, {...xy, r: sphereXY.r * 2}, sphereStyle);
}

export function Spiral_2_Superchaotic(ctx: Context, xy: XY, style: Style, f: number, chaosThreshold = 0.85) {
	xy = XY.def(xy);
	style = Style.def(style);
	xy.s = f;

	let spiralStyle: Style = {
		...style,
		strokeDashWidth: 0.2,
		strokeDashFill: f,
	};

	let chaos = 0;

	if (f < chaosThreshold) {
		chaos = (chaosThreshold - f) / chaosThreshold;
	}
	
	let spiralXY: XY = {...xy, r: lerp(xy.r, xy.r*2, 1-f)};
	let polyXY: XY = {...xy, phase: 0.5 * (1 + chaos * 2)};
	let polyStyle: Style = {
		...style,
		fill: false,
		// strokeDashWidth: 0.2,
		// strokeDashFill: (1-f),
	};
	let sphereStyle: Style = {...style};
	let sphereXY: XY = {...xy, r: xy.r * 0.1};

	let numTwists = 1;
	let numSpirals = 3;

	E.Spirals(ctx, spiralXY, spiralStyle, numTwists * f, numSpirals);
	E.Polygon(ctx, polyXY, polyStyle, numSpirals);
	
	let polyPts = G.polygon({...spiralXY, phase: -2 * chaos, r: spiralXY.r * (1+4*chaos)}, numSpirals);
	
	for (let pt of polyPts) {
		E.Circle(ctx, {...sphereXY, ...pt}, sphereStyle);
	}
	
	// E.Circle(ctx, {...xy, r: sphereXY.r * 2}, sphereStyle);
}

export function Cuboids_1(ctx: Context, xy: XY, style: Style, f: number) {
	xy = XY.def(xy);
	style = Style.def(style);
	xy.s = f;

	let cuboidStyle: Style = {
		...style,
		strokeDashWidth: 0.2,
		strokeDashFill: 1,
	};

	let cuboidXY = {...xy, r: xy.r/2};
	
	let polyPts = G.polygon({...xy, phase: xy.phase + 0.5}, 3);
	
	for (let pt of polyPts) {
		E.Cube(ctx, {...cuboidXY, ...pt, s: f}, cuboidStyle);
	}

	E.Polygon(ctx, {...xy, phase: 1}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, 3);
	E.Polygon(ctx, {...xy, phase: 0.6}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, 3);
	// E.Polygon(ctx, {...xy, phase: 1}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, 3);
	// E.Polygon(ctx, {...xy, phase: 1}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, 5);
}

export function Cuboids_1_Chaotic(ctx: Context, xy: XY, style: Style, f: number) {
	xy = XY.def(xy);
	style = Style.def(style);
	xy.s = f;

	let chaos = 0;
	let fc = 1;
	let chaosThreshold = 0.75;

	if (f < chaosThreshold) {
		chaos = (chaosThreshold - f) / chaosThreshold;
		fc = 1 - (chaosThreshold - f)
	}

	let cuboidStyle: Style = {
		...style,
		strokeDashWidth: 0.2,
		strokeDashFill: 1,
	};

	let cuboidXY = {...xy, r: xy.r/2};
	let numCubes = 3;
	let polyPts = G.polygon({...xy, phase: xy.phase + 0.5 * chaos, r: xy.r*(1+chaos)}, numCubes);
	
	for (let pt of polyPts) {
		E.Cube(ctx, {...cuboidXY, ...pt, s: f, phase: 6 * chaos}, cuboidStyle);
	}

	E.Polygon(ctx, {...xy, phase: 1 * chaos}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, numCubes);
	E.Polygon(ctx, {...xy, phase: 0.6 * fc}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, numCubes);
	// E.Polygon(ctx, {...xy, phase: 1}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, 3);
	// E.Polygon(ctx, {...xy, phase: 1}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, 5);
}

export function Cuboids_1_Superchaotic(ctx: Context, xy: XY, style: Style, f: number, chaosThreshold = 0.5) {
	xy = XY.def(xy);
	style = Style.def(style);
	xy.s = f;

	let chaos = 0;
	let fc = 1;

	if (f < chaosThreshold) {
		chaos = (chaosThreshold - f) / chaosThreshold;
		fc = 1 - (chaosThreshold - f)
	}

	let cuboidStyle: Style = {
		...style,
		strokeDashWidth: 0.2,
		strokeDashFill: 1,
	};

	let cuboidXY = {...xy, r: xy.r/2};
	let numCubes = 3;
	let polyPts = G.polygon({...xy, phase: xy.phase + 0.5 * chaos, r: xy.r*(1+(4 * (chaos)))}, numCubes);
	
	for (let pt of polyPts) {
		E.Cube(ctx, {...cuboidXY, ...pt, s: f, phase: 6 * chaos}, cuboidStyle);
	}

	E.Polygon(ctx, {...xy, phase: 1 * chaos}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, numCubes);
	E.Polygon(ctx, {...xy, phase: 0.6 * fc}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, numCubes);
	// E.Polygon(ctx, {...xy, phase: 1}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, 3);
	// E.Polygon(ctx, {...xy, phase: 1}, {...style, strokeDashWidth: 0.1, strokeDashFill: 0.5, fill: false}, 5);
}