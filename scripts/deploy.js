const hre = require("hardhat");

const tokens = (nToken) => {
    return hre.ethers.utils.parseUnits(nToken.toString(), "ether");
};

async function main(){
    // DEPLOY TOKEN CONTRACT
    const _initialSupply = tokens(5000000);

    const TheBlockchainCoders = await hre.ethers.getContractFactory("TheBlockchainCoder");

    const theBlockchainCoders = await TheBlockchainCoders.deploy(_initialSupply);

    await theBlockchainCoders.deployed();

    console.log(`TheBlockchainCoder: ${theBlockchainCoders.address}`);

    // TOKEN SALE CONTRACT
    const _tokenPrice = tokens(1);

    const TokenSale = await hre.ethers.getContractFactory("TokeSaleContract");
    const tokenSale = await TokenSale.deploy(theBlockchainCoders.address, _tokenPrice);

    await tokenSale.deployed();

    console.log(`TokenSale: ${tokenSale.address}`);
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});