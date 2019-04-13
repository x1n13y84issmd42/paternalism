import { XY, Point } from "./sacred.types";
import { deg2rad, Vector } from "./sacred.math";

/**
 * Generates a set of polygon vertices.
 * @param xy XY
 * @param sides Number of sides.
 */
export function polygon(xy: XY, sides: number) {
	let s = xy.s || 1;
	sides = Math.max(sides, 3);
	let points: Point[] = [];
	let aStep = 360 / sides;
	let aOffset = -90;	//	So everything points ^up
	aOffset += (xy.phase || 0) * aStep;	//	phase is used to rotate the first point in discrete steps
	let a = 0;

	for (let i=0; i<sides; i++) {
		points.push({
			x: xy.x + Math.cos(deg2rad(aOffset + i * aStep)) * xy.r * s,
			y: xy.y + Math.sin(deg2rad(aOffset + i * aStep)) * xy.r * s
		});
	}

	return points;
}

/**
 * Finds the center points from a set of points.
 * @param points A set of points.
 */
export function center(points: Point[]) {
	let c = points.reduce((pAcc: Point, pt: Point, ci, a) => {
		return {x: pAcc.x + pt.x, y: pAcc.y + pt.y}
	}, {x: 0, y: 0});

	c.x /= points.length;
	c.y /= points.length;

	return c;
}

/**
 * Generates a Tree of Life structure.
 * Stem is [0], Fruit is [11].
 * @param xy XY
 */
export function treeOfLife(xy: XY) {
	let pts5 = polygon(xy, 6);
	let ptC = center(pts5);
	let pts3 = polygon({...xy, x: pts5[3].x, y: pts5[3].y}, 6);
	pts3 = [pts3[2], pts3[3], pts3[4]] //	Need only botton half of the figure
	let ptStem = Point.add(pts3[1], Point.sub(pts3[1], pts5[3]));
	return [ptStem].concat(pts3, pts5, ptC);
}

/**
 * Interprets pairs of points as segments and calculates midpoints for them.
 * @param points A set of points.
 */
export function midpoints(points: Point[]) {
	let res: Point[] = [];

	for (let i=0; i<points.length; i++) {
		let i1 = (i<points.length-1) ? i+1 : 0;

		res.push({
			x: (points[i].x + points[i1].x) / 2,
			y: (points[i].y + points[i1].y) / 2,
		});
	}

	return res;
}

/**
 * Removes all the points that are located inside the specified circle.
 * @param points A set of points.
 * @param c A circle center.
 * @param r A circle radius.
 */
export function erase(points: Point[], c: Point, r: number) {
	let res: Point[] = [];
	let sqr = (v) =>v*v;
	
	for (let p of points) {
		let d = Math.sqrt(sqr(p.x-c.x) + sqr(p.y-c.y));
		if (d > r) {
			res.push(p);
		}
	}
	
	return res;
}

export function outwards(points: Point[], d: number) {
	let res: Point[] = [];
	let c = center(points);
	for (let p of points) {
		let v = Vector.scale(Vector.normalize(Point.sub(p, c)), d);
		res.push(Vector.add(p, v));
	}
	return res;
}