export const nameOfMonth = (num) => {
  switch (num) {
    case 1:
      return "января";
    case 2:
      return "февраля";
    case 3:
      return "марта";
    case 4:
      return "апреля";
    case 5:
      return "мая";
    case 6:
      return "июня";
    case 7:
      return "июля";
    case 8:
      return "августа";
    case 9:
      return "сентября";
    case 10:
      return "октября";
    case 11:
      return "ноября";
    case 12:
      return "декабря";
    default:
      return "месяц";
  }
};

export const formateDate = (string) => {
  const stringToDate = new Date(string);
  const month = stringToDate.getMonth() + 1;
  const day = stringToDate.getDate();
  return day + " " + nameOfMonth(month);
};

export const nameOfMonthGeneral = (num) => {
  switch (num) {
    case 1:
      return "январь";
    case 2:
      return "февраль";
    case 3:
      return "март";
    case 4:
      return "апрель";
    case 5:
      return "май";
    case 6:
      return "июнб";
    case 7:
      return "июль";
    case 8:
      return "август";
    case 9:
      return "сентябрь";
    case 10:
      return "октябрь";
    case 11:
      return "ноябрь";
    case 12:
      return "декабрь";
    default:
      return "месяц";
  }
};

export const num_word = (value, words) => {
  value = Math.abs(value) % 100;
  let num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
};

export const isLessOneDay = (num) => {
  const timestamp = Date.parse(num);
  const date = new Date();
  const isToday = timestamp - Date.parse(date) > 1000 * 60 * 60 * 24 * -1;
  if (isToday) {
    const timeFromCreate = (Date.parse(date) - timestamp) / 3600000;
    if (timeFromCreate < 1) {
      return "Загружено меньше часа назад";
    } else {
      const hoursFromCreate = Math.floor(timeFromCreate);
      return (
        "Загружено " +
        hoursFromCreate +
        " " +
        num_word(hoursFromCreate, ["час", "часа", "часов"]) +
        " назад"
      );
    }
  } else {
    return formateDate(timestamp);
  }
};

export const formateDuration = (ms) => {
  let sec = Math.round(ms / 1000);
  let min = Math.floor(sec / 60);
  let hours = Math.floor(ms / 1000 / 60 / 60);
  sec %= 60;
  min %= 60;
  if (sec < 10) sec = "0" + sec;
  if (min < 10) min = "0" + min;
  if (hours < 10) hours = "0" + hours;
  return hours === "00" ? min + ":" + sec : hours + ":" + min + ":" + sec;
};
