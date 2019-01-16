const encodeParameters = (parameters = {}) => {
  if (typeof parameters !== 'object') throw new Error('Provided parameter is not an object.');
  return Object.entries(parameters)
    .filter(kv => !!kv[1])
    .map(kv => kv.map(encodeURIComponent).join('='))
    .join('&');
};

export default encodeParameters;