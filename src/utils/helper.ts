import moment from 'moment';

export const numberWithSeparator = (x: number | string | undefined) => {
  if (!x) {
    if (x !== 0) {
      return;
    }
  }

  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return parts.join(',');
};

export const numberWithDefaultSeparator = (x: number | string | undefined) => {
  if (!x) {
    if (x !== 0) {
      return;
    }
  }

  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const valInputWithSeparator = (x: number | string | undefined) => {
  const addCommas = (num: any) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const removeNonNumeric = (num: any) => num.toString().replace(/[^0-9]/g, '');

  return addCommas(removeNonNumeric(x));
};

export const currentWithLastdateCondition = (type: 'payload' | 'filter') => {
  let dateFormat = 'YYYY-MM-DD';
  let timeOffset = 'T00:00:00.000Z';
  let payloadMonthFormat = 'YYYY-MM';
  let filterMonthFormat = 'YYYY/MM';

  let current = moment().format(dateFormat) + timeOffset;
  let lastDate = moment().endOf('month').format(dateFormat) + timeOffset;

  if (moment(current).isSame(lastDate)) {
    return moment()
      .add(1, 'month')
      .format(type === 'payload' ? payloadMonthFormat : filterMonthFormat);
  } else {
    return moment().format(
      type === 'payload' ? payloadMonthFormat : filterMonthFormat,
    );
  }
};

export const getLastDate = () => {
  let dateFormat = 'YYYY-MM-DD';
  let timeOffset = 'T00:00:00.000Z';

  let current = moment().format(dateFormat) + timeOffset;
  let lastDate = moment().endOf('month').format(dateFormat) + timeOffset;

  return moment(current).isSame(lastDate);
};
