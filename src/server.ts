import polka from 'polka';
import { WebSocketServer } from 'ws';
import cors from 'cors';
//@ts-ignore
import { assetsMiddleware, kitMiddleware, prerenderedMiddleware } from '../build/middlewares.js';

const { PORT = 3000 } = process.env;

const app = polka();

const c = cors();

app.use(c);

app.use(assetsMiddleware, prerenderedMiddleware, kitMiddleware);

app.options('*', c);

app.listen(PORT, () => {
	console.log(`> Running on localhost:${PORT}`);
});

const wss = new WebSocketServer({ server: app.server });
global.wss = wss;
