export const weightConverter = (weight: number) => {
  const kg = 1000;
  if (weight >= kg) {
    return `${weight / kg} kg`;
  } else {
    return `${weight} g`;
  }
};

export const currencyFormatter = (price: number) => {
  return `AED ${price.toFixed(2)}`;
};
