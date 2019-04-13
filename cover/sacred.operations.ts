import { XY, Style } from './sacred.types';

export type OpFn = (ctx: CanvasRenderingContext2D, xy: XY, style: Style) => void;
export type OpProgressionFn = (v: number) => {xy: XY, style: Style};

export function echo(ctx: CanvasRenderingContext2D, op: OpFn, count: number, prog: OpProgressionFn) {
	let c = count;
	while (c) {
		let {xy, style} = prog(c / count);
		Style.config(ctx, xy, style);
		op(ctx, xy, style);
		c--;
	}
}
