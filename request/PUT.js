
const apiUrl ="https://crudapi.co.uk/api/v1/data";
const apiKey ="di7wgyaenklUyd4b2aE8LeG3BtLUTb8ibLitXdbRJ_odye_4SA";
export async function updateCharacter(uuid,updatetData){
    try{
        const response = await axios.put(`${apiUrl}/${uuid}`,updatetData,{
            headers:{
                Authorization : `Bearer ${apiKey}`,
                "Content-Type":"application/json"
            }
        });
        console.log("Update character :", response.data);
        return response.data;
    }catch(error){
        console.error("Failed to update character:", error);
        throw error;
    }
}