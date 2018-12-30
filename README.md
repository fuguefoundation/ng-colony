# NgColony

The goal of this repo is to create a Truffle Box that is a starter Colony dApp running on Angular. In additiona to wanting to understand the power and potential of Decentralized Autonomous Organizations (DAO), and improve my frontend skills, my intent is to give back to these excellent open source projects - and the community at large - that build on top of Ethereum.

## Prerequisites
* Yarn 1.12.3
* Docker
* Node 10.12.0
* 

## Get started

1. Clone repo: `git clone xxx`
2. `cd xxx`
3. `npm install`
4. Open a new terminal window and start Ganache to spin up a dev network:
`npm run start-ganace`
5. Open a new terminal window and deploy the colonyNetwork contracts:
`npm run deploy-contracts`
6. Open a new terminal window and start TrufflePig:
`npm run start-trufflepig`
**For more info about steps 4-6, see [Colony Starter: Basic](https://github.com/JoinColony/colonyStarter/tree/master/packages/colony-starter-basic)**
7. Until resolved, there are a few changes you will need to make to some js files inside `node_modules`. Each one is a [separate issue](), just comment out the lines specified or better yet, help me fix them!
8. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## The code

`app.component.ts` is based on 

## TODO

This project is a meant to be a Truffle Box and a starter kit, so the focus is primarily on utility and foundation.

1. Option to connect with Metamask and Rinkeby networks

2. Running unit tests and end-to-end tests

* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
* Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
* Colony tests (xxx frameworks?)

3. Improvements to UI/UX using Angular Material.

## Contributing

See [Issues]() for bugs I have identified thus far, I hope to have bounties soon. See [CONTRIBUTING.md](xxx) for details on pull requests, bug fixes, new features, and such.

## Resources

* [ColonyJS Docs](https://docs.colony.io/colonyjs/docs-overview)
* [Ganache](https://github.com/trufflesuite/ganache-cli)
* [Truffle Pig](https://github.com/JoinColony/trufflepig)
* []()
* []()
* []()
* [Angular CLI](https://github.com/angular/angular-cli)

* 1. To get Extended Colony Protocol (ECP) to work in Angular, I had to implement the steps [here](https://medium.com/@GrandSchtroumpf/angular-cli-and-web3-e5cb90885741)