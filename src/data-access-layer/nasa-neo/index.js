import request from '@/data-access-layer/utils/request';

const baseUrl = 'https://api.nasa.gov/neo/rest/v1';
const apiKey = 'DEMO_KEY';
class NasaNeoAdapter {
  static getAsteroidsClosestToEarth(startDate, endDate) {
    return request(baseUrl, 'feed', { start_date: startDate, end_date: endDate, api_key: apiKey, });
  }
}

export default NasaNeoAdapter;