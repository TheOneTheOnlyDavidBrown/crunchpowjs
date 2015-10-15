const currency = (input) => {
  console.log('hhh')
  return '$' + input.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};
