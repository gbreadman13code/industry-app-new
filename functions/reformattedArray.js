export const reformattedArray = (array) => {
  const arrOfMonth = [];
  array.forEach((item) => {
    const date = new Date(
      item.date
        ? item.date
        : item.datetime
        ? item.datetime
        : item.start_datetime
    );
    const month = date.getMonth() + 1;
    const hasInMonthArray = arrOfMonth.findIndex(
      (point) => point.month === month
    );
    if (hasInMonthArray >= 0) {
      arrOfMonth[hasInMonthArray].items.push(item);
    } else {
      const newObject = new Object();
      newObject.month = month;
      newObject.items = [];
      newObject.items.push(item);
      arrOfMonth.push(newObject);
    }
    const day = date.getDate();
    item.month = month + 1;
    item.day = day;
  });
  return arrOfMonth;
};

export const reformattedEventsArray = (array) => {
  const arrOfMonth = [];
  array.forEach((item) => {
    const date = new Date(
      item.date
        ? item.date
        : item.datetime
        ? item.datetime
        : item.start_datetime
    );
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hasInMonthArray = arrOfMonth.findIndex(
      (point) => point.month == day + " " + month
    );
    if (hasInMonthArray >= 0) {
      arrOfMonth[hasInMonthArray].items.push(item);
    } else {
      const newObject = new Object();
      newObject.month = day + " " + month;
      newObject.items = [];
      newObject.items.push(item);
      arrOfMonth.push(newObject);
    }
  });
  console.log(arrOfMonth);
  return arrOfMonth;
};
