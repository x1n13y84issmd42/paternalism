
import {TreeGrid} from './topology.TreeGrid';
import {CoverTree} from './topology.CoverTree';
import {TreeGrid_2} from './topology.TreeGrid_2';
import { CoverVariadic, CoverChaotic, CoverEchoChaotic, CoverEcho, CoverEchoSuperchaotic, CoverEchoSuperchaoticGoldenBlue, CoverEchoSuperchaoticIra } from './order.Cover';
import { FastForceFields } from './order.Circles';

import {hexagon} from './test.hexagon'
import {spirals} from './test.spirals'
import {spirals_chaotic, spirals_chaotic_anim, spirals_superchaotic_anim} from './test.spirals_chaotic'
import { Signer } from 'crypto';
import { Context } from './sacred.types';

function consecrate() {
	let canvas = (document.getElementById('canvas') as HTMLCanvasElement);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let tt = 0;
	let frameN = 1;
	let FPS = 20;
	const clearColor = [20, 21, 26];

	let options = window.location.hash.substr(1).split(',').map((pair) => pair.split('=')).reduce((pv, cv) => {
		return {...pv, [cv[0]]: cv[1]};
	}, {
		frames: 1,
		name: undefined,
		preroll: 0,
	});

	if (~~options.frames === 1) {
		canvas.onclick = () => animate();
	}

	console.info(window.location.hash)
	console.info(options)

	let ctx = canvas.getContext('2d');

	ctx.fillStyle = `rgba(${clearColor.join(',')}, 1.0)`;
	ctx.globalCompositeOperation = 'source-over';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	function sign(doSave = true) {
		// circles(ctx);
		// hexagon(ctx);
		// spirals_chaotic(ctx);
		// spirals_superchaotic_anim(ctx, tt);
		// garden(ctx);
		// TreeGrid(ctx);
	
		// CoverTree(ctx, FastForceFields, tt);
		// CoverTree(ctx, CoverVariadic);
		// CoverTree(ctx, CoverEcho, tt);
		CoverTree(ctx, CoverEchoSuperchaoticIra, tt);
		
		let fname = options.name ? `'${options.name}' ` : '';
		document.getElementsByTagName('title')[0].innerText = `Sacred Frame ${fname}#${frameN} @ ${tt}`;
		
		if (doSave) {
			save(canvas, frameN++, options.name);
		}
	};
	
	function animate(doSave = true) {
		ctx.fillStyle = `rgba(${clearColor.join(',')}, 0.3)`;
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		tt += 1 / FPS;

		sign(doSave);
	}

	let frames = ~~options.frames;
	let preroll = ~~options.preroll || FPS;

	while(preroll--) {
		animate(false);
	}

	while(frames--) {
		animate();
	}
}

consecrate();

function save(canvas: HTMLCanvasElement, frameN: number, name: string) {
	let req = new XMLHttpRequest();
	req.onreadystatechange = (e: Event) => {
	//	console.info('AJAX event', e);
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
}99