import { Component, OnInit } from '@angular/core';
import { providers, Wallet } from 'ethers';
import { TrufflepigLoader } from '@colony/colony-js-contract-loader-http';

// import { EthersAdapter } from '@colony/colony-js-adapter-ethers';
// import { ColonyNetworkClient } from '@colony/colony-js-client';

// Import the prerequisites
// const { providers, Wallet } = require('ethers');
const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
// const { TrufflepigLoader } = require('@colony/colony-js-contract-loader-http');
const { default: ColonyNetworkClient } = require('@colony/colony-js-client');
// Import the Extended Colony Protocol
const ecp = require('../helpers/ecp');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  colonyClient: any;

  model = {
    networkAddr: '',
    tokenAddr: '',
    colonyId: '',
    colonyAddr: ''
  };

  task = {
    title: '',
    description: '',
    id: '',
    specHash: ''
  };

  // Test accounts
  accounts = [
    '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
    '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
    '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b'
  ];

  constructor() {

  }

  ngOnInit(): void {
    this.example()
      .then((res) => console.log(res))
      .catch(error => console.error(error));
  }

  // Create an async function
  async example() {

    // Create an instance of TrufflepigLoader
    const loader = new TrufflepigLoader();

    // Create an instance of JsonRPCProvider using the url of our test network
    const provider = new providers.JsonRpcProvider('http://localhost:8545/');

    // Get the private key from the first account
    const { privateKey } = await loader.getAccount(0);

    // Create an instance of Wallet using the private key and provider
    const wallet = new Wallet(privateKey, provider);

    // Create an instance of EthersAdapter
    const adapter = new EthersAdapter({
      loader,
      provider,
      wallet,
    });
    console.log(adapter);

    // Create an instance of ColonyNetworkClient using the adapter
    const networkClient = new ColonyNetworkClient({ adapter });
    console.log(networkClient);

    // Initialize the client
    await networkClient.init();

    // Congrats, you've connected to the network!
    this.model.networkAddr = networkClient.contract.address;

    // Create an ERC20 token (you could also skip this step and use a pre-existing token)
    const { meta: { receipt: { contractAddress } } } = await networkClient.createToken.send({
      name: 'Token',
      symbol: 'TKN',
    });

    // Congrats, you've created an ERC20 token!
    this.model.tokenAddr = contractAddress;

    // Create a colony using the token address of the ERC20 token we created
    const { eventData: { colonyId, colonyAddress } } = await networkClient.createColony.send({
      tokenAddress: contractAddress,
    });

    // Congrats, you've created a colony!
    this.model.colonyId = colonyId;
    this.model.colonyAddr = colonyAddress;

    // Get an initialized ColonyClient for the colony we just created
    this.colonyClient = await networkClient.getColonyClient(colonyId);
    console.log(this.colonyClient);

    const admin = await this.colonyClient.setAdminRole.send({ user: this.accounts[1] });
    console.log(admin);

    // Initialise the Extended Colony Protocol
    // await ecp.init();

    // const specification = {title: 'Something cooler', description: 'Awesome deeds'};
    // const specificationHash = await ecp.saveHash(specification);
    // this.model.specHash = specificationHash;

    // const createTask = await colonyClient.createTask.send({
    //   specificationHash,
    //   colonyId
    // });
    // console.log(createTask);

    // const getTask = await colonyClient.getTask.call({ taskId: 1 });
    // console.log(getTask);

    const getTokenInfo = await this.colonyClient.token.getTokenInfo.call();
    console.log(getTokenInfo);

  }

  setTaskTitle(e) {
    console.log('Setting task title: ' + e.target.value);
    this.task.title = e.target.value;
  }

  setTaskDesc(e) {
    console.log('Setting task description: ' + e.target.value);
    this.task.description = e.target.value;
  }

  setTaskID(e) {
    console.log('Setting task ID: ' + e.target.value);
    this.task.id = e.target.value;
  }

  async createTask() {
    // Initialise the Extended Colony Protocol
    await ecp.init();
    const colonyId = this.model.colonyId;
    const specification = {title: this.task.title, description: this.task.description};

    const specificationHash = await ecp.saveHash(specification);
    this.task.specHash = specificationHash;

    const createTask = await this.colonyClient.createTask.send({
      specificationHash,
      colonyId
    });
    console.log(createTask);
  }

  async getTask() {
    const getTask = await this.colonyClient.getTask.call({ taskId: Number(this.task.id) });
    console.log(getTask);
  }
}
