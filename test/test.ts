const params = new URLSearchParams({
    company:"AMERICAN EXPRESS COMPANY",
    
  });
  
  async function fetchUserData() {
    const url = `https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    return data.hits.hits;
  }

  fetchUserData()
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error("Failed to fetch user data:", err);
    });

export{}  