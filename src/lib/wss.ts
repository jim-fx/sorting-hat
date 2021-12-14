import type { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

interface WSServer {
	on: (type: string, cb: (data?: unknown) => void) => void;
	emit: (type: string, data?: unknown) => void;
	emitAdmin: (type: string, data?: unknown) => void;
}

const wss: Promise<WSServer> = new Promise((res) =>
	setTimeout(() => {
		const events = {};
		const admins = [];

		const wss = global.wss as WebSocketServer;

		wss.on('connection', function connection(ws) {
			console.log('New Connection');
			ws.on('message', async function message(msg: Buffer) {
				try {
					const { type, data } = JSON.parse(msg.toString('utf-8'));

					if (type in events) {
						events[type].forEach((cb) => cb(data));
					}

					console.log('received:', type, data);

					switch (type) {
						case 'admin':
							const { role } = await jwt.verify(data, JWT_SECRET);
							if (role === 'ADMIN') {
								admins.push(ws);
							}
							break;
					}
				} catch (err) {
					console.log(err);
				}
			});
		});

		function on(eventType: string, cb: (data?: unknown) => void) {
			events[eventType] = eventType in events ? [...events[eventType], cb] : [cb];
			return () => {
				events[eventType] = events[eventType].filter((v) => v !== cb);
			};
		}

		function emit(eventType: string, data?: unknown) {
			wss.clients.forEach(function each(client) {
				client.send(JSON.stringify({ type: eventType, data }));
			});
		}

		function emitAdmin(eventType: string, data?: unknown) {
			admins.forEach((client) => {
				client.send(JSON.stringify({ type: eventType, data }));
			});
		}

		res({ on, emit, emitAdmin });
	}, 50)
);
export default wss;
