makeObjectSelected = (obj, props) => {
  let newObj = {};

  props.forEach((p) => {
    newObj[p] = obj[p];
  });
  return newObj;
};

module.exports = {
  makeObjectSelected,
};
