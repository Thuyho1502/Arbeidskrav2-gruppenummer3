const apiUrl = "https://crudcrud.com/api/0802a76acea244049d4ef93ae005c38b/balance22";
 
export async function getBalance() {
  try {
    const response = await axios.get(apiUrl);
    const balances = response.data;
    const balanceItem = balances[0]; // vì CrudCrud trả về array
 
    if (balanceItem) {
      console.log(`GET balance success - Value: ${balanceItem.value}`);
      return balanceItem;
    } else {
      console.warn("No balance found in API response.");
      return null;
    }
 
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
}