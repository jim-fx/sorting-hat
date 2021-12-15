export type HouseName = 'ravenclaw' | 'slytherin' | 'hufflepuff' | 'gryffindor';

const houses: HouseName[] = ['ravenclaw', 'slytherin', 'hufflepuff', 'gryffindor'];

export const HouseColors: Record<HouseName, string> = {
	gryffindor: '#75262A',
	hufflepuff: '#F1DE16',
	ravenclaw: '#1F4963',
	slytherin: '#437845'
};

export default houses;
