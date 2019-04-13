
import {TreeGrid} from './topology.TreeGrid';
import {CoverTree} from './topology.CoverTree';
import {TreeGrid_2} from './topology.TreeGrid_2';
import { CoverVariadic, CoverChaotic, CoverEchoChaotic, CoverEcho } from './order.Cover';

import {hexagon} from './test.hexagon'
import {spirals} from './test.spirals'
import {spirals_chaotic} from './test.spirals_chaotic'
import { Signer } from 'crypto';
import { Context } from './sacred.types';

function consecrate() {
	let canvas = (document.getElementById('canvas') as HTMLCanvasElement);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let tt = 0;
	let frameN = 1;

	let options = window.location.hash.substr(1).split(',').map((pair) => pair.split('=')).reduce((pv, cv) => {
		return {...pv, [cv[0]]: cv[1]};
	}, {
		frames: 1,
		name: undefined,
	});

	if (~~options.frames === 1) {
		canvas.onclick = animate;
	}

	console.info(window.location.hash)
	console.info(options)

	let ctx = canvas.getContext('2d');

	ctx.fillStyle = 'rgb(32,32,32)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	function sign() {
		// circles(ctx);
		// hexagon(ctx);
		// spirals_chaotic(ctx);
		// garden(ctx);
		// TreeGrid(ctx);
	
		// CoverTree(ctx, CoverVariadic);
		CoverTree(ctx, CoverEcho, tt);

		let fname = options.name ? `'${options.name}' ` : '';
		document.getElementsByTagName('title')[0].innerText = `Sacred Frame ${fname}#${frameN} @ ${tt}`;
		save(canvas, frameN++, options.name);
	};

	function animate() {
		ctx.fillStyle = 'rgba(32,32,32, 1)';
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		tt += 0.025;

		sign();
	}

	let frames = ~~options.frames;

	while(frames--) {
		animate();
	}
}

consecrate();

function save(canvas: HTMLCanvasElement, frameN: number, name: string) {
	let req = new XMLHttpRequest();
	req.onreadystatechange = (e: Event) => {
		console.info('AJAX event', e);
	};
	
	console.log(`Sending frame #${frameN}...`);

	req.open("POST", 'http://patternalism/frame', true);
	req.setRequestHeader('Content-Type', 'application/json');

	req.send(JSON.stringify({
		frameN: frameN++,
		name: name || 'sacred',
		data: canvas.toDataURL('image/png').substr('data:image/png;base64,'.length),
	}));

	console.log(`Sent.`);
}