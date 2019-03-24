import {circles} from './symbol.circles';
import {polygons} from './symbol.polygons';
import {pentagons_1} from './symbol.pentagons_1';
import {garden} from './symbol.garden';

import {grid} from './symbol.grid';
import {TreeGrid} from './topology.TreeGrid';

function consecrate() {
	let canvas = (document.getElementById('canvas') as HTMLCanvasElement);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	ctx.imageSmoothingQuality = 'high';

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// circles(ctx);
	// polygons(ctx);
	// pentagons_1(ctx);

	TreeGrid(ctx);
//	garden(ctx);
}

consecrate();
