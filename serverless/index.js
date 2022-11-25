const functions = require('@google-cloud/functions-framework');
const axios = require('axios');

functions.http('helloHttp', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    try {
        const response = await axios.get("https://api.exchangerate.host/latest");
        const currencies = ['MYR', 'SGD', 'TWD', 'JPY', 'KRW'];
        const ratesData = response.data.rates;
        const processedData = Object.keys(ratesData).filter((key) => currencies.includes(key)).reduce((cur, key) => {
            return Object.assign(cur, { [key]: ratesData[key] })
            }, {});
        res.send(processedData);
    } catch (error) {
        console.log(error);
    }
  }
});
