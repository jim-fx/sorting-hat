import prisma from '$lib/db';
import { addPerson, getData } from '$lib/sheets';
const { NODE_ENV = 'production' } = process.env;

export async function get() {
  if (NODE_ENV !== 'development') return;
  return {
    body: await getData()
  };
}

export async function post({ body }) {
  let person = body;
  if (typeof person === 'string') {
    person = JSON.parse(person);
  }

  const { name, house, confidence } = person;

console.log('Add Person', person);
  if (name && house && typeof confidence !== 'undefined') {
    addPerson({ name, house, confidence });
  }

  prisma.registration.create({
    data: {
      name,
      house,
      confidence
    }
  }).then(() => {
    console.log("Saved Registration in DB")
  }).catch((err) => {
    console.log("Error saving Registration in DB")
    console.log(err.message)
  })

  return {
    headers: {
      'Content-Type': 'text/plain'
    },
    body: 'worked'
  };
}
