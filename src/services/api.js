const API_URL = 'https://dpaste.com/79QXDY8TD.txt'; 

export const fetchCountries = async () => {
  try {
    const response = await fetch(API_URL);
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    
    const textData = await response.text();
    
    let data;
    try {
      data = JSON.parse(textData);
    } catch (error) {
      throw new Error('Failed to parse JSON.');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    throw error;
  }
};
