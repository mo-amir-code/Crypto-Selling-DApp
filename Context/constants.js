// TheBlockchainCoder: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// TokenSale: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

// JSON FILE
import TheBlockchainCoder from "./TheBlockchainCoder.json"
import TokenSale from "./TokeSaleContract.json";


// TOKEN
const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const TOKEN_ABI = TheBlockchainCoder.abi;


// TOKEN SALE
const TOKEN_SALE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const TOKEN_SALE_ABI = TokenSale.abi;



// Exporting
export{
    TOKEN_ADDRESS,
    TOKEN_ABI,
    TOKEN_SALE_ADDRESS,
    TOKEN_SALE_ABI
}