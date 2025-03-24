/* import axios from "axios";

const apiUrl = "https://crudapi.co.uk/api/v1/vehicles";
const apiKey = "diP03s4x7rz0b_PzGebMGHiKBgLclQEPaM5Q7i8CowmOJ9llKQ";

export async function updateWallet(uuid, updateWallet){
    try{
        const response = await axios.put(`${apiUrl}/${uuid}`,updateWallet,{
            headers:{
                Authorization :`Bearer ${apiKey}`,
                "Content-Type":"application/json",
            },

        });
        console.log("PUT wallet success:", response.status);
        return response.data;
    }catch(error){
        console.error("Failed to PUT wallet :", error);
        return null;
    }
} */