import { Context, Points, ForceFields, Style, XY, Blend } from "./sacred.types";
import * as Symbols from './sacred.symbols';
import { Reducers } from "./sacred.forces";
import { fn, RGBA, alerp } from "./sacred.math";

let colors = {
	ira: {
		blue: [16/255, 120/255, 255/255, 1] as RGBA,
		red: [194/255, 24/255, 21/255, 1] as RGBA,
		pink: [175/255, 40/255, 85/255, 1] as RGBA,
		green: [18/255, 119/255, 110/255, 1] as RGBA,
	},
	white: [1, 1, 1, 1] as RGBA,
	grey: [0.5, 0.5, 0.5, 1] as RGBA,
	grey05: [0.5, 0.5, 0.5, 0.5] as RGBA,
	black: [0, 0, 0, 1] as RGBA,
	white05: [1, 1, 1, 0.5] as RGBA,
	orangish: [0.94, 0.22, 0.08, 1] as RGBA,
	orangish05: [0.94, 0.22, 0.08, 0.5] as RGBA,
	orange: [0.9, 0.4, 0, 1] as RGBA,
	orange05: [0.9, 0.4, 0, 0.5] as RGBA,
	goldish05: [1, 0.8, 0.4, 0.5] as RGBA,
	goldish: [0.9, 0.7, 0.2, 1] as RGBA,
	gold2: [0.7, 0.6, 0, 1] as RGBA,
	gold205: [0.7, 0.4, 0, 0.5] as RGBA,
	gold: [0.9, 0.8, 0, 1] as RGBA,
	gold02: [0.9, 0.8, 0, 0.2] as RGBA,
	gold05: [0.9, 0.8, 0, 0.5] as RGBA,
	cyan: [0.08, 0.95, 0.76, 1] as RGBA,
	cyan05: [0.08, 0.95, 0.76, 0.5] as RGBA,
	magentish: [0.64, 0.08, 0.94, 1] as RGBA,
	magentish05: [0.64, 0.08, 0.94, 0.5] as RGBA,
	blueish: [0.5, 0.7, 1, 1] as RGBA,
	blueish07: [0.8, 0.9, 1, 0.7] as RGBA,
	blueish05: [0.8, 0.9, 1, 0.5] as RGBA,
	greenish: [0.8, 1, 0.8, 1] as RGBA,
	greenish01: [0.8, 1, 0.8, 0.1] as RGBA,
	pink01: [0.93, 0.08, 0.95, 0.1] as RGBA,
	pink05: [0.93, 0.08, 0.95, 0.5] as RGBA,
	pinkish: [0.85, 0.08, 0.94, 1] as RGBA,
	pinkish05: [0.85, 0.08, 0.94, 0.5] as RGBA,
	red: [1, 0, 0, 1] as RGBA,
	red05: [1, 0, 0, 0.5] as RGBA,
	irablue: [0, 176/255, 209/255, 1] as RGBA,
	irablue05: [0, 176/255, 209/255, 0.5] as RGBA,
	irabluer05: [0, 176/255, 209/255, 0.5] as RGBA,
};

export function CoverTest(ctx: Context, points: Points, forceFields: ForceFields) {
	for (let p of points()) {
		let f = Reducers.mergedMax(forceFields(p));
		let fs = Reducers.max(forceFields(p));
		let r = 40;

		// Symbols.Hexa_1(ctx, {...p, r: r * f}, {}, fs.minor);
		// Symbols.Hexa_2(ctx, {...p, r: r * f}, {}, fs.major);
		
		
		Symbols.EggOfComplexity(ctx, {...p, r: r * f}, {}, fs.major);
		Symbols.Sphere(ctx, {...p, r: r * f}, {}, 6, fs.minor);
	}
}

