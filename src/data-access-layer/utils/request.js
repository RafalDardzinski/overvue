import encodeParameters from '@/data-access-layer/utils/encode-parameters';


const request = (baseUrl, endpoint = '', params = {}) => {
  const queryString = encodeParameters(params);
  const url = `${baseUrl}/${endpoint}?${queryString}`;
  console.log(url);
  return fetch(url).then(res => {
    const x = res.json();

    if (res.ok) return res.json();
    return Promise.reject(res.json())
  });
};

export default request;