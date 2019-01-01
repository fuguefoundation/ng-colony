# NgColony

The goal of this repo is to create a Truffle Box that is a starter Colony dApp running on Angular. In additiona to wanting to understand the power and potential of Decentralized Autonomous Organizations (DAO), and improve my frontend skills, my intent is to give back to these excellent open source projects - and the community at large - that build on top of Ethereum.

## Prerequisites
* Yarn 1.12.3
* Docker
* Node 10.12.0
* Angular CLI

## Get started

1. Clone repo: `git clone https://github.com/fuguefoundation/ng-colony.git`
2. `cd ng-colony`
3. `yarn`
4. Open a new terminal window and start Ganache to spin up a dev network:
`npm run start-ganache`
5. Open a new terminal window and deploy the colonyNetwork contracts:
`npm run deploy-contracts`
* Make sure Docker is installed and running. If you encounter an error, try `docker pull ethereum/solc:0.4.23`
6. Open a new terminal window and start TrufflePig:
`npm run start-trufflepig`
* *For more info about steps 4-6, see [Colony Starter: Basic](https://github.com/JoinColony/colonyStarter/tree/master/packages/colony-starter-basic)*
7. Until resolved, there are three changes you will need to make to some js files inside `node_modules`. For each one I've created a [separate issue](https://github.com/fuguefoundation/ng-colony/issues), just comment out the lines specified or better yet, help me fix them!
8. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## The code

`app.component.ts` is based on the sample code from [colonyjs get started docs](https://docs.colony.io/colonyjs/docs-get-started/). I've incorporated Angular Material for some presentation and interaction, open the console to see more data.

## Testing

* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
* Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
* Colony tests using Jest - `npm run colony-test`

## TODO

This project is a meant to be a Truffle Box and a starter kit, so the focus is primarily on utility and foundation. Some features worth considering for improvement:

1. Improving unit tests, end-to-end tests, and Colony specific tests
2. Option to connect with Metamask and Rinkeby networks
3. Further improvements to UI/UX using Angular Material.

## Contributing

See [Issues](https://github.com/fuguefoundation/ng-colony/issues) for bugs I have identified thus far, I hope to have bounties soon. See [CONTRIBUTING.md](xxx) for details on pull requests, bug fixes, new features, and such.

## Resources

* [ColonyJS Docs](https://docs.colony.io/colonyjs/docs-overview)
* [Colony Network Docs](https://docs.colony.io/colonynetwork/docs-get-started/)
* [Ganache](https://github.com/trufflesuite/ganache-cli)
* [Truffle Pig](https://github.com/JoinColony/trufflepig)
* [Angular Box](https://truffleframework.com/boxes/angular-truffle-box)
* [Angular CLI](https://github.com/angular/angular-cli)

## Notes

1. To get Extended Colony Protocol (ECP) to work in Angular, I had to implement the steps [here](https://medium.com/@GrandSchtroumpf/angular-cli-and-web3-e5cb90885741)