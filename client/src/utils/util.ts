export function stringToQuery(str: string): {
  [key: string]: string;
} {
  const stringArray: string[] = str.replace('?', '').split('&');

  const dict: {
    [key: string]: string;
  } = {};

  for (let i = 0; i < stringArray.length; i++) {
    const [key, val] = stringArray[i].split('=');

    if (val) dict[key] = val;
  }

  return dict;
}

export function queryToString(query: { [key: string]: string }) {
  if (!query) return '';

  let string = '';

  const keys = Object.keys(query);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (query[key]) {
      if (i === 0) string += '?';

      string += `${key}=${query[key]}&`;
    }
  }

  return string ? string.slice(0, string.length - 1) : '';
}

export function comma(str: string) {
  return str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
