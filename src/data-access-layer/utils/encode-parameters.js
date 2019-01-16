const encodeParameters = (parameters = {}) => {
  if (typeof parameters !== 'object') throw new Error('Provided parameter is not an object.');
  return Object.entries(parameters)
    .map(kv => kv.map(encodeURIComponent).join('='))
    .join('&');
};

export default encodeParameters;