export function CoverVariadic(ctx: Context, points: Points, forceFields: ForceFields) {
	for (let p of points()) {
		let ff = forceFields(p);
		let fms = Reducers.sum(ff);
		let fm = [].concat(ff.major, ff.minor).sort(()=>Math.random()*2-1);
		let r = 20 * 2;

		let xy: XY = {...p, s: 2, r: r};

		let style: Style = {
			...Style.solid2,
			fill: [1, 1, 1, 0.0],
			strokeWidth: 1,
			stroke: colors.blueish,
		};

		let colorsf = {
			golden: (_f, __f=ff.major[0]) => alerp(colors.gold05, colors.white05, __f),
			electric: (_f, __f=ff.major[0]) => alerp(colors.blueish05, colors.white05, __f),
			pinkCyan: (_f, __f=ff.major[0]) => [fn.f101(__f), fn.f010(__f), 1, 1] as RGBA,
			blackGold: (_f, __f=ff.major[0]) => alerp(colors.black, colors.gold05, _f),
			blackBlueish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.blueish, _f),
			blackCyan: (_f, __f=ff.major[0]) => alerp(colors.black, colors.cyan05, _f),
			blackOrange: (_f, __f=ff.major[0]) => alerp(colors.black, colors.orange05, _f),
			blackOrangish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.orangish05, _f),
			blackPink: (_f, __f=ff.major[0]) => alerp(colors.black, colors.pink05, _f),
			blackMagentish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.magentish05, _f),
			blackPinkish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.pinkish05, _f),
			blackRed: (_f, __f=ff.major[0]) => alerp(colors.black, colors.red05, _f),

			blackGoldBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.gold05, _f), __f),
			blackBlueishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.blueish, _f), __f),
			blackCyanBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.cyan05, _f), __f),
			blackOrangeBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.orange05, _f), __f),
			blackOrangishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.orangish05, _f), __f),
			blackPinkBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.pink05, _f), __f),
			blackMagentishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.magentish05, _f), __f),
			blackPinkishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.pinkish05, _f), __f),
			blackRedBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.red05, _f), __f),
		};

		let symbols = [
			(_f) => Symbols.Cuboids_1(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blackCyanBW(_f)}, _f),
			(_f) => Symbols.Hexa_1(ctx, {...xy}, {...style, stroke: colorsf.blackBlueishBW(_f)}, _f),
			// (_f) => Symbols.Hexa_1(ctx, {...xy, phase: 0.5}, {...style, fill: false}, _f),
			(_f) => Symbols.FruitOfSimplicity(ctx, {...xy}, {...style, stroke: colorsf.blackMagentishBW(_f), strokeWidth: style.strokeWidth/1.5, fill: false}, _f),
			(_f) => Symbols.FruitOfSimplicity(ctx, {...xy, phase: 0.5}, {...style, stroke: colorsf.blackBlueishBW(_f), strokeWidth: style.strokeWidth, fill: false}, _f),
			(_f) => Symbols.Spiral_1(ctx, {...xy}, {...style, stroke: colorsf.blackMagentishBW(_f)}, _f),
			// (_f) => Symbols.Sphere(ctx, {...xy, r: xy.r*0.5*(_f * 0.9 + 0.1)}, {...style, fill: [1, 1, 1, 1], strokeWidth: style.strokeWidth/2}, 5+Math.ceil(5*_f), 1),
			(_f) => Symbols.Spiral_2(ctx, {...xy}, {...style, stroke: colorsf.blackBlueishBW(_f)}, _f),
		];

		let N = Math.min(symbols.length, fm.length);
		for (let sI=0; sI<N; sI++) {
			//	Strange bug in some symbols for some small values of force. Remove 0.001 to see
			symbols[sI](0.001 + fm[sI]);
		}

	//	Symbols.EggOfComplexity(ctx, {...xy, r: xy.r/3}, style, f)
	}
}

