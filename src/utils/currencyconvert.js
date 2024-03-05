export const currencyConvert = (amount, rate = 1) => {
  return amount * rate;
};

export const getSymbol = (code = "USD", amount = 0) => {
  let locales = code === "NGN" ? "en-NG" : "en-US";
  let getSym = new Intl.NumberFormat(locales, {
    style: "currency",
    currency: code,
  })
    .format(amount)
    .split("")[0];
  return getSym;
};

export const getCode = (rate, currencies) => {
  if (currencies !== undefined) {
    return (
      currencies &&
      currencies.filter((cur) => cur.rate === rate && cur.code) &&
      currencies.filter((cur) => cur.rate === rate && cur.code)[0] &&
      currencies.filter((cur) => cur.rate === rate && cur.code)[0].code
    );
  }
};

export const truncateString = (str, len) => {
  if (str.length > len) {
    return str.slice(0, len) + "...";
  } else {
    return str;
  }
};

