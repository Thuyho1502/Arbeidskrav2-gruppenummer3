const apiUrl = "https://crudapi.co.uk/api/v1/vehicles";
const apiKey = "diP03s4x7rz0b_PzGebMGHiKBgLclQEPaM5Q7i8CowmOJ9llKQ";
export async function postOrPutWallet(walletObject) {
    try{
        const newWallet ={
            type:"wallet",
            amount:walletObject.amount,
        };
        console.log("Posting wallet to API...");
        const response = await axios.post(apiUrl, newWallet,{
            headers:{
                Authorization : `Bearer ${apiKey}`,
                "Content-Type":"application/json",
            },
        });
        console.log(`POST wallet success: ${response.status}`);
    } catch (error){
        console.error("Failed to POST wallet:", error.response?.status, error.message );
        return null;
    }
    
}