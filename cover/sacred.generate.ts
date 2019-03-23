import { XY, deg2rad, Point } from "./sacred.types";

export namespace Generate {
	export function polygon(xy: XY, sides: number) {
		sides = Math.max(sides, 3);
		let points: Point[] = [];
		let aStep = 360 / sides;
		let aOffset = -90;	//	So everything points ^up
		aOffset += (xy.phase || 0) * aStep;	//	phase is used to rotate the first point
		let a = 0;

		for (let i=0; i<sides; i++) {
			points.push({
				x: xy.x + Math.cos(deg2rad(aOffset + i * aStep)) * xy.r,
				y: xy.y + Math.sin(deg2rad(aOffset + i * aStep)) * xy.r
			});
		}

		return points;
	}

	export function center(points: Point[]) {
		let c = points.reduce((pAcc: Point, pt: Point, ci, a) => {
			return {x: pAcc.x + pt.x, y: pAcc.y + pt.y}
		}, {x: 0, y: 0});

		c.x /= points.length;
		c.y /= points.length;

		return c;
	}

	//	Stem is [0], Fruit is [11]
	export function treeOfLife(xy: XY) {
		let pts5 = Generate.polygon(xy, 6);
		let ptC = Generate.center(pts5);
		let pts3 = Generate.polygon({...xy, x: pts5[3].x, y: pts5[3].y}, 6);
		pts3 = [pts3[2], pts3[3], pts3[4]] //	Need only botton half of the figure
		let ptStem = Point.add(pts3[1], Point.sub(pts3[1], pts5[3]));
		return [ptStem].concat(pts3, pts5, ptC);
	}
}
