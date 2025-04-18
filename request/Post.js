const apiUrl = "https://crudcrud.com/api/0802a76acea244049d4ef93ae005c38b/data2"; // KHÔNG có /v1/data
 
 
export async function addCharacter(data){
    console.log(data);
    try {
        const response = await axios.post(apiUrl, data);
        console.log("New character has been added: ", response.data);
    } catch (error) {
        console.log("Failed to add new person: ", error);
    }
   
}