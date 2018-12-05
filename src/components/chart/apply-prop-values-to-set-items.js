function applyPropValuesToSetItems (set, prop, values = []) {
  // copy an array
  const _set = set.slice(0);
  let i = 0;
  return _set.map(item => {
    if (i >= values.length)
      i = 0;
    item[prop] = values[i++];
    return item;
  });
}

export default applyPropValuesToSetItems;