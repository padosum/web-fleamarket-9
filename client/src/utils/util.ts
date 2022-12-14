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
  if (typeof str !== 'string') return '';

  return str
    .replace(/[^0-9]/g, '')
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

export function elapsedTime(date: string) {
  const start = new Date(date);
  const end = new Date(); // 현재 날짜

  const diff = (end as any) - (start as any); // 경과 시간

  const times = [
    { time: '분', milliSeconds: 1000 * 60 },
    { time: '시간', milliSeconds: 1000 * 60 * 60 },
    { time: '일', milliSeconds: 1000 * 60 * 60 * 24 },
    { time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
    { time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
  ].reverse();

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    if (betweenTime > 0) {
      return `${betweenTime}${value.time} 전`;
    }
  }

  return '방금 전';
}

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number,
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export function listenForOutsideClicks({
  listening,
  setListening,
  menuRef,
  setIsOpen,
}: {
  listening: any;
  setListening: Function;
  menuRef: any;
  setIsOpen: Function;
}) {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const cur = menuRef.current;
        if (!cur) return;
        const node = evt.target;
        if (cur.contains(node)) return;
        setIsOpen(false);
      });
    });
  };
}

export function getThumbnail(
  url: string,
  uploadItemImage: Function,
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 104;
      canvas.height = 104;
      var ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, 104, 104);
        canvas.toBlob(function (blob) {
          if (blob) {
            var file = new File([blob], 'name.jpg');
            uploadItemImage({ file }).then((res: any) => {
              resolve(res.url);
            });
          }
        });
      }
    };
  });
}
