import { addPerson, getData } from '$lib/sheets';
const { NODE_ENV = 'production' } = process.env;

export async function get() {
  if (NODE_ENV !== 'development') return;
  return {
    body: await getData()
  };
}

export async function post({ body: { name, house, confidence } }) {
  console.log("Add Person", { name, house, confidence })
  if (name && house && typeof confidence !== 'undefined') {
    addPerson({ name, house, confidence });
  }

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Headers': 'Content-Type',
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Content-Type": "text/plain",
    },
    body: "worked"
  };
}
