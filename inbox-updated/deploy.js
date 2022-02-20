const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    'cry radar benefit faith humble lab party change eight immune shed name',
    'https://rinkeby.infura.io/v3/84753e0d6708423fbfbf9432a1b4ae2d'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account: ', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('contract deployed to: ', result.options.address);
    provider.engine.stop();
};
deploy();
