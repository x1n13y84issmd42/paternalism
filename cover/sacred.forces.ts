import { Point } from "./sacred.types";

export namespace Forces {
	/**
	 * Calculates the force value influencing point p
	 * in the round force field with center c and radius r.
	 * @param p A point to influence.
	 * @param center The center of force.
	 * @param r Radius of the force field.
	 */
	export function radial(p: Point, center: Point, r: number) {
		let vX = center.x - p.x;
		let vY = center.y - p.y;

		return 1 - Math.min(1, Math.sqrt(vX*vX + vY*vY) / r);
	}

	/**
	 * Tests if given grid cell is a part of the Tree of Life structure.
	 * Implies grid structure produced by the TreeGrid topology.
	 * @param p A point to test. Values are 0-based indexes in a 2D array of grid points.
	 * @param gridW Grid width.
	 * @param gridH Grid height.
	 * @param gridStep Grid step.
	 */
	export function treeOfLife(p: Point, gridW: number, gridH: number, gridStepH: number, gridStepV: number, fruit=true, crown=true, stem=true) {
		let c: Point = {x: Math.floor((gridW / gridStepH) / 2), y: Math.floor((gridH / gridStepV) / 2)};
		let isFruit = false;
		let isCrown = false;
		let isStem = false;

		if (fruit) {
			isFruit = (c.x == p.x && c.y == p.y);
		}

		if (crown) {
			isCrown = 
				(p.x == c.x && p.y == c.y - 1)
				|| (p.x == c.x && p.y == c.y + 1)
				|| (p.x == c.x - 1 && p.y == c.y)
				|| (p.x == c.x + 1 && p.y == c.y)
				|| (p.x == c.x - 1 && p.y == c.y - 1)
				|| (p.x == c.x + 1 && p.y == c.y - 1)
				;
		}

		if (stem) {
			isStem =
				(p.x == c.x && p.y == c.y + 2)
				|| (p.x == c.x && p.y == c.y + 3)
				|| (p.x == c.x - 1 && p.y == c.y + 1)
				|| (p.x == c.x + 1 && p.y == c.y + 1)
			;
		}

		return isFruit || isCrown || isStem;
	}
}
