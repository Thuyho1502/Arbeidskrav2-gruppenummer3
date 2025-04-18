const apiUrl = "https://crudcrud.com/api/0802a76acea244049d4ef93ae005c38b/data2";
 
export async function deleteCharacter(id){
    try{
        const response = await axios.delete(
            `https://crudcrud.com/api/0802a76acea244049d4ef93ae005c38b/data2/${id}`
        );
    console.log("Character delete:", response.data);
    return response.data;
 
    }catch(error){
   
        console.log("Delete failed: ", error);
    }
}