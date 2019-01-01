import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

// Module Imports
const connectNetwork = require('../examples/connectNetwork');
const createToken = require('../examples/createToken');
const createColony = require('../examples/createColony');
const getColonyClient = require('../examples/getColonyClient');
const addDomain = require('../examples/addDomain');
const createTask = require('../examples/createTask');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // State
  state = {
    networkClient: [],    // networkClient (per account)
    colonyClient: [],     // colonyClient (per account)
    tokenAddress: '',
    colony: {address: '', id: null},
    domain: {id: null, parentSkillId: null, potId: null},
    task: {
      completionDate: null,
      deliverableHash: null,
      domainId: null,
      dueDate: {},
      id: null,
      payoutsWeCannotMake: null,
      potId: null,
      skillId: null,
      specificationHash: '',
      status: ''
    }
  };

  model = {
    accountAddr: '',
    networkAddr: '',
    tokenAddr: '',
    colonyId: '',
    colonyAddr: '',
    domainId: null
  };

  task = {
    title: '',
    description: '',
    id: '',
    specHash: '',
    getTaskSpecHash: ''
  };

  // Test accounts
  accounts = [
    '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
    '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
    '0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b'
  ];

  constructor(private matSnackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.example()
      .then((res) => console.log(res))
      .catch(error => console.error(error));
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

  // Executed OnInit
  async example() {

    // Create an instance of ColonyNetworkClient using the adapter
    this.state.networkClient[0] = await connectNetwork(0);
    console.log(this.state.networkClient[0]);
    this.model.accountAddr = this.state.networkClient[0]._contract.address;
    this.model.networkAddr = this.state.networkClient[0]._contract.signer.address;

    // Create ERC20 token
    this.state.tokenAddress = await createToken(
      this.state.networkClient[0],         // networkClient
      'Token',                        // name
      'TKN',                          // symbol
    );
    this.model.tokenAddr = this.state.tokenAddress;

    // Create a colony using the token address of the ERC20 token
    this.state.colony = await createColony(
      this.state.networkClient[0],         // networkClient
      this.state.tokenAddress,             // tokenAddress
    );
    this.model.colonyAddr = this.state.colony.address;
    this.model.colonyId = this.state.colony.id;

    // Get an initialized ColonyClient for the colony
    this.state.colonyClient[0] = await getColonyClient(
      this.state.networkClient[0],         // networkClient
      this.state.colony.id,                // colonyId
    );

    this.state.domain = await addDomain(
      this.state.colonyClient[0],          // colonyClient
      1,                              // parentDomainId
    );
    this.model.domainId = this.state.domain.id;
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
    this.setStatus('Initiating transaction... (please wait)');
    try {
      this.state.task = await createTask(
        this.state.colonyClient[0],          // colonyClient
        this.state.domain.id,                // domainId
        {
          title: this.task.title,                  // title
          description: this.task.description,      // description
        },
      );
      if (!this.state.task) {
        this.setStatus('Transaction failed!');
      } else {
        this.setStatus('Transaction complete!');
        this.task.specHash = this.state.task.specificationHash;
        this.task.id = this.state.task.id;
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error making proposal; see log.');
    }
  }

  async getTask() {
    const getTask = await this.state.colonyClient[0].getTask.call({ taskId: Number(this.task.id) });
    this.task.getTaskSpecHash = getTask.specificationHash;
    console.log(getTask);
  }
}
