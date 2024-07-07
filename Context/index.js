import { ethers } from "ethers";
import { createContext, useContext, useState } from "react";

// INTERNAL IMPORT
import {
  CheckIfWalletConnected,
  connectWallet,
  connectingTokenContract,
  connectingTokenSaleContract,
  getBalance,
} from "../Utils";
import { TOKEN_SALE_ADDRESS } from "./constants";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const TOKEN_ICO = "TOKEN SALE DAPP";

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [nativeToken, setNativeToken] = useState("");
  const [tokenHolders, setTokenHolders] = useState([]);
  const [tokenSale, setTokenSale] = useState("");
  const [currentHolder, setCurrentHolder] = useState("");

  // FETCH CONTRACT DATA
  const fetchInitialData = async () => {
    try {
      // GET USER ACCOUNT
      const account = await CheckIfWalletConnected();

      // GET USER BALANCE
      const balance = await getBalance();
      setBalance(ethers.utils.formatEther(balance.toString()));
      setAddress(account);

      // TOKEN CONTRACT
      const TOKEN_CONTRACT = await connectingTokenContract();
      let tokenBalance;
      if (account) {
        tokenBalance = await TOKEN_CONTRACT.balanceOf(account);
      } else {
        tokenBalance = 0;
      }

      // GET ALL TOKEN DATA
      const tokenName = await TOKEN_CONTRACT.name();
      const tokenSymbol = await TOKEN_CONTRACT.symbol();
      const tokenTotalSupply = await TOKEN_CONTRACT.totalSupply();
      const tokenStandard = await TOKEN_CONTRACT.standard();
      const tokenHolders = await TOKEN_CONTRACT._userId();
      const tokenOwnerOfContract = await TOKEN_CONTRACT.ownerOfContract();
      const tokenAddress = TOKEN_CONTRACT.address;

      const nativeToken = {
        tokenAddress,
        tokenName,
        tokenSymbol,
        tokenOwnerOfContract,
        tokenStandard,
        tokenTotalSupply: ethers.utils.formatEther(tokenTotalSupply.toString()),
        tokenBalance,
        tokenHolders: tokenHolders.toNumber(),
      };

      setNativeToken(nativeToken);

      // GET TOKEN HOLDERS DATA
      const getTokenHolder = await TOKEN_CONTRACT.getTokenHolder();
      setTokenHolders(getTokenHolder);

      // GETTING TOKEN HOLDER DATA
      if (account) {
        const getTokenHolderData = await TOKEN_CONTRACT.getTokenHolderData(
          account
        );

        const currentHolder = {
          tokenId: getTokenHolderData[0].toNumber(),
          from: getTokenHolderData[1],
          to: getTokenHolderData[2],
          totalToken: ethers.utils.formatEther(
            getTokenHolderData[3].toString()
          ),
          tokenHolder: getTokenHolderData[4],
        };

        setCurrentHolder(currentHolder);
      }

      // TOKEN SALE CONTRACT
      const TOKEN_SALE_CONTRACT = await connectingTokenSaleContract();
      const tokenPrice = await TOKEN_SALE_CONTRACT.tokenPrice();
      const tokenSold = await TOKEN_SALE_CONTRACT.tokenSold();
      const tokenSaleBalance = await TOKEN_CONTRACT.balanceOf(
        TOKEN_SALE_ADDRESS
      );

      const tokenSale = {
        tokenPrice: ethers.utils.formatEther(tokenPrice.toString()),
        tokenSold: tokenSold.toNumber(),
        tokenSaleBalance: ethers.utils.formatEther(tokenSaleBalance.toString()),
      };

      setTokenSale(tokenSale);

      console.log(tokenSale)
      console.log(currentHolder)
      console.log(nativeToken)
    } catch (error) {
      console.error(error);
    }
  };

  // BUY TOKEN FUNCTION
  const buyToken = async () => {
    try {
      const amount = ethers.utils.parseUnits(nToken.toString(), "ether");
      const contract = await connectingTokenSaleContract();

      const buying = await contract.buyToken(nToken, {
        value: amount.toString(),
      });

      await buying.wait();
      console.log(buying);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // NATIVE TOKEN TRANSFER
  const transferNativeToken = async () => {
    try {
      const TOKEN_AMOUNT = 500;
      const tokens = TOKEN_AMOUNT.toString();
      const transferAmount = ethers.utils.parseEther(tokens);

      const contract = await connectingTokenContract();
      const transaction = await contract.transfer(
        TOKEN_SALE_ADDRESS,
        transferAmount
      );

      console.log(contract);
      await transaction.wait();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StateContext.Provider
      value={{ 
        TOKEN_ICO, 
        fetchInitialData, 
        buyToken,
        transferNativeToken,
        setAddress,
        currentHolder,
        tokenSale,
        tokenHolders,
        nativeToken,
        balance,
        address
       }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
