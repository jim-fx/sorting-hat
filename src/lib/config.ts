const {
	VITE_MONGO_URL,
	VITE_DB_NAME,
	VITE_JWT_SECRET = 'the-small-rabbit-jumped-in-the-murky-mist'
} = import.meta.env;

const MONGO_URL = VITE_MONGO_URL as string;
const DB_NAME = VITE_DB_NAME as string;
const JWT_SECRET = VITE_JWT_SECRET as string;

const env = {
	MONGO_URL,
	DB_NAME,
	JWT_SECRET
};

export { MONGO_URL, DB_NAME, JWT_SECRET };

export default env;
