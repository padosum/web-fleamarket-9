const FOCUS = 'focus';
const AUTH = 'auth';
const ITEM_UPLOAD = 'item-upload';
const SEND_LIKE = 'send-like';
const SEND_CHAT = 'send-chat';
const ITEM_UPLOADED = 'item-uploaded';
const GET_LIKE = 'get-like';
const RECEIVE_CHAT = 'receive-chat';

const tabs = [];

const WEBSOCKET_URL = 'ws://localhost:4001';

// 서버와의 연결
let ws = new WebSocket(WEBSOCKET_URL);
ws.onopen = () => {};

ws.onclose = () => {
  ws = new WebSocket(WEBSOCKET_URL);
};

ws.onmessage = ({ data: _data }) => {
  const { event, data } = JSON.parse(_data);

  // eslint-disable-next-line default-case
  switch (event) {
    case RECEIVE_CHAT:
      tabs.forEach((tab) => {
        tab.postMessage(data);
      });
      break;

    case GET_LIKE:
      tabs.forEach((tab) => {
        tab.postMessage({ event, data });
      });
      break;
    case ITEM_UPLOADED:
      tabs.forEach((tab) => {
        tab.postMessage({ event, data });
      });
      break;
  }
};

function setAuth(idx) {
  ws.send(JSON.stringify({ event: AUTH, data: idx }));
}

function sendChat(data) {
  ws.send(JSON.stringify({ event: SEND_CHAT, data }));
}

function sendLike(data) {
  ws.send(JSON.stringify({ event: SEND_LIKE, data }));
}

function uploadItem(data) {
  ws.send(JSON.stringify({ event: ITEM_UPLOAD, data }));
}

// 다른 탭과의 연결
// eslint-disable-next-line no-undef
onconnect = function (e) {
  const port = e.ports[0];
  tabs.push(port);

  port.onmessage = (e) => {
    const { event, data } = JSON.parse(e.data);

    // eslint-disable-next-line default-case
    switch (event) {
      case AUTH: {
        setAuth(data);
        break;
      }

      case SEND_CHAT: {
        sendChat(data);
        break;
      }

      case SEND_LIKE: {
        sendLike(data);
        break;
      }

      case ITEM_UPLOAD: {
        uploadItem(data);
        break;
      }
    }
  };
};
