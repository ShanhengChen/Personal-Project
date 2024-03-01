const axios = require('axios');
const baseUrl = 'https://api-m.sandbox.paypal.com';
const { clientId, clientSecret } = require('./constants');

const axiosInstance = axios.create({
    baseURL: baseUrl, 
});

const getAccessToken = async () => {
    try {
        const response = await axiosInstance.post('v1/oauth2/token', 
            "grant_type=client_credentials",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", 
                },
                auth: {
                    username: clientId,
                    password: clientSecret,
                },
            }
        );

        //console.log('data', response.data); 
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
};

const createOrder = async () => {
    const accessToken = await getAccessToken();
  
    try {
      const response = await axiosInstance.post('/v2/checkout/orders', {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              "currency_code": "USD",
              "value": "1.00"
            }
          }
        ],
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      const orderId = response.data.id;
  
      return orderId;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
  
const captureOrder = async (orderId) => {
  const accessToken = await getAccessToken();

  const response = await axiosInstance.post(`/v2/checkout/orders/${orderId}/capture`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response?.data?.purchase_units[0].payments.captures[0].status === 'COMPLETED') {
    console.log("payment success");
  } 
  return response.data;
}



const generateClientToken = async() => {
  const accessToken = await getAccessToken();

  const response = await axiosInstance.post(`/v1/identity/generate-token`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return {
    clientId,
    client_token: response.data.client_token
  }
}


createOrder();
module.exports = {
    createOrder,
    captureOrder,
    generateClientToken
}
 