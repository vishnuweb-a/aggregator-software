
const insuranceAmountLogic = (amount, deligacy) => {
  let payAmount;
  if (deligacy === 'Electronics') {
    payAmount = amount * 0.2;  // 20% for electronics
  } else if (deligacy === 'Fragile') {
    payAmount = amount * 0.1;  // 10% for fragile items
  } else {
    payAmount = amount * 0.05; // 5% for normal items
  }
  return payAmount;
};

export default insuranceAmountLogic;