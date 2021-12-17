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
	if (!input) return {};
	const base64Url = input.split('.')[1];
	const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
	if (!base64) return {};
	const res = decodeBase64(base64);
	return JSON.parse(res);
}

export function capitalize(s) {
	return s[0].toUpperCase() + s.slice(1);
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
	return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}

	return mergeDeep(target, ...sources);
}

export function easeInOutQuint(x: number): number {
	return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}
