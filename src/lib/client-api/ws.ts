const { VITE_API_URL = '' } = import.meta.env as unknown as { VITE_API_URL: string };

let socket: WebSocket;
const events = {};

function handleMessage(msg: string) {
	if (msg in events) return events[msg].forEach((cb) => cb());
	try {
		const { type, data } = JSON.parse(msg);
		console.groupCollapsed('ws:received ' + type, type in events);
		console.log(data);
		console.log(events);
		console.groupEnd();
		if (type in events) return events[type].forEach((cb) => cb(data));
	} catch (err) {
		console.error(err);
	}
}

let opened: Promise<void>;

function createSocket(): WebSocket {
	if (!('WebSocket' in globalThis)) return;

	let res;
	opened = new Promise((_res) => (res = _res));

	let url = VITE_API_URL || window.location.host;

	const isSecure = window.location.protocol.includes('s');

	socket = new WebSocket(
		`ws${isSecure ? 's' : ''}://` + url.replace('https://', '').replace('http://', '')
	);
	socket.onmessage = (ev) => {
		handleMessage(ev.data);
	};

	socket.onopen = () => {
		console.log('Websocket Connected', events);
		res();
		if ('open' in events) {
			setTimeout(() => {
				events['open'].forEach((cb) => cb(socket));
			}, 200);
		}
	};

	socket.onclose = () => {
		res();
		setTimeout(async () => {
			console.log('Reconnecting');
			createSocket();
		}, 500);
	};

	return socket;
}

export function on(event: string, cb: (data?: unknown) => void): () => void {
	if (!socket) createSocket();
	events[event] = event in events ? [...events[event], cb] : [cb];
	return () => {
		events[event] = events[event].filter((_cb) => _cb !== cb);
	};
}

export async function emit(type: string, data?: unknown): Promise<void> {
	if (!socket) createSocket();
	await opened;
	console.log('ws.emit', { type, data }, socket);
	socket.send(JSON.stringify({ type, data }));
}
