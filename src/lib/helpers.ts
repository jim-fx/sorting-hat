function decodeBase64(s) {
	var e = {},
		i,
		b = 0,
		c,
		x,
		l = 0,
		a,
		r = '',
		w = String.fromCharCode,
		L = s.length;
	var A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	for (i = 0; i < 64; i++) {
		e[A.charAt(i)] = i;
	}
	for (x = 0; x < L; x++) {
		c = e[s.charAt(x)];
		b = (b << 6) + c;
		l += 6;
		while (l >= 8) {
			((a = (b >>> (l -= 8)) & 0xff) || x < L - 2) && (r += w(a));
		}
	}
	return r;
}

export function decodeJWT(input: string) {
	console.log('DECODE', input);
	const base64Url = input.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const res = decodeBase64(base64);
	return JSON.parse(res);
}
