const apiUrl = "https://crudapi.co.uk/api/v1/data";
const apiKey = "di7wgyaenklUyd4b2aE8LeG3BtLUTb8ibLitXdbRJ_odye_4SA";
export async function deleteCharacter(id){
    try{
        const response = await axios.delete(
            `https://crudapi.co.uk/api/v1/data/${id}`,
            {
            headers:{
                Authorization:`Bearer ${apiKey}`,

                },
            }
        );
    console.log("Character delete:", response.data);
    return response.data;

    }catch(error){
    
        console.log("Delete failed: ", error);
    }
}
