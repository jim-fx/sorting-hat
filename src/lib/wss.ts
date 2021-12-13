import type { WebSocketServer } from 'ws';
const wss: Promise<WebSocketServer> = new Promise((res) => setTimeout(() => res(global.wss), 50));
export default wss;
