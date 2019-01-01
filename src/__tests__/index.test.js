// Import connectNetwork example
const connectNetwork = require('../examples/connectNetwork');
const createToken = require('../examples/createToken');
const createColony = require('../examples/createColony');
const getColonyClient = require('../examples/getColonyClient');
const addDomain = require('../examples/addDomain');
const createTask = require('../examples/createTask');

// Test accounts
const accounts = [
    '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
    '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
    '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b'
  ];

// Testing NgColony example
describe('NgColony', () => {

  // State
  const state = {
    networkClient: [],    // networkClient (per account)
    colonyClient: [],     // colonyClient (per account)
  };

  // Test the connectNetwork() example from account[0]
  test('account[0] connectNetwork() works', async () => {
    state.networkClient[0] = await connectNetwork(0);
    expect(state.networkClient[0]).toEqual(expect.objectContaining({
      _contract: expect.objectContaining({
        address: expect.stringContaining('0x'),
        signer: expect.objectContaining({
          address: expect.stringContaining('0x'),
        }),
      })
    }));
  }, 5000);

  // Test the createToken() example from account[0]
  test('account[0] createToken() works', async () => {
    state.tokenAddress = await createToken(
      state.networkClient[0],         // networkClient
      'Token',                        // name
      'TKN',                          // symbol
    );
    expect(state.tokenAddress).toEqual(expect.stringContaining('0x'));
  }, 5000);

  // Test the createColony() example from account[0]
  test('account[0] createColony() works', async () => {
    state.colony = await createColony(
      state.networkClient[0],         // networkClient
      state.tokenAddress,             // tokenAddress
    );
    expect(state.colony.address).toEqual(expect.stringContaining('0x'));
    expect(state.colony.id).toBeGreaterThan(0);
  }, 5000);

  // Test the getColonyClient() example from account[0]
  test('account[0] getColonyClient() works', async () => {
    state.colonyClient[0] = await getColonyClient(
      state.networkClient[0],         // networkClient
      state.colony.id,                // colonyId
    );
    expect(state.colonyClient[0]).toEqual(expect.objectContaining({
      _contract: expect.objectContaining({
        address: expect.stringContaining('0x'),
      })
    }));
  }, 5000);

  // Test the addDomain() example from account[0]
  test('account[0] addDomain() works', async () => {
    state.domain = await addDomain(
      state.colonyClient[0],          // colonyClient
      1,                              // parentDomainId
    );
    expect(state.domain.id).toBeGreaterThan(1);
  }, 5000);

  // Test the createTask() example from account[0]
  test('account[0] createTask() works', async () => {
    state.task = await createTask(
      state.colonyClient[0],          // colonyClient
      state.domain.id,                // domainId
      {
        title: 'New Task Title',                  // title
        description: 'New Task Description',      // description
      },
    );
    expect(state.task).toEqual(expect.objectContaining({
      domainId: state.domain.id,
      specificationHash: 'QmWvM3isCmEY8bsixThuFeUJmE5MN2he1UxaPzMngLZ7Wq',
    }));
  }, 15000);  
});