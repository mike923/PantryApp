export const quantityFix = (newVal: any) => {
  let val = newVal;
  if (newVal < 0 || isNaN(newVal) || String(newVal) === '00') {
    val = 0;
  }
  if (newVal > 99) {
    val = 99;
  }
  return Number(val);
};

export const priceFix = (newVal: any) => {
  return newVal;
};
