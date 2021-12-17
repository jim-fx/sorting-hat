import { default as main } from './main';
import { default as debug } from './debug';

const DataSets = { main, debug };

export type DataSetID = keyof typeof DataSets;

export default DataSets;