export function CoverChaotic(ctx: Context, points: Points, forceFields: ForceFields) {
	for (let p of points()) {
		let ff = forceFields(p);
		let fms = Reducers.sum(ff);
		let fm = [].concat(ff.major, ff.minor).sort(()=>Math.random()*2-1);
		let r = 20 * 1;

		let xy: XY = {...p, s: 2, r: r};
		let colors = {
			white: [1, 1, 1, 1] as RGBA,
			grey: [0.5, 0.5, 0.5, 1] as RGBA,
			grey05: [0.5, 0.5, 0.5, 0.5] as RGBA,
			black: [0, 0, 0, 1] as RGBA,
			white05: [1, 1, 1, 0.5] as RGBA,
			orangish: [0.94, 0.22, 0.08, 1] as RGBA,
			orangish05: [0.94, 0.22, 0.08, 0.5] as RGBA,
			orange: [0.9, 0.4, 0, 1] as RGBA,
			orange05: [0.9, 0.4, 0, 0.5] as RGBA,
			gold: [0.9, 0.8, 0, 1] as RGBA,
			gold02: [0.9, 0.8, 0, 0.2] as RGBA,
			gold05: [0.9, 0.8, 0, 0.5] as RGBA,
			cyan: [0.08, 0.95, 0.76, 1] as RGBA,
			cyan05: [0.08, 0.95, 0.76, 0.5] as RGBA,
			magentish: [0.64, 0.08, 0.94, 1] as RGBA,
			magentish05: [0.64, 0.08, 0.94, 0.5] as RGBA,
			blueish: [0.5, 0.7, 1, 1] as RGBA,
			blueish07: [0.8, 0.9, 1, 0.7] as RGBA,
			blueish05: [0.8, 0.9, 1, 0.5] as RGBA,
			greenish: [0.8, 1, 0.8, 1] as RGBA,
			greenish01: [0.8, 1, 0.8, 0.1] as RGBA,
			pink01: [0.93, 0.08, 0.95, 0.1] as RGBA,
			pink05: [0.93, 0.08, 0.95, 0.5] as RGBA,
			pinkish: [0.85, 0.08, 0.94, 1] as RGBA,
			pinkish05: [0.85, 0.08, 0.94, 0.5] as RGBA,
			red: [1, 0, 0, 1] as RGBA,
			red05: [1, 0, 0, 0.5] as RGBA,
		};

		let style: Style = {
			...Style.solid2,
			fill: [1, 1, 1, 0.0],
			strokeWidth: 1,
			stroke: colors.blueish,
		};

		let colorsf = {
			golden: (_f, __f=ff.major[0]) => alerp(colors.gold05, colors.white05, __f),
			electric: (_f, __f=ff.major[0]) => alerp(colors.blueish05, colors.white05, __f),
			pinkCyan: (_f, __f=ff.major[0]) => [fn.f101(__f), fn.f010(__f), 1, 1] as RGBA,
			blackGold: (_f, __f=ff.major[0]) => alerp(colors.black, colors.gold05, _f),
			blackBlueish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.blueish, _f),
			blackCyan: (_f, __f=ff.major[0]) => alerp(colors.black, colors.cyan05, _f),
			blackOrange: (_f, __f=ff.major[0]) => alerp(colors.black, colors.orange05, _f),
			blackOrangish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.orangish05, _f),
			blackPink: (_f, __f=ff.major[0]) => alerp(colors.black, colors.pink05, _f),
			blackMagentish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.magentish05, _f),
			blackPinkish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.pinkish05, _f),
			blackRed: (_f, __f=ff.major[0]) => alerp(colors.black, colors.red05, _f),

			blackGoldBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.gold05, _f), __f),
			blackBlueishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.blueish, _f), __f),
			blackCyanBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.cyan05, _f), __f),
			blackOrangeBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.orange05, _f), __f),
			blackOrangishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.orangish05, _f), __f),
			blackPinkBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.pink05, _f), __f),
			blackMagentishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.magentish05, _f), __f),
			blackPinkishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.pinkish05, _f), __f),
			blackRedBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.red05, _f), __f),
		};

		let symbols = [
			(_f) => Symbols.Cuboids_1_Chaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blackCyanBW(_f)}, _f),
			(_f) => Symbols.Hexa_1(ctx, {...xy}, {...style, stroke: colorsf.blackBlueishBW(_f)}, _f),
			// (_f) => Symbols.Hexa_1(ctx, {...xy, phase: 0.5}, {...style, fill: false}, _f),
			(_f) => Symbols.FruitOfSimplicity_Chaotic(ctx, {...xy}, {...style, stroke: colorsf.blackCyanBW(_f), strokeWidth: style.strokeWidth/1.5, fill: false}, _f),
			(_f) => Symbols.FruitOfSimplicity_Chaotic(ctx, {...xy, phase: 0.5}, {...style, stroke: colorsf.blackBlueishBW(_f), strokeWidth: style.strokeWidth, fill: false}, _f),
			(_f) => Symbols.Spiral_1_Chaotic(ctx, {...xy}, {...style, stroke: colorsf.blackMagentishBW(_f)}, _f),
			// (_f) => Symbols.Sphere(ctx, {...xy, r: xy.r*0.5*(_f * 0.9 + 0.1)}, {...style, fill: [1, 1, 1, 1], strokeWidth: style.strokeWidth/2}, 5+Math.ceil(5*_f), 1),
			(_f) => Symbols.Spiral_2_Chaotic(ctx, {...xy}, {...style, stroke: colorsf.blackBlueishBW(_f)}, _f),
		];

		let N = Math.min(symbols.length, fm.length);
		for (let sI=0; sI<N; sI++) {
			//	Strange bug in some symbols for some small values of force. Remove 0.001 to see
			symbols[sI](0.001 + fm[sI]);
		}

	//	Symbols.EggOfComplexity(ctx, {...xy, r: xy.r/3}, style, f)
	}
}
export function CoverEchoChaotic(ctx: Context, points: Points, forceFields: ForceFields) {
	for (let p of points()) {
		let ff = forceFields(p);
		let fms = Reducers.sum(ff);
		let fm = [].concat(ff.major, ff.minor).sort(()=>Math.random()*2-1);
		let r = 20 * 1;

		let colorsf = {
			golden: (_f, __f=ff.major[0]) => alerp(colors.gold05, colors.white05, __f),
			electric: (_f, __f=ff.major[0]) => alerp(colors.blueish05, colors.white05, __f),
			pinkCyan: (_f, __f=ff.major[0]) => [fn.f101(__f), fn.f010(__f), 1, 1] as RGBA,
			blackGold: (_f, __f=ff.major[0]) => alerp(colors.black, colors.gold05, _f),
			blackBlueish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.blueish, _f),
			blackCyan: (_f, __f=ff.major[0]) => alerp(colors.black, colors.cyan05, _f),
			blackOrange: (_f, __f=ff.major[0]) => alerp(colors.black, colors.orange05, _f),
			blackOrangish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.orangish05, _f),
			blackPink: (_f, __f=ff.major[0]) => alerp(colors.black, colors.pink05, _f),
			blackMagentish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.magentish05, _f),
			blackPinkish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.pinkish05, _f),
			blackRed: (_f, __f=ff.major[0]) => alerp(colors.black, colors.red05, _f),
		
			blackGoldBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.gold05, _f), __f),
			blackBlueishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.blueish, _f), __f),
			blackCyanBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.cyan05, _f), __f),
			blackOrangeBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.orange05, _f), __f),
			blackOrangishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.orangish05, _f), __f),
			blackPinkBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.pink05, _f), __f),
			blackMagentishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.magentish05, _f), __f),
			blackPinkishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.pinkish05, _f), __f),
			blackRedBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.red05, _f), __f),
		};

		let xy: XY = {...p, s: 2, r: r};

		let style: Style = {
			...Style.solid2,
			fill: [1, 1, 1, 0.0],
			strokeWidth: 1,
			stroke: colors.blueish,
		};

		let symbolsMajor = [
			(_f) => Symbols.Cuboids_1_Chaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blackCyanBW(_f)}, _f),
			(_f) => Symbols.Cuboids_1_Chaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, stroke: colorsf.blackCyanBW(_f)}, _f),
			(_f) => Symbols.Cuboids_1_Chaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, stroke: colorsf.blackCyanBW(_f)}, _f),
		];

		let symbolsMinor = [
			[
				(_f) => Symbols.Spiral_2_Chaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.golden(_f)}, _f),
				(_f) => Symbols.Spiral_2_Chaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, stroke: colorsf.golden(_f)}, _f),
				(_f) => Symbols.Spiral_2_Chaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, stroke: colorsf.golden(_f)}, _f),
			],

			[
				(_f) => Symbols.Spiral_1_Chaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.electric(_f)}, _f),
				(_f) => Symbols.Spiral_1_Chaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, stroke: colorsf.electric(_f)}, _f),
				(_f) => Symbols.Spiral_1_Chaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, stroke: colorsf.electric(_f)}, _f),
			],

			[
				(_f) => Symbols.FruitOfSimplicity_Chaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blackPinkBW(_f)}, _f),
				(_f) => Symbols.FruitOfSimplicity_Chaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, stroke: colorsf.blackPinkBW(_f)}, _f),
				(_f) => Symbols.FruitOfSimplicity_Chaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, stroke: colorsf.blackPinkBW(_f)}, _f),
			]
		];

		for (let sI=0; sI<symbolsMajor.length; sI++) {
			//	Strange bug in some symbols for some small values of force. Remove 0.001 to see
			symbolsMajor[sI](0.0001 + fms.major);
		}

		for (let sI=0; sI<symbolsMinor.length; sI++) {
			let f = ff.minor[sI];
			if (f) {
				for (let sym of symbolsMinor[sI]) {
					sym(0.0001 + f);
				}
				
			}
		}

	//	Symbols.EggOfComplexity(ctx, {...xy, r: xy.r/3}, style, f)
	}
}

