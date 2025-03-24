import { getWallet } from "./request/GET_vehicle.js";
import { postOrPutWallet } from "./request/POST_vehicle.js";

const DEFAULT_CREDITS = 500000;
const walletSpan = document.getElementById("wallet-amount");

async function getOrCreateWallet(){
    try{
        console.log("fetching wallet from API...")
        //Try fetching or create a wallet
        let wallet = await getWallet();
        console.log("Wallet fetched from API:", wallet);

        //If no walelt is return, create a new wallet
        if(!wallet){
            wallet ={amount:DEFAULT_CREDITS};
            console.log("No wallet found in API. Creating a new wallet....");
            await postOrPutWallet(wallet);
        }
        localStorage.setItem("wallet",JSON.stringify(wallet));
        //return wallet
        return wallet;
    }catch(error){
        console.error("Failed to get or create wallet:", error.response?.status, error.message);

        let wallet=JSON.parse(localStorage.getItem("wallet"));
        if(!wallet){
            console.log("No wallet in localStorage. Initializing default wallet...");
            wallet={amount:DEFAULT_CREDITS};
            localStorage.setItem("wallet",JSON.stringify(wallet));
        }
        return wallet;

    }
}
// 
export async function initWallet(){
    try{
        const wallet = await getOrCreateWallet();
        localStorage.setItem("wallet",JSON.stringify(wallet));
        
        walletSpan.textContent = wallet.amount.toLocaleString();
    }catch(error){
        console.error("Failed to initialize wallet:",error);
    }
}
initWallet();
