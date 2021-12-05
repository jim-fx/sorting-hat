import { getData } from "$lib/sheets";

export async function get() {

  const d = await getData();

  const houses = {
    "slytherin": 0,
    "gryffindor": 0,
    "hufflepuff": 0,
    "ravenclaw": 0,
  }

  d.forEach(({ Haus }) => {
    if (Haus && Haus.toLowerCase() in houses) {
      console.log(Haus)
      houses[Haus.toLowerCase()]++;
    }
  })

  console.log(houses);

  return {
    body: Object.entries(houses).map(([name, members]) => {
      return { name, members }
    }).sort((a, b) => a.members > b.members ? 1 : -1)[0].name
  }

}
