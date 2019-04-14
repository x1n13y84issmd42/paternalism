import { Point } from "./sacred.types";

function distance2(v: Point, w: Point) {
	let sqr = (v) =>v*v;
	return sqr(v.x - w.x) + sqr(v.y - w.y);
}

function distanceSqrd(p: Point, a: Point, b: Point) {
	//	0-len case
	var l2 = distance2(a, b);
	if (l2 == 0) {
		return distance2(p, a);
	}

	//	Projection of p on the ab segment
	var t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2;
	t = Math.max(0, Math.min(1, t));

	return distance2(p, {
		x: a.x + t * (b.x - a.x),
		y: a.y + t * (b.y - a.y)
	});
}

export function distance(p: Point, a: Point, b: Point) {
	return Math.sqrt(distanceSqrd(p, a, b));
}

export function deg2rad(deg: number) {
	return deg * Math.PI / 180;
}

export function lerp(a: number, b: number, c: number) {
	return (1 - c) * a + c * b;
}

export function alerp(as: [number, number, number, number], bs: [number, number, number, number], c: number): [number, number, number, number];
export function alerp(as: [number, number, number], bs: [number, number, number], c: number): [number, number, number];
export function alerp(as: [number, number], bs: [number, number], c: number): [number, number];
export function alerp(as: [number], bs: [number], c: number): [number];
export function alerp(as: number[], bs: number[], c: number): number[];
export function alerp(as: number[], bs: number[], c: number): number[] {
	let n = Math.min(as.length, bs.length);
	let res: number[] = [];

	for (let i = 0; i < n; i++) {
		res.push((1 - c) * as[i] + c * bs[i])
	}

	return res;
}

export namespace fn {
	export function scale(n: number, s: number) {
		return Math.max(0, (n - s)/(1-s));
	}

	export function f101(v: number) {
		return Math.abs(Math.cos(v * Math.PI));
	}

	export function f010(v: number) {
		return Math.abs(Math.sin(v * Math.PI));
	}
}

export type Vector = Point;

export namespace Vector {
	export function length(v: Vector) {
		return Math.sqrt(v.x*v.x + v.y*v.y);
	}

	export function normalize(v: Vector) {
		let l = Vector.length(v);
		return {
			x: v.x / l,
			y: v.y / l,
		};
	}

	export function scale(v: Vector, s: number) {
		return {
			x: v.x * s,
			y: v.y * s,
		};
	}

	export function add(a: Vector, b: Vector) {
		return {x: a.x + b.x, y: a.y + b.y};
	}
}

export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];

export namespace Color {
	export function mul(c: RGBA, v: number, alphaToo = false): RGBA {
		return [
			Math.min(1, c[0] * v),
			Math.min(1, c[1] * v),
			Math.min(1, c[2] * v),
			alphaToo ? Math.min(1, c[3] * v) : c[3],
		];
	}

	/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
	export function RGBA2HSL(rgba: RGBA) {
		let [r, g, b] = rgba;
	
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;
	
		if (max == min) {
		h = s = 0; // achromatic
		} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
	
		h /= 6;
		}
	
		return [ h, s, l ];
  }

	/**
	 * Converts an HSL color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes h, s, and l are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 255].
	 *
	 * @param   Number  h       The hue
	 * @param   Number  s       The saturation
	 * @param   Number  l       The lightness
	 * @return  Array           The RGB representation
	 */
	export function HSL2RGBA(h, s, l):RGBA {
		var r, g, b;
	
		if (s == 0) {
			r = g = b = l; // achromatic
		} else {
			function hue2rgb(p, q, t) {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}
		
			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
		
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		return [r, g, b, 1];
	}
}