const apiUrl = "https://crudapi.co.uk/api/v1/data";
const apiKey = "di7wgyaenklUyd4b2aE8LeG3BtLUTb8ibLitXdbRJ_odye_4SA";
export async function getCharacters(){
    try{
        const response = await axios.get(apiUrl,{
            headers:{
                Authorization:`Bearer ${apiKey}`,
            },
        });
        console.log("Get success:",response.status, response.statusText);
        const data = response.data;
        console.log("Data: ",data);
        return data;
    } catch (error){
        console.error("GET failed: ", error);
        return {items: []};
    }
}