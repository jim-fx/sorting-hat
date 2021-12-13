import wssPromise from '$lib/wss';

const emit = async (msg: unknown) => {
	const wss = await wssPromise;
	wss.clients.forEach(function each(client) {
		client.send(JSON.stringify(msg));
	});
};

export async function post() {
	await emit({ type: 'click', data: 1 });
	return {
		status: 200
	};
}