export function CoverEcho(ctx: Context, points: Points, forceFields: ForceFields) {
	for (let p of points()) {
		let ff = forceFields(p);
		let fms = Reducers.sum(ff);
		let fm = [].concat(ff.major, ff.minor).sort(()=>Math.random()*2-1);
		let r = 20 * 1.5;

		let colorsf = {
			golden: (_f, __f=ff.major[0]) => alerp(colors.goldish, colors.white05, __f),
			electric: (_f, __f=ff.major[0]) => alerp(colors.blueish05, colors.white05, __f),
			pinkCyan: (_f, __f=ff.major[0]) => [fn.f101(__f), fn.f010(__f), 1, 1] as RGBA,
			blackIrablue: (_f, __f=ff.major[0]) => alerp(colors.black, colors.irablue, _f),
			blackGold: (_f, __f=ff.major[0]) => alerp(colors.black, colors.gold205, _f),
			blackGoldish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.goldish, _f),
			blackBlueish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.blueish, _f),
			blackCyan: (_f, __f=ff.major[0]) => alerp(colors.black, colors.cyan05, _f),
			blackOrange: (_f, __f=ff.major[0]) => alerp(colors.black, colors.orange05, _f),
			blackOrangish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.orangish05, _f),
			blackPink: (_f, __f=ff.major[0]) => alerp(colors.black, colors.pink05, _f),
			blackMagentish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.magentish05, _f),
			blackPinkish: (_f, __f=ff.major[0]) => alerp(colors.black, colors.pinkish05, _f),
			blackRed: (_f, __f=ff.major[0]) => alerp(colors.black, colors.red05, _f),
		
			blackGoldBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.gold05, _f), __f),
			blackBlueishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.blueish07, _f), __f),
			blackCyanBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.cyan05, _f), __f),
			blackOrangeBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.orange05, _f), __f),
			blackOrangishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.orangish05, _f), __f),
			blackPinkBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.pink05, _f), __f),
			blackMagentishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.magentish05, _f), __f),
			blackPinkishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.pinkish05, _f), __f),
			blackRedBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.red05, _f), __f),
		};

		let xy: XY = {...p, s: 2, r: r};

		let style: Style = {
			...Style.solid2,
			fill: [1, 1, 1, 0.0],
			strokeWidth: 1,
			stroke: colors.blueish,
			opacity: 0.5,
			// blend: Blend.multiply,
		};

		let symbolsMajor = [
			(_f) => Symbols.Cuboids_1_Chaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.golden(_f)}, _f),
			(_f) => Symbols.Cuboids_1_Chaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.golden(_f)}, _f),
			(_f) => Symbols.Cuboids_1_Chaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.golden(_f)}, _f),
		];

		let symbolsMinor = [
			[
				(_f) => Symbols.Spiral_2_Chaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blackBlueish(_f)}, _f),
				(_f) => Symbols.Spiral_2_Chaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.blackBlueish(_f)}, _f),
				(_f) => Symbols.Spiral_2_Chaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.blackBlueish(_f)}, _f),
			],
			
			[
				(_f) => Symbols.Hexa_2(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blackGoldish(_f)}, _f),
				(_f) => Symbols.Hexa_2(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.golden(_f)}, _f),
				(_f) => Symbols.Hexa_2(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.golden(_f)}, _f),
			],

			[
				(_f) => Symbols.Spiral_1_Chaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.electric(_f)}, _f),
				(_f) => Symbols.Spiral_1_Chaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.electric(_f)}, _f),
				(_f) => Symbols.Spiral_1_Chaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.electric(_f)}, _f),
			],
		];

		for (let sI=0; sI<symbolsMajor.length; sI++) {
			//	Strange bug in some symbols for some small values of force. Remove 0.001 to see
			symbolsMajor[sI](0.0001 + fms.major);
		}

		for (let sI=0; sI<symbolsMinor.length; sI++) {
			let f = ff.minor[sI];
			if (f) {
				for (let sym of symbolsMinor[sI]) {
					sym(0.0001 + f);
				}
				
			}
		}

	//	Symbols.EggOfComplexity(ctx, {...xy, r: xy.r/3}, style, f)
	}
}

