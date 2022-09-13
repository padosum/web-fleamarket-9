import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastMessageContainer } from './components/ToastMessageContainer';
import { GlobalProvider } from './GlobalProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <GlobalProvider>
    <App />
    <ToastMessageContainer />
  </GlobalProvider>,
);
