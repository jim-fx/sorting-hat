const { VITE_API_URL = '' } = import.meta.env as unknown as { VITE_API_URL: string };

let socket: Promise<WebSocket>;
const events = {};

function handleMessage(msg: string) {
	if (msg in events) return events[msg].forEach((cb) => cb());
	try {
		const { type, data } = JSON.parse(msg);
		if (type in events) return events[type].forEach((cb) => cb(data));
	} catch (err) {
		console.error(err);
	}
}

function createSocket(): Promise<WebSocket> {
	if (!('WebSocket' in globalThis)) return;

	let url = VITE_API_URL || window.location.host;

	return new Promise((res) => {
		let _s = new WebSocket('ws://' + url.replace('https://', '').replace('http://', ''));
		_s.onmessage = (ev) => {
			console.log('Received Message', ev);
			handleMessage(ev.data);
		};
		console.log('Created Websocket', url);
		_s.onopen = () => {
			res(socket);
			console.log('Websocket Connected');
		};
		_s.onclose = () => {
			console.log('Reconnecting');
			setTimeout(async () => {
				socket = createSocket();
			}, 500);
		};
	});
}

export function on(event: string, cb: (data?: unknown) => void): () => void {
	if (!socket) socket = createSocket();
	events[event] = event in events ? [...events[event], cb] : [cb];
	return () => {
		events[event] = events[event].filter((_cb) => _cb !== cb);
	};
}

export async function emit(type: string, data?: unknown): Promise<void> {
	if (!socket) socket = createSocket();
	console.log('socket.emit', { type, data });
	(await socket).send(JSON.stringify({ type, data }));
}