export function CoverEchoSuperchaotic(ctx: Context, points: Points, forceFields: ForceFields) {
	for (let p of points()) {
		let ff = forceFields(p);
		let fms = Reducers.sum(ff);
		let fm = [].concat(ff.major, ff.minor).sort(()=>Math.random()*2-1);
		let r = 20 * 2.5;

		let colorsf = {
			golden: (_f, __f=ff.major[0]) => alerp(colors.goldish, colors.white05, __f),
			electric: (_f, __f=ff.major[0]) => alerp(colors.blueish05, colors.white05, __f),
			pinkCyan: (_f, __f=ff.major[0]) => [fn.f101(__f), fn.f010(__f), 1, 1] as RGBA,
			blackIrablue: (_f) => alerp(colors.black, colors.irablue, _f),
			blackGold: (_f) => alerp(colors.black, colors.gold205, _f),
			blueishGoldish: (_f) => alerp(colors.blueish, colors.goldish, _f),
			blackGoldish: (_f) => alerp(colors.black, colors.goldish, _f),
			blackBlueish: (_f) => alerp(colors.black, colors.blueish, _f),
			blackCyan: (_f) => alerp(colors.black, colors.cyan05, _f),
			blackOrange: (_f) => alerp(colors.black, colors.orange05, _f),
			blackOrangish: (_f) => alerp(colors.black, colors.orangish05, _f),
			blackPink: (_f) => alerp(colors.black, colors.pink05, _f),
			blackMagentish: (_f) => alerp(colors.black, colors.magentish05, _f),
			blackPinkish: (_f) => alerp(colors.black, colors.pinkish05, _f),
			blackRed: (_f) => alerp(colors.black, colors.red05, _f),
		
			blackGoldBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.gold05, _f), __f),
			blackBlueishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.blueish07, _f), __f),
			blackCyanBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.cyan05, _f), __f),
			blackOrangeBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.orange05, _f), __f),
			blackOrangishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.orangish05, _f), __f),
			blackPinkBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.pink05, _f), __f),
			blackMagentishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.magentish05, _f), __f),
			blackPinkishBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.pinkish05, _f), __f),
			blackRedBW: (_f, __f=ff.major[0]) => alerp(colors.grey05, alerp(colors.black, colors.red05, _f), __f),
		};

		let xy: XY = {...p, s: 1, r: r};

		let style: Style = {
			...Style.solid2,
			fill: [1, 1, 1, 0.0],
			strokeWidth: 1,
			stroke: colors.blueish,
			opacity: 0.5,
			// blend: Blend.multiply,
		};

		let symbolsMajor = [
			(_f) => Symbols.Cuboids_1_Superchaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.golden(_f)}, _f),
			// (_f) => Symbols.Cuboids_1_Superchaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.golden(_f)}, _f),
			// (_f) => Symbols.Cuboids_1_Superchaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.golden(_f)}, _f),
		];

		let symbolsMinor = [
			[
				(_f) => Symbols.Spiral_2_Superchaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blackBlueish(_f)}, _f),
				// (_f) => Symbols.Spiral_2_Superchaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.blackBlueish(_f)}, _f),
				// (_f) => Symbols.Spiral_2_Superchaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.blackBlueish(_f)}, _f),
			],
			
			[
				(_f) => Symbols.Hexa_2_Chaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blueishGoldish(_f)}, _f),
				// (_f) => Symbols.Hexa_2_Chaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.golden(_f)}, _f),
				// (_f) => Symbols.Hexa_2_Chaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.golden(_f)}, _f),
			],

			[
				(_f) => Symbols.EggOfComplexity_Superchaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.electric(_f)}, _f),
				// (_f) => Symbols.EggOfComplexity_Superchaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.electric(_f)}, _f),
				// (_f) => Symbols.EggOfComplexity_Superchaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.electric(_f)}, _f),
			],
		];

		for (let sI=0; sI<symbolsMajor.length; sI++) {
			//	Strange bug in some symbols for some small values of force. Remove 0.001 to see
			symbolsMajor[sI](0.0001 + fms.major);
		}

		for (let sI=0; sI<symbolsMinor.length; sI++) {
			let f = ff.minor[sI];
			if (f) {
				for (let sym of symbolsMinor[sI]) {
					sym(0.0001 + f);
				}
				
			}
		}

	//	Symbols.EggOfComplexity(ctx, {...xy, r: xy.r/3}, style, f)
	}
}

