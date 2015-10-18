const currency = (input) => {
  return '$' + input.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};
