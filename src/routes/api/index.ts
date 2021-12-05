import { addPerson, getData } from "$lib/sheets"

export async function get() {
  return {
    body: await getData()
  }
}

export async function post({ body: { name, house, confidence } }) {


  if (name && house && typeof confidence !== "undefined") {
    addPerson({ name, house, confidence })
  }

  return {
    body: {}
  }

}