export function CoverEchoSuperchaoticGoldenBlue(ctx: Context, points: Points, forceFields: ForceFields) {
	for (let p of points()) {
		let ff = forceFields(p);
		let fms = Reducers.sum(ff);
		let fm = [].concat(ff.major, ff.minor).sort(()=>Math.random()*2-1);
		let r = 20 * 1.5;

		let colorsf = {
			blackGoldBlueish: (_f) => alerp(alerp(colors.black, colors.blueish, _f), colors.gold, fms.major),
			blackGoldCyan: (_f) => alerp(alerp(colors.black, colors.cyan, _f), colors.gold2, fms.major),
			blackGoldMagentish: (_f) => alerp(alerp(colors.black, colors.magentish, _f), colors.orangish, fms.major),
		};

		let xy: XY = {...p, s: 1, r: r};

		let style: Style = {
			...Style.solid2,
			fill: [1, 1, 1, 0.0],
			strokeWidth: 1,
			stroke: colors.blueish,
			opacity: 0.5,
			// blend: Blend.multiply,
		};

		let symbolsMajor = [
			(_f) => Symbols.Cuboids_1_Superchaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blackGoldBlueish(_f)}, _f),
			// (_f) => Symbols.Cuboids_1_Superchaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.blackGoldBlueish(_f)}, _f),
			// (_f) => Symbols.Cuboids_1_Superchaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.blackGoldBlueish(_f)}, _f),
		];

		let symbolsMinor = [
			[
				(_f) => Symbols.Spiral_2_Superchaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blackGoldCyan(_f)}, _f),
				// (_f) => Symbols.Spiral_2_Superchaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.blackGoldCyan(_f)}, _f),
				// (_f) => Symbols.Spiral_2_Superchaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.blackGoldCyan(_f)}, _f),
			],
			
			[
				(_f) => Symbols.Hexa_2_Chaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blackGoldMagentish(_f)}, _f),
				// (_f) => Symbols.Hexa_2_Chaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.blackGoldMagentish(_f)}, _f),
				// (_f) => Symbols.Hexa_2_Chaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.blackGoldMagentish(_f)}, _f),
			],

			[
				(_f) => Symbols.EggOfComplexity_Superchaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blackGoldBlueish(_f)}, _f),
				// (_f) => Symbols.EggOfComplexity_Superchaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.blackGoldBlueish(_f)}, _f),
				// (_f) => Symbols.EggOfComplexity_Superchaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.blackGoldBlueish(_f)}, _f),
			],
		];

		for (let sI=0; sI<symbolsMajor.length; sI++) {
			//	Strange bug in some symbols for some small values of force. Remove 0.001 to see
			symbolsMajor[sI](0.0001 + fms.major);
		}

		for (let sI=0; sI<symbolsMinor.length; sI++) {
			let f = ff.minor[sI];
			if (f) {
				for (let sym of symbolsMinor[sI]) {
					sym(0.0001 + f);
				}
				
			}
		}

	//	Symbols.EggOfComplexity(ctx, {...xy, r: xy.r/3}, style, f)
	}
}

