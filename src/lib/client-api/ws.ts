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

	let url = VITE_API_URL || window.location.host;

	const isSecure = window.location.protocol.includes('s');

	let _s = new WebSocket(
		`ws${isSecure ? 's' : ''}://` + url.replace('https://', '').replace('http://', '')
	);
	_s.onmessage = (ev) => {
		handleMessage(ev.data);
	};

	let res;
	opened = new Promise((_res) => {
		res = _res;
	});

	_s.onopen = () => {
		console.log('Websocket Connected');
		res();
		setTimeout(() => {
			if ('open' in events) {
				events['open'].forEach((cb) => cb(_s));
			}
		}, 50);
		res();
	};
	_s.onclose = () => {
		setTimeout(async () => {
			console.log('Reconnecting');
			socket = createSocket();
		}, 500);
	};

	return _s;
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
	await opened;
	socket.send(JSON.stringify({ type, data }));
}
