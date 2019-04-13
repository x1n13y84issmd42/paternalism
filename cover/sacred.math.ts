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
}