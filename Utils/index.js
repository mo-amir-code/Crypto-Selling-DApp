import { ethers } from "ethers"
import Web3Modal from "web3modal";

import {
    TOKEN_ADDRESS,
    TOKEN_ABI,
    TOKEN_SALE_ADDRESS,
    TOKEN_SALE_ABI
} from "../Context/constants";


const CheckIfWalletConnected = async () => {
    try {
        if(!window.ethereum){
            return console.log("Install MetaMask")
        }

        const accounts = await window.ethereum.request({method: "eth_accounts"});

        return accounts[0];
    } catch (error) {
        console.error(error);
    }
}

const connectWallet = async () => {
    try {
        if(!window.ethereum){
            return console.log("Install MetaMask")
        }

        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});

        const firstAccount = accounts[0];
        window.location.reload();
        return firstAccount;

    } catch (error) {
        console.error(error);
    }
}


// TOKEN CONTRACT
const fetchTokenContract = (signerOrProvider) => new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signerOrProvider);

const connectingTokenContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchTokenContract(signer);
        return contract;
    } catch (error) {
        console.error(error);
    }
}

// GET BALANCE OF THE USER
const getBalance = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        return await signer.getBalance();
    } catch (error) {
        console.error(error);
    }
}

// TOKEN SALE CONTRACT
const fetchTokenSaleContract = (signerOrProvider) => new ethers.Contract(TOKEN_SALE_ADDRESS, TOKEN_SALE_ABI, signerOrProvider);

const connectingTokenSaleContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchTokenSaleContract(signer);
        return contract;
    } catch (error) {
        console.error(error);
    }
}


// EXPORTING
export {
    CheckIfWalletConnected,
    connectWallet,
    connectingTokenContract,
    connectingTokenSaleContract,
    getBalance
}