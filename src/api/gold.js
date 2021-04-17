import axios from 'axios';
import dayjs from 'dayjs';

import api from '../configs/api';

const makeHeaders = function () {
  // Add authorization headers
  let headers = { 'Content-Type': 'application/json', 'x-access-token': api.GOLDAPI_TOKEN };  
  return headers;
};

const getSpotPrice = async (metal, currency, date) => {
  const processDate = dayjs(date).format('YYYYMMDD');
  const url = `${api.GOLDAPI_URL}/${metal}/${currency}/${processDate}`;

  const headers = makeHeaders();

  return await axios.get(url, { headers: headers }).then(async (response) => {
    if(response.data?.error && response.data.error.includes('No data available for this date or pair.')){
      console.log("Call API again as no data");
      return await getSpotPrice(metal, currency, dayjs(date).subtract(1, 'day'));
    }
    return response;
  }).catch((error) => {
    return error;
  });
}

export default getSpotPrice;