export function CoverEchoSuperchaoticIra(ctx: Context, points: Points, forceFields: ForceFields) {
	for (let p of points()) {
		let ff = forceFields(p);
		let theRedForce1 = ff.major[1];
		let theRedForce2 = ff.major[0];
		ff.major[0] = 0;
		let fms = Reducers.sum(ff);
		let fm = [].concat(ff.major, ff.minor).sort(()=>Math.random()*2-1);
		let r = 20 * 1.5;

		let colorsf = {
			blue: (_f) => colors.blueish,//alerp(colors.blueish, colors.blueish, _f),
			blueRed: () => alerp(colors.ira.blue, colors.ira.red, theRedForce1),
			blueRedRed: () => alerp(colorsf.blueRed(), colors.ira.red, theRedForce2),
		};

		let xy: XY = {...p, s: 1, r: r};

		let style: Style = {
			...Style.solid2,
			fill: [1, 1, 1, 0.0],
			strokeWidth: 1,
			stroke: colors.blueish,
			opacity: 0.5,
			blend: Blend.add,
		};

		let symbolsMajor = [
			(_) => {},
			(_f) => Symbols.Cuboids_1_Superchaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blueRedRed()}, _f),
			// (_f) => Symbols.Cuboids_1_Superchaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.blue(_f)}, _f),
			// (_f) => Symbols.Cuboids_1_Superchaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.blue(_f)}, _f),
		];

		let symbolsMinor = [
			[
				(_f) => Symbols.Spiral_2_Superchaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blue(_f)}, _f),
				// (_f) => Symbols.Spiral_2_Superchaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.4, stroke: colorsf.blue(_f)}, _f),
				// (_f) => Symbols.Spiral_2_Superchaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.blue(_f)}, _f),
			],
			
			[
				(_f) => Symbols.Hexa_2_Chaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blue(_f)}, _f),
				// (_f) => Symbols.Hexa_2_Chaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.6, stroke: colorsf.blue(_f)}, _f),
				// (_f) => Symbols.Hexa_2_Chaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.blue(_f)}, _f),
			],

			[
				(_f) => Symbols.EggOfComplexity_Superchaotic(ctx, {...xy}, {...style, fill: false, stroke: colorsf.blue(_f)}, _f),
				// (_f) => Symbols.EggOfComplexity_Superchaotic(ctx, {...xy, r: xy.r * 1.2}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.4, stroke: colorsf.blue(_f)}, _f),
				// (_f) => Symbols.EggOfComplexity_Superchaotic(ctx, {...xy, r: xy.r * 1.4}, {...style, fill: false, strokeWidth: style.strokeWidth * 0.3, stroke: colorsf.blue()}, _f),
			],
		];

		for (let sI=0; sI<symbolsMajor.length; sI++) {
			//	Strange bug in some symbols for some small values of force. Remove 0.001 to see
			symbolsMajor[sI](0.0001 + fms.major);
		}

		for (let sI=0; sI<symbolsMinor.length; sI++) {
			let f = ff.minor[sI];
			if (f) {
				for (let sym of symbolsMinor[sI]) {
					sym(0.0001 + f);
				}
				
			}
		}

	//	Symbols.EggOfComplexity(ctx, {...xy, r: xy.r/3}, style, f)
	}
}
