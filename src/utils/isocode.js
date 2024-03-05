export const isoCode = () => {
  return fetch("https://currency13.p.rapidapi.com/list", {
    method: "GET",
    headers: {
      "access-control-allow-origin": "*",
      "x-rapidapi-key": process.env.REACT_APP_CURRENCY_API,
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
