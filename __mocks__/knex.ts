const mockSelect = () => mockKnex;
const mockWhere = () => mockKnex;
const mockFirst = () => Promise.resolve({});
const mockInsert = () => Promise.resolve([1]);
const mockUpdate = () => Promise.resolve(1);
const mockDel = () => Promise.resolve(1);

const mockKnex: any = () => mockKnex;
mockKnex.select = mockSelect;
mockKnex.where = mockWhere;
mockKnex.first = mockFirst;
mockKnex.insert = mockInsert;
mockKnex.update = mockUpdate;
mockKnex.del = mockDel;

export default mockKnex;