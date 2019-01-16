import encodeParameters from '@/data-access-layer/utils/encode-parameters';

const request = (baseUrl, endpoint = '', params = {}) => {
  const queryString = encodeParameters(params);
  const url = `${baseUrl}/${endpoint}?${queryString}`;
  return fetch(url).then(res => {
    if (!res.ok) {
      const error = new Error(`Data fetch error. ${res.status}: ${res.statusText}`);
      error.code = res.status;
      error.res = res;
      throw error;
    }
    return res.json();
  });
};

export default request;