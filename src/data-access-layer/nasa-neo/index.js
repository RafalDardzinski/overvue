import request from '@/data-access-layer/utils/request';

const baseUrl = 'https://api.nasa.gov/neo/rest/v1';
const apiKey = 'DEMO_KEY';
// let apiKey;
class NasaNeoAdapter {
  static getNearEarthObjects(startDate, endDate) {
    return request(baseUrl, 'feed', { start_date: startDate, end_date: endDate, api_key: apiKey, })
      .then(({near_earth_objects}) => Promise.resolve(near_earth_objects));
  }
}

export default NasaNeoAdapter;