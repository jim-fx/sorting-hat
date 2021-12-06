import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
	keyFile: 'google-credentials.json', //the key file
	//url to spreadsheets API
	scopes: 'https://www.googleapis.com/auth/spreadsheets'
});

const spreadsheetId = '1fbyfdAipqApzHY67jmDZaMNnQJPqpfef-ryrbfE-hFU';

const googleApi = (async () => {
	const authClientObject = await auth.getClient();

	const googleSheetsInstance = google.sheets({ version: 'v4', auth: authClientObject });

	return googleSheetsInstance;
})();

async function getSheet() {
	return await (
		await googleApi
	).spreadsheets.values.get({
		auth, //auth object
		spreadsheetId, // spreadsheet id
		range: 'GuestInput' //range of cells to read from.
	});
}

function parseBoolean(o, key) {
	if (key in o) {
		o[key] = o[key].length ? !!parseInt(o[key]) : null;
	}
}

function parseNumber(o, key) {
	if (key in o) {
		o[key] = o[key].length ? parseInt(o[key]) : null;
	}
}

async function _getData(): Promise<{ Name: string; Alter: number }[]> {
	const raw = await getSheet();

	const _rows = raw.data.values;

	const [_, headers, ...rows] = _rows;

	function parseRow(row: string[]) {
		const o = {};

		row.forEach((v, i) => {
			o[headers[i]] = v;
		});

		parseBoolean(o, 'Schlafen');
		parseBoolean(o, 'Frauen');
		parseBoolean(o, 'Single');
		parseBoolean(o, 'Männer');
		parseBoolean(o, 'Veggies');

		parseNumber(o, 'Alter');

		return o;
	}

	return rows.map((r) => parseRow(r));
}

let lastGetUpdate: number;
let cacheData;
export async function getData() {
	if (!lastGetUpdate || Date.now() - 300000 > lastGetUpdate) {
		cacheData = await _getData();
		lastGetUpdate = Date.now();
	}

	return cacheData;
}

export async function addPerson({ name, confidence, house }): Promise<unknown> {
	return (await googleApi).spreadsheets.values.append({
		auth, //auth object
		spreadsheetId, // spreadsheet id
		range: 'GuestInput', //range of cells to read from.
		valueInputOption: 'RAW',
		resource: {
			values: [[name, confidence, '', '', '', '', '', '', '', house]]
		}
	});
}
