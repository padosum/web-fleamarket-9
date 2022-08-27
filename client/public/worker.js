const tabs = [];

// 서버와의 연결
const ws = new WebSocket('ws://localhost:4001');
ws.onopen = () => {};

ws.onclose = () => {};

ws.onmessage = ({ data }) => {};

// 다른 탭과의 연결
// eslint-disable-next-line no-undef
onconnect = function (e) {
  const port = e.ports[0];
  tabs.push(port);

  port.onmessage = (e) => {
    tabs.forEach((eachTabPort) => {
      eachTabPort.postMessage(e.data);
    });
  };
};
