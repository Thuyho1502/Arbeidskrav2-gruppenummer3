const apiUrl = "https://crudapi.co.uk/api/v1/vehicles";
const apiKey = "diP03s4x7rz0b_PzGebMGHiKBgLclQEPaM5Q7i8CowmOJ9llKQ";

export async function getWallet() {
    try{
        console.log("Fetching wallet from API...");
        const response = await axios.get(apiUrl,{
            headers:{
                Authorization :`Bearer ${apiKey}`,
            },
        });
        const items=response.data.items || [];
        const wallet =items.find(item => item.type ==="wallet");
        console.log("Wallet fetched from API:",wallet);
        return wallet;
    }catch (error){
        console.error("Failed to fetch wallet: ",error.response?.status,error.message);
        return null;
    }
}