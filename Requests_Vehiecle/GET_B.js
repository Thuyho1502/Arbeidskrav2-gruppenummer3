const apiUrl = "https://crudapi.co.uk/api/v1/balance";
const apiKey = "zcCftxJWtOYhEsBu2bxVrYlaE5ak7lSeSYHGBBGHR-XxWhAO3Q";

export async function getBalance() {
  try {
        const response = await axios.get(apiUrl, {
            headers:{
                Authorization:`Bearer ${apiKey}`,
            },
        });
        
        const balanceItem = response.data.items[0];
        if(balanceItem){
            console.log(`GET balance success - Value: ${balanceItem.value}`);
            return balanceItem;
        }else{
            console.warn("No balance found in API response.");
            return null;
        }

    } catch (error) {
        console.error("Error fetching balance:", error);
        return null;
    }
}
