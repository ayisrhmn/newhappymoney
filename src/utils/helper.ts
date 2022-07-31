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
