const formatDate = (moment, date) => {
  return moment(date, "LL").format("DD/MM/YYYY");
};

export { formatDate };