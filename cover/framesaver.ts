process.env.DEBUG = '*,-express*,-body-parser*,-send';

import * as express from 'express';
import * as http from 'http';
import * as debug from 'debug';
import * as fs from 'fs';
import bodyParser = require('body-parser');

const log = debug('framesaver');
const app = express();

let server = http.createServer(app);

server.on('error', (err) => log(`HTTP Error: ${err.message}`));

log(`Starting`);

server.listen(80, () => {
	log(`Started`);

	let router = express.Router();

	router.use(bodyParser.json({
		inflate: true,
		limit: '512mb',
		strict: true,
	}));
	
	router.use('/require.js', express.static('./require.js'));
	router.use('/out', express.static('./out'));

	router.get('/cover', (req: express.Request, resp: express.Response) => {
		fs.createReadStream('./index.html').pipe(resp.status(200).header('Content-Type', 'text/html'));
	});

	router.post('/frame', (req: express.Request, resp: express.Response) => {
		let {frameN, name, data} = req.body;
		log(`Received frame '${name}' #${frameN}, ${(data as string).length} bytes`);

		let frameDir = `images/${name}`;
		if (!fs.existsSync(frameDir)) {
			fs.mkdirSync(frameDir);
		}

		fs.writeFileSync(`${frameDir}/${frameN}.png`, Buffer.from(data as string, 'base64'));
		resp.status(200).end();
	});

	app.use(router);
